'use client';

import Link from 'next/link';
import { Building2, Menu, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useState } from 'react';

const navigation = [
  { name: 'Главная', href: '/' },
  { name: 'Калькулятор', href: '/calculator' },
  { name: 'Добавить объявление', href: '/add' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Building2 className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-primary">kilt.kz</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <a
              href="tel:+77012345678"
              className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              <Phone className="h-4 w-4" />
              +7 701 234 5678
            </a>
            <Button asChild>
              <Link href="/add">Разместить объявление</Link>
            </Button>
          </div>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4 mt-8">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="text-lg font-medium text-foreground transition-colors hover:text-primary"
                  >
                    {item.name}
                  </Link>
                ))}
                <hr className="my-4" />
                <a
                  href="tel:+77012345678"
                  className="flex items-center gap-2 text-sm font-medium text-muted-foreground"
                >
                  <Phone className="h-4 w-4" />
                  +7 701 234 5678
                </a>
                <Button asChild className="mt-4">
                  <Link href="/add" onClick={() => setOpen(false)}>
                    Разместить объявление
                  </Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
