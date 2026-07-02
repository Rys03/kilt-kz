'use client';

import Link from 'next/link';
import { Building2, Menu, Phone, Search, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useState } from 'react';

const saleLinks = [
  { name: 'Квартиры', href: '/almaty?type=sale' },
  { name: 'Дома и дачи', href: '/almaty?type=sale' },
  { name: 'Участки', href: '/almaty?type=sale' },
  { name: 'Коммерческая', href: '/almaty?type=sale' },
];

const rentLinks = [
  { name: 'Квартиры (долгосрочно)', href: '/almaty?type=rent' },
  { name: 'Посуточно', href: '/almaty?type=rent' },
  { name: 'Комнаты', href: '/almaty?type=rent' },
  { name: 'Офисы', href: '/almaty?type=rent' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top bar */}
      <div className="bg-white border-b-2 border-primary shadow-sm">
        <div className="max-w-[1200px] mx-auto px-4 h-[60px] flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Building2 className="h-5 w-5 text-white" />
            </div>
            <div>
              <span className="text-xl font-extrabold text-primary leading-none">kilt.kz</span>
              <span className="block text-[10px] text-muted-foreground leading-none mt-0.5">Недвижимость Казахстана</span>
            </div>
          </Link>

          <div className="hidden md:flex flex-1 max-w-md relative">
            <input
              type="text"
              placeholder="Поиск по объявлениям, адресу, ЖК..."
              className="w-full pl-4 pr-10 py-2 border border-border rounded-full text-sm outline-none bg-muted focus:border-primary focus:bg-white transition"
            />
            <button className="absolute right-1 top-1/2 -translate-y-1/2 bg-primary rounded-full w-7 h-7 flex items-center justify-center text-white">
              <Search className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="hidden md:flex items-center gap-2">
            <button className="flex items-center gap-1.5 px-3 py-1.5 border border-border rounded-full text-sm hover:border-primary hover:text-primary transition">
              <Heart className="h-3.5 w-3.5" />
              Избранное
            </button>
            <button className="px-3 py-1.5 border border-border rounded-full text-sm hover:border-primary hover:text-primary transition">
              Войти
            </button>
            <Button asChild size="sm" className="rounded-full font-semibold">
              <Link href="/add">+ Подать объявление</Link>
            </Button>
          </div>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              <nav className="flex flex-col gap-4 mt-8">
                <Link href="/" onClick={() => setOpen(false)} className="font-medium hover:text-primary">Главная</Link>
                <Link href="/almaty?type=sale" onClick={() => setOpen(false)} className="font-medium hover:text-primary">Продажа</Link>
                <Link href="/almaty?type=rent" onClick={() => setOpen(false)} className="font-medium hover:text-primary">Аренда</Link>
                <Link href="/calculator" onClick={() => setOpen(false)} className="font-medium hover:text-primary">Калькулятор</Link>
                <hr />
                <Button asChild onClick={() => setOpen(false)}>
                  <Link href="/add">+ Подать объявление</Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Nav bar */}
      <div className="bg-white border-b border-border hidden md:block">
        <div className="max-w-[1200px] mx-auto px-4 flex overflow-x-auto scrollbar-none">

          <div className="group relative">
            <button className="px-4 py-2.5 text-sm font-semibold text-primary border-b-2 border-primary flex items-center gap-1 whitespace-nowrap">
              Продажа ▾
            </button>
            <div className="hidden group-hover:block absolute top-full left-0 bg-white border border-border rounded-lg shadow-lg z-50 min-w-[180px] py-2">
              {saleLinks.map((l) => (
                <Link key={l.name} href={l.href} className="block px-4 py-2 text-sm hover:bg-red-50 hover:text-primary">{l.name}</Link>
              ))}
            </div>
          </div>

          <div className="group relative">
            <button className="px-4 py-2.5 text-sm font-semibold text-foreground hover:text-primary border-b-2 border-transparent hover:border-primary flex items-center gap-1 whitespace-nowrap transition">
              Аренда ▾
            </button>
            <div className="hidden group-hover:block absolute top-full left-0 bg-white border border-border rounded-lg shadow-lg z-50 min-w-[200px] py-2">
              {rentLinks.map((l) => (
                <Link key={l.name} href={l.href} className="block px-4 py-2 text-sm hover:bg-red-50 hover:text-primary">{l.name}</Link>
              ))}
            </div>
          </div>

          <Link href="/almaty" className="px-4 py-2.5 text-sm font-semibold text-foreground hover:text-primary border-b-2 border-transparent hover:border-primary whitespace-nowrap transition">
            Новостройки
          </Link>
          <Link href="/mortgage" className="px-4 py-2.5 text-sm font-semibold text-foreground hover:text-primary border-b-2 border-transparent hover:border-primary whitespace-nowrap transition">
            Ипотека
          </Link>
          <Link href="/calculator" className="px-4 py-2.5 text-sm font-semibold text-foreground hover:text-primary border-b-2 border-transparent hover:border-primary whitespace-nowrap transition">
            Калькулятор
          </Link>
          <Link href="/" className="px-4 py-2.5 text-sm font-semibold text-foreground hover:text-primary border-b-2 border-transparent hover:border-primary whitespace-nowrap transition">
            Аналитика цен
          </Link>
        </div>
      </div>
    </header>
  );
}
