import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ROOMS } from '../data/rooms';
import { AMENITIES } from '../data/amenities';
import { RESTAURANT_INFO } from '../data/menu';
import { QuickSearch } from '../components/QuickSearch';
import { SectionHeading } from '../components/SectionHeading';
import { RoomCard } from '../components/RoomCard';
import { OptimizedImage } from '../components/OptimizedImage';
import { ArrowRight, Compass, Sparkles, Utensils, Shield, CheckCircle } from 'lucide-react';

export const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-0">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[92vh] lg:min-h-screen flex items-center justify-center bg-[#171717] overflow-hidden pt-24 sm:pt-28 pb-32 sm:pb-36">
        {/* Background Image with Scrim */}
        <div className="absolute inset-0 z-0">
          <OptimizedImage
            src="/src/assets/images/hero_hotel_facade_1790449575779.jpg"
            alt="Aurelia Grand Hotel Islamabad Facade"
            priority={true}
            className="opacity-45 scale-100"
            containerClassName="w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#171717] via-[#171717]/40 to-[#171717]/80 pointer-events-none" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white space-y-5 sm:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 bg-black/50 border border-[#A67C52]/40 backdrop-blur-md text-stone-200 text-[10px] sm:text-xs uppercase tracking-[0.25em]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#A67C52]" />
            <span>Islamabad, Pakistan</span>
          </div>

          <h1
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-normal tracking-tight font-serif-luxury leading-[1.15] sm:leading-[1.1]"
            style={{ textWrap: 'balance' }}
          >
            Stay Above Expectations.
          </h1>

          <p className="max-w-2xl mx-auto text-xs sm:text-base lg:text-lg text-stone-300 font-light leading-relaxed px-2">
            A refined urban retreat designed for comfort, calm and memorable stays in the heart of Islamabad.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-2 sm:pt-4">
            <Link
              to="/rooms"
              className="w-full sm:w-auto px-7 sm:px-8 py-3.5 min-h-[44px] text-xs uppercase tracking-[0.18em] font-semibold text-white bg-[#A67C52] hover:bg-[#8C653E] transition-all duration-200 text-center shadow-lg hover:shadow-xl flex items-center justify-center"
            >
              Explore Rooms
            </Link>
            <button
              onClick={() => navigate('/booking')}
              className="w-full sm:w-auto px-7 sm:px-8 py-3.5 min-h-[44px] text-xs uppercase tracking-[0.18em] font-semibold text-white bg-transparent border border-white/40 hover:bg-white hover:text-[#171717] transition-all duration-200 text-center flex items-center justify-center"
            >
              Book Your Stay
            </button>
          </div>

          {/* Quiet Trust Marker */}
          <div className="pt-6 sm:pt-8 flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-6 gap-y-2 text-[11px] sm:text-xs text-stone-400 font-light">
            <span>Margalla Views</span>
            <span aria-hidden="true" className="text-stone-600 hidden sm:inline">·</span>
            <span>Michelin-Caliber Dining</span>
            <span aria-hidden="true" className="text-stone-600 hidden sm:inline">·</span>
            <span>Rooftop Horizon Pool</span>
          </div>
        </div>
      </section>

      {/* 2. OVERLAPPING QUICK BOOKING SEARCH */}
      <section className="px-4 sm:px-6 lg:px-8 relative z-20 pb-12 sm:pb-16">
        <QuickSearch variant="floating" />
      </section>

      {/* 3. EDITORIAL STORY SECTION */}
      <section className="py-12 sm:py-20 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-6 space-y-4 sm:space-y-6">
            <span className="text-[11px] sm:text-xs uppercase tracking-[0.25em] text-[#A67C52] dark:text-[#C5A880] font-semibold block">
              Architectural Serenity
            </span>
            <h2
              className="text-2xl sm:text-4xl lg:text-5xl font-serif-luxury text-[#171717] dark:text-[#FAF8F5] leading-tight font-normal"
              style={{ textWrap: 'balance' }}
            >
              An elevated sanctuary framed against the Margalla ridgeline.
            </h2>
            <p className="text-xs sm:text-base text-[#777777] dark:text-[#A39E93] font-light leading-relaxed">
              Conceived as a tranquil counterbalance to the dynamic pace of Pakistan’s capital, Aurelia Grand brings together warm geometric stone facades, bespoke millwork, and restorative acoustic privacy.
            </p>
            <p className="text-xs sm:text-base text-[#777777] dark:text-[#A39E93] font-light leading-relaxed">
              Every detail—from the gentle scent of bergamot in the grand atrium to our hand-loomed organic linens—is designed to leave you quietly restored.
            </p>

            <div className="pt-3 sm:pt-4 grid grid-cols-2 gap-4 sm:gap-6 border-t border-[#E5E0D8] dark:border-[#2C2A26]">
              <div>
                <span className="block text-2xl sm:text-3xl font-serif-luxury text-[#171717] dark:text-[#FAF8F5]">24</span>
                <span className="text-[10px] sm:text-xs text-[#777777] dark:text-[#A39E93] uppercase tracking-wider">Levels of Refinement</span>
              </div>
              <div>
                <span className="block text-2xl sm:text-3xl font-serif-luxury text-[#171717] dark:text-[#FAF8F5]">100%</span>
                <span className="text-[10px] sm:text-xs text-[#777777] dark:text-[#A39E93] uppercase tracking-wider">Acoustic Shielding</span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] font-semibold text-[#171717] dark:text-stone-200 hover:text-[#A67C52] dark:hover:text-[#C5A880] transition-colors group"
              >
                <span>Read The Concept Story</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative border border-[#E5E0D8] dark:border-[#2C2A26] bg-white dark:bg-[#16161A] p-2 sm:p-3 shadow-xl">
              <OptimizedImage
                src="/src/assets/images/room_presidential_suite_1790449619590.jpg"
                alt="Aurelia Grand Interior Suite"
                aspectRatio="4/3"
              />
              <div className="p-3 sm:p-4 bg-[#F8F6F1] dark:bg-[#111114] mt-2 border-t border-[#E5E0D8] dark:border-[#2C2A26] flex items-center justify-between">
                <div>
                  <h4 className="text-xs sm:text-sm font-serif-luxury text-[#171717] dark:text-[#FAF8F5]">Penthouse Horizon Suite</h4>
                  <p className="text-[10px] sm:text-xs text-[#777777] dark:text-[#A39E93]">Level 24 · Panoramic Margalla Vistas</p>
                </div>
                <Link
                  to="/rooms/presidential-suite"
                  className="text-xs uppercase tracking-wider text-[#A67C52] dark:text-[#C5A880] font-semibold hover:underline shrink-0 ml-2"
                >
                  View Suite
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FEATURED ROOMS & SUITES */}
      <section className="py-16 sm:py-20 bg-stone-100/70 dark:bg-[#131317] border-y border-[#E5E0D8] dark:border-[#2C2A26] transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            subtitle="Accommodations"
            title="Sanctuaries of Quiet Luxury"
            description="Each room and suite is individually curated with custom furnishings, acoustic insulation, and sweeping capital views."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {ROOMS.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>

          <div className="mt-10 sm:mt-12 text-center">
            <Link
              to="/rooms"
              className="inline-flex items-center gap-2 px-7 sm:px-8 py-3.5 bg-[#171717] dark:bg-[#A67C52] hover:bg-[#A67C52] dark:hover:bg-[#8C653E] text-white text-xs uppercase tracking-[0.18em] font-semibold transition-colors duration-200"
            >
              <span>Explore All Accommodations</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. THE EMBER TABLE SPOTLIGHT */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#171717] text-white overflow-hidden grid grid-cols-1 lg:grid-cols-12 border border-stone-800 shadow-2xl">
          <div className="lg:col-span-7 relative min-h-[280px] sm:min-h-[360px] lg:min-h-[500px]">
            <OptimizedImage
              src="/src/assets/images/dining_ember_table_1790449634377.jpg"
              alt="The Ember Table Restaurant Ambiance"
              containerClassName="w-full h-full min-h-full"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#171717]/60 hidden lg:block" />
          </div>

          <div className="lg:col-span-5 p-6 sm:p-10 lg:p-14 flex flex-col justify-between space-y-6">
            <div className="space-y-3 sm:space-y-4">
              <span className="text-[11px] sm:text-xs uppercase tracking-[0.25em] text-[#A67C52] dark:text-[#C5A880] font-semibold block">
                Signature Gastronomy
              </span>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif-luxury font-normal text-white">
                {RESTAURANT_INFO.name}
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed">
                {RESTAURANT_INFO.tagline}
              </p>
              <div className="space-y-1.5 sm:space-y-2 text-xs text-stone-400 pt-2 border-t border-stone-800">
                <p><strong>Dinner:</strong> 19:00 – 23:30 (Wood-Fired Embers)</p>
                <p><strong>Location:</strong> Level 1 Terrace & Hearth Room</p>
                <p><strong>Dress:</strong> Smart Casual</p>
              </div>
            </div>

            <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row gap-3">
              <Link
                to="/dining"
                className="text-center px-6 py-3 bg-[#A67C52] hover:bg-[#8C653E] text-white text-xs uppercase tracking-[0.16em] font-semibold transition-colors"
              >
                View Menu & Reserve
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. AMENITIES HIGHLIGHT */}
      <section className="py-16 sm:py-20 bg-[#F8F6F1] dark:bg-[#0E0E11] transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            subtitle="Curated Lifestyle"
            title="Thoughtfully Appointed Amenities"
            description="From our heated horizon pool to rejuvenating spa rituals, every amenity is crafted to restore and inspire."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {AMENITIES.slice(0, 4).map((amenity) => (
              <div
                key={amenity.id}
                className="bg-white dark:bg-[#16161A] border border-[#E5E0D8] dark:border-[#2C2A26] p-5 sm:p-7 space-y-3 sm:space-y-4 hover:border-[#A67C52]/60 dark:hover:border-[#C5A880]/60 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-10 h-10 bg-[#F8F6F1] dark:bg-[#111114] border border-[#E5E0D8] dark:border-[#2C2A26] text-[#A67C52] dark:text-[#C5A880] flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] sm:text-[11px] text-[#A67C52] dark:text-[#C5A880] uppercase tracking-wider font-semibold">
                    {amenity.subtitle}
                  </span>
                  <h4 className="text-lg sm:text-xl font-serif-luxury text-[#171717] dark:text-[#FAF8F5]">{amenity.title}</h4>
                </div>
                <p className="text-xs text-[#777777] dark:text-[#A39E93] font-light leading-relaxed line-clamp-3">
                  {amenity.description}
                </p>
                <div className="pt-2 sm:pt-3 border-t border-[#E5E0D8] dark:border-[#2C2A26] text-[10px] sm:text-[11px] text-stone-500 dark:text-stone-400 font-mono">
                  {amenity.hours}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 sm:mt-10 text-center">
            <Link
              to="/amenities"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] font-semibold text-[#171717] dark:text-stone-200 hover:text-[#A67C52] dark:hover:text-[#C5A880] transition-colors"
            >
              <span>Explore All 8 Hotel Amenities</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 7. INVITATION CTA BANNER */}
      <section className="py-16 sm:py-20 bg-[#171717] text-white border-t border-stone-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5 sm:space-y-6">
          <span className="text-[11px] sm:text-xs uppercase tracking-[0.25em] text-[#A67C52] font-semibold">
            Direct Reservations
          </span>
          <h2
            className="text-2xl sm:text-4xl lg:text-5xl font-serif-luxury font-normal leading-tight"
            style={{ textWrap: 'balance' }}
          >
            Experience the Art of Calm Hospitality.
          </h2>
          <p className="text-xs sm:text-base text-stone-300 font-light leading-relaxed max-w-xl mx-auto px-2">
            Book directly through our portal for personalized concierge service, flexible arrival times, and preferred room assignments.
          </p>
          <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={() => navigate('/booking')}
              className="w-full sm:w-auto px-7 sm:px-8 py-3.5 bg-[#A67C52] hover:bg-[#8C653E] text-white text-xs uppercase tracking-[0.18em] font-semibold transition-colors shadow-lg"
            >
              Reserve Your Stay
            </button>
            <Link
              to="/contact"
              className="w-full sm:w-auto px-7 sm:px-8 py-3.5 bg-transparent border border-stone-700 hover:border-white text-stone-300 hover:text-white text-xs uppercase tracking-[0.18em] font-semibold transition-colors"
            >
              Contact Concierge
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
