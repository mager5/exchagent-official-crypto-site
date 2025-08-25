import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Send, Loader2, CheckCircle } from "lucide-react";
import { sendContactEmail, type ContactFormData } from "@/lib/emailjs";
import { formatPhoneNumber } from "@/lib/phoneUtils";


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
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Пожалуйста, заполните все обязательные поля");
      return;
    }

    setIsLoading(true);

    try {
      const success = await sendContactEmail(formData as ContactFormData);
      
      if (success) {
        setIsSubmitted(true);
        toast.success("Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.");
        
        // Сбрасываем форму через 2 секунды и закрываем модаль
        setTimeout(() => {
          setFormData({ name: "", email: "", phone: "", message: "" });
          setIsSubmitted(false);
          setIsOpen(false);
        }, 2000);
      } else {
        toast.error("Произошла ошибка при отправке. Попробуйте еще раз или свяжитесь с нами по телефону +7 (499) 325-71-45");
      }
    } catch (error) {
      toast.error("Произошла ошибка при отправке. Попробуйте еще раз.");
    } finally {
      setIsLoading(false);
    }
  };

  // Используем утилитную функцию для форматирования телефона

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === 'phone') {
      // Применяем маску для телефона
      const formattedPhone = formatPhoneNumber(value);
      setFormData(prev => ({
        ...prev,
        [name]: formattedPhone
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
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
        {isSubmitted ? (
          <div className="text-center space-y-4 py-8">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto animate-scale-in" />
            <div>
              <h3 className="text-xl font-semibold text-foreground font-heading mb-2">
                Заявка отправлена!
              </h3>
              <p className="text-muted-foreground font-body">
                Мы получили ваше сообщение и свяжемся с вами в ближайшее время.
              </p>
            </div>
          </div>
        ) : (
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
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ContactModal;