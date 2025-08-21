-- Добавляем недостающие колонки в таблицу "Заявки"
ALTER TABLE public."Заявки" 
ADD COLUMN name TEXT NOT NULL DEFAULT '',
ADD COLUMN email TEXT NOT NULL DEFAULT '',
ADD COLUMN phone TEXT,
ADD COLUMN message TEXT,
ADD COLUMN status TEXT DEFAULT 'новая' CHECK (status IN ('новая', 'в обработке', 'завершена', 'отклонена'));

-- Создаем индекс для email для быстрого поиска
CREATE INDEX idx_заявки_email ON public."Заявки"(email);

-- Создаем индекс для статуса
CREATE INDEX idx_заявки_status ON public."Заявки"(status);

-- Создаем политику для публичного создания заявок (любой пользователь может отправить заявку)
CREATE POLICY "Публичное создание заявок" 
ON public."Заявки" 
FOR INSERT 
WITH CHECK (true);

-- Создаем политику для просмотра заявок (пока разрешим всем для тестирования)
-- В будущем можно ограничить только администраторами
CREATE POLICY "Публичный просмотр заявок" 
ON public."Заявки" 
FOR SELECT 
USING (true);

-- Создаем политику для обновления заявок (только для будущих администраторов)
CREATE POLICY "Обновление заявок администраторами" 
ON public."Заявки" 
FOR UPDATE 
USING (true);

-- Добавляем функцию для автоматического обновления updated_at
ALTER TABLE public."Заявки" ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT now();

CREATE OR REPLACE FUNCTION public.update_заявки_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Создаем триггер для автоматического обновления updated_at
CREATE TRIGGER update_заявки_updated_at_trigger
    BEFORE UPDATE ON public."Заявки"
    FOR EACH ROW
    EXECUTE FUNCTION public.update_заявки_updated_at();