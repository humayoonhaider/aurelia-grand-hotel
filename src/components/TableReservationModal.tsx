import React, { useState } from 'react';
import { X, Calendar, Clock, Users, CheckCircle2, Sparkles } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { useToast } from './Toast';
import { TableReservation } from '../types';

interface TableReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TableReservationModal: React.FC<TableReservationModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { createTableReservation } = useBooking();
  const { showToast } = useToast();

  const tomorrowStr = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  };

  const [date, setDate] = useState(tomorrowStr());
  const [time, setTime] = useState('20:00');
  const [guestsCount, setGuestsCount] = useState(2);
  const [diningSection, setDiningSection] = useState('Terrace View');
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [confirmedReservation, setConfirmedReservation] = useState<TableReservation | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!guestName.trim() || !guestEmail.trim() || !guestPhone.trim()) {
      showToast('Please fill in all required guest information.', 'error');
      return;
    }

    const res = createTableReservation({
      guestName: guestName.trim(),
      guestEmail: guestEmail.trim(),
      guestPhone: guestPhone.trim(),
      date,
      time,
      guestsCount,
      diningSection,
      specialRequests: specialRequests.trim(),
    });

    setConfirmedReservation(res);
    showToast('Table reservation confirmed at The Ember Table.', 'success');
  };

  const handleResetAndClose = () => {
    setConfirmedReservation(null);
    setGuestName('');
    setGuestEmail('');
    setGuestPhone('');
    setSpecialRequests('');
    onClose();
  };

  return (
    <div
      style={{
        paddingTop: 'max(1rem, env(safe-area-inset-top, 0px))',
        paddingBottom: 'max(1rem, env(safe-area-inset-bottom, 0px))',
        paddingLeft: 'max(1rem, env(safe-area-inset-left, 0px))',
        paddingRight: 'max(1rem, env(safe-area-inset-right, 0px))',
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div className="bg-white dark:bg-[#16161A] border border-[#E5E0D8] dark:border-[#2C2A26] max-w-xl w-full max-h-[92vh] overflow-y-auto p-4 sm:p-8 shadow-2xl relative transition-colors">
        <button
          onClick={handleResetAndClose}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 text-stone-400 hover:text-[#171717] dark:hover:text-white transition-colors p-2 min-w-[40px] min-h-[40px] flex items-center justify-center"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {confirmedReservation ? (
          <div className="text-center py-4 sm:py-6 space-y-4 sm:space-y-6">
            <div className="w-12 sm:w-14 h-12 sm:h-14 bg-[#A67C52]/10 dark:bg-[#C5A880]/15 text-[#A67C52] dark:text-[#C5A880] mx-auto flex items-center justify-center rounded-full">
              <CheckCircle2 className="w-7 sm:w-8 h-7 sm:h-8" />
            </div>

            <div>
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#A67C52] dark:text-[#C5A880] font-semibold block">
                Reservation Confirmed
              </span>
              <h3 className="text-xl sm:text-3xl font-serif-luxury text-[#171717] dark:text-[#FAF8F5] mt-1">
                The Ember Table
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 font-mono mt-1 break-all">
                Reference: {confirmedReservation.id}
              </p>
            </div>

            <div className="bg-[#F8F6F1] dark:bg-[#111114] border border-[#E5E0D8] dark:border-[#2C2A26] p-3.5 sm:p-5 text-left text-xs sm:text-sm space-y-2.5">
              <div className="flex justify-between border-b border-[#E5E0D8] dark:border-[#2C2A26] pb-2">
                <span className="text-stone-500 dark:text-stone-400">Guest Name:</span>
                <span className="font-semibold text-stone-900 dark:text-stone-100">{confirmedReservation.guestName}</span>
              </div>
              <div className="flex justify-between border-b border-[#E5E0D8] dark:border-[#2C2A26] pb-2">
                <span className="text-stone-500 dark:text-stone-400">Date & Time:</span>
                <span className="font-semibold text-stone-900 dark:text-stone-100">{confirmedReservation.date} at {confirmedReservation.time}</span>
              </div>
              <div className="flex justify-between border-b border-[#E5E0D8] dark:border-[#2C2A26] pb-2">
                <span className="text-stone-500 dark:text-stone-400">Party Size:</span>
                <span className="font-semibold text-stone-900 dark:text-stone-100">{confirmedReservation.guestsCount} Guests ({confirmedReservation.diningSection})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500 dark:text-stone-400">Dress Code:</span>
                <span className="font-semibold text-[#A67C52] dark:text-[#C5A880]">Smart Casual</span>
              </div>
            </div>

            <p className="text-xs text-stone-500 dark:text-stone-400 italic leading-relaxed">
              This is a demo table reservation experience. Your demo table is held in local storage.
            </p>

            <button
              onClick={handleResetAndClose}
              className="w-full bg-[#171717] dark:bg-[#A67C52] hover:bg-[#A67C52] dark:hover:bg-[#8C653E] text-white py-3 min-h-[44px] text-xs uppercase tracking-[0.18em] font-semibold transition-colors active:scale-98"
            >
              Done
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-4 sm:mb-6 pr-8">
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#A67C52] dark:text-[#C5A880] font-semibold block">
                Gastronomy Experience
              </span>
              <h3 className="text-xl sm:text-3xl font-serif-luxury text-[#171717] dark:text-[#FAF8F5] mt-0.5 sm:mt-1">
                Reserve a Table
              </h3>
              <p className="text-xs text-[#777777] dark:text-[#A39E93] mt-0.5 sm:mt-1">
                The Ember Table · Aurelia Grand Hotel Islamabad
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#777777] dark:text-[#A39E93] mb-1 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#A67C52] dark:text-[#C5A880]" />
                    Date
                  </label>
                  <input
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                    className="w-full bg-[#F8F6F1] dark:bg-[#111114] border border-[#E5E0D8] dark:border-[#2C2A26] min-h-[42px] px-3 py-2 text-sm text-[#171717] dark:text-[#FAF8F5] focus:outline-none focus:border-[#A67C52] dark:focus:border-[#C5A880]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#777777] dark:text-[#A39E93] mb-1 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#A67C52] dark:text-[#C5A880]" />
                    Seating Time
                  </label>
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full bg-[#F8F6F1] dark:bg-[#111114] border border-[#E5E0D8] dark:border-[#2C2A26] min-h-[42px] px-3 py-2 text-sm text-[#171717] dark:text-[#FAF8F5] focus:outline-none focus:border-[#A67C52] dark:focus:border-[#C5A880]"
                  >
                    <optgroup label="Dinner Service" className="dark:bg-[#16161A]">
                      <option value="19:00">19:00 (7:00 PM)</option>
                      <option value="19:30">19:30 (7:30 PM)</option>
                      <option value="20:00">20:00 (8:00 PM)</option>
                      <option value="20:30">20:30 (8:30 PM)</option>
                      <option value="21:00">21:00 (9:00 PM)</option>
                      <option value="21:30">21:30 (9:30 PM)</option>
                    </optgroup>
                    <optgroup label="Lunch Service" className="dark:bg-[#16161A]">
                      <option value="12:30">12:30 (12:30 PM)</option>
                      <option value="13:00">13:00 (1:00 PM)</option>
                      <option value="13:30">13:30 (1:30 PM)</option>
                      <option value="14:00">14:00 (2:00 PM)</option>
                    </optgroup>
                    <optgroup label="Breakfast Service" className="dark:bg-[#16161A]">
                      <option value="07:30">07:30 (7:30 AM)</option>
                      <option value="08:30">08:30 (8:30 AM)</option>
                      <option value="09:30">09:30 (9:30 AM)</option>
                    </optgroup>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#777777] dark:text-[#A39E93] mb-1 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-[#A67C52] dark:text-[#C5A880]" />
                    Party Size
                  </label>
                  <select
                    value={guestsCount}
                    onChange={(e) => setGuestsCount(Number(e.target.value))}
                    className="w-full bg-[#F8F6F1] dark:bg-[#111114] border border-[#E5E0D8] dark:border-[#2C2A26] min-h-[42px] px-3 py-2 text-sm text-[#171717] dark:text-[#FAF8F5] focus:outline-none focus:border-[#A67C52] dark:focus:border-[#C5A880]"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                      <option key={num} value={num} className="dark:bg-[#16161A]">
                        {num} {num === 1 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#777777] dark:text-[#A39E93] mb-1 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#A67C52] dark:text-[#C5A880]" />
                    Preferred Ambience
                  </label>
                  <select
                    value={diningSection}
                    onChange={(e) => setDiningSection(e.target.value)}
                    className="w-full bg-[#F8F6F1] dark:bg-[#111114] border border-[#E5E0D8] dark:border-[#2C2A26] min-h-[42px] px-3 py-2 text-sm text-[#171717] dark:text-[#FAF8F5] focus:outline-none focus:border-[#A67C52] dark:focus:border-[#C5A880]"
                  >
                    <option value="Terrace View" className="dark:bg-[#16161A]">Open-Air Margalla Terrace</option>
                    <option value="Hearth Dining" className="dark:bg-[#16161A]">Open Hearth Dining Hall</option>
                    <option value="Private Wine Alcove" className="dark:bg-[#16161A]">Private Wine Alcove</option>
                    <option value="Chef Counter" className="dark:bg-[#16161A]">Chef's Interactive Counter</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 border-t border-[#E5E0D8] dark:border-[#2C2A26] space-y-3">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#777777] dark:text-[#A39E93] mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Tariq Mansoor"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    required
                    className="w-full bg-[#F8F6F1] dark:bg-[#111114] border border-[#E5E0D8] dark:border-[#2C2A26] min-h-[42px] px-3 py-2 text-sm text-[#171717] dark:text-[#FAF8F5] focus:outline-none focus:border-[#A67C52] dark:focus:border-[#C5A880]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#777777] dark:text-[#A39E93] mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      placeholder="guest@example.com"
                      value={guestEmail}
                      onChange={(e) => setGuestEmail(e.target.value)}
                      required
                      className="w-full bg-[#F8F6F1] dark:bg-[#111114] border border-[#E5E0D8] dark:border-[#2C2A26] min-h-[42px] px-3 py-2 text-sm text-[#171717] dark:text-[#FAF8F5] focus:outline-none focus:border-[#A67C52] dark:focus:border-[#C5A880]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#777777] dark:text-[#A39E93] mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      placeholder="+92 300 1234567"
                      value={guestPhone}
                      onChange={(e) => setGuestPhone(e.target.value)}
                      required
                      className="w-full bg-[#F8F6F1] dark:bg-[#111114] border border-[#E5E0D8] dark:border-[#2C2A26] min-h-[42px] px-3 py-2 text-sm text-[#171717] dark:text-[#FAF8F5] focus:outline-none focus:border-[#A67C52] dark:focus:border-[#C5A880]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#777777] dark:text-[#A39E93] mb-1">
                    Special Dietary or Occasion Notes
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Anniversary celebration, vegetarian preference, quiet corner table..."
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    className="w-full bg-[#F8F6F1] dark:bg-[#111114] border border-[#E5E0D8] dark:border-[#2C2A26] px-3 py-2 text-sm text-[#171717] dark:text-[#FAF8F5] focus:outline-none focus:border-[#A67C52] dark:focus:border-[#C5A880]"
                  />
                </div>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full bg-[#171717] dark:bg-[#A67C52] hover:bg-[#A67C52] dark:hover:bg-[#8C653E] text-white min-h-[44px] py-3 px-4 text-xs uppercase tracking-[0.18em] font-semibold transition-colors duration-200 active:scale-98"
                >
                  Confirm Table Booking
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
