import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowRight, Bitcoin, DollarSign, Banknote } from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: Bitcoin,
      title: "Покупка криптовалюты",
      description: "Для юридических и физических лиц с официальным договором на каждую сделку",
      features: [
        "Договор на каждую сделку",
        "Оплата на расчётный счёт компании",
        "Возможность фиксации курса",
        "Работа с любыми объёмами"
      ],
      cta: "Оставить заявку на покупку"
    },
    {
      icon: DollarSign,
      title: "Продажа криптовалюты",
      description: "Перевод средств на ваш расчётный счёт с гарантией прозрачности через договор",
      features: [
        "Перевод на расчётный счёт",
        "Гарантия прозрачности через договор",
        "Быстрая обработка заявок",
        "Конкурентные курсы обмена"
      ],
      cta: "Продать криптовалюту"
    },
    {
      icon: Banknote,
      title: "Инкассация наличных",
      description: "Приём и выдача крупных сумм с KYC и подтверждением происхождения средств",
      features: [
        "Приём и выдача крупных сумм",
        "KYC (идентификация клиента)",
        "Подтверждение происхождения средств",
        "Защита интересов клиента"
      ],
      cta: "Запросить условия"
    }
  ];

  const cryptoTypes = [
    "Bitcoin (BTC)",
    "Ethereum (ETH)",
    "Tether USD (USDT)",
    "USD Coin (USDC)",
    "Binance Coin (BNB)",
    "Другие популярные криптовалюты"
  ];

  return (
    <div className="space-y-20 py-20">
      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl font-heading">
            Услуги Exchagent
          </h1>
          <p className="mt-6 text-xl text-muted-foreground max-w-3xl mx-auto font-body">
            Легальные услуги по покупке, продаже и инкассации криптовалюты для юрлиц и физлиц. 
            Официальные сделки с документами.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {services.map((service, index) => (
            <Card key={index} className="shadow-card hover:shadow-elegant transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mb-4">
                  <service.icon className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl font-heading">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-muted-foreground font-body text-center">
                  {service.description}
                </p>
                
                <div className="space-y-3">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-secondary rounded-full flex-shrink-0" />
                      <span className="text-sm text-muted-foreground font-body">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                <Link to="/kontakty" className="block">
                  <Button variant="cta" className="w-full group">
                    {service.cta}
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Supported Cryptocurrencies */}
      <section className="bg-muted py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-heading">
              Поддерживаемые криптовалюты
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto font-body">
              Мы работаем с основными криптовалютами и готовы обсудить операции с другими цифровыми активами
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {cryptoTypes.map((crypto, index) => (
              <div key={index} className="bg-background rounded-lg p-4 text-center shadow-card">
                <span className="font-body text-foreground">{crypto}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Overview */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-heading">
            Простой и безопасный процесс
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto font-body">
            Все операции проходят в несколько простых шагов с полным юридическим сопровождением
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { step: "1", title: "Заявка", description: "Отправляете запрос через сайт или по почте" },
            { step: "2", title: "Договор", description: "Согласовываем условия и подписываем документы" },
            { step: "3", title: "KYC", description: "Проводим идентификацию клиента и проверку средств" },
            { step: "4", title: "Сделка", description: "Осуществляем обмен и предоставляем отчётность" }
          ].map((item, index) => (
            <div key={index} className="text-center">
              <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-4">
                {item.step}
              </div>
              <h3 className="text-lg font-semibold text-foreground font-heading mb-2">
                {item.title}
              </h3>
              <p className="text-muted-foreground font-body text-sm">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/kak-eto-rabotaet">
            <Button variant="outline" size="lg">
              Подробнее о том, как это работает
            </Button>
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-hero text-white">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-heading mb-6">
            Готовы обсудить вашу сделку?
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-10 font-body">
            Наши эксперты проконсультируют вас по всем вопросам и подберут оптимальные условия
          </p>
          <Link to="/kontakty">
            <Button variant="hero" size="xl" className="bg-white text-primary hover:bg-white/90">
              Получить консультацию
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Services;