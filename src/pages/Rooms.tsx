import React, { useState, useMemo } from 'react';
import { ROOMS } from '../data/rooms';
import { Room, RoomType } from '../types';
import { SectionHeading } from '../components/SectionHeading';
import { RoomCard } from '../components/RoomCard';
import { SlidersHorizontal, ArrowUpDown, Filter, RotateCcw } from 'lucide-react';

export const Rooms: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [minGuests, setMinGuests] = useState<number>(1);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');
  const [maxPrice, setMaxPrice] = useState<number>(80000);

  const filteredRooms = useMemo(() => {
    return ROOMS.filter((room) => {
      // Room Type filter
      if (selectedType !== 'all' && room.category !== selectedType) {
        return false;
      }
      // Guests filter
      if (room.maxGuests < minGuests) {
        return false;
      }
      // Max price filter
      if (room.pricePerNightPKR > maxPrice) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') {
        return a.pricePerNightPKR - b.pricePerNightPKR;
      }
      if (sortBy === 'price-desc') {
        return b.pricePerNightPKR - a.pricePerNightPKR;
      }
      return 0; // featured/default order
    });
  }, [selectedType, minGuests, sortBy, maxPrice]);

  const resetFilters = () => {
    setSelectedType('all');
    setMinGuests(1);
    setSortBy('featured');
    setMaxPrice(80000);
  };

  return (
    <div className="pt-24 sm:pt-28 pb-16 sm:pb-24 bg-[#F8F6F1] dark:bg-[#0E0E11] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="py-4 sm:py-8">
          <SectionHeading
            subtitle="Accommodations & Penthouse Living"
            title="Sanctuaries Designed for Deep Rest"
            description="Explore our curated collection of rooms and suites in Islamabad, each offering bespoke furnishings, acoustic isolation, and panoramic horizon vistas."
          />
        </div>

        {/* Filter and Sort Toolbar */}
        <div className="bg-white dark:bg-[#16161A] border border-[#E5E0D8] dark:border-[#2C2A26] p-3.5 sm:p-6 mb-8 sm:mb-10 shadow-sm transition-colors duration-200">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 sm:gap-6">
            {/* Filter Tabs / Segmented controls for Room Type */}
            <div className="space-y-1.5">
              <label className="text-[11px] uppercase tracking-wider font-semibold text-[#777777] dark:text-[#A39E93] flex items-center gap-1.5">
                <Filter className="w-3.5 h-3.5 text-[#A67C52] dark:text-[#C5A880]" />
                Room Collection
              </label>
              <div className="flex items-center flex-wrap gap-1 p-1 bg-[#F8F6F1] dark:bg-[#111114] border border-[#E5E0D8] dark:border-[#2C2A26]">
                <button
                  type="button"
                  onClick={() => setSelectedType('all')}
                  className={`px-2.5 sm:px-3 py-1.5 text-[11px] sm:text-xs font-medium transition-colors whitespace-nowrap min-h-[34px] ${
                    selectedType === 'all'
                      ? 'bg-[#171717] dark:bg-[#A67C52] text-white shadow-xs'
                      : 'text-[#777777] dark:text-[#A39E93] hover:text-[#171717] dark:hover:text-[#FAF8F5]'
                  }`}
                >
                  All ({ROOMS.length})
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedType('deluxe')}
                  className={`px-2.5 sm:px-3 py-1.5 text-[11px] sm:text-xs font-medium transition-colors whitespace-nowrap min-h-[34px] ${
                    selectedType === 'deluxe'
                      ? 'bg-[#171717] dark:bg-[#A67C52] text-white shadow-xs'
                      : 'text-[#777777] dark:text-[#A39E93] hover:text-[#171717] dark:hover:text-[#FAF8F5]'
                  }`}
                >
                  Deluxe King
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedType('suite')}
                  className={`px-2.5 sm:px-3 py-1.5 text-[11px] sm:text-xs font-medium transition-colors whitespace-nowrap min-h-[34px] ${
                    selectedType === 'suite'
                      ? 'bg-[#171717] dark:bg-[#A67C52] text-white shadow-xs'
                      : 'text-[#777777] dark:text-[#A39E93] hover:text-[#171717] dark:hover:text-[#FAF8F5]'
                  }`}
                >
                  Executive Suite
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedType('presidential')}
                  className={`px-2.5 sm:px-3 py-1.5 text-[11px] sm:text-xs font-medium transition-colors whitespace-nowrap min-h-[34px] ${
                    selectedType === 'presidential'
                      ? 'bg-[#171717] dark:bg-[#A67C52] text-white shadow-xs'
                      : 'text-[#777777] dark:text-[#A39E93] hover:text-[#171717] dark:hover:text-[#FAF8F5]'
                  }`}
                >
                  Presidential Suite
                </button>
              </div>
            </div>

            {/* Capacity & Price Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 lg:items-end">
              {/* Guests */}
              <div className="space-y-1.5">
                <label className="text-[11px] uppercase tracking-wider font-semibold text-[#777777] dark:text-[#A39E93]">
                  Min Guests
                </label>
                <select
                  value={minGuests}
                  onChange={(e) => setMinGuests(Number(e.target.value))}
                  className="w-full bg-[#F8F6F1] dark:bg-[#111114] border border-[#E5E0D8] dark:border-[#2C2A26] text-xs px-3 py-2 min-h-[40px] text-[#171717] dark:text-[#FAF8F5] focus:outline-none focus:border-[#A67C52] dark:focus:border-[#C5A880]"
                >
                  <option value={1} className="dark:bg-[#16161A]">1+ Guests</option>
                  <option value={2} className="dark:bg-[#16161A]">2+ Guests</option>
                  <option value={3} className="dark:bg-[#16161A]">3+ Guests</option>
                  <option value={4} className="dark:bg-[#16161A]">4 Guests</option>
                </select>
              </div>

              {/* Price Cap */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-[11px] uppercase tracking-wider font-semibold text-[#777777] dark:text-[#A39E93]">
                  <span>Max Budget</span>
                  <span className="text-[#171717] dark:text-[#FAF8F5] font-mono tabular-nums">PKR {maxPrice.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min={25000}
                  max={80000}
                  step={5000}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#A67C52] dark:accent-[#C5A880] cursor-pointer min-h-[30px]"
                />
              </div>

              {/* Sorting */}
              <div className="space-y-1.5">
                <label className="text-[11px] uppercase tracking-wider font-semibold text-[#777777] dark:text-[#A39E93] flex items-center gap-1.5">
                  <ArrowUpDown className="w-3.5 h-3.5 text-[#A67C52] dark:text-[#C5A880]" />
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="w-full bg-[#F8F6F1] dark:bg-[#111114] border border-[#E5E0D8] dark:border-[#2C2A26] text-xs px-3 py-2 min-h-[40px] text-[#171717] dark:text-[#FAF8F5] focus:outline-none focus:border-[#A67C52] dark:focus:border-[#C5A880]"
                >
                  <option value="featured" className="dark:bg-[#16161A]">Featured Suites</option>
                  <option value="price-asc" className="dark:bg-[#16161A]">Price: Low to High</option>
                  <option value="price-desc" className="dark:bg-[#16161A]">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>

          {/* Active filter count & reset */}
          <div className="mt-3.5 pt-3 border-t border-[#E5E0D8] dark:border-[#2C2A26] flex flex-wrap items-center justify-between gap-2 text-xs text-[#777777] dark:text-[#A39E93]">
            <div>
              Showing <strong className="text-[#171717] dark:text-[#FAF8F5] tabular-nums">{filteredRooms.length}</strong> available suite {filteredRooms.length === 1 ? 'option' : 'options'}
            </div>
            {(selectedType !== 'all' || minGuests > 1 || sortBy !== 'featured' || maxPrice < 80000) && (
              <button
                onClick={resetFilters}
                className="inline-flex items-center gap-1.5 text-xs text-[#A67C52] dark:text-[#C5A880] hover:text-[#8C653E] dark:hover:text-[#D4BB95] font-medium py-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>
        </div>

        {/* Room Listings Grid */}
        {filteredRooms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredRooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-[#16161A] border border-[#E5E0D8] dark:border-[#2C2A26] p-8 sm:p-12 text-center space-y-4 max-w-xl mx-auto shadow-sm">
            <h3 className="text-xl font-serif-luxury text-[#171717] dark:text-[#FAF8F5]">No Rooms Match Your Criteria</h3>
            <p className="text-xs sm:text-sm text-[#777777] dark:text-[#A39E93]">
              Try adjusting your guest capacity or budget slider to explore our available accommodation tiers.
            </p>
            <button
              onClick={resetFilters}
              className="px-6 py-3 min-h-[44px] bg-[#171717] dark:bg-[#A67C52] hover:bg-[#A67C52] dark:hover:bg-[#8C653E] text-white text-xs uppercase tracking-wider font-semibold transition-colors"
            >
              Show All Accommodations
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
