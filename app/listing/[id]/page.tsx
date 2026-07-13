'use client';

import { useState, useEffect, useMemo } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { supabase, Listing, formatPrice } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  MapPin,
  Bed,
  Maximize,
  Building2,
  Calendar,
  Car,
  ArrowUpCircle,
  Phone,
  Mail,
  Share2,
  Heart,
  ChevronLeft,
  ChevronRight,
  Check,
  Box,
  Calculator,
} from 'lucide-react';

export default function ListingDetailPage() {
  const params = useParams();
  const listingId = params.id as string;

  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [downPct, setDownPct] = useState(20);
  const [rate, setRate] = useState(7);
  const [term, setTerm] = useState(20);

  const calcResult = useMemo(() => {
    if (!listing || listing.type !== 'sale') return null;
    const price = listing.price;
    const down = Math.round(price * downPct / 100);
    const loan = price - down;
    const r = rate / 100 / 12;
    const n = term * 12;
    const monthly = r === 0 ? loan / n : loan * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
    const total = monthly * n;
    const overpay = total - loan;
    return { down, loan, monthly: Math.round(monthly), total: Math.round(total), overpay: Math.round(overpay) };
  }, [listing, downPct, rate, term]);

  useEffect(() => {
    fetchListing();
  }, [listingId]);

  const fetchListing = async () => {
    try {
      const { data, error } = await supabase
        .from('listings')
        .select('*')
        .eq('id', listingId)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          setNotFound(true);
        } else {
          throw error;
        }
      } else {
        setListing(data);
      }
    } catch (error) {
      console.error('Error fetching listing:', error);
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  };

  const nextImage = () => {
    if (listing && listing.images) {
      const totalImages = listing.images.length || 1;
      setCurrentImageIndex((prev) => (prev + 1) % totalImages);
    }
  };

  const prevImage = () => {
    if (listing && listing.images) {
      const totalImages = listing.images.length || 1;
      setCurrentImageIndex((prev) => (prev - 1 + totalImages) % totalImages);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <div className="aspect-video bg-slate-200 animate-pulse rounded-xl" />
          </div>
          <div className="space-y-4">
            <div className="h-40 bg-slate-200 animate-pulse rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 mx-auto mb-6 bg-slate-100 rounded-full flex items-center justify-center">
          <Building2 className="h-10 w-10 text-slate-400" />
        </div>
        <h1 className="text-2xl font-bold mb-4">Объявление не найдено</h1>
        <p className="text-muted-foreground mb-8">
          К сожалению, данное объявление не существует или было удалено.
        </p>
        <Button asChild>
          <Link href="/almaty">Смотреть объявления</Link>
        </Button>
      </div>
    );
  }

  if (!listing) return null;

  const images = listing.images?.length ? listing.images : ['https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg'];

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-muted-foreground hover:text-primary">Главная</Link>
            <span className="text-muted-foreground">/</span>
            <Link
              href={`/${listing.city.toLowerCase()}`}
              className="text-muted-foreground hover:text-primary"
            >
              {listing.city}
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-foreground truncate max-w-[200px]">{listing.title}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className="overflow-hidden border-0 shadow-md">
              <div className="relative aspect-video">
                <Image
                  src={images[currentImageIndex]}
                  alt={listing.title}
                  fill
                  className="object-cover"
                  priority
                />
                {images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-colors"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-colors"
                    >
                      <ChevronRight className="h-6 w-6" />
                    </button>
                  </>
                )}
                <Badge
                  variant={listing.type === 'sale' ? 'default' : 'secondary'}
                  className={`absolute top-4 left-4 ${
                    listing.type === 'sale'
                      ? 'bg-primary text-white'
                      : 'bg-amber-500 text-white'
                  }`}
                >
                  {listing.type === 'sale' ? 'Продажа' : 'Аренда'}
                </Badge>
              </div>

              {images.length > 1 && (
                <div className="p-4 flex gap-2 overflow-x-auto">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`relative w-20 h-14 rounded-lg overflow-hidden shrink-0 transition-all ${
                        idx === currentImageIndex
                          ? 'ring-2 ring-primary'
                          : 'opacity-60 hover:opacity-100'
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`Фото ${idx + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </Card>

            <Card className="border-0 shadow-md">
              <CardContent className="p-6">
                <div className="flex justify-between items-start gap-4 flex-wrap">
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold mb-2">{listing.title}</h1>
                    <div className="flex items-center text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-1" />
                      {listing.address}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl md:text-3xl font-bold text-primary">
                      {formatPrice(listing.price, listing.type)}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardHeader className="pb-3">
                <h2 className="text-xl font-semibold">Описание</h2>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {listing.description}
                </p>
              </CardContent>
            </Card>

            {listing.model_3d_url && (
              <Card className="border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Box className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold">3D модель</h2>
                      <p className="text-sm text-muted-foreground">Виртуальный тур по объекту</p>
                    </div>
                  </div>
                  <a href={listing.model_3d_url} target="_blank" rel="noopener noreferrer">
                    <Button className="w-full" variant="outline" size="lg">
                      <Box className="h-4 w-4 mr-2" />
                      Открыть 3D модель
                    </Button>
                  </a>
                </CardContent>
              </Card>
            )}

            <Card className="border-0 shadow-md">
              <CardHeader className="pb-3">
                <h2 className="text-xl font-semibold">Характеристики</h2>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Bed className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Комнаты</div>
                      <div className="font-semibold">{listing.rooms}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Maximize className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Площадь</div>
                      <div className="font-semibold">{listing.area_sqm} м²</div>
                    </div>
                  </div>

                  {listing.floor && listing.total_floors && (
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <ArrowUpCircle className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Этаж</div>
                        <div className="font-semibold">{listing.floor} из {listing.total_floors}</div>
                      </div>
                    </div>
                  )}

                  {listing.year_built && (
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Calendar className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Год постройки</div>
                        <div className="font-semibold">{listing.year_built}</div>
                      </div>
                    </div>
                  )}
                </div>

                <Separator className="my-6" />

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      listing.has_parking ? 'bg-green-100' : 'bg-slate-100'
                    }`}>
                      <Car className={`h-5 w-5 ${
                        listing.has_parking ? 'text-green-600' : 'text-slate-400'
                      }`} />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Парковка</div>
                      <div className="font-semibold">
                        {listing.has_parking ? (
                          <span className="text-green-600 flex items-center gap-1">
                            <Check className="h-4 w-4" /> Есть
                          </span>
                        ) : (
                          'Нет'
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      listing.has_elevator ? 'bg-green-100' : 'bg-slate-100'
                    }`}>
                      <ArrowUpCircle className={`h-5 w-5 ${
                        listing.has_elevator ? 'text-green-600' : 'text-slate-400'
                      }`} />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Лифт</div>
                      <div className="font-semibold">
                        {listing.has_elevator ? (
                          <span className="text-green-600 flex items-center gap-1">
                            <Check className="h-4 w-4" /> Есть
                          </span>
                        ) : (
                          'Нет'
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="border-0 shadow-md sticky top-24">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-primary mb-1">
                    {formatPrice(listing.price, listing.type)}
                  </div>
                  <div className="text-muted-foreground text-sm">
                    {listing.type === 'rent' ? 'в месяц' : 'за недвижимость'}
                  </div>
                </div>

                <div className="space-y-4">
                  <a href={`tel:${listing.contact_phone}`}>
                    <Button className="w-full" size="lg">
                      <Phone className="h-4 w-4 mr-2" />
                      Показать телефон
                    </Button>
                  </a>

                  <Button variant="outline" className="w-full">
                    <Mail className="h-4 w-4 mr-2" />
                    Написать сообщение
                  </Button>
                </div>

                <Separator className="my-6" />

                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Продавец</div>
                    <div className="font-medium">{listing.contact_name}</div>
                  </div>

                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Телефон</div>
                    <a href={`tel:${listing.contact_phone}`} className="font-medium hover:text-primary">
                      {listing.contact_phone}
                    </a>
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Heart className="h-4 w-4 mr-1" />
                    Избранное
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Share2 className="h-4 w-4 mr-1" />
                    Поделиться
                  </Button>
                </div>
              </CardContent>
            </Card>

            {calcResult && (
              <Card className="border-0 shadow-md">
                <CardContent className="p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Calculator className="h-4 w-4 text-primary" />
                    </div>
                    <h3 className="font-bold text-sm">Ипотечный калькулятор</h3>
                  </div>

                  <div className="text-center bg-primary/5 rounded-lg py-3 mb-4">
                    <div className="text-2xl font-extrabold text-primary">
                      {calcResult.monthly.toLocaleString('ru-KZ')} ₸
                    </div>
                    <div className="text-xs text-muted-foreground">ежемесячный платёж</div>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-muted-foreground">Первоначальный взнос</span>
                        <span className="font-semibold">{downPct}% — {calcResult.down.toLocaleString('ru-KZ')} ₸</span>
                      </div>
                      <input type="range" min={10} max={90} step={5} value={downPct}
                        onChange={(e) => setDownPct(Number(e.target.value))}
                        className="w-full accent-primary h-1.5 cursor-pointer" />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-muted-foreground">Процентная ставка</span>
                        <span className="font-semibold">{rate}% годовых</span>
                      </div>
                      <input type="range" min={5} max={30} step={0.5} value={rate}
                        onChange={(e) => setRate(Number(e.target.value))}
                        className="w-full accent-primary h-1.5 cursor-pointer" />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-muted-foreground">Срок кредита</span>
                        <span className="font-semibold">{term} лет</span>
                      </div>
                      <input type="range" min={1} max={30} step={1} value={term}
                        onChange={(e) => setTerm(Number(e.target.value))}
                        className="w-full accent-primary h-1.5 cursor-pointer" />
                    </div>
                  </div>

                  <div className="space-y-1.5 text-xs border-t pt-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Сумма кредита</span>
                      <span className="font-medium">{calcResult.loan.toLocaleString('ru-KZ')} ₸</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Итого выплат</span>
                      <span className="font-medium">{calcResult.total.toLocaleString('ru-KZ')} ₸</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Переплата</span>
                      <span className="font-medium text-red-500">{calcResult.overpay.toLocaleString('ru-KZ')} ₸</span>
                    </div>
                  </div>

                  <Link href="/mortgage" className="block mt-3 text-center text-xs text-primary hover:underline">
                    Программы ипотеки в Казахстане →
                  </Link>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
