import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import ContactModal from "@/components/ContactModal";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Блокировка прокрутки при открытом бургер-меню
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Очистка при размонтировании компонента
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const navigation = [
    { name: "Главная", href: "/" },
    { name: "О компании", href: "/o-kompanii" },
    { name: "Услуги", href: "/uslugi" },
    { name: "Как это работает", href: "/kak-eto-rabotaet" },
    { name: "Контакты", href: "/kontakty" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Основная навигация">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link 
              to="/" 
              className="flex items-center space-x-3"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = '/';
              }}
            >
              <img src="./lovable-uploads/1c11d7dd-8fdd-4a68-a055-decfd04d4e99.png" alt="Exchagent логотип" className="h-20 w-auto" />
              <span className="font-heading font-bold text-xl text-primary">Exchagent</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md-lg:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors hover:text-primary ${
                    isActive(item.href)
                      ? "text-primary bg-accent"
                      : "text-muted-foreground hover:bg-accent"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Tablet Navigation (768-996px) */}
          <div className="hidden md:block md-lg:hidden">
            <div className="flex items-center justify-center space-x-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-1.5 py-1 rounded-md text-xs font-medium transition-colors hover:text-primary ${
                    isActive(item.href)
                      ? "text-primary bg-accent"
                      : "text-muted-foreground hover:bg-accent"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <ContactModal>
                <Button variant="cta" size="sm" className="text-xs px-2 py-1 ml-1">
                  Заявка
                </Button>
              </ContactModal>
            </div>
          </div>

          {/* CTA Button */}
          <div className="hidden md-lg:block">
            <ContactModal>
              <Button variant="cta" size="sm">
                Оставить заявку
              </Button>
            </ContactModal>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-muted-foreground hover:text-primary hover:bg-accent transition-colors duration-200"
              aria-expanded={isMenuOpen}
            >
              <div className="relative w-6 h-6">
                <Menu 
                  className={`absolute h-6 w-6 transition-all duration-300 ${isMenuOpen ? 'opacity-0 rotate-180' : 'opacity-100 rotate-0'}`} 
                  aria-hidden="true" 
                />
                <X 
                  className={`absolute h-6 w-6 transition-all duration-300 ${isMenuOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-180'}`} 
                  aria-hidden="true" 
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-background border-t border-border">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isActive(item.href)
                      ? "text-primary bg-accent"
                      : "text-muted-foreground hover:text-primary hover:bg-accent"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4">
                <ContactModal>
                  <Button variant="cta" size="lg" className="w-full h-12" onClick={() => setIsMenuOpen(false)}>
                    Оставить заявку
                  </Button>
                </ContactModal>
              </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;