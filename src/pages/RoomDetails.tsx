import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getRoomById, ROOMS } from '../data/rooms';
import { useBooking } from '../context/BookingContext';
import { RoomGallery } from '../components/RoomGallery';
import {
  Bed,
  Users,
  Maximize2,
  CheckCircle2,
  ArrowRight,
  Shield,
  Wifi,
  Tv,
  Coffee,
  Wind,
  Sparkles,
  Calendar,
  Layers,
  Compass,
  ArrowLeft
} from 'lucide-react';
import { useToast } from '../components/Toast';

export const RoomDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { setSelectedRoom, setBookingDraft, calculateNights, calculateTotals, formatPKR } = useBooking();
  const { showToast } = useToast();

  const room = getRoomById(id || 'deluxe-king') || ROOMS[0];

  const [checkIn, setCheckIn] = useState<string>(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  });
  const [checkOut, setCheckOut] = useState<string>(() => {
    const d = new Date();
    d.setDate(d.getDate() + 4);
    return d.toISOString().split('T')[0];
  });
  const [guests, setGuests] = useState<number>(Math.min(2, room.maxGuests));
  const [roomsCount, setRoomsCount] = useState<number>(1);

  const nights = calculateNights(checkIn, checkOut);
  const { subtotal, tax, total } = calculateTotals(room, nights, roomsCount);

  const handleReserve = (e: React.FormEvent) => {
    e.preventDefault();

    if (checkOut <= checkIn) {
      showToast('Check-out date must be after check-in date.', 'error');
      return;
    }

    setSelectedRoom(room);
    setBookingDraft((prev) => ({
      ...prev,
      roomId: room.id,
      checkIn,
      checkOut,
      guests,
      roomsCount,
    }));

    navigate('/booking');
  };

  return (
    <div className="pt-24 sm:pt-28 pb-20 sm:pb-24 bg-[#F8F6F1] dark:bg-[#0E0E11] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb / Back Link */}
        <div className="mb-4 sm:mb-6">
          <Link
            to="/rooms"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#777777] dark:text-[#A39E93] hover:text-[#171717] dark:hover:text-[#FAF8F5] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Rooms & Suites</span>
          </Link>
        </div>

        {/* Title Header */}
        <div className="mb-6 sm:mb-8 space-y-1.5 sm:space-y-2">
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#A67C52] dark:text-[#C5A880] font-semibold">
              {room.floorLevel}
            </span>
            <span aria-hidden="true" className="text-stone-300 dark:text-stone-700">·</span>
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-stone-500 dark:text-stone-400 font-mono">
              {room.category.toUpperCase()} COLLECTION
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-serif-luxury text-[#171717] dark:text-[#FAF8F5] font-normal leading-tight">
            {room.name}
          </h1>
          <p className="text-xs sm:text-base text-[#777777] dark:text-[#A39E93] font-light max-w-2xl">
            {room.tagline}
          </p>
        </div>

        {/* Main Grid: Gallery & Details (Left) + Contiguous Booking Sticky Box (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column: Gallery, Specs & Descriptions */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-8 sm:space-y-10">
            {/* Gallery with Blur-up Placeholders & Lightbox */}
            <RoomGallery images={room.galleryImages} roomName={room.name} />

            {/* Quick Spec Metrics: Zero-Pill Unboxed Text */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 p-3.5 sm:p-6 bg-white dark:bg-[#16161A] border border-[#E5E0D8] dark:border-[#2C2A26] transition-colors">
              <div className="space-y-0.5 sm:space-y-1">
                <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-[#777777] dark:text-[#A39E93] block">Space</span>
                <span className="text-sm sm:text-base md:text-lg font-serif-luxury text-[#171717] dark:text-[#FAF8F5] tabular-nums font-semibold flex items-center gap-1 sm:gap-1.5">
                  <Maximize2 className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-[#A67C52] dark:text-[#C5A880] shrink-0" />
                  {room.sizeM2} m²
                </span>
              </div>

              <div className="space-y-0.5 sm:space-y-1">
                <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-[#777777] dark:text-[#A39E93] block">Capacity</span>
                <span className="text-sm sm:text-base md:text-lg font-serif-luxury text-[#171717] dark:text-[#FAF8F5] tabular-nums font-semibold flex items-center gap-1 sm:gap-1.5">
                  <Users className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-[#A67C52] dark:text-[#C5A880] shrink-0" />
                  {room.maxGuests} Guests
                </span>
              </div>

              <div className="space-y-0.5 sm:space-y-1">
                <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-[#777777] dark:text-[#A39E93] block">Bedding</span>
                <span className="text-xs sm:text-sm font-medium text-[#171717] dark:text-[#FAF8F5] flex items-center gap-1 sm:gap-1.5 pt-0.5">
                  <Bed className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-[#A67C52] dark:text-[#C5A880] shrink-0" />
                  <span className="truncate">{room.bedType}</span>
                </span>
              </div>

              <div className="space-y-0.5 sm:space-y-1">
                <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-[#777777] dark:text-[#A39E93] block">Vistas</span>
                <span className="text-xs sm:text-sm font-medium text-[#171717] dark:text-[#FAF8F5] flex items-center gap-1 sm:gap-1.5 pt-0.5">
                  <Compass className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-[#A67C52] dark:text-[#C5A880] shrink-0" />
                  <span className="truncate">{room.viewType}</span>
                </span>
              </div>
            </div>

            {/* Description Narrative */}
            <div className="bg-white dark:bg-[#16161A] border border-[#E5E0D8] dark:border-[#2C2A26] p-4 sm:p-8 space-y-4 sm:space-y-6 transition-colors">
              <h3 className="text-lg sm:text-2xl font-serif-luxury text-[#171717] dark:text-[#FAF8F5]">Architectural Experience</h3>
              <p className="text-xs sm:text-sm text-[#777777] dark:text-[#A39E93] font-light leading-relaxed">
                {room.fullDescription}
              </p>

              <div className="pt-3 sm:pt-4 border-t border-[#E5E0D8] dark:border-[#2C2A26]">
                <h4 className="text-[11px] sm:text-xs uppercase tracking-[0.2em] text-[#171717] dark:text-[#FAF8F5] font-semibold mb-3">
                  Key Sanctuary Highlights
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                  {room.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 sm:gap-2.5 text-xs sm:text-sm text-stone-700 dark:text-stone-300">
                      <CheckCircle2 className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-[#A67C52] dark:text-[#C5A880] shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Amenities Included */}
            <div className="bg-white dark:bg-[#16161A] border border-[#E5E0D8] dark:border-[#2C2A26] p-4 sm:p-8 space-y-4 sm:space-y-6 transition-colors">
              <h3 className="text-lg sm:text-2xl font-serif-luxury text-[#171717] dark:text-[#FAF8F5]">Included In-Room Amenities</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-4">
                {room.amenities.map((amenity, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 sm:gap-3 text-xs sm:text-sm text-stone-700 dark:text-stone-300 p-2 sm:p-2.5 bg-[#F8F6F1] dark:bg-[#111114] border border-[#E5E0D8]/60 dark:border-[#2C2A26]">
                    <Sparkles className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-[#A67C52] dark:text-[#C5A880] shrink-0" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Contiguous Purchase / Reservation Module */}
          <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-28 space-y-6">
            <div className="bg-white dark:bg-[#16161A] border border-[#E5E0D8] dark:border-[#2C2A26] p-4 sm:p-8 shadow-xl space-y-4 sm:space-y-6 transition-colors">
              <div className="flex items-baseline justify-between border-b border-[#E5E0D8] dark:border-[#2C2A26] pb-3 sm:pb-4 gap-2">
                <div>
                  <span className="text-[10px] sm:text-xs text-[#777777] dark:text-[#A39E93] uppercase tracking-wider block">Nightly Rate</span>
                  <span className="text-xl sm:text-3xl font-serif-luxury font-normal text-[#171717] dark:text-[#FAF8F5] tabular-nums">
                    {formatPKR(room.pricePerNightPKR)}
                  </span>
                </div>
                <span className="text-[10px] sm:text-xs text-[#777777] dark:text-[#A39E93] shrink-0">/ night</span>
              </div>

              <form onSubmit={handleReserve} className="space-y-3 sm:space-y-4">
                {/* Dates */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] sm:text-[11px] uppercase tracking-wider font-semibold text-[#777777] dark:text-[#A39E93] mb-1">
                      Check-In
                    </label>
                    <input
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="w-full bg-[#F8F6F1] dark:bg-[#111114] border border-[#E5E0D8] dark:border-[#2C2A26] min-h-[44px] px-3 py-2 text-sm text-[#171717] dark:text-[#FAF8F5] focus:outline-none focus:border-[#A67C52] dark:focus:border-[#C5A880]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] sm:text-[11px] uppercase tracking-wider font-semibold text-[#777777] dark:text-[#A39E93] mb-1">
                      Check-Out
                    </label>
                    <input
                      type="date"
                      min={checkIn}
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="w-full bg-[#F8F6F1] dark:bg-[#111114] border border-[#E5E0D8] dark:border-[#2C2A26] min-h-[44px] px-3 py-2 text-sm text-[#171717] dark:text-[#FAF8F5] focus:outline-none focus:border-[#A67C52] dark:focus:border-[#C5A880]"
                      required
                    />
                  </div>
                </div>

                {/* Guests & Room Count */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] sm:text-[11px] uppercase tracking-wider font-semibold text-[#777777] dark:text-[#A39E93] mb-1">
                      Guests
                    </label>
                    <select
                      value={guests}
                      onChange={(e) => setGuests(Number(e.target.value))}
                      className="w-full bg-[#F8F6F1] dark:bg-[#111114] border border-[#E5E0D8] dark:border-[#2C2A26] min-h-[44px] px-3 py-2 text-sm text-[#171717] dark:text-[#FAF8F5] focus:outline-none focus:border-[#A67C52] dark:focus:border-[#C5A880]"
                    >
                      {Array.from({ length: room.maxGuests }, (_, i) => i + 1).map((n) => (
                        <option key={n} value={n} className="dark:bg-[#16161A]">
                          {n} {n === 1 ? 'Guest' : 'Guests'}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] sm:text-[11px] uppercase tracking-wider font-semibold text-[#777777] dark:text-[#A39E93] mb-1">
                      Rooms
                    </label>
                    <select
                      value={roomsCount}
                      onChange={(e) => setRoomsCount(Number(e.target.value))}
                      className="w-full bg-[#F8F6F1] dark:bg-[#111114] border border-[#E5E0D8] dark:border-[#2C2A26] min-h-[44px] px-3 py-2 text-sm text-[#171717] dark:text-[#FAF8F5] focus:outline-none focus:border-[#A67C52] dark:focus:border-[#C5A880]"
                    >
                      <option value={1} className="dark:bg-[#16161A]">1 Sanctuary</option>
                      <option value={2} className="dark:bg-[#16161A]">2 Sanctuaries</option>
                    </select>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="bg-[#F8F6F1] dark:bg-[#111114] border border-[#E5E0D8] dark:border-[#2C2A26] p-3.5 sm:p-4 text-xs space-y-2">
                  <div className="flex justify-between text-stone-600 dark:text-stone-400 gap-2">
                    <span className="truncate">
                      {formatPKR(room.pricePerNightPKR)} × {nights} {nights === 1 ? 'nt' : 'nts'}
                    </span>
                    <span className="font-mono tabular-nums shrink-0">{formatPKR(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-stone-600 dark:text-stone-400 gap-2">
                    <span>GST & Hospitality (16%)</span>
                    <span className="font-mono tabular-nums shrink-0">{formatPKR(tax)}</span>
                  </div>
                  <div className="pt-2 border-t border-[#E5E0D8] dark:border-[#2C2A26] flex justify-between font-semibold text-stone-900 dark:text-stone-100 text-sm gap-2">
                    <span>Estimated Total</span>
                    <span className="font-mono tabular-nums text-[#A67C52] dark:text-[#C5A880] text-sm sm:text-base shrink-0">
                      {formatPKR(total)}
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#A67C52] hover:bg-[#8C653E] text-white min-h-[44px] py-3.5 px-4 text-xs uppercase tracking-[0.18em] font-semibold transition-colors duration-200 shadow-md flex items-center justify-center gap-2 active:scale-98"
                >
                  <span>Reserve This Room</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              <div className="pt-1 text-center text-[10px] sm:text-[11px] text-stone-500 dark:text-stone-400 space-y-0.5">
                <p>✓ No prepayment needed for demo confirmation</p>
                <p>✓ Free cancellation up to 24h before arrival</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
