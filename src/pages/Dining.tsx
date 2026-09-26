import React, { useState } from 'react';
import { RESTAURANT_INFO, MENU_ITEMS } from '../data/menu';
import { MenuItem } from '../types';
import { SectionHeading } from '../components/SectionHeading';
import { TableReservationModal } from '../components/TableReservationModal';
import { OptimizedImage } from '../components/OptimizedImage';
import { useBooking } from '../context/BookingContext';
import { Utensils, Clock, Sparkles, Flame, Calendar, Award, Check } from 'lucide-react';

export const Dining: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [isReserveModalOpen, setIsReserveModalOpen] = useState<boolean>(false);
  const { formatPKR } = useBooking();

  const categories = [
    { id: 'all', label: 'Complete Menu' },
    { id: 'breakfast', label: 'Morning & Breakfast' },
    { id: 'starters', label: 'Starters & Crudo' },
    { id: 'mains', label: 'Wood-Fired Mains' },
    { id: 'desserts', label: 'Pastry & Desserts' },
    { id: 'beverages', label: 'Zero-Proof & Reserve' },
  ];

  const filteredItems = activeCategory === 'all'
    ? MENU_ITEMS
    : MENU_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <div className="pt-24 sm:pt-28 pb-20 sm:pb-24 bg-[#F8F6F1] dark:bg-[#0E0E11] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Banner for The Ember Table */}
        <div className="relative bg-[#171717] text-white border border-stone-800 overflow-hidden mb-10 sm:mb-16 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            <div className="lg:col-span-6 p-5 sm:p-8 lg:p-14 space-y-3.5 sm:space-y-6">
              <div className="inline-flex items-center gap-2 text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#A67C52] dark:text-[#C5A880] font-semibold">
                <Flame className="w-4 h-4 shrink-0" />
                <span>Signature Dining Experience</span>
              </div>
              <h1 className="text-2xl sm:text-4xl lg:text-6xl font-serif-luxury font-normal leading-tight">
                {RESTAURANT_INFO.name}
              </h1>
              <p className="text-xs sm:text-base text-stone-300 font-light leading-relaxed">
                {RESTAURANT_INFO.tagline}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-4 pt-3 sm:pt-4 border-t border-stone-800 text-xs text-stone-400">
                <div>
                  <strong className="text-stone-200 block mb-0.5">Dinner & Embers:</strong>
                  <span>{RESTAURANT_INFO.hours.dinner}</span>
                </div>
                <div>
                  <strong className="text-stone-200 block mb-0.5">Breakfast & Brunch:</strong>
                  <span>{RESTAURANT_INFO.hours.breakfast}</span>
                </div>
              </div>

              <div className="pt-2 sm:pt-4">
                <button
                  type="button"
                  onClick={() => setIsReserveModalOpen(true)}
                  className="w-full sm:w-auto px-7 sm:px-8 py-3.5 min-h-[44px] bg-[#A67C52] hover:bg-[#8C653E] text-white text-xs uppercase tracking-[0.18em] font-semibold transition-colors flex items-center justify-center gap-2 shadow-lg active:scale-98"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Reserve a Table</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-6 relative h-[220px] sm:h-[320px] lg:h-[480px]">
              <OptimizedImage
                src="/images/dining_ember_table_1790449634377.jpg"
                alt="The Ember Table Interior"
                containerClassName="w-full h-full"
                priority={true}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#171717]/80 via-transparent to-transparent lg:hidden pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Philosophy & Culinary Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8 mb-10 sm:mb-16">
          <div className="bg-white dark:bg-[#16161A] border border-[#E5E0D8] dark:border-[#2C2A26] p-4 sm:p-8 space-y-2 sm:space-y-3 transition-colors">
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#A67C52] dark:text-[#C5A880] font-semibold">01. Open Hearth</span>
            <h3 className="text-base sm:text-xl font-serif-luxury text-[#171717] dark:text-[#FAF8F5]">Artisan Wood & Embers</h3>
            <p className="text-xs sm:text-sm text-[#777777] dark:text-[#A39E93] font-light leading-relaxed">
              Prime cuts, line-caught seafood, and indigenous vegetables grilled over aromatic applewood and wild olive charcoal.
            </p>
          </div>

          <div className="bg-white dark:bg-[#16161A] border border-[#E5E0D8] dark:border-[#2C2A26] p-4 sm:p-8 space-y-2 sm:space-y-3 transition-colors">
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#A67C52] dark:text-[#C5A880] font-semibold">02. Seasonal Terroir</span>
            <h3 className="text-base sm:text-xl font-serif-luxury text-[#171717] dark:text-[#FAF8F5]">Northern Foraged Botanicals</h3>
            <p className="text-xs sm:text-sm text-[#777777] dark:text-[#A39E93] font-light leading-relaxed">
              Hand-harvested morels from Northern Pakistan, wild acacia honey from the Margalla foothills, and organic heirloom produce.
            </p>
          </div>

          <div className="bg-white dark:bg-[#16161A] border border-[#E5E0D8] dark:border-[#2C2A26] p-4 sm:p-8 space-y-2 sm:space-y-3 transition-colors">
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#A67C52] dark:text-[#C5A880] font-semibold">03. Curated Cellar</span>
            <h3 className="text-base sm:text-xl font-serif-luxury text-[#171717] dark:text-[#FAF8F5]">Zero-Proof & Botanical Elixirs</h3>
            <p className="text-xs sm:text-sm text-[#777777] dark:text-[#A39E93] font-light leading-relaxed">
              Smoked saffron reductions, cold-pressed fruit shrubs, and single-origin specialty coffees brewed with surgical precision.
            </p>
          </div>
        </div>

        {/* Menu Section */}
        <div className="mb-8" id="menu">
          <SectionHeading
            subtitle="Curated Gastronomy"
            title="A La Carte Menu"
            description="Explore our season-driven menu thoughtfully crafted for communal dining and sensory enjoyment."
          />

          {/* Interactive Menu Tabs (Horizontally scrollable on mobile) */}
          <div className="flex items-center sm:justify-center overflow-x-auto no-scrollbar gap-1.5 sm:gap-2 pb-2 mb-6 sm:mb-10 px-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 sm:px-4 py-2 min-h-[38px] text-[11px] sm:text-xs font-medium uppercase tracking-wider whitespace-nowrap transition-all shrink-0 ${
                  activeCategory === cat.id
                    ? 'bg-[#171717] dark:bg-[#A67C52] text-white shadow-sm'
                    : 'bg-white dark:bg-[#16161A] border border-[#E5E0D8] dark:border-[#2C2A26] text-[#777777] dark:text-[#A39E93] hover:text-[#171717] dark:hover:text-[#FAF8F5] hover:border-stone-400 dark:hover:border-stone-600'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Menu Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-white dark:bg-[#16161A] border border-[#E5E0D8] dark:border-[#2C2A26] p-4 sm:p-6 space-y-2.5 sm:space-y-3 hover:border-[#A67C52]/50 dark:hover:border-[#C5A880]/50 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-1.5 sm:space-y-2">
                  <div className="flex items-baseline justify-between gap-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-sm sm:text-xl font-serif-luxury text-[#171717] dark:text-[#FAF8F5] font-medium">
                        {item.name}
                      </h4>
                      {item.tag && (
                        <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-[#A67C52] dark:text-[#C5A880] font-semibold border-b border-[#A67C52]/40 dark:border-[#C5A880]/40 pb-0.5">
                          {item.tag}
                        </span>
                      )}
                    </div>
                    <span className="text-xs sm:text-lg font-serif-luxury text-[#171717] dark:text-[#FAF8F5] tabular-nums font-medium shrink-0">
                      {formatPKR(item.pricePKR)}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-[#777777] dark:text-[#A39E93] font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#E5E0D8]/60 dark:border-[#2C2A26] flex items-center justify-between text-[10px] sm:text-[11px] text-stone-400 dark:text-stone-500 font-mono">
                  <span className="uppercase">{item.category}</span>
                  {item.isSignature && (
                    <span className="text-[#A67C52] dark:text-[#C5A880] font-medium">Chef's Signature</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Private Dining & Table Reservation Banner */}
        <div id="reservations" className="mt-12 sm:mt-16 bg-[#171717] text-white p-6 sm:p-12 border border-stone-800 text-center space-y-4 sm:space-y-6">
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#A67C52] dark:text-[#C5A880] font-semibold block">
            Table Bookings
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif-luxury">
            Reserve Your Evening at The Ember Table
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 max-w-lg mx-auto font-light leading-relaxed">
            Whether planning an intimate anniversary dinner, high-level business engagement, or celebratory gathering, our hosts ensure every detail is tailored.
          </p>
          <div>
            <button
              type="button"
              onClick={() => setIsReserveModalOpen(true)}
              className="w-full sm:w-auto px-7 sm:px-8 py-3.5 bg-[#A67C52] hover:bg-[#8C653E] text-white text-xs uppercase tracking-[0.18em] font-semibold transition-colors"
            >
              Book Table Online
            </button>
          </div>
        </div>
      </div>

      {/* Reservation Modal */}
      <TableReservationModal
        isOpen={isReserveModalOpen}
        onClose={() => setIsReserveModalOpen(false)}
      />
    </div>
  );
};
