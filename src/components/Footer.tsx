import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, ArrowRight, Check } from 'lucide-react';
import { useToast } from './Toast';

export const Footer: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { showToast } = useToast();

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      showToast('Please provide a valid email address.', 'error');
      return;
    }
    setIsSubscribed(true);
    showToast('Thank you for subscribing to Aurelia Grand seasonal dispatches.', 'success');
    setNewsletterEmail('');
  };

  return (
    <footer
      style={{
        paddingBottom: 'max(3rem, calc(2rem + env(safe-area-inset-bottom, 0px)))',
      }}
      className="bg-[#171717] text-[#F8F6F1] pt-14 sm:pt-16 border-t border-stone-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-8 pb-10 sm:pb-14 border-b border-stone-800">
          {/* Col 1: Brand & Concept Note */}
          <div className="lg:col-span-2 space-y-3.5 sm:space-y-4">
            <Link
              to="/"
              className="inline-block text-xl sm:text-2xl font-normal tracking-[0.2em] font-serif-luxury text-white uppercase hover:text-[#A67C52] transition-colors"
            >
              AURELIA GRAND
            </Link>
            <p className="text-[11px] sm:text-xs uppercase tracking-[0.2em] text-[#A67C52] font-medium">
              Stay Above Expectations · Islamabad
            </p>
            <p className="text-xs sm:text-sm text-stone-400 font-light leading-relaxed max-w-sm">
              A concept luxury hospitality project crafted by <strong>Zenvex</strong>, embodying refined architectural serenity, intuitive service, and thoughtful guest sanctuaries.
            </p>

            <div className="pt-1">
              <span className="inline-block px-3 py-1 text-[10px] sm:text-[11px] uppercase tracking-wider text-stone-300 bg-stone-900 border border-stone-800 font-mono">
                Concept Project · Portfolio Demo
              </span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-xs uppercase tracking-[0.2em] text-stone-200 font-semibold">
              Explore
            </h3>
            <ul className="space-y-2 sm:space-y-2.5 text-xs sm:text-sm text-stone-400">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Overview & Experience
                </Link>
              </li>
              <li>
                <Link to="/rooms" className="hover:text-white transition-colors">
                  Rooms & Penthouse Suites
                </Link>
              </li>
              <li>
                <Link to="/dining" className="hover:text-white transition-colors">
                  The Ember Table Dining
                </Link>
              </li>
              <li>
                <Link to="/amenities" className="hover:text-white transition-colors">
                  Wellness & Amenities
                </Link>
              </li>
              <li>
                <Link to="/booking" className="hover:text-[#A67C52] transition-colors font-medium">
                  Direct Reservations
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: About & Hospitality */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-xs uppercase tracking-[0.2em] text-stone-200 font-semibold">
              Hospitality
            </h3>
            <ul className="space-y-2 sm:space-y-2.5 text-xs sm:text-sm text-stone-400">
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  Architectural Philosophy
                </Link>
              </li>
              <li>
                <Link to="/about#location" className="hover:text-white transition-colors">
                  Capital Location
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Concierge & Inquiries
                </Link>
              </li>
              <li>
                <Link to="/dining#reservations" className="hover:text-white transition-colors">
                  Private Dining Bookings
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Location */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-xs uppercase tracking-[0.2em] text-stone-200 font-semibold">
              Location & Hours
            </h3>
            <div className="space-y-2.5 sm:space-y-3 text-xs sm:text-sm text-stone-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#A67C52] shrink-0 mt-0.5" />
                <span>Sector F-6, Margalla Vista Boulevard, Islamabad, Pakistan</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#A67C52] shrink-0" />
                <span>+92 (51) 849-2000</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#A67C52] shrink-0" />
                <span className="break-all">concierge@aureliagrand-demo.com</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#A67C52] shrink-0" />
                <span>Front Desk 24/7 Service</span>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter & Attribution Bottom Bar */}
        <div className="pt-6 sm:pt-8 flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 text-xs text-stone-500">
          <div className="text-center md:text-left space-y-1">
            <p className="text-stone-400 font-medium">
              © 2026 Aurelia Grand Hotel — Concept Project by{' '}
              <span className="text-white font-semibold tracking-wide">Zenvex</span>
            </p>
            <p className="text-[10px] sm:text-[11px] text-stone-600">
              Fictional demonstration website created for portfolio and client showcase purposes. No real monetary transactions or stays.
            </p>
          </div>

          {/* Clean newsletter subscription */}
          <form onSubmit={handleNewsletter} className="flex items-center w-full md:w-auto max-w-sm">
            <input
              type="email"
              placeholder="Join seasonal dispatches..."
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              className="bg-stone-900 border border-stone-700 px-3.5 py-2.5 min-h-[40px] text-xs text-white placeholder-stone-500 focus:outline-none focus:border-[#A67C52] w-full"
            />
            <button
              type="submit"
              className="bg-[#A67C52] hover:bg-[#8C653E] text-white px-4 py-2.5 min-h-[40px] text-xs uppercase font-medium tracking-wider transition-colors shrink-0 flex items-center justify-center gap-1.5"
            >
              {isSubscribed ? <Check className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
            </button>
          </form>
        </div>
      </div>
    </footer>
  );
};
