import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Bed, Maximize, Car, ArrowUpRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Listing, formatPrice } from '@/lib/supabase';

interface ListingCardProps {
  listing: Listing;
}

export default function ListingCard({ listing }: ListingCardProps) {
  const imageUrl = listing.images?.[0] || 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg';

  return (
    <Link href={`/listing/${listing.id}`}>
      <Card className="group overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 bg-white">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={imageUrl}
            alt={listing.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <Badge
            variant={listing.type === 'sale' ? 'default' : 'secondary'}
            className={`absolute top-3 left-3 ${
              listing.type === 'sale'
                ? 'bg-primary text-white'
                : 'bg-amber-500 text-white'
            }`}
          >
            {listing.type === 'sale' ? 'Продажа' : 'Аренда'}
          </Badge>
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
          <ArrowUpRight className="absolute bottom-3 right-3 h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg" />
        </div>
        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors line-clamp-1">
              {listing.title}
            </h3>
          </div>
          <div className="flex items-center text-muted-foreground text-sm mb-3">
            <MapPin className="h-4 w-4 mr-1 shrink-0" />
            <span className="truncate">{listing.address}</span>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-1">
              <Bed className="h-4 w-4" />
              <span>{listing.rooms} комн.</span>
            </div>
            <div className="flex items-center gap-1">
              <Maximize className="h-4 w-4" />
              <span>{listing.area_sqm} м²</span>
            </div>
            {listing.has_parking && (
              <div className="flex items-center gap-1">
                <Car className="h-4 w-4" />
              </div>
            )}
          </div>
          <div className="text-xl font-bold text-primary">
            {formatPrice(listing.price, listing.type)}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
