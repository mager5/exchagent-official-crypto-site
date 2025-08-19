import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Send, Loader2 } from "lucide-react";


interface ContactModalProps {
  children: React.ReactNode;
}

const ContactModal = ({ children }: ContactModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
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
      
      // Reset form and close modal
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: ""
      });
      setIsOpen(false);
    } catch (error: any) {
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
      } catch (fallbackErr: any) {
        console.error('Fallback form submit failed:', fallbackErr);
        const message = fallbackErr?.message || 'Произошла ошибка при отправке заявки. Попробуйте позже или свяжитесь с нами по телефону.';
        toast.error(message);
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
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-heading">
            Оставить заявку
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="modal-name">Имя *</Label>
            <Input
              id="modal-name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Ваше полное имя"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="modal-email">Email *</Label>
            <Input
              id="modal-email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="your.email@example.com"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="modal-phone">Телефон</Label>
            <Input
              id="modal-phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="+7 (999) 123-45-67"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="modal-message">Сообщение *</Label>
            <Textarea
              id="modal-message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Опишите ваш запрос: тип операции, сумму, желаемую криптовалюту..."
              rows={4}
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
      </DialogContent>
    </Dialog>
  );
};

export default ContactModal;