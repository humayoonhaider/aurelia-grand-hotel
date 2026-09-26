import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Room } from '../types';
import { Bed, Users, Maximize2, ArrowRight, Eye, Check } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { OptimizedImage } from './OptimizedImage';

interface RoomCardProps {
  room: Room;
  variant?: 'grid' | 'featured' | 'compact';
}

export const RoomCard: React.FC<RoomCardProps> = ({ room, variant = 'grid' }) => {
  const navigate = useNavigate();
  const { setSelectedRoom, setBookingDraft, formatPKR } = useBooking();

  const handleBookNow = () => {
    setSelectedRoom(room);
    setBookingDraft((prev) => ({
      ...prev,
      roomId: room.id,
    }));
    navigate('/booking');
  };

  const isFeatured = variant === 'featured';

  return (
    <div
      className={`group bg-white dark:bg-[#16161A] border border-[#E5E0D8] dark:border-[#2C2A26] transition-all duration-300 hover:border-[#A67C52]/50 dark:hover:border-[#C5A880]/50 hover:shadow-xl flex flex-col ${
        isFeatured ? 'lg:flex-row' : ''
      }`}
    >
      {/* Image slot with optimized responsive container and fallback */}
      <div
        className={`relative overflow-hidden ${
          isFeatured ? 'lg:w-3/5 min-h-[260px] sm:min-h-[320px] lg:min-h-[440px]' : 'w-full'
        }`}
      >
        <OptimizedImage
          src={room.primaryImage}
          alt={room.name}
          fallbackTitle={room.name}
          aspectRatio={isFeatured ? 'auto' : '4/3'}
          className="group-hover:scale-105"
        />

        {/* Floor location tag */}
        <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10">
          <span className="bg-[#171717]/90 dark:bg-black/90 backdrop-blur-sm text-stone-200 text-[10px] sm:text-[11px] uppercase tracking-wider px-2.5 py-1 font-mono border border-stone-800">
            {room.floorLevel}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className={`p-4 sm:p-6 lg:p-8 flex flex-col justify-between flex-1 ${isFeatured ? 'lg:w-2/5' : ''}`}>
        <div className="space-y-2.5 sm:space-y-4">
          {/* Metadata: responsive text with soft separators */}
          <div className="flex items-center flex-wrap gap-x-2 gap-y-1 text-[11px] sm:text-xs text-[#777777] dark:text-[#A39E93] font-medium tracking-wide">
            <span className="flex items-center gap-1.5">
              <Maximize2 className="w-3.5 h-3.5 text-[#A67C52] dark:text-[#C5A880] shrink-0" />
              <span className="tabular-nums">{room.sizeM2}</span> m²
            </span>
            <span aria-hidden="true" className="text-stone-300 dark:text-stone-700">·</span>
            <span className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-[#A67C52] dark:text-[#C5A880] shrink-0" />
              <span className="tabular-nums">{room.maxGuests}</span> Guests
            </span>
            <span aria-hidden="true" className="text-stone-300 dark:text-stone-700">·</span>
            <span className="flex items-center gap-1.5">
              <Bed className="w-3.5 h-3.5 text-[#A67C52] dark:text-[#C5A880] shrink-0" />
              <span className="truncate max-w-[110px] sm:max-w-none">{room.bedType}</span>
            </span>
          </div>

          <div>
            <h3 className="text-lg sm:text-2xl lg:text-3xl font-serif-luxury font-normal text-[#171717] dark:text-[#FAF8F5] group-hover:text-[#A67C52] dark:group-hover:text-[#C5A880] transition-colors leading-snug">
              <Link to={`/rooms/${room.id}`}>{room.name}</Link>
            </h3>
            <p className="text-[10px] sm:text-xs text-[#A67C52] dark:text-[#C5A880] font-medium uppercase tracking-wider mt-0.5 sm:mt-1">
              {room.viewType}
            </p>
          </div>

          <p className="text-xs sm:text-sm text-[#777777] dark:text-[#A39E93] font-light leading-relaxed line-clamp-2 sm:line-clamp-3">
            {room.shortDescription}
          </p>

          {/* Key highlights */}
          <div className="pt-2 border-t border-[#E5E0D8]/60 dark:border-[#2C2A26] space-y-1.5 hidden sm:block">
            {room.features.slice(0, 2).map((feature, i) => (
              <div key={i} className="flex items-center gap-2 text-xs text-stone-600 dark:text-stone-300">
                <Check className="w-3.5 h-3.5 text-[#A67C52] dark:text-[#C5A880] shrink-0" />
                <span className="truncate">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing & CTA actions */}
        <div className="pt-3.5 sm:pt-6 mt-3.5 sm:mt-6 border-t border-[#E5E0D8] dark:border-[#2C2A26] space-y-2.5 sm:space-y-4">
          <div className="flex items-baseline justify-between gap-2">
            <span className="text-[10px] sm:text-xs text-[#777777] dark:text-[#A39E93] uppercase tracking-wider">Nightly Rate</span>
            <div className="text-right shrink-0">
              <span className="text-base sm:text-2xl font-serif-luxury font-medium text-[#171717] dark:text-[#FAF8F5] tabular-nums">
                {formatPKR(room.pricePerNightPKR)}
              </span>
              <span className="text-[10px] sm:text-xs text-[#777777] dark:text-[#A39E93] ml-1">/ night</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:gap-3 pt-1">
            <Link
              to={`/rooms/${room.id}`}
              className="w-full text-center border border-[#171717] dark:border-stone-700 text-[#171717] dark:text-stone-200 hover:bg-[#171717] dark:hover:bg-stone-800 hover:text-white py-2.5 px-2 min-h-[40px] text-[11px] sm:text-xs uppercase tracking-[0.14em] font-semibold transition-colors duration-200 whitespace-nowrap flex items-center justify-center gap-1.5"
            >
              <Eye className="w-3.5 h-3.5 shrink-0" />
              <span>Details</span>
            </Link>
            <button
              onClick={handleBookNow}
              className="w-full bg-[#A67C52] hover:bg-[#8C653E] text-white py-2.5 px-2 min-h-[40px] text-[11px] sm:text-xs uppercase tracking-[0.14em] font-semibold transition-colors duration-200 whitespace-nowrap flex items-center justify-center gap-1.5 shadow-sm active:scale-98"
            >
              <span>Book</span>
              <ArrowRight className="w-3.5 h-3.5 shrink-0" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
