import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Users, DoorOpen, Search, ArrowRight } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { useToast } from './Toast';

interface QuickSearchProps {
  className?: string;
  variant?: 'floating' | 'inline';
}

export const QuickSearch: React.FC<QuickSearchProps> = ({
  className = '',
  variant = 'floating',
}) => {
  const navigate = useNavigate();
  const { searchDates, setSearchDates, setBookingDraft, calculateNights } = useBooking();
  const { showToast } = useToast();

  const [checkIn, setCheckIn] = useState(searchDates.checkIn);
  const [checkOut, setCheckOut] = useState(searchDates.checkOut);
  const [guests, setGuests] = useState(searchDates.guests);
  const [roomsCount, setRoomsCount] = useState(searchDates.roomsCount);

  // Today's date string for input min attribute
  const todayStr = new Date().toISOString().split('T')[0];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (!checkIn || !checkOut) {
      showToast('Please select both check-in and check-out dates.', 'error');
      return;
    }

    if (checkIn < todayStr) {
      showToast('Check-in date cannot be in the past.', 'error');
      return;
    }

    if (checkOut <= checkIn) {
      showToast('Check-out date must be after check-in date.', 'error');
      return;
    }

    const nights = calculateNights(checkIn, checkOut);

    setSearchDates({
      checkIn,
      checkOut,
      guests,
      roomsCount,
    });

    setBookingDraft((prev) => ({
      ...prev,
      checkIn,
      checkOut,
      guests,
      roomsCount,
    }));

    showToast(`Found luxury availability for ${nights} ${nights === 1 ? 'night' : 'nights'} in Islamabad.`, 'success');
    navigate('/rooms');
  };

  const currentNights = calculateNights(checkIn, checkOut);

  return (
    <div
      className={`bg-white dark:bg-[#16161A] border border-[#E5E0D8] dark:border-[#2C2A26] shadow-2xl p-4 sm:p-6 lg:p-8 transition-colors duration-200 ${
        variant === 'floating'
          ? 'max-w-6xl mx-auto -mt-12 sm:-mt-16 md:-mt-20 relative z-20'
          : 'max-w-5xl mx-auto'
      } ${className}`}
    >
      <form onSubmit={handleSearch} className="space-y-4">
        <div className="flex items-center justify-between border-b border-[#E5E0D8] dark:border-[#2C2A26] pb-3 text-xs uppercase tracking-[0.15em] text-[#777777] dark:text-[#A39E93] font-medium">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#A67C52] dark:bg-[#C5A880]" />
            <span className="text-[11px] sm:text-xs">Select Your Stay Dates</span>
          </div>
          <div className="text-[#333333] dark:text-stone-300 font-mono tabular-nums text-[11px] sm:text-xs">
            {checkIn && checkOut && checkOut > checkIn ? (
              <span>{currentNights} {currentNights === 1 ? 'Night' : 'Nights'} Stay</span>
            ) : (
              <span>Choose Dates</span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 pt-1">
          {/* Check-In */}
          <div className="space-y-1.5">
            <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#777777] dark:text-[#A39E93] flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#A67C52] dark:text-[#C5A880]" />
              Check-In Date
            </label>
            <input
              type="date"
              min={todayStr}
              value={checkIn}
              onChange={(e) => {
                setCheckIn(e.target.value);
                // Auto-bump checkout if invalid
                if (e.target.value >= checkOut) {
                  const d = new Date(e.target.value);
                  d.setDate(d.getDate() + 1);
                  setCheckOut(d.toISOString().split('T')[0]);
                }
              }}
              required
              className="w-full bg-[#F8F6F1] dark:bg-[#111114] border border-[#E5E0D8] dark:border-[#2C2A26] min-h-[44px] text-sm text-[#171717] dark:text-[#FAF8F5] px-3.5 py-2.5 focus:outline-none focus:border-[#A67C52] dark:focus:border-[#C5A880] transition-colors"
            />
          </div>

          {/* Check-Out */}
          <div className="space-y-1.5">
            <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#777777] dark:text-[#A39E93] flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#A67C52] dark:text-[#C5A880]" />
              Check-Out Date
            </label>
            <input
              type="date"
              min={checkIn || todayStr}
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              required
              className="w-full bg-[#F8F6F1] dark:bg-[#111114] border border-[#E5E0D8] dark:border-[#2C2A26] min-h-[44px] text-sm text-[#171717] dark:text-[#FAF8F5] px-3.5 py-2.5 focus:outline-none focus:border-[#A67C52] dark:focus:border-[#C5A880] transition-colors"
            />
          </div>

          {/* Guests */}
          <div className="space-y-1.5">
            <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#777777] dark:text-[#A39E93] flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-[#A67C52] dark:text-[#C5A880]" />
              Guests
            </label>
            <select
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className="w-full bg-[#F8F6F1] dark:bg-[#111114] border border-[#E5E0D8] dark:border-[#2C2A26] min-h-[44px] text-sm text-[#171717] dark:text-[#FAF8F5] px-3.5 py-2.5 focus:outline-none focus:border-[#A67C52] dark:focus:border-[#C5A880] transition-colors"
            >
              <option value={1}>1 Guest</option>
              <option value={2}>2 Guests</option>
              <option value={3}>3 Guests</option>
              <option value={4}>4 Guests (Penthouse / Suite)</option>
            </select>
          </div>

          {/* Action Button */}
          <div className="flex items-end">
            <button
              type="submit"
              className="w-full bg-[#171717] dark:bg-[#A67C52] hover:bg-[#A67C52] dark:hover:bg-[#8C653E] text-white min-h-[44px] py-3 px-5 text-xs uppercase tracking-[0.18em] font-semibold transition-colors duration-200 flex items-center justify-center gap-2 whitespace-nowrap shadow-sm group"
            >
              <Search className="w-3.5 h-3.5 text-[#A67C52] dark:text-stone-200 group-hover:text-white transition-colors" />
              <span>Check Availability</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
