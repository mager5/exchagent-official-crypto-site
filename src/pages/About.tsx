import { Card, CardContent } from "@/components/ui/card";
import { Users, TrendingUp, MapPin } from "lucide-react";
import officeImage from "@/assets/office-building.jpg";

const About = () => {
  const facts = [
    {
      icon: Users,
      number: "1500+",
      label: "активных клиентов",
      description: "Доверяют нам свои операции с криптовалютой"
    },
    {
      icon: TrendingUp,
      number: "$120 млн+",
      label: "оборота в месяц",
      description: "Общий объём обработанных транзакций"
    },
    {
      icon: MapPin,
      number: "5+",
      label: "офисов и партнёрских точек",
      description: "В РФ и за рубежом для удобства клиентов"
    }
  ];

  return (
    <div className="space-y-20 py-20">
      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl font-heading">
            О компании Exchagent
          </h1>
          <p className="mt-6 text-xl text-muted-foreground max-w-3xl mx-auto font-body">
            Команда специалистов с опытом в банковской сфере, международных расчётах и блокчейн-технологиях
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-foreground font-heading mb-6">
              Мост между криптовалютным и традиционным финансовым рынком
            </h2>
            <div className="space-y-6 text-lg text-muted-foreground font-body">
              <p>
                Exchagent — это команда специалистов с опытом в банковской сфере, 
                международных расчётах и блокчейн-технологиях. Мы создаём мост между 
                криптовалютным и традиционным финансовым рынком, обеспечивая безопасные 
                и прозрачные сделки для наших клиентов.
              </p>
              <p>
                Наша миссия — сделать операции с криптовалютой максимально безопасными, 
                прозрачными и соответствующими всем требованиям российского законодательства. 
                Мы работаем только с проверенными партнёрами и используем передовые технологии 
                для защиты интересов клиентов.
              </p>
              <p>
                Каждая сделка сопровождается полным пакетом документов, включая договор, 
                акт выполненных работ и отчёт о проведённой операции. Это обеспечивает 
                полную юридическую чистоту всех операций.
              </p>
            </div>
          </div>
          
          <div className="relative">
            <img
              src={officeImage}
              alt="Офис компании Exchagent"
              className="rounded-2xl shadow-elegant w-full"
            />
          </div>
        </div>
      </section>

      {/* Company Facts */}
      <section className="bg-muted py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-heading">
              Факты о компании
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto font-body">
              Цифры, которые говорят о нашем профессионализме и надёжности
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {facts.map((fact, index) => (
              <Card key={index} className="shadow-card hover:shadow-elegant transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-8 text-center">
                  <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mb-6">
                    <fact.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-primary font-heading mb-2">
                    {fact.number}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-3 font-heading">
                    {fact.label}
                  </h3>
                  <p className="text-muted-foreground font-body">
                    {fact.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-heading">
            Наши принципы
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-foreground font-heading mb-3">
                Безопасность превыше всего
              </h3>
              <p className="text-muted-foreground font-body">
                Все операции проходят многоуровневую проверку. Мы используем передовые 
                системы KYC и AML для обеспечения максимальной безопасности сделок.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-foreground font-heading mb-3">
                Полная прозрачность
              </h3>
              <p className="text-muted-foreground font-body">
                Каждый клиент получает полный пакет документов по сделке. 
                Никаких скрытых комиссий или дополнительных условий.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-foreground font-heading mb-3">
                Соответствие законодательству
              </h3>
              <p className="text-muted-foreground font-body">
                Все наши операции полностью соответствуют требованиям российского 
                законодательства и международных стандартов.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-foreground font-heading mb-3">
                Персональный подход
              </h3>
              <p className="text-muted-foreground font-body">
                Каждый клиент получает индивидуальные условия и персонального менеджера 
                для сопровождения сделки на всех этапах.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;