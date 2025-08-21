import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface RateLimitRecord {
  ip: string;
  count: number;
  reset_time: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Получаем IP адрес клиента
    const clientIP = req.headers.get('x-forwarded-for') || 
                     req.headers.get('x-real-ip') || 
                     'unknown';

    console.log(`Rate limit check for IP: ${clientIP}`);

    // Настройки rate limiting
    const REQUESTS_PER_WINDOW = 5; // максимум 5 запросов
    const WINDOW_MINUTES = 10; // за 10 минут

    const now = new Date();
    const resetTime = new Date(now.getTime() + (WINDOW_MINUTES * 60 * 1000));

    // Проверяем существующие записи для этого IP
    const { data: existingRecord, error: selectError } = await supabase
      .from('rate_limits')
      .select('*')
      .eq('ip', clientIP)
      .single();

    if (selectError && selectError.code !== 'PGRST116') {
      console.error('Error checking rate limit:', selectError);
      throw selectError;
    }

    let currentRecord: RateLimitRecord;

    if (existingRecord) {
      const resetTimeMs = new Date(existingRecord.reset_time).getTime();
      const nowMs = now.getTime();

      // Если время сброса прошло, обнуляем счетчик
      if (nowMs >= resetTimeMs) {
        const { data: resetRecord, error: resetError } = await supabase
          .from('rate_limits')
          .update({
            count: 1,
            reset_time: resetTime.toISOString()
          })
          .eq('ip', clientIP)
          .select()
          .single();

        if (resetError) {
          console.error('Error resetting rate limit:', resetError);
          throw resetError;
        }

        currentRecord = resetRecord;
      } else {
        // Проверяем, не превышен ли лимит
        if (existingRecord.count >= REQUESTS_PER_WINDOW) {
          const remainingTime = Math.ceil((resetTimeMs - nowMs) / 1000 / 60);
          
          return new Response(
            JSON.stringify({
              error: 'Превышен лимит запросов',
              message: `Слишком много запросов с вашего IP. Попробуйте через ${remainingTime} минут.`,
              retryAfter: remainingTime
            }),
            { 
              status: 429,
              headers: {
                ...corsHeaders,
                'Content-Type': 'application/json',
                'Retry-After': (remainingTime * 60).toString()
              }
            }
          );
        }

        // Увеличиваем счетчик
        const { data: updatedRecord, error: updateError } = await supabase
          .from('rate_limits')
          .update({
            count: existingRecord.count + 1
          })
          .eq('ip', clientIP)
          .select()
          .single();

        if (updateError) {
          console.error('Error updating rate limit:', updateError);
          throw updateError;
        }

        currentRecord = updatedRecord;
      }
    } else {
      // Создаем новую запись для этого IP
      const { data: newRecord, error: insertError } = await supabase
        .from('rate_limits')
        .insert({
          ip: clientIP,
          count: 1,
          reset_time: resetTime.toISOString()
        })
        .select()
        .single();

      if (insertError) {
        console.error('Error creating rate limit record:', insertError);
        throw insertError;
      }

      currentRecord = newRecord;
    }

    console.log(`Rate limit for ${clientIP}: ${currentRecord.count}/${REQUESTS_PER_WINDOW}`);

    // Возвращаем информацию о текущем состоянии лимита
    return new Response(
      JSON.stringify({
        success: true,
        remaining: REQUESTS_PER_WINDOW - currentRecord.count,
        resetTime: currentRecord.reset_time,
        current: currentRecord.count,
        limit: REQUESTS_PER_WINDOW
      }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    );

  } catch (error) {
    console.error('Rate limiter error:', error);
    
    return new Response(
      JSON.stringify({
        error: 'Внутренняя ошибка сервера',
        message: 'Попробуйте позже'
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    );
  }
});