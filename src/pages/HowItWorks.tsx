import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { FileText, Shield, CheckCircle, ArrowRight, Users, Clock, Building } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Заявка",
      description: "Отправляете запрос через сайт или по электронной почте office@exchagent.com",
      details: [
        "Указываете тип операции (покупка/продажа)",
        "Сумму и желаемую криптовалюту",
        "Контактные данные для связи"
      ],
      icon: FileText
    },
    {
      number: "02", 
      title: "Договор",
      description: "Согласовываем условия и подписываем договор электронно или на бумаге",
      details: [
        "Обсуждаем курс и условия сделки",
        "Подготавливаем договор купли-продажи",
        "Подписываем документы удобным способом"
      ],
      icon: Building
    },
    {
      number: "03",
      title: "KYC",
      description: "Проводим идентификацию клиента и проверку источника средств",
      details: [
        "Верификация личности или юрлица",
        "Проверка источника средств",
        "Соблюдение требований AML"
      ],
      icon: Shield
    },
    {
      number: "04",
      title: "Сделка",
      description: "Осуществляем приём/выдачу средств или криптовалюты согласно договору",
      details: [
        "Проводим операцию обмена",
        "Контролируем все этапы процесса",
        "Обеспечиваем безопасность сделки"
      ],
      icon: Users
    },
    {
      number: "05",
      title: "Закрывающие документы",
      description: "Предоставляем акт, отчёт и подтверждение успешно завершённой сделки",
      details: [
        "Акт выполненных работ",
        "Отчёт о проведённой операции",
        "Справки для налоговой отчётности"
      ],
      icon: CheckCircle
    }
  ];

  const advantages = [
    {
      icon: Clock,
      title: "Быстрая обработка",
      description: "Среднее время обработки заявки — 2 часа в рабочее время"
    },
    {
      icon: Shield,
      title: "Полная безопасность",
      description: "Многоуровневая система защиты и проверки всех операций"
    },
    {
      icon: FileText,
      title: "Юридическая чистота",
      description: "Полный пакет документов для налоговой и банковской отчётности"
    }
  ];

  return (
    <div className="space-y-20 py-20">
      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl font-heading">
            Как это работает
          </h1>
          <p className="mt-6 text-xl text-muted-foreground max-w-3xl mx-auto font-body">
            Процесс обмена криптовалюты с Exchagent: от подачи заявки до завершения безопасной сделки 
            с полным соблюдением законов РФ
          </p>
        </div>
      </section>

      {/* Process Steps */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-12">
          {steps.map((step, index) => (
            <div key={index} className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className={`order-2 ${index % 2 === 1 ? 'lg:order-1' : 'lg:order-2'}`}>
                <Card className="shadow-card hover:shadow-elegant transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {step.number}
                      </div>
                      <div className="w-12 h-12 bg-gradient-secondary rounded-full flex items-center justify-center">
                        <step.icon className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-foreground font-heading mb-4">
                      {step.title}
                    </h3>
                    
                    <p className="text-lg text-muted-foreground font-body mb-6">
                      {step.description}
                    </p>
                    
                    <div className="space-y-3">
                      {step.details.map((detail, detailIndex) => (
                        <div key={detailIndex} className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-secondary rounded-full flex-shrink-0 mt-2" />
                          <span className="text-muted-foreground font-body">
                            {detail}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className={`order-1 ${index % 2 === 1 ? 'lg:order-2' : 'lg:order-1'} text-center`}>
                <div className="w-24 h-24 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-white font-bold text-3xl font-heading">
                    {step.number}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <ArrowRight className="h-8 w-8 text-muted-foreground mx-auto lg:hidden" />
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Advantages */}
      <section className="bg-muted py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-heading">
              Преимущества нашего подхода
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto font-body">
              Мы создали процесс, который обеспечивает максимальную безопасность и комфорт для клиентов
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
        </div>
      </section>

      {/* Legal Compliance */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-hero rounded-2xl p-8 lg:p-12 text-white">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-heading mb-6">
              Полное соответствие законодательству РФ
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8 font-body">
              Все наши операции проводятся в строгом соответствии с требованиями российского 
              законодательства и международными стандартами AML/KYC
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 text-left">
              <div>
                <h3 className="text-xl font-semibold mb-4 font-heading">
                  Документооборот
                </h3>
                <ul className="space-y-2 text-white/90 font-body">
                  <li>• Договор купли-продажи криптовалюты</li>
                  <li>• Акт выполненных работ</li>
                  <li>• Справка о проведённой операции</li>
                  <li>• Документы для налоговой отчётности</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4 font-heading">
                  Соблюдение требований
                </h3>
                <ul className="space-y-2 text-white/90 font-body">
                  <li>• Идентификация клиентов (KYC)</li>
                  <li>• Проверка источника средств</li>
                  <li>• Соблюдение лимитов по ФЗ-115</li>
                  <li>• Уведомление контролирующих органов</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-heading mb-6">
          Готовы начать?
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 font-body">
          Отправьте заявку, и мы свяжемся с вами в течение 2 часов для обсуждения условий сделки
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/kontakty">
            <Button variant="cta" size="xl">
              Отправить заявку
            </Button>
          </Link>
          <Link to="/uslugi">
            <Button variant="outline" size="xl">
              Посмотреть услуги
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;