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

    toast.info("Свяжитесь с нами по телефону +7 (499) 325-71-45 или email office@exchagent.com");
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