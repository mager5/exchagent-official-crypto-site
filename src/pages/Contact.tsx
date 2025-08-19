import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Mail, Phone, MapPin, Clock, Send, Loader2 } from "lucide-react";


const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      details: "office@exchagent.com",
      description: "Отправьте заявку на официальную почту"
    },
    {
      icon: Phone,
      title: "Телефон",
      details: "+7 (499) 325-71-45",
      description: "Звоните в рабочее время для консультаций"
    },
    {
      icon: MapPin,
      title: "Адрес офиса",
      details: "123317, Россия, Москва, Пресненская наб., 12",
      description: "Офис находится в Москва-Сити"
    },
    {
      icon: Clock,
      title: "Время работы",
      details: "Пн-Пт: 9:00-18:00 МСК",
      description: "Заявки обрабатываем в течение 2 часов"
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Пожалуйста, заполните все обязательные поля");
      return;
    }

    setIsLoading(true);

    try {
      console.log("Sending form data via FormSubmit:", formData);
      const response = await fetch("https://formsubmit.co/ajax/info@exchagent.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          ...formData,
          _subject: `Новая заявка от ${formData.name} (сайт Exchagent)`,
          _replyto: formData.email
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`FormSubmit error: ${errorText}`);
      }
      const result = await response.json();
      console.log("FormSubmit response:", result);
      if (!result.success) {
        throw new Error("Не удалось отправить заявку. Повторите попытку позже.");
      }

      toast.success("Ваша заявка отправлена! Мы свяжемся с вами в течение 2 часов.");
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: ""
      });
    } catch (error) {
      console.error("Error sending via AJAX, falling back to native POST:", error);
      try {
        const form = document.createElement('form');
        form.action = 'https://formsubmit.co/info@exchagent.com';
        form.method = 'POST';
        form.target = '_self';
        const add = (name: string, value: string) => {
          const input = document.createElement('input');
          input.type = 'hidden';
          input.name = name;
          input.value = value;
          form.appendChild(input);
        };
        add('name', formData.name);
        add('email', formData.email);
        add('phone', formData.phone);
        add('message', formData.message);
        add('_subject', `Новая заявка от ${formData.name} (сайт Exchagent)`);
        add('_replyto', formData.email);
        add('_captcha', 'false');
        add('_next', window.location.origin + '/kontakty?sent=1');
        document.body.appendChild(form);
        form.submit();
        toast.info('Мы открыли страницу отправки. Подтвердите письмо от FormSubmit для активации доставки.');
      } catch (fallbackErr) {
        console.error('Fallback form submit failed:', fallbackErr);
        toast.error('Не удалось отправить заявку. Напишите на office@exchagent.com или позвоните.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="space-y-20 py-20">
      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl font-heading">
            Контакты Exchagent
          </h1>
          <p className="mt-6 text-xl text-muted-foreground max-w-3xl mx-auto font-body">
            Свяжитесь с нами для обсуждения условий сделки. Ответим на все вопросы 
            об официальном обмене криптовалют в России.
          </p>
        </div>
      </section>

      {/* Contact Info Grid */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {contactInfo.map((info, index) => (
            <Card key={index} className="shadow-card hover:shadow-elegant transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mb-4">
                  <info.icon className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-lg font-heading">
                  {info.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-2">
                <p className="font-semibold text-foreground font-body">
                  {info.details}
                </p>
                <p className="text-sm text-muted-foreground font-body">
                  {info.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle className="text-2xl font-heading">
                  Форма обратной связи
                </CardTitle>
                <p className="text-muted-foreground font-body">
                  Оставьте заявку, и мы свяжемся с вами в течение 2 часов в рабочее время
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Имя *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Ваше полное имя"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Телефон</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+7 (999) 123-45-67"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Сообщение *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Опишите ваш запрос: тип операции, сумму, желаемую криптовалюту..."
                      rows={5}
                      required
                    />
                  </div>

                  <Button type="submit" variant="cta" size="lg" className="w-full group" disabled={isLoading}>
                    {isLoading ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4 mr-2 group-hover:translate-x-1 transition-transform" />
                    )}
                    {isLoading ? "Отправляем..." : "Отправить заявку"}
                  </Button>

                  <p className="text-sm text-muted-foreground font-body text-center">
                    Нажимая кнопку, вы соглашаетесь с{" "}
                    <a href="/privacy" className="text-primary hover:underline">
                      политикой конфиденциальности
                    </a>
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Additional Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-foreground font-heading mb-6">
                Мы всегда готовы помочь
              </h2>
              <p className="text-muted-foreground font-body mb-6">
                Наша команда специалистов готова обсудить условия сделки и ответить 
                на все ваши вопросы об операциях с криптовалютой.
              </p>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-foreground font-heading mb-2">
                    Для юридических лиц
                  </h3>
                  <p className="text-muted-foreground font-body text-sm">
                    Подготовьте информацию о компании: ОГРН, ИНН, банковские реквизиты, 
                    объём планируемых операций.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-foreground font-heading mb-2">
                    Для физических лиц
                  </h3>
                  <p className="text-muted-foreground font-body text-sm">
                    Будьте готовы пройти процедуру KYC (идентификация личности) 
                    и подтвердить источник средств.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-foreground font-heading mb-2">
                    Время ответа
                  </h3>
                  <p className="text-muted-foreground font-body text-sm">
                    Мы отвечаем на заявки в течение 2 часов в рабочее время. 
                    Сложные вопросы требуют дополнительного времени для подготовки ответа.
                  </p>
                </div>
              </div>
            </div>

            {/* Alternative Contacts */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-lg font-heading">
                  Альтернативные способы связи
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-foreground font-body mb-2">
                    🌐 Официальный сайт
                  </h4>
                  <p className="text-muted-foreground font-body text-sm">
                    exchagent.com
                  </p>
                </div>
                
                <div>
                  <a 
                    href="https://t.me/exchagent" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block hover:bg-accent/50 rounded-lg p-2 transition-colors"
                  >
                    <h4 className="font-semibold text-foreground font-body mb-2">
                      📱 Telegram
                    </h4>
                    <p className="text-muted-foreground font-body text-sm">
                      @exchagent
                    </p>
                  </a>
                </div>
                
                <div>
                  <h4 className="font-semibold text-foreground font-body mb-2">
                    📧 Email для партнёров
                  </h4>
                  <p className="text-muted-foreground font-body text-sm">
                    office@exchagent.com
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-hero text-white">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-heading mb-6">
            Начните работу с Exchagent уже сегодня
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-10 font-body">
            Получите персональную консультацию и узнайте актуальные условия для ваших операций
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="mailto:office@exchagent.com">
              <Button variant="hero" size="xl" className="bg-white text-primary hover:bg-white/90">
                Написать на почту
              </Button>
            </a>
            <a href="tel:+74993257145">
              <Button variant="outline" size="xl" className="border-white text-primary hover:bg-white hover:text-primary">
                Позвонить сейчас
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;