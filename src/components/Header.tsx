import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import ContactModal from "@/components/ContactModal";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

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
            <div className="flex items-center space-x-2">
              {navigation.slice(0, 3).map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-2 py-1 rounded-md text-xs font-medium transition-colors hover:text-primary ${
                    isActive(item.href)
                      ? "text-primary bg-accent"
                      : "text-muted-foreground hover:bg-accent"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <ContactModal>
                <Button variant="cta" size="sm" className="text-xs px-3">
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
              className="inline-flex items-center justify-center p-2 rounded-md text-muted-foreground hover:text-primary hover:bg-accent"
              aria-expanded="false"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
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
                  <Button variant="cta" size="sm" className="w-full" onClick={() => setIsMenuOpen(false)}>
                    Оставить заявку
                  </Button>
                </ContactModal>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;