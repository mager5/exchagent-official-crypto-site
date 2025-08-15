import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Shield, Building, Banknote } from "lucide-react";
import ContactModal from "@/components/ContactModal";
import heroImage from "@/assets/hero-crypto-business.jpg";
import digitalFinanceImage from "@/assets/digital-finance.jpg";

const Home = () => {
  const advantages = [
    {
      icon: Shield,
      title: "Официально и по договору",
      description: "Сделки сопровождаются необходимой для Вас документацией.",
    },
    {
      icon: Building,
      title: "Банковские расчёты",
      description: "Приём и отправка платежей на счёт юрлица в РФ.",
    },
    {
      icon: Banknote,
      title: "Инкассация наличных",
      description: "Приём и выдача наличных с KYC, индивидуальный подход.",
    },
  ];

  const stats = [
    { number: "1500+", label: "активных клиентов" },
    { number: "$120 млн+", label: "оборота в месяц" },
    { number: "24/7", label: "поддержка клиентов" },
  ];

  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero">
        <div className="absolute inset-0 bg-black/20" />
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-secondary/80" />
        
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl font-heading">
              Легальные сделки с криптовалютой для бизнеса и частных клиентов
            </h1>
            <p className="mt-6 text-xl text-white/90 font-body">
              Exchagent — официальный партнёр в покупке и продаже цифровых активов. 
              Договор, прозрачные условия, сопровождение на каждом этапе.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <ContactModal>
                <Button variant="hero" size="xl" className="w-full sm:w-auto">
                  Оставить заявку
                </Button>
              </ContactModal>
              <Link to="/kontakty">
                <Button variant="outline" size="xl" className="w-full sm:w-auto border-white text-primary hover:bg-white hover:text-primary">
                  Связаться с нами
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl font-bold text-primary font-heading">
                {stat.number}
              </div>
              <div className="mt-2 text-lg text-muted-foreground font-body">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Advantages Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-heading">
            Наши преимущества
          </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto font-body">
              Мы обеспечиваем безопасность и прозрачность Криптовалютных Операций
            </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {advantages.map((advantage, index) => (
            <Card key={index} className="shadow-card hover:shadow-elegant transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-8 text-center">
                <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mb-6">
                  <advantage.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4 font-heading">
                  {advantage.title}
                </h3>
                <p className="text-muted-foreground font-body">
                  {advantage.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Services Preview */}
      <section className="bg-muted py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-heading mb-6">
                Профессиональные услуги обмена криптовалют
              </h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-secondary mt-1 flex-shrink-0" />
                  <p className="text-muted-foreground font-body">
                    <strong>Покупка криптовалюты</strong> — для юридических и физических лиц с закрывающими документами
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-secondary mt-1 flex-shrink-0" />
                  <p className="text-muted-foreground font-body">
                    <strong>Продажа криптовалюты</strong> — гарантированный перевод средств на ваш расчётный счёт
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-secondary mt-1 flex-shrink-0" />
                  <p className="text-muted-foreground font-body">
                    <strong>Инкассация наличных</strong> — приём и выдача крупных сумм с KYC и подтверждением происхождения средств
                  </p>
                </div>
              </div>
              <div className="mt-8">
                <Link to="/uslugi">
                  <Button variant="cta" size="lg">
                    Узнать больше об услугах
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <img
                src={digitalFinanceImage}
                alt="Цифровые финансовые технологии и блокчейн"
                className="rounded-2xl shadow-elegant w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-hero text-white">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-heading mb-6">
            Свяжитесь с нами для обсуждения условий сотрудничества.
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <ContactModal>
              <Button variant="hero" size="xl" className="bg-white text-primary hover:bg-white/90">
                Получить консультацию
              </Button>
            </ContactModal>
            <Link to="/kak-eto-rabotaet">
              <Button variant="outline" size="xl" className="border-white text-primary hover:bg-white hover:text-primary">
                Как это работает
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;