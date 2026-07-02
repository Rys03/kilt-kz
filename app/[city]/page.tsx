'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase, Listing, CITIES, getCityFromSlug, PROPERTY_TYPES } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { X, SlidersHorizontal } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import ListingCard from '@/components/listing-card';

const ROOM_OPTIONS = ['all', '1', '2', '3', '4', '5+'];

export default function CityPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const citySlug = params.city as string;
  const city = getCityFromSlug(citySlug);

  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  const [type, setType] = useState<string>(searchParams.get('type') || 'all');
  const [propertyType, setPropertyType] = useState<string>(searchParams.get('property_type') || 'all');
  const [rooms, setRooms] = useState<string>(searchParams.get('rooms') || 'all');
  const [minPrice, setMinPrice] = useState<string>(searchParams.get('min_price') || '');
  const [maxPrice, setMaxPrice] = useState<string>(searchParams.get('max_price') || '');
  const [hasParking, setHasParking] = useState(false);
  const [hasElevator, setHasElevator] = useState(false);

  const fetchListings = useCallback(async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('listings')
        .select('*', { count: 'exact' })
        .eq('city', city)
        .eq('status', 'active');

      if (type && type !== 'all') query = query.eq('type', type);
      if (propertyType && propertyType !== 'all') query = query.eq('property_type', propertyType);
      if (minPrice) query = query.gte('price', parseInt(minPrice));
      if (maxPrice) query = query.lte('price', parseInt(maxPrice));
      if (rooms && rooms !== 'all') {
        if (rooms === '5+') query = query.gte('rooms', 5);
        else query = query.eq('rooms', parseInt(rooms));
      }
      if (hasParking) query = query.eq('has_parking', true);
      if (hasElevator) query = query.eq('has_elevator', true);

      const { data, error, count } = await query.order('created_at', { ascending: false });
      if (error) throw error;
      setListings(data || []);
      setTotalCount(count || 0);
    } catch (error) {
      console.error('Error fetching listings:', error);
    } finally {
      setLoading(false);
    }
  }, [city, type, propertyType, rooms, minPrice, maxPrice, hasParking, hasElevator]);

  useEffect(() => { fetchListings(); }, [fetchListings]);

  const resetFilters = () => {
    setType('all'); setPropertyType('all'); setRooms('all');
    setMinPrice(''); setMaxPrice('');
    setHasParking(false); setHasElevator(false);
  };

  const isCityValid = CITIES.includes(city as typeof CITIES[number]);

  if (!isCityValid) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Город не найден</h1>
        <Button asChild><Link href="/">На главную</Link></Button>
      </div>
    );
  }

  const FiltersContent = () => (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-base">Фильтры</h2>
        <button onClick={resetFilters} className="text-xs text-primary hover:underline flex items-center gap-1">
          <X className="h-3 w-3" /> Сбросить
        </button>
      </div>

      {/* Тип сделки */}
      <div>
        <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground mb-2">Тип сделки</p>
        <div className="flex gap-2">
          {[['all','Все'],['sale','Продажа'],['rent','Аренда']].map(([v,l]) => (
            <button key={v} onClick={() => setType(v)}
              className={`flex-1 py-1.5 rounded-lg border text-xs font-medium transition ${type === v ? 'bg-primary border-primary text-white' : 'border-border hover:border-primary hover:text-primary'}`}>
              {l}
            </button>
          ))}
        </div>
      </div>

      {/* Тип недвижимости */}
      <div>
        <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground mb-2">Тип недвижимости</p>
        <div className="space-y-1.5">
          <button onClick={() => setPropertyType('all')}
            className={`w-full text-left px-3 py-1.5 rounded-lg border text-sm transition ${propertyType === 'all' ? 'bg-primary/10 border-primary text-primary font-medium' : 'border-border hover:border-primary'}`}>
            Все типы
          </button>
          {PROPERTY_TYPES.map((pt) => (
            <button key={pt.value} onClick={() => setPropertyType(pt.value)}
              className={`w-full text-left px-3 py-1.5 rounded-lg border text-sm transition ${propertyType === pt.value ? 'bg-primary/10 border-primary text-primary font-medium' : 'border-border hover:border-primary'}`}>
              {pt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Комнаты */}
      <div>
        <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground mb-2">Количество комнат</p>
        <div className="flex gap-1.5 flex-wrap">
          {ROOM_OPTIONS.map((r) => (
            <button key={r} onClick={() => setRooms(r)}
              className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition ${rooms === r ? 'bg-primary border-primary text-white' : 'border-border hover:border-primary hover:text-primary'}`}>
              {r === 'all' ? 'Все' : r}
            </button>
          ))}
        </div>
      </div>

      {/* Цена */}
      <div>
        <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground mb-2">Цена (₸)</p>
        <div className="flex gap-2">
          <Input type="number" placeholder="От" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} className="text-sm" />
          <Input type="number" placeholder="До" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} className="text-sm" />
        </div>
      </div>

      {/* Удобства */}
      <div>
        <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground mb-2">Удобства</p>
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <Checkbox checked={hasParking} onCheckedChange={(v) => setHasParking(v as boolean)} />
            <span className="text-sm">Парковка</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <Checkbox checked={hasElevator} onCheckedChange={(v) => setHasElevator(v as boolean)} />
            <span className="text-sm">Лифт</span>
          </label>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-[#F5F6F8] min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-[1200px] mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary">Главная</Link>
            <span>/</span>
            <span className="text-foreground font-medium">{city}</span>
            {type !== 'all' && <><span>/</span><span>{type === 'sale' ? 'Продажа' : 'Аренда'}</span></>}
          </div>
          <h1 className="text-xl font-bold mt-1">
            Недвижимость в {city}
            {type === 'sale' ? ' — Продажа' : type === 'rent' ? ' — Аренда' : ''}
          </h1>
          <p className="text-sm text-muted-foreground">Найдено: <b className="text-foreground">{totalCount}</b> объявлений</p>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 py-5">
        {/* Chips row */}
        <div className="bg-white border border-border rounded-xl px-4 py-2.5 mb-4 flex items-center gap-2 flex-wrap">
          <span className="text-xs font-semibold text-muted-foreground">Комнат:</span>
          {ROOM_OPTIONS.map((r) => (
            <button key={r} onClick={() => setRooms(r)}
              className={`px-3 py-1 rounded-full border text-xs transition ${rooms === r ? 'bg-primary border-primary text-white font-semibold' : 'border-border hover:border-primary hover:text-primary'}`}>
              {r === 'all' ? 'Все' : r}
            </button>
          ))}
          <span className="ml-auto text-xs text-muted-foreground">
            Найдено: <b className="text-foreground">{totalCount}</b>
          </span>
        </div>

        <div className="flex gap-5">
          {/* Sidebar фильтры — desktop */}
          <aside className="hidden lg:block w-[240px] shrink-0">
            <div className="bg-white border border-border rounded-xl p-4 sticky top-[120px]">
              <FiltersContent />
            </div>
          </aside>

          {/* Mobile фильтры */}
          <div className="lg:hidden mb-3 w-full">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="w-full">
                  <SlidersHorizontal className="h-4 w-4 mr-2" /> Фильтры
                  {(type !== 'all' || propertyType !== 'all' || rooms !== 'all' || minPrice || maxPrice) && (
                    <span className="ml-2 bg-primary text-white text-xs px-1.5 py-0.5 rounded-full">●</span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] overflow-y-auto">
                <div className="mt-6"><FiltersContent /></div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Listings */}
          <main className="flex-1 min-w-0">
            {loading ? (
              <div className="space-y-3">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-[140px] bg-white rounded-xl animate-pulse border border-border" />
                ))}
              </div>
            ) : listings.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-xl border border-border">
                <SlidersHorizontal className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                <h3 className="font-semibold mb-1">Объявления не найдены</h3>
                <p className="text-sm text-muted-foreground mb-4">Попробуйте изменить фильтры</p>
                <Button variant="outline" onClick={resetFilters}>Сбросить фильтры</Button>
              </div>
            ) : (
              <div>
                {listings.map((listing) => (
                  <ListingCard key={listing.id} listing={listing} horizontal />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
