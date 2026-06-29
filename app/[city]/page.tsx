'use client';

import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { supabase, Listing, CITIES, getCityFromSlug } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  MapPin,
  SlidersHorizontal,
  X,
} from 'lucide-react';
import ListingCard from '@/components/listing-card';

export default function CityPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const citySlug = params.city as string;
  const city = getCityFromSlug(citySlug);

  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  const [type, setType] = useState<string>(searchParams.get('type') || 'all');
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [rooms, setRooms] = useState<string>('all');
  const [hasParking, setHasParking] = useState(false);
  const [hasElevator, setHasElevator] = useState(false);

  useEffect(() => {
    fetchListings();
  }, [city, type, minPrice, maxPrice, rooms, hasParking, hasElevator]);

  const fetchListings = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('listings')
        .select('*', { count: 'exact' })
        .eq('city', city)
        .eq('status', 'active');

      if (type && type !== 'all') {
        query = query.eq('type', type);
      }

      if (minPrice) {
        query = query.gte('price', parseInt(minPrice));
      }

      if (maxPrice) {
        query = query.lte('price', parseInt(maxPrice));
      }

      if (rooms && rooms !== 'all') {
        query = query.eq('rooms', parseInt(rooms));
      }

      if (hasParking) {
        query = query.eq('has_parking', true);
      }

      if (hasElevator) {
        query = query.eq('has_elevator', true);
      }

      const { data, error, count } = await query.order('created_at', { ascending: false });

      if (error) throw error;
      setListings(data || []);
      setTotalCount(count || 0);
    } catch (error) {
      console.error('Error fetching listings:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetFilters = () => {
    setType('all');
    setMinPrice('');
    setMaxPrice('');
    setRooms('all');
    setHasParking(false);
    setHasElevator(false);
  };

  const FiltersContent = () => (
    <div className="space-y-6">
      <div>
        <h2 className="font-semibold text-lg mb-4">Фильтры</h2>
        <p className="text-muted-foreground text-sm">
          Найдено: {totalCount} объявлений
        </p>
      </div>

      <Separator />

      <div>
        <Label className="text-sm font-medium mb-3 block">Тип сделки</Label>
        <Select value={type} onValueChange={setType}>
          <SelectTrigger>
            <SelectValue placeholder="Все типы" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Все типы</SelectItem>
            <SelectItem value="sale">Продажа</SelectItem>
            <SelectItem value="rent">Аренда</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="text-sm font-medium mb-3 block">Цена (₸)</Label>
        <div className="flex gap-2">
          <Input
            type="number"
            placeholder="От"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-full"
          />
          <Input
            type="number"
            placeholder="До"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-full"
          />
        </div>
      </div>

      <div>
        <Label className="text-sm font-medium mb-3 block">Количество комнат</Label>
        <Select value={rooms} onValueChange={setRooms}>
          <SelectTrigger>
            <SelectValue placeholder="Все" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Все</SelectItem>
            <SelectItem value="1">1 комната</SelectItem>
            <SelectItem value="2">2 комнаты</SelectItem>
            <SelectItem value="3">3 комнаты</SelectItem>
            <SelectItem value="4">4 комнаты</SelectItem>
            <SelectItem value="5">5+ комнат</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="text-sm font-medium mb-3 block">Удобства</Label>
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="parking"
              checked={hasParking}
              onCheckedChange={(checked) => setHasParking(checked as boolean)}
            />
            <label htmlFor="parking" className="text-sm text-muted-foreground cursor-pointer">
              Парковка
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="elevator"
              checked={hasElevator}
              onCheckedChange={(checked) => setHasElevator(checked as boolean)}
            />
            <label htmlFor="elevator" className="text-sm text-muted-foreground cursor-pointer">
              Лифт
            </label>
          </div>
        </div>
      </div>

      <Button variant="outline" className="w-full" onClick={resetFilters}>
        <X className="h-4 w-4 mr-2" />
        Сбросить фильтры
      </Button>
    </div>
  );

  const isCityValid = CITIES.includes(city as typeof CITIES[number]);

  if (!isCityValid) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Город не найден</h1>
        <p className="text-muted-foreground mb-8">
          К сожалению, город &quot;{citySlug}&quot; не найден в списке доступных городов.
        </p>
        <Button asChild>
          <Link href="/">Вернуться на главную</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
            <Link href="/" className="hover:text-primary">Главная</Link>
            <span>/</span>
            <span className="text-foreground">{city}</span>
          </div>
          <h1 className="text-3xl font-bold text-foreground">
            Недвижимость в {city}
          </h1>
          <p className="text-muted-foreground mt-2">
            Актуальные объявления о продаже и аренде недвижимости
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          <aside className="hidden lg:block w-80 shrink-0">
            <Card className="sticky top-24 p-6">
              <FiltersContent />
            </Card>
          </aside>

          <main className="flex-1">
            <div className="lg:hidden mb-4">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="w-full">
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    Фильтры
                    {(type !== 'all' || minPrice || maxPrice || rooms !== 'all' || hasParking || hasElevator) && (
                      <Badge variant="secondary" className="ml-2">
                        Активны
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] sm:w-[350px]">
                  <FiltersContent />
                </SheetContent>
              </Sheet>
            </div>

            <div className="flex justify-between items-center mb-6">
              <p className="text-muted-foreground">
                Найдено: <span className="font-medium text-foreground">{totalCount}</span> объявлений
              </p>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              <div className="text-center py-16 bg-white rounded-xl">
                <div className="w-16 h-16 mx-auto mb-4 bg-slate-100 rounded-full flex items-center justify-center">
                  <SlidersHorizontal className="h-8 w-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Объявления не найдены</h3>
                <p className="text-muted-foreground mb-6">
                  Попробуйте изменить параметры фильтрации
                </p>
                <Button variant="outline" onClick={resetFilters}>
                  Сбросить фильтры
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {listings.map((listing) => (
                  <ListingCard key={listing.id} listing={listing} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
