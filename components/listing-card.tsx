import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Bed, Maximize, Building2, Heart, Share2 } from 'lucide-react';
import { Listing, formatPrice } from '@/lib/supabase';

interface ListingCardProps {
  listing: Listing;
  horizontal?: boolean;
}

export default function ListingCard({ listing, horizontal = false }: ListingCardProps) {
  const imageUrl = listing.images?.[0] || 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg';

  if (horizontal) {
    return (
      <Link href={`/listing/${listing.id}`} className="group flex bg-white border border-border rounded-xl overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 mb-3">
        <div className="relative w-[200px] shrink-0 min-h-[140px]">
          <Image src={imageUrl} alt={listing.title} fill className="object-cover" />
          <span className={`absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold text-white uppercase ${listing.type === 'sale' ? 'bg-primary' : 'bg-amber-500'}`}>
            {listing.type === 'sale' ? 'Продажа' : 'Аренда'}
          </span>
          <span className="absolute bottom-2 right-2 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded-full">
            📷 {listing.images?.length || 1}
          </span>
        </div>
        <div className="flex flex-col justify-between p-3 flex-1 min-w-0">
          <div>
            <div className="text-lg font-extrabold text-primary leading-tight">{formatPrice(listing.price, listing.type)}</div>
            <div className="text-xs text-muted-foreground mt-0.5">
              {listing.area_sqm > 0 ? `≈ ${Math.round(listing.price / listing.area_sqm).toLocaleString('ru-KZ')} ₸/м²` : ''}
            </div>
            <div className="text-sm font-semibold text-foreground mt-1.5 line-clamp-1">{listing.title}</div>
            <div className="flex gap-3 mt-1">
              <span className="text-xs text-muted-foreground flex items-center gap-1"><Maximize className="h-3 w-3" />{listing.area_sqm} м²</span>
              <span className="text-xs text-muted-foreground flex items-center gap-1"><Bed className="h-3 w-3" />{listing.rooms} комн.</span>
              {listing.floor && listing.total_floors && (
                <span className="text-xs text-muted-foreground flex items-center gap-1"><Building2 className="h-3 w-3" />{listing.floor}/{listing.total_floors} эт.</span>
              )}
            </div>
            <div className="flex items-center gap-1 mt-1.5 text-xs text-muted-foreground">
              <MapPin className="h-3 w-3 shrink-0" />
              <span className="truncate">{listing.address}</span>
            </div>
          </div>
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-border">
            <span className="text-[11px] text-muted-foreground">
              {new Date(listing.created_at).toLocaleDateString('ru-RU')}
            </span>
            <div className="flex gap-1.5">
              <button onClick={(e) => e.preventDefault()} className="w-7 h-7 rounded-full border border-border flex items-center justify-center hover:border-primary hover:text-primary transition">
                <Heart className="h-3.5 w-3.5" />
              </button>
              <button onClick={(e) => e.preventDefault()} className="w-7 h-7 rounded-full border border-border flex items-center justify-center hover:border-primary hover:text-primary transition">
                <Share2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/listing/${listing.id}`} className="group block bg-white border border-border rounded-xl overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
      <div className="relative aspect-[4/3]">
        <Image src={imageUrl} alt={listing.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
        <span className={`absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold text-white uppercase ${listing.type === 'sale' ? 'bg-primary' : 'bg-amber-500'}`}>
          {listing.type === 'sale' ? 'Продажа' : 'Аренда'}
        </span>
      </div>
      <div className="p-3">
        <div className="text-lg font-extrabold text-primary">{formatPrice(listing.price, listing.type)}</div>
        <div className="text-sm font-semibold text-foreground mt-1 line-clamp-1">{listing.title}</div>
        <div className="flex gap-3 mt-1.5">
          <span className="text-xs text-muted-foreground flex items-center gap-1"><Maximize className="h-3 w-3" />{listing.area_sqm} м²</span>
          <span className="text-xs text-muted-foreground flex items-center gap-1"><Bed className="h-3 w-3" />{listing.rooms} комн.</span>
        </div>
        <div className="flex items-center gap-1 mt-1.5 text-xs text-muted-foreground">
          <MapPin className="h-3 w-3 shrink-0" />
          <span className="truncate">{listing.address}</span>
        </div>
      </div>
    </Link>
  );
}
