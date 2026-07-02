'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase, Listing, CITIES } from '@/lib/supabase';
import { Search } from 'lucide-react';
import ListingCard from '@/components/listing-card';

const CATEGORIES = [
  { icon: '🏢', label: 'Квартиры', count: '287 450', href: '/almaty?type=sale&property_type=apartment' },
  { icon: '🏡', label: 'Дома и дачи', count: '64 120', href: '/almaty?type=sale&property_type=house' },
  { icon: '🌿', label: 'Участки', count: '48 780', href: '/almaty?property_type=land' },
  { icon: '🪟', label: 'Коммерческая', count: '52 340', href: '/almaty?property_type=commercial' },
  { icon: '🏗️', label: 'Новостройки', count: '3 184 ЖК', href: '/almaty?type=sale&property_type=apartment' },
  { icon: '🔑', label: 'Аренда долгосрочная', count: '38 900', href: '/almaty?type=rent&property_type=apartment' },
  { icon: '🌙', label: 'Аренда посуточно', count: '12 600', href: '/almaty?type=rent' },
  { icon: '🚗', label: 'Гаражи', count: '9 250', href: '/almaty?property_type=garage' },
];

const CITY_STATS = [
  { name: 'Алматы', slug: 'almaty', count: '142 500' },
  { name: 'Астана', slug: 'astana', count: '98 340' },
  { name: 'Шымкент', slug: 'shymkent', count: '41 280' },
  { name: 'Актобе', slug: 'aktobe', count: '22 100' },
  { name: 'Атырау', slug: 'atyrau', count: '19 650' },
  { name: 'Актау', slug: 'aktau', count: '15 430' },
  { name: 'Павлодар', slug: 'pavlodar', count: '14 890' },
];

