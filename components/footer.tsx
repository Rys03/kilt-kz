import Link from 'next/link';
import { Building2, Facebook, Instagram, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#1A1A2E] text-white mt-8">
      <div className="max-w-[1200px] mx-auto px-4 py-10">
        <div className="grid gap-8 grid-cols-2 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <Building2 className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-extrabold text-white">kilt.kz</span>
            </div>
            <p className="text-white/50 text-xs leading-relaxed">
              Крупнейшая база объявлений о продаже и аренде недвижимости в Казахстане.
              Ваш надёжный помощник в любых операциях с недвижимостью.
            </p>
            <div className="flex gap-3 mt-4">
              <a href="#" className="text-white/40 hover:text-primary transition"><Facebook className="h-4 w-4" /></a>
              <a href="#" className="text-white/40 hover:text-primary transition"><Instagram className="h-4 w-4" /></a>
              <a href="#" className="text-white/40 hover:text-primary transition"><Youtube className="h-4 w-4" /></a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold mb-3">Продажа</h4>
            {['Квартиры','Дома','Участки','Коммерческая','Новостройки'].map((l) => (
              <Link key={l} href="/almaty" className="block text-white/50 text-xs hover:text-white mb-1.5 transition">{l}</Link>
            ))}
          </div>

          <div>
            <h4 className="text-sm font-bold mb-3">Аренда</h4>
            {['Квартиры','Посуточно','Офисы','Склады','Комнаты'].map((l) => (
              <Link key={l} href="/almaty" className="block text-white/50 text-xs hover:text-white mb-1.5 transition">{l}</Link>
            ))}
          </div>

          <div>
            <h4 className="text-sm font-bold mb-3">О сайте</h4>
            {['О проекте','Риелторам','Застройщикам','Правила','Помощь'].map((l) => (
              <a key={l} href="#" className="block text-white/50 text-xs hover:text-white mb-1.5 transition">{l}</a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="max-w-[1200px] mx-auto px-4 py-4 flex justify-between items-center text-[11px] text-white/30">
          <span>© 2026 kilt.kz — Недвижимость Казахстана</span>
          <span>Все права защищены</span>
        </div>
      </div>
    </footer>
  );
}
