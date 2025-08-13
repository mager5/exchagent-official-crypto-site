import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, FileText, Shield, Users } from "lucide-react";

const Documents = () => {
  const documents = [
    {
      icon: FileText,
      title: "Договор купли-продажи криптовалюты",
      description: "Стандартный договор для операций покупки и продажи цифровых активов",
      format: "PDF",
      pages: "3 страницы"
    },
    {
      icon: Users,
      title: "Агентский договор",
      description: "Договор агентских услуг для комплексного обслуживания операций с криптовалютой",
      format: "PDF", 
      pages: "4 страницы"
    },
    {
      icon: Shield,
      title: "Политика KYC и AML",
      description: "Документ о процедурах идентификации клиентов и противодействия отмыванию денег",
      format: "PDF",
      pages: "8 страниц"
    }
  ];

  const legalInfo = [
    {
      title: "Регистрационные данные",
      content: [
        "ОГРН: 1234567890123",
        "ИНН: 7701234567",
        "КПП: 770101001",
        "ОКВЭД: 64.99 - Прочая финансовая деятельность"
      ]
    },
    {
      title: "Юридический адрес",
      content: [
        "123317, Россия, г. Москва",
        "Пресненская наб., дом 12",
        "Этаж 7, офис 701"
      ]
    },
    {
      title: "Банковские реквизиты",
      content: [
        "Р/с: 40702810000000000000",
        "Банк: ПАО «Сбербанк России»",
        "К/с: 30101810400000000225",
        "БИК: 044525225"
      ]
    }
  ];

  return (
    <div className="space-y-20 py-20">
      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl font-heading">
            Документы и договоры
          </h1>
          <p className="mt-6 text-xl text-muted-foreground max-w-3xl mx-auto font-body">
            Скачайте примеры договоров и политику KYC/AML для сделок с криптовалютой от компании Exchagent
          </p>
        </div>
      </section>

      {/* Documents Grid */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {documents.map((doc, index) => (
            <Card key={index} className="shadow-card hover:shadow-elegant transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mb-4">
                  <doc.icon className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-lg font-heading">
                  {doc.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground font-body text-sm text-center">
                  {doc.description}
                </p>
                
                <div className="flex justify-between text-sm text-muted-foreground font-body">
                  <span>Формат: {doc.format}</span>
                  <span>{doc.pages}</span>
                </div>

                <Button variant="outline" className="w-full group">
                  <Download className="h-4 w-4 mr-2 group-hover:translate-y-0.5 transition-transform" />
                  Скачать документ
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Legal Information */}
      <section className="bg-muted py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-heading">
              Юридическая информация
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto font-body">
              Полная информация о компании для заключения договоров и ведения документооборота
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {legalInfo.map((info, index) => (
              <Card key={index} className="shadow-card">
                <CardHeader>
                  <CardTitle className="text-lg font-heading text-center">
                    {info.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {info.content.map((item, itemIndex) => (
                      <p key={itemIndex} className="text-muted-foreground font-body text-sm">
                        {item}
                      </p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-hero rounded-2xl p-8 lg:p-12 text-white">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-heading mb-6">
                Соответствие требованиям законодательства
              </h2>
              <p className="text-xl text-white/90 mb-6 font-body">
                Все документы и процедуры разработаны в соответствии с требованиями 
                российского законодательства и международными стандартами
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Shield className="h-6 w-6 text-white flex-shrink-0 mt-1" />
                  <p className="text-white/90 font-body">
                    <strong>ФЗ-115</strong> — О противодействии легализации доходов, полученных преступным путём
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <FileText className="h-6 w-6 text-white flex-shrink-0 mt-1" />
                  <p className="text-white/90 font-body">
                    <strong>НК РФ</strong> — Налоговое законодательство для операций с цифровыми активами
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <Users className="h-6 w-6 text-white flex-shrink-0 mt-1" />
                  <p className="text-white/90 font-body">
                    <strong>FATF</strong> — Международные стандарты борьбы с отмыванием денег
                  </p>
                </div>
              </div>
            </div>
            
            <div className="text-center lg:text-right">
              <div className="inline-block bg-white/10 rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-4 font-heading">
                  Полный пакет документов
                </h3>
                <p className="text-white/90 mb-6 font-body">
                  Каждая сделка сопровождается всеми необходимыми документами 
                  для налоговой и банковской отчётности
                </p>
                <Button variant="hero" className="bg-white text-primary hover:bg-white/90">
                  Получить консультацию
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Document Request */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-heading mb-6">
          Нужна индивидуальная документация?
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 font-body">
          Мы подготовим документы с учётом специфики вашей деятельности и требований
        </p>
        <Button variant="cta" size="xl">
          Заказать индивидуальные документы
        </Button>
      </section>
    </div>
  );
};

export default Documents;