import { Link } from "react-router-dom";

const Footer = () => {
  const navigation = [
    { name: "Главная", href: "/" },
    { name: "О компании", href: "/o-kompanii" },
    { name: "Услуги", href: "/uslugi" },
    { name: "Контакты", href: "/kontakty" },
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Company Info */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <img src="/lovable-uploads/922ee334-55f1-48ef-8373-3590a6fa1508.png" alt="Exchagent логотип" className="h-6 w-auto" />
              <span className="font-heading font-bold text-xl">Exchagent</span>
            </div>
            <p className="text-primary-foreground/80 text-sm mb-4">
              Официальный партнёр в покупке и продаже цифровых активов. 
              Договор, прозрачные условия, сопровождение на каждом этапе.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="font-heading font-semibold mb-4">Навигация</h3>
            <ul className="space-y-2">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="text-primary-foreground/80 hover:text-white transition-colors text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-heading font-semibold mb-4">Контакты</h3>
            <div className="space-y-2 text-sm text-primary-foreground/80">
              <p>📧 office@exchagent.com</p>
              <p>📞 +7 (499) 325-71-45</p>
              <p>
                <a 
                  href="https://t.me/Exchagent" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  📱 @Exchagent
                </a>
              </p>
              <p>📍 123317, Россия, Москва<br />Пресненская наб., 12</p>
            </div>
          </div>
        </div>

          <div className="mt-8 pt-8 border-t border-white/20">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-primary-foreground/60 text-sm">
              © 2025 Exchagent. Все права защищены.
            </p>
            <div className="flex flex-col md:flex-row items-center gap-4 mt-4 md:mt-0">
              <a
                href="https://t.me/Exchagent"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-foreground/60 hover:text-white text-sm transition-colors"
              >
                📱 @Exchagent
              </a>
              <Link
                to="/privacy"
                className="text-primary-foreground/60 hover:text-white text-sm transition-colors"
              >
                Политика конфиденциальности
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;