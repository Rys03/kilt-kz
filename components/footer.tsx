import Link from 'next/link';
import { Building2, Phone, Mail, MapPin, Facebook, Instagram, Youtube } from 'lucide-react';
import { CITIES } from '@/lib/supabase';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <Building2 className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold">kilt.kz</span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed">
              Надежная платформа для покупки, продажи и аренды недвижимости в Казахстане.
              Тысячи проверенных объявлений от владельцев и агентств.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Города</h3>
            <ul className="space-y-2">
              {CITIES.slice(0, 5).map((city) => (
                <li key={city}>
                  <Link
                    href={`/${city.toLowerCase()}`}
                    className="text-slate-400 text-sm hover:text-primary transition-colors"
                  >
                    {city}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Города</h3>
            <ul className="space-y-2">
              {CITIES.slice(5).map((city) => (
                <li key={city}>
                  <Link
                    href={`/${city.toLowerCase()}`}
                    className="text-slate-400 text-sm hover:text-primary transition-colors"
                  >
                    {city}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Контакты</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-slate-400 text-sm">
                <Phone className="h-4 w-4" />
                +7 701 234 5678
              </li>
              <li className="flex items-center gap-2 text-slate-400 text-sm">
                <Mail className="h-4 w-4" />
                info@kilt.kz
              </li>
              <li className="flex items-center gap-2 text-slate-400 text-sm">
                <MapPin className="h-4 w-4" />
                Алматы, ул. Абая 150
              </li>
            </ul>

            <div className="flex gap-4 mt-6">
              <a href="#" className="text-slate-400 hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-primary transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-sm">
            © 2024 kilt.kz. Все права защищены.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-slate-400 text-sm hover:text-primary transition-colors">
              Политика конфиденциальности
            </Link>
            <Link href="#" className="text-slate-400 text-sm hover:text-primary transition-colors">
              Условия использования
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