export default function HomePage() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchCity, setSearchCity] = useState('');
  const [searchType, setSearchType] = useState('sale');
  const [activeTab, setActiveTab] = useState('sale');

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      const { data, error } = await supabase
        .from('listings')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);
      if (error) throw error;
      setListings(data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (searchCity) {
      window.location.href = `/${searchCity.toLowerCase()}?type=${activeTab}`;
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F6F8]">
      {/* Hero */}
      <div className="hero-gradient py-12 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
        <div className="max-w-[800px] mx-auto text-center relative">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2">Найдите недвижимость в Казахстане</h1>
          <p className="text-white/75 text-base mb-7">Более 500 000 актуальных объявлений по всей стране</p>

          <div className="bg-white rounded-xl p-5 shadow-2xl text-left">
            <div className="flex gap-2 mb-4 flex-wrap">
              {['sale', 'rent', 'daily', 'new'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => { setActiveTab(tab); setSearchType(tab); }}
                  className={`px-4 py-1.5 rounded-full border text-sm font-medium transition ${activeTab === tab ? 'bg-primary border-primary text-white' : 'border-border hover:border-primary hover:text-primary'}`}
                >
                  {tab === 'sale' ? 'Продажа' : tab === 'rent' ? 'Аренда' : tab === 'daily' ? 'Посуточно' : 'Новостройки'}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_120px_120px_auto] gap-3 items-end">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wide text-muted-foreground mb-1">Город</label>
                <select value={searchCity} onChange={(e) => setSearchCity(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg text-sm outline-none focus:border-primary">
                  <option value="">Выберите город</option>
                  {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wide text-muted-foreground mb-1">Тип недвижимости</label>
                <select className="w-full px-3 py-2 border border-border rounded-lg text-sm outline-none focus:border-primary">
                  <option>Квартиры</option>
                  <option>Дома и дачи</option>
                  <option>Участки</option>
                  <option>Коммерческая</option>
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wide text-muted-foreground mb-1">Цена от, ₸</label>
                <input type="text" placeholder="0" className="w-full px-3 py-2 border border-border rounded-lg text-sm outline-none focus:border-primary" />
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wide text-muted-foreground mb-1">Цена до, ₸</label>
                <input type="text" placeholder="∞" className="w-full px-3 py-2 border border-border rounded-lg text-sm outline-none focus:border-primary" />
              </div>
              <button onClick={handleSearch} className="h-[38px] px-6 bg-primary hover:bg-red-700 text-white rounded-lg text-sm font-bold flex items-center gap-2 transition whitespace-nowrap">
                <Search className="h-4 w-4" /> Найти
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="max-w-[1200px] mx-auto px-4 mt-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {CATEGORIES.map((cat) => (
            <Link key={cat.label} href={cat.href}
              className="bg-white border border-border rounded-xl p-3 text-center hover:border-primary hover:shadow-md hover:-translate-y-0.5 transition-all">
              <span className="text-2xl block mb-1">{cat.icon}</span>
              <div className="text-xs font-semibold text-foreground">{cat.label}</div>
              <div className="text-[10px] text-muted-foreground mt-0.5">{cat.count}</div>
            </Link>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-[1200px] mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6">
        {/* Listings */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-base font-bold text-foreground">Свежие объявления — Алматы</span>
            <Link href="/almaty" className="text-sm text-primary hover:underline font-medium">Все объявления →</Link>
          </div>

          {/* Filter chips */}
          <div className="bg-white border border-border rounded-xl px-4 py-2.5 mb-4 flex items-center gap-2 flex-wrap">
            <span className="text-xs font-semibold text-muted-foreground">Комнат:</span>
            {['Все', '1', '2', '3', '4+'].map((r) => (
              <button key={r} className="px-3 py-1 rounded-full border border-border text-xs hover:border-primary hover:text-primary first-of-type:bg-primary first-of-type:text-white first-of-type:border-primary transition">
                {r}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="space-y-3">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-[140px] bg-white rounded-xl animate-pulse border border-border" />
              ))}
            </div>
          ) : listings.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl border border-border">
              <p className="text-muted-foreground">Объявления не найдены</p>
            </div>
          ) : (
            <div>
              {listings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} horizontal />
              ))}
            </div>
          )}

          <div className="flex justify-center gap-1.5 mt-5">
            {[1,2,3,4,5].map((p) => (
              <Link key={p} href="/almaty"
                className={`w-8 h-8 flex items-center justify-center rounded-lg border text-sm ${p === 1 ? 'bg-primary border-primary text-white font-bold' : 'border-border hover:border-primary hover:text-primary'}`}>
                {p}
              </Link>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <aside className="space-y-4">
          {/* Stats */}
          <div className="bg-white border border-border rounded-xl p-4">
            <h3 className="text-sm font-bold mb-3">📊 Статистика портала</h3>
            <div className="grid grid-cols-2 gap-2">
              {[['500К+','Объявлений'],['2.1М','Посетителей/мес'],['17','Городов KZ'],['98%','Актуальных']].map(([num, label]) => (
                <div key={label} className="bg-[#F5F6F8] rounded-lg p-2.5 text-center">
                  <div className="text-lg font-extrabold text-primary leading-none">{num}</div>
                  <div className="text-[10px] text-muted-foreground mt-1 leading-tight">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Cities */}
          <div className="bg-white border border-border rounded-xl p-4">
            <h3 className="text-sm font-bold mb-3">🏙️ Популярные города</h3>
            <ul className="divide-y divide-border">
              {CITY_STATS.map((c) => (
                <li key={c.name}>
                  <Link href={`/${c.slug}`}
                    className="flex items-center justify-between py-2 text-sm hover:text-primary transition group">
                    <span className="font-medium group-hover:text-primary">{c.name}</span>
                    <span className="text-xs text-muted-foreground bg-[#F5F6F8] px-2 py-0.5 rounded-full">{c.count}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/almaty" className="text-xs text-primary hover:underline mt-2 block">Все города →</Link>
          </div>

          {/* Banner */}
          <div className="bg-gradient-to-br from-primary to-red-400 rounded-xl p-5 text-center text-white">
            <h3 className="text-sm font-bold mb-1">Подайте объявление</h3>
            <p className="text-xs opacity-85 mb-4">Разместите бесплатно и найдите покупателя или арендатора быстро</p>
            <Link href="/add" className="inline-block px-5 py-2 bg-white text-primary rounded-full text-sm font-bold hover:shadow-md transition">
              Бесплатно разместить
            </Link>
          </div>

          {/* Price trends */}
          <div className="bg-white border border-border rounded-xl p-4">
            <h3 className="text-sm font-bold mb-3">📈 Цены на квартиры в Алматы</h3>
            <div className="space-y-2">
              {[['1-комн.','27.5 млн ₸','up'],['2-комн.','48 млн ₸','up'],['3-комн.','85 млн ₸','up'],['4+ комн.','145 млн ₸','up']].map(([type, price, dir]) => (
                <div key={type} className="flex justify-between items-center py-1.5 border-b border-border last:border-0 text-sm">
                  <span className="text-muted-foreground">{type}</span>
                  <span className="font-semibold text-primary">↑ {price}</span>
                </div>
              ))}
            </div>
            <Link href="/calculator" className="text-xs text-primary hover:underline mt-2 block">Подробная аналитика →</Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
