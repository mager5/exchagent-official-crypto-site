import { serve } from "https://deno.land/std@0.190.0/http/server.ts"

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY")

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
}

interface ContactFormData {
  name: string
  email: string
  phone?: string
  message: string
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders })
  }

  try {
    console.log("Received request method:", req.method);
    console.log("RESEND_API_KEY exists:", !!RESEND_API_KEY);
    
    const formData: ContactFormData = await req.json()
    console.log("Received form data:", formData);
    
    if (!formData.name || !formData.email || !formData.message) {
      console.log("Validation failed: missing required fields");
      return new Response(
        JSON.stringify({ error: "Заполните все обязательные поля" }),
        { 
          status: 400, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      )
    }

    if (!RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not set");
      return new Response(
        JSON.stringify({ error: "Server configuration error" }),
        { 
          status: 500, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      )
    }

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
          Новая заявка с сайта Exchagent
        </h2>
        
        <div style="background: #f8f9fa; padding: 20px; margin: 20px 0; border-radius: 8px;">
          <h3 style="color: #333; margin-top: 0;">Контактная информация</h3>
          <p><strong>Имя:</strong> ${formData.name}</p>
          <p><strong>Email:</strong> ${formData.email}</p>
          ${formData.phone ? `<p><strong>Телефон:</strong> ${formData.phone}</p>` : ''}
        </div>
        
        <div style="background: #fff; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
          <h3 style="color: #333; margin-top: 0;">Сообщение</h3>
          <p style="white-space: pre-wrap;">${formData.message}</p>
        </div>
        
        <div style="margin-top: 20px; padding: 15px; background: #e9ecef; border-radius: 8px; font-size: 12px; color: #666;">
          <p>Дата отправки: ${new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' })}</p>
          <p>IP адрес: ${req.headers.get('x-forwarded-for') || 'Не определен'}</p>
        </div>
      </div>
    `

    const emailData = {
      from: "onboarding@resend.dev",
      to: ["info@exchagent.com"],
      bcc: [formData.email], // Копия отправителю для проверки
      subject: `Новая заявка от ${formData.name}`,
      html: emailHtml,
      reply_to: formData.email,
    }

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify(emailData),
    })

    if (!response.ok) {
      const error = await response.text()
      console.error("Resend API error:", error)
      throw new Error("Failed to send email")
    }

    const result = await response.json()
    console.log("Email sent successfully:", result)

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Заявка успешно отправлена! Мы свяжемся с вами в течение 2 часов.",
        resendId: result.id, // ID письма для отслеживания
        debug: { 
          to: emailData.to, 
          bcc: emailData.bcc,
          resendResponse: result 
        }
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    )
  } catch (error) {
    console.error("Error in send-email function:", error)
    return new Response(
      JSON.stringify({ 
        error: "Произошла ошибка при отправке заявки. Попробуйте еще раз или свяжитесь с нами по телефону." 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    )
  }
})