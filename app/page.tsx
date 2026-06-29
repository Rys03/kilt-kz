'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase, Listing, CITIES } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Search,
  Shield,
  Clock,
  Building,
  Home,
  Key,
  MapPin,
} from 'lucide-react';
import ListingCard from '@/components/listing-card';

export default function HomePage() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchCity, setSearchCity] = useState('');
  const [searchType, setSearchType] = useState('');

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      const { data, error } = await supabase
        .from('listings')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20);

      if (error) throw error;
      setListings(data || []);
    } catch (error) {
      console.error('Error fetching listings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (searchCity) {
      window.location.href = `/${searchCity.toLowerCase()}${searchType ? `?type=${searchType}` : ''}`;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative hero-gradient text-white">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1920')] bg-cover bg-center opacity-20" />
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Найдите идеальное жилье в Казахстане
            </h1>
            <p className="text-lg md:text-xl mb-10 text-white/90">
              Тысячи объявлений о продаже и аренде недвижимости в одном месте
            </p>

            {/* Search Box */}
            <div className="bg-white rounded-2xl p-4 md:p-6 shadow-2xl max-w-3xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
                    Город
                  </label>
                  <Select value={searchCity} onValueChange={setSearchCity}>
                    <SelectTrigger className="w-full text-gray-900">
                      <SelectValue placeholder="Выберите город" />
                    </SelectTrigger>
                    <SelectContent>
                      {CITIES.map((city) => (
                        <SelectItem key={city} value={city}>
                          {city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
                    Тип сделки
                  </label>
                  <Select value={searchType} onValueChange={setSearchType}>
                    <SelectTrigger className="w-full text-gray-900">
                      <SelectValue placeholder="Любой" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sale">Продажа</SelectItem>
                      <SelectItem value="rent">Аренда</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-end">
                  <Button
                    onClick={handleSearch}
                    className="w-full h-10 text-base font-semibold"
                    disabled={!searchCity}
                  >
                    <Search className="h-4 w-4 mr-2" />
                    Найти
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave decoration */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 100" fill="white" preserveAspectRatio="none" className="w-full h-16">
            <path d="M0,0 C480,100 960,100 1440,0 L1440,100 L0,100 Z" />
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">20+</div>
              <div className="text-muted-foreground">Объявлений</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">10</div>
              <div className="text-muted-foreground">Городов</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">500+</div>
              <div className="text-muted-foreground">Пользователей</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">24/7</div>
              <div className="text-muted-foreground">Поддержка</div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Cities Section */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Популярные города</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Выберите город, чтобы просмотреть актуальные объявления о недвижимости
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {CITIES.map((city) => (
              <Link key={city} href={`/${city.toLowerCase()}`}>
                <Card className="group cursor-pointer hover:shadow-lg transition-shadow overflow-hidden border-0 shadow">
                  <div className="relative h-40 bg-gradient-to-br from-primary/20 to-primary/10">
                    <Building className="absolute bottom-3 right-3 h-12 w-12 text-primary/30 group-hover:text-primary/50 transition-colors" />
                    <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors" />
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      <h3 className="font-semibold group-hover:text-primary transition-colors">
                        {city}
                      </h3>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Listings */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">
                Последние объявления
              </h2>
              <p className="text-muted-foreground">
                Актуальные предложения недвижимости
              </p>
            </div>
            <Button variant="outline" asChild className="hidden md:flex">
              <Link href="/almaty">Смотреть все</Link>
            </Button>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="overflow-hidden border-0 shadow">
                  <div className="aspect-[4/3] bg-slate-200 animate-pulse" />
                  <CardContent className="p-4 space-y-3">
                    <div className="h-5 bg-slate-200 rounded animate-pulse" />
                    <div className="h-4 bg-slate-200 rounded w-2/3 animate-pulse" />
                    <div className="h-4 bg-slate-200 rounded w-1/2 animate-pulse" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : listings.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Объявления не найдены</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {listings.slice(0, 6).map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          )}

          <div className="mt-8 text-center md:hidden">
            <Button variant="outline" asChild>
              <Link href="/almaty">Смотреть все</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Почему kilt.kz?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Мы делаем поиск недвижимости простым и удобным
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Shield className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Проверенные объявления</h3>
              <p className="text-muted-foreground text-sm">
                Каждое объявление проходит модерацию перед публикацией
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Clock className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Актуальные цены</h3>
              <p className="text-muted-foreground text-sm">
                Ежедневное обновление предложений и цен на рынке
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Key className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Полный сервис</h3>
              <p className="text-muted-foreground text-sm">
                Поможем с выбором, оформлением и консультациями
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 hero-gradient text-white">
        <div className="container mx-auto px-4 text-center">
          <Home className="h-12 w-12 mx-auto mb-6 opacity-80" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Готовы разместить объявление?
          </h2>
          <p className="text-white/90 mb-8 max-w-xl mx-auto">
            Продайте или сдайте свою недвижимость быстро и безопасно
          </p>
          <Button size="lg" variant="secondary" asChild className="font-semibold">
            <Link href="/add">Разместить объявление</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
