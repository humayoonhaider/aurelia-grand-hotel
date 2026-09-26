import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Calendar } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change and toggle body scroll lock
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Rooms', path: '/rooms' },
    { name: 'Dining', path: '/dining' },
    { name: 'Amenities', path: '/amenities' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <header
        style={{
          paddingTop: isScrolled
            ? 'max(0.75rem, env(safe-area-inset-top, 0px))'
            : 'max(1.25rem, env(safe-area-inset-top, 0px))',
        }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#171717]/95 backdrop-blur-md pb-3 sm:pb-4 border-b border-stone-800 shadow-lg'
            : 'bg-gradient-to-b from-black/85 via-black/45 to-transparent pb-4 sm:pb-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between min-h-[44px]">
            {/* Zone 1: Single text element wordmark */}
            <Link
              to="/"
              className="text-lg sm:text-2xl font-normal tracking-[0.16em] sm:tracking-[0.18em] text-white uppercase font-serif-luxury transition-colors hover:text-[#A67C52] py-1"
            >
              AURELIA GRAND
            </Link>

            {/* Zone 2: 4-6 clean text navigation links */}
            <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`text-xs uppercase tracking-[0.15em] font-medium transition-colors relative py-1.5 ${
                      isActive
                        ? 'text-[#A67C52]'
                        : 'text-stone-300 hover:text-white'
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#A67C52]" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Zone 3: Actions + Dark Theme Toggle */}
            <div className="hidden md:flex items-center space-x-3 lg:space-x-4">
              <ThemeToggle />
              <button
                onClick={() => navigate('/booking')}
                className="inline-flex items-center gap-2 px-5 py-2.5 min-h-[40px] text-xs uppercase tracking-[0.15em] font-semibold text-white bg-[#A67C52] hover:bg-[#8C653E] transition-colors whitespace-nowrap shadow-sm active:scale-98"
              >
                <Calendar className="w-3.5 h-3.5" />
                Book Your Stay
              </button>
            </div>

            {/* Mobile menu toggle & Theme button */}
            <div className="flex md:hidden items-center gap-2">
              <ThemeToggle className="min-h-[38px] min-w-[38px] p-1.5" />
              <button
                onClick={() => navigate('/booking')}
                className="px-3 py-2 min-h-[38px] text-[11px] uppercase tracking-wider font-semibold text-white bg-[#A67C52] active:bg-[#8C653E] whitespace-nowrap"
              >
                Book
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-stone-300 hover:text-white transition-colors"
                aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div
          style={{
            paddingTop: 'max(5.5rem, calc(4.5rem + env(safe-area-inset-top, 0px)))',
            paddingBottom: 'max(2rem, env(safe-area-inset-bottom, 0px))',
            paddingLeft: 'max(1.5rem, env(safe-area-inset-left, 0px))',
            paddingRight: 'max(1.5rem, env(safe-area-inset-right, 0px))',
          }}
          className="fixed inset-0 z-30 bg-[#171717]/98 flex flex-col justify-between md:hidden animate-in fade-in duration-200 overflow-y-auto"
        >
          <nav className="flex flex-col space-y-4 sm:space-y-6">
            <div className="flex items-center justify-between pb-2 border-b border-stone-800">
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#A67C52] font-semibold">
                Navigation
              </span>
              <ThemeToggle showLabel={true} className="py-1 px-2.5 min-h-[32px]" />
            </div>
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-lg sm:text-xl font-serif-luxury tracking-wide py-1 transition-colors ${
                    isActive ? 'text-[#A67C52]' : 'text-stone-200 hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          <div className="space-y-4 pt-6 border-t border-stone-800 mt-auto">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                navigate('/booking');
              }}
              className="w-full py-3.5 min-h-[44px] text-xs uppercase tracking-[0.18em] font-semibold text-white bg-[#A67C52] hover:bg-[#8C653E] transition-colors text-center"
            >
              Book Your Stay
            </button>
            <div className="text-center text-[10px] sm:text-[11px] text-stone-500 tracking-wider">
              Aurelia Grand Hotel · Islamabad, Pakistan
            </div>
          </div>
        </div>
      )}
    </>
  );
};
