import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ROOMS, getRoomById } from '../data/rooms';
import { Room, BookingState, ConfirmedBookingRecord } from '../types';
import { useBooking } from '../context/BookingContext';
import { useToast } from '../components/Toast';
import { OptimizedImage } from '../components/OptimizedImage';
import {
  Calendar,
  Users,
  Bed,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Building,
  Sparkles,
  Printer,
  Copy,
  PlusCircle,
  FileText
} from 'lucide-react';

export const Booking: React.FC = () => {
  const navigate = useNavigate();
  const {
    bookingDraft,
    setBookingDraft,
    createBooking,
    calculateNights,
    calculateTotals,
    formatPKR,
    clearBookingDraft,
    confirmedBookings,
  } = useBooking();
  const { showToast } = useToast();

  const [activeStep, setActiveStep] = useState<number>(1);
  const [confirmedBooking, setConfirmedBooking] = useState<ConfirmedBookingRecord | null>(null);

  // Form states initialized from bookingDraft
  const [selectedRoomId, setSelectedRoomId] = useState<string>(bookingDraft.roomId || 'deluxe-king');
  const [checkIn, setCheckIn] = useState<string>(bookingDraft.checkIn);
  const [checkOut, setCheckOut] = useState<string>(bookingDraft.checkOut);
  const [guests, setGuests] = useState<number>(bookingDraft.guests || 2);
  const [roomsCount, setRoomsCount] = useState<number>(bookingDraft.roomsCount || 1);
  const [guestName, setGuestName] = useState<string>(bookingDraft.guestName || '');
  const [guestEmail, setGuestEmail] = useState<string>(bookingDraft.guestEmail || '');
  const [guestPhone, setGuestPhone] = useState<string>(bookingDraft.guestPhone || '');
  const [specialRequests, setSpecialRequests] = useState<string>(bookingDraft.specialRequests || '');

  const currentRoom = getRoomById(selectedRoomId) || ROOMS[0];
  const nights = calculateNights(checkIn, checkOut);
  const { subtotal, tax, total } = calculateTotals(currentRoom, nights, roomsCount);

  const todayStr = new Date().toISOString().split('T')[0];

  const handleNextStep = () => {
    if (activeStep === 1) {
      if (!selectedRoomId) {
        showToast('Please select an accommodation tier.', 'error');
        return;
      }
      setActiveStep(2);
    } else if (activeStep === 2) {
      if (!checkIn || !checkOut || checkOut <= checkIn) {
        showToast('Please select valid check-in and check-out dates.', 'error');
        return;
      }
      setActiveStep(3);
    } else if (activeStep === 3) {
      setActiveStep(4);
    } else if (activeStep === 4) {
      if (!guestName.trim() || !guestEmail.trim() || !guestPhone.trim()) {
        showToast('Please provide your name, email, and phone number.', 'error');
        return;
      }
      if (!guestEmail.includes('@')) {
        showToast('Please enter a valid email address.', 'error');
        return;
      }
      setActiveStep(5);
    }
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const bookingPayload: BookingState = {
      roomId: selectedRoomId,
      checkIn,
      checkOut,
      guests,
      roomsCount,
      guestName: guestName.trim(),
      guestEmail: guestEmail.trim(),
      guestPhone: guestPhone.trim(),
      specialRequests: specialRequests.trim(),
    };

    const record = createBooking(bookingPayload);
    setConfirmedBooking(record);
    setActiveStep(6);
    showToast(`Reservation request ${record.bookingReference} received successfully.`, 'success');
  };

  const copyRefToClipboard = (ref: string) => {
    navigator.clipboard.writeText(ref);
    showToast(`Booking reference ${ref} copied to clipboard.`, 'info');
  };

  const handleNewBooking = () => {
    clearBookingDraft();
    setConfirmedBooking(null);
    setActiveStep(1);
  };

  const stepLabels = ['Select Room', 'Stay Dates', 'Guest Count', 'Guest Info', 'Review & Confirm'];

  return (
    <div className="pt-24 sm:pt-28 pb-20 sm:pb-24 bg-[#F8F6F1] dark:bg-[#0E0E11] min-h-screen transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Step Indicator Header (if not on final confirmation) */}
        {activeStep <= 5 && (
          <div className="mb-6 sm:mb-10 text-center max-w-2xl mx-auto space-y-2 sm:space-y-3">
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#A67C52] dark:text-[#C5A880] font-semibold block">
              Reservation Concierge
            </span>
            <h1 className="text-xl sm:text-3xl md:text-4xl font-serif-luxury text-[#171717] dark:text-[#FAF8F5] px-2">
              Book Your Stay at Aurelia Grand
            </h1>
            <p className="text-xs sm:text-sm text-[#777777] dark:text-[#A39E93] max-w-md mx-auto px-2">
              Complete your reservation request in a few effortless steps.
            </p>

            {/* Stepper Progress */}
            <div className="pt-3 sm:pt-4 max-w-md mx-auto px-2">
              <div className="flex items-center justify-between">
                {[1, 2, 3, 4, 5].map((stepNum, idx) => (
                  <React.Fragment key={stepNum}>
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-6 sm:w-7 h-6 sm:h-7 text-[10px] sm:text-xs flex items-center justify-center font-mono transition-colors ${
                          activeStep === stepNum
                            ? 'bg-[#A67C52] dark:bg-[#C5A880] text-white dark:text-stone-950 font-bold ring-2 ring-[#A67C52]/30'
                            : activeStep > stepNum
                            ? 'bg-[#171717] dark:bg-stone-200 text-white dark:text-stone-900'
                            : 'bg-white dark:bg-[#16161A] border border-[#E5E0D8] dark:border-[#2C2A26] text-stone-400 dark:text-stone-500'
                        }`}
                      >
                        {activeStep > stepNum ? '✓' : stepNum}
                      </div>
                    </div>
                    {idx < 4 && (
                      <div
                        className={`flex-1 h-[1.5px] mx-1 sm:mx-2 min-w-[8px] transition-colors ${
                          activeStep > idx + 1 ? 'bg-[#171717] dark:bg-stone-300' : 'bg-[#E5E0D8] dark:bg-[#2C2A26]'
                        }`}
                      />
                    )}
                  </React.Fragment>
                ))}
              </div>
              <div className="mt-2 text-[11px] sm:text-xs uppercase tracking-wider text-stone-600 dark:text-stone-400 font-medium">
                Step {activeStep} of 5: <span className="text-[#171717] dark:text-[#FAF8F5] font-semibold">{stepLabels[activeStep - 1]}</span>
              </div>
            </div>
          </div>
        )}

        {/* STEP 6: CONFIRMATION RECEIPT */}
        {activeStep === 6 && confirmedBooking && (
          <div className="max-w-3xl mx-auto bg-white dark:bg-[#16161A] border border-[#E5E0D8] dark:border-[#2C2A26] p-4 sm:p-8 md:p-10 shadow-2xl space-y-6 sm:space-y-8 animate-in fade-in duration-300 transition-colors">
            <div className="text-center space-y-2 sm:space-y-3 border-b border-[#E5E0D8] dark:border-[#2C2A26] pb-5 sm:pb-6">
              <div className="w-12 sm:w-16 h-12 sm:w-16 bg-[#A67C52]/10 dark:bg-[#C5A880]/15 text-[#A67C52] dark:text-[#C5A880] mx-auto flex items-center justify-center rounded-full">
                <CheckCircle2 className="w-7 sm:w-9 h-7 sm:h-9" />
              </div>
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#A67C52] dark:text-[#C5A880] font-semibold block">
                Reservation Confirmed
              </span>
              <h2 className="text-xl sm:text-3xl md:text-4xl font-serif-luxury text-[#171717] dark:text-[#FAF8F5] px-2">
                Booking Request Received
              </h2>
              <p className="text-xs sm:text-sm text-[#777777] dark:text-[#A39E93] max-w-md mx-auto px-2">
                Thank you, <strong className="text-stone-900 dark:text-stone-100">{confirmedBooking.state.guestName}</strong>. Your reservation has been recorded in the demo system.
              </p>
            </div>

            {/* Reference banner */}
            <div className="bg-[#171717] dark:bg-black/90 text-white p-3.5 sm:p-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 border border-stone-800">
              <div className="text-center sm:text-left">
                <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-[#A67C52] dark:text-[#C5A880] block font-mono">
                  Demo Reference Number
                </span>
                <span className="text-base sm:text-xl md:text-2xl font-mono tracking-widest font-semibold break-all text-white">
                  {confirmedBooking.bookingReference}
                </span>
              </div>
              <button
                type="button"
                onClick={() => copyRefToClipboard(confirmedBooking.bookingReference)}
                className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-stone-800 hover:bg-stone-700 text-xs uppercase tracking-wider text-stone-200 transition-colors min-h-[38px] active:scale-98"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Ref</span>
              </button>
            </div>

            {/* Itemized Table */}
            <div className="bg-[#F8F6F1] dark:bg-[#111114] border border-[#E5E0D8] dark:border-[#2C2A26] p-3.5 sm:p-6 text-xs sm:text-sm space-y-3">
              <h3 className="font-serif-luxury text-base sm:text-lg text-[#171717] dark:text-[#FAF8F5] border-b border-[#E5E0D8] dark:border-[#2C2A26] pb-2">
                Stay Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <span className="text-stone-500 dark:text-stone-400 block text-[11px] sm:text-xs">Accommodation:</span>
                  <span className="font-semibold text-stone-900 dark:text-stone-100">{confirmedBooking.room.name}</span>
                </div>
                <div>
                  <span className="text-stone-500 dark:text-stone-400 block text-[11px] sm:text-xs">Location:</span>
                  <span className="font-semibold text-stone-900 dark:text-stone-100">{confirmedBooking.room.floorLevel} ({confirmedBooking.room.viewType})</span>
                </div>
                <div>
                  <span className="text-stone-500 dark:text-stone-400 block text-[11px] sm:text-xs">Check-In:</span>
                  <span className="font-semibold text-stone-900 dark:text-stone-100">{confirmedBooking.state.checkIn} (From 14:00)</span>
                </div>
                <div>
                  <span className="text-stone-500 dark:text-stone-400 block text-[11px] sm:text-xs">Check-Out:</span>
                  <span className="font-semibold text-stone-900 dark:text-stone-100">{confirmedBooking.state.checkOut} (Until 12:00)</span>
                </div>
                <div>
                  <span className="text-stone-500 dark:text-stone-400 block text-[11px] sm:text-xs">Duration & Guests:</span>
                  <span className="font-semibold text-stone-900 dark:text-stone-100">{confirmedBooking.nights} {confirmedBooking.nights === 1 ? 'Night' : 'Nights'} · {confirmedBooking.state.guests} Guests</span>
                </div>
                <div className="break-words">
                  <span className="text-stone-500 dark:text-stone-400 block text-[11px] sm:text-xs">Contact Info:</span>
                  <span className="font-semibold text-stone-900 dark:text-stone-100 break-all">{confirmedBooking.state.guestEmail}</span>
                  <span className="text-stone-700 dark:text-stone-300 block">{confirmedBooking.state.guestPhone}</span>
                </div>
              </div>

              {confirmedBooking.state.specialRequests && (
                <div className="pt-2 border-t border-[#E5E0D8] dark:border-[#2C2A26]">
                  <span className="text-stone-500 dark:text-stone-400 block text-[11px] sm:text-xs">Special Inquiries:</span>
                  <p className="text-stone-800 dark:text-stone-300 italic text-xs">{confirmedBooking.state.specialRequests}</p>
                </div>
              )}
            </div>

            {/* Financial Summary */}
            <div className="border border-[#E5E0D8] dark:border-[#2C2A26] p-3.5 sm:p-6 space-y-2 text-xs sm:text-sm">
              <div className="flex justify-between text-stone-600 dark:text-stone-400 gap-2">
                <span className="truncate">Room Charges ({formatPKR(confirmedBooking.room.pricePerNightPKR)} × {confirmedBooking.nights} nt)</span>
                <span className="font-mono tabular-nums shrink-0 text-stone-900 dark:text-stone-100">{formatPKR(confirmedBooking.subtotalPKR)}</span>
              </div>
              <div className="flex justify-between text-stone-600 dark:text-stone-400 gap-2">
                <span>Hospitality Taxes & Service (16%)</span>
                <span className="font-mono tabular-nums shrink-0 text-stone-900 dark:text-stone-100">{formatPKR(confirmedBooking.taxPKR)}</span>
              </div>
              <div className="pt-3 border-t border-[#E5E0D8] dark:border-[#2C2A26] flex justify-between text-sm sm:text-base font-semibold text-[#171717] dark:text-[#FAF8F5] gap-2">
                <span>Total Demo Amount</span>
                <span className="font-mono tabular-nums text-[#A67C52] dark:text-[#C5A880] text-base sm:text-lg shrink-0">
                  {formatPKR(confirmedBooking.totalPKR)}
                </span>
              </div>
            </div>

            {/* Portfolio Disclaimer */}
            <div className="p-3 sm:p-4 bg-stone-100 dark:bg-stone-900/60 border border-stone-300 dark:border-stone-800 text-xs text-stone-600 dark:text-stone-400 space-y-1">
              <p className="font-semibold text-stone-900 dark:text-stone-200">DEMO CONCEPT NOTICE:</p>
              <p className="leading-relaxed">
                This is a fictional demo booking experience created for <strong>Aurelia Grand Hotel</strong>. No credit card has been charged, and no real hotel room is reserved.
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 pt-2">
              <button
                type="button"
                onClick={() => window.print()}
                className="w-full sm:w-auto px-5 py-3 min-h-[44px] border border-[#171717] dark:border-stone-700 text-[#171717] dark:text-stone-200 hover:bg-[#171717] dark:hover:bg-stone-800 hover:text-white text-xs uppercase tracking-wider font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <Printer className="w-4 h-4" />
                <span>Print Confirmation</span>
              </button>
              <button
                type="button"
                onClick={handleNewBooking}
                className="w-full sm:w-auto px-5 py-3 min-h-[44px] bg-[#A67C52] hover:bg-[#8C653E] text-white text-xs uppercase tracking-wider font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Make Another</span>
              </button>
              <Link
                to="/"
                className="w-full sm:w-auto px-5 py-3 min-h-[44px] bg-[#171717] dark:bg-stone-800 hover:bg-stone-800 dark:hover:bg-stone-700 text-white text-xs uppercase tracking-wider font-semibold transition-colors flex items-center justify-center text-center"
              >
                Return to Home
              </Link>
            </div>
          </div>
        )}

        {/* STEP 1-5 FLOW */}
        {activeStep <= 5 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
            {/* Left Content Area: Interactive Step Form */}
            <div className="lg:col-span-8 bg-white dark:bg-[#16161A] border border-[#E5E0D8] dark:border-[#2C2A26] p-4 sm:p-6 md:p-8 shadow-sm transition-colors">
              {/* STEP 1: Select Room */}
              {activeStep === 1 && (
                <div className="space-y-4 sm:space-y-6 animate-in fade-in duration-200">
                  <div className="border-b border-[#E5E0D8] dark:border-[#2C2A26] pb-3 sm:pb-4">
                    <h2 className="text-lg sm:text-2xl font-serif-luxury text-[#171717] dark:text-[#FAF8F5]">
                      Step 1: Select Your Accommodation
                    </h2>
                    <p className="text-xs text-[#777777] dark:text-[#A39E93]">
                      Choose from our luxury sanctuaries in Islamabad.
                    </p>
                  </div>

                  <div className="space-y-3 sm:space-y-4">
                    {ROOMS.map((room) => {
                      const isSelected = selectedRoomId === room.id;
                      return (
                        <div
                          key={room.id}
                          onClick={() => setSelectedRoomId(room.id)}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              setSelectedRoomId(room.id);
                            }
                          }}
                          className={`cursor-pointer p-3 sm:p-5 border transition-all flex flex-col sm:flex-row gap-3.5 sm:gap-5 items-stretch sm:items-center justify-between ${
                            isSelected
                              ? 'border-[#A67C52] dark:border-[#C5A880] bg-[#A67C52]/5 dark:bg-[#C5A880]/10 shadow-sm ring-1 ring-[#A67C52] dark:ring-[#C5A880]'
                              : 'border-[#E5E0D8] dark:border-[#2C2A26] hover:border-stone-400 dark:hover:border-stone-600 bg-white dark:bg-[#16161A]'
                          }`}
                        >
                          <div className="flex items-center gap-3 sm:gap-4">
                            <div className="w-20 sm:w-28 h-16 sm:h-20 shrink-0 overflow-hidden bg-stone-100 dark:bg-stone-900 border border-[#E5E0D8] dark:border-[#2C2A26]">
                              <OptimizedImage
                                src={room.primaryImage}
                                alt={room.name}
                                aspectRatio="4/3"
                              />
                            </div>
                            <div className="min-w-0 flex-1">
                              <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-[#A67C52] dark:text-[#C5A880] font-semibold block truncate">
                                {room.floorLevel}
                              </span>
                              <h3 className="text-sm sm:text-base md:text-lg font-serif-luxury text-[#171717] dark:text-[#FAF8F5] truncate">{room.name}</h3>
                              <div className="text-[11px] sm:text-xs text-[#777777] dark:text-[#A39E93] flex items-center flex-wrap gap-1 sm:gap-1.5 mt-0.5">
                                <span>{room.sizeM2} m²</span>
                                <span aria-hidden="true">·</span>
                                <span>{room.maxGuests} Guests</span>
                                <span aria-hidden="true" className="hidden xs:inline">·</span>
                                <span className="hidden xs:inline truncate max-w-[120px]">{room.bedType}</span>
                              </div>
                            </div>
                          </div>

                          <div className="text-right flex sm:flex-col justify-between items-center sm:items-end border-t sm:border-t-0 pt-2 sm:pt-0 border-[#E5E0D8] dark:border-[#2C2A26] shrink-0">
                            <div className="text-sm sm:text-base md:text-lg font-serif-luxury text-[#171717] dark:text-[#FAF8F5] tabular-nums font-medium">
                              {formatPKR(room.pricePerNightPKR)}
                              <span className="text-xs text-[#777777] dark:text-[#A39E93] font-sans font-normal ml-1">/ nt</span>
                            </div>
                            <div className="text-xs text-[#A67C52] dark:text-[#C5A880] font-semibold mt-0.5 sm:mt-1">
                              {isSelected ? '✓ Selected' : 'Tap to Select'}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 2: Choose Dates */}
              {activeStep === 2 && (
                <div className="space-y-4 sm:space-y-6 animate-in fade-in duration-200">
                  <div className="border-b border-[#E5E0D8] dark:border-[#2C2A26] pb-3 sm:pb-4">
                    <h2 className="text-lg sm:text-2xl font-serif-luxury text-[#171717] dark:text-[#FAF8F5]">
                      Step 2: Choose Stay Dates
                    </h2>
                    <p className="text-xs text-[#777777] dark:text-[#A39E93]">
                      Select your arrival and departure schedule.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div className="space-y-1.5 sm:space-y-2">
                      <label className="block text-xs uppercase tracking-wider font-semibold text-[#777777] dark:text-[#A39E93]">
                        Check-In Date *
                      </label>
                      <input
                        type="date"
                        min={todayStr}
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                        className="w-full bg-[#F8F6F1] dark:bg-[#111114] border border-[#E5E0D8] dark:border-[#2C2A26] min-h-[44px] p-2.5 sm:p-3 text-sm text-[#171717] dark:text-[#FAF8F5] focus:outline-none focus:border-[#A67C52] dark:focus:border-[#C5A880]"
                      />
                    </div>

                    <div className="space-y-1.5 sm:space-y-2">
                      <label className="block text-xs uppercase tracking-wider font-semibold text-[#777777] dark:text-[#A39E93]">
                        Check-Out Date *
                      </label>
                      <input
                        type="date"
                        min={checkIn || todayStr}
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                        className="w-full bg-[#F8F6F1] dark:bg-[#111114] border border-[#E5E0D8] dark:border-[#2C2A26] min-h-[44px] p-2.5 sm:p-3 text-sm text-[#171717] dark:text-[#FAF8F5] focus:outline-none focus:border-[#A67C52] dark:focus:border-[#C5A880]"
                      />
                    </div>
                  </div>

                  <div className="p-3 sm:p-4 bg-[#F8F6F1] dark:bg-[#111114] border border-[#E5E0D8] dark:border-[#2C2A26] text-xs text-stone-700 dark:text-stone-300 flex items-center justify-between">
                    <span>Stay Duration:</span>
                    <strong className="font-mono tabular-nums text-stone-900 dark:text-stone-100 text-sm">
                      {nights} {nights === 1 ? 'Night' : 'Nights'}
                    </strong>
                  </div>
                </div>
              )}

              {/* STEP 3: Choose Guests */}
              {activeStep === 3 && (
                <div className="space-y-4 sm:space-y-6 animate-in fade-in duration-200">
                  <div className="border-b border-[#E5E0D8] dark:border-[#2C2A26] pb-3 sm:pb-4">
                    <h2 className="text-lg sm:text-2xl font-serif-luxury text-[#171717] dark:text-[#FAF8F5]">
                      Step 3: Guests & Room Configuration
                    </h2>
                    <p className="text-xs text-[#777777] dark:text-[#A39E93]">
                      Adjust party size for appropriate bedding and amenities.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div className="space-y-1.5 sm:space-y-2">
                      <label className="block text-xs uppercase tracking-wider font-semibold text-[#777777] dark:text-[#A39E93]">
                        Number of Guests
                      </label>
                      <select
                        value={guests}
                        onChange={(e) => setGuests(Number(e.target.value))}
                        className="w-full bg-[#F8F6F1] dark:bg-[#111114] border border-[#E5E0D8] dark:border-[#2C2A26] min-h-[44px] p-2.5 sm:p-3 text-sm text-[#171717] dark:text-[#FAF8F5] focus:outline-none focus:border-[#A67C52] dark:focus:border-[#C5A880]"
                      >
                        {Array.from({ length: currentRoom.maxGuests }, (_, i) => i + 1).map((n) => (
                          <option key={n} value={n} className="dark:bg-[#16161A]">
                            {n} {n === 1 ? 'Guest' : 'Guests'} (Max {currentRoom.maxGuests})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1.5 sm:space-y-2">
                      <label className="block text-xs uppercase tracking-wider font-semibold text-[#777777] dark:text-[#A39E93]">
                        Number of Rooms
                      </label>
                      <select
                        value={roomsCount}
                        onChange={(e) => setRoomsCount(Number(e.target.value))}
                        className="w-full bg-[#F8F6F1] dark:bg-[#111114] border border-[#E5E0D8] dark:border-[#2C2A26] min-h-[44px] p-2.5 sm:p-3 text-sm text-[#171717] dark:text-[#FAF8F5] focus:outline-none focus:border-[#A67C52] dark:focus:border-[#C5A880]"
                      >
                        <option value={1} className="dark:bg-[#16161A]">1 Sanctuary</option>
                        <option value={2} className="dark:bg-[#16161A]">2 Sanctuaries</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4: Guest Information */}
              {activeStep === 4 && (
                <div className="space-y-4 sm:space-y-6 animate-in fade-in duration-200">
                  <div className="border-b border-[#E5E0D8] dark:border-[#2C2A26] pb-3 sm:pb-4">
                    <h2 className="text-lg sm:text-2xl font-serif-luxury text-[#171717] dark:text-[#FAF8F5]">
                      Step 4: Guest Information
                    </h2>
                    <p className="text-xs text-[#777777] dark:text-[#A39E93]">
                      Personalize your stay and arrival preferences.
                    </p>
                  </div>

                  <div className="space-y-3.5 sm:space-y-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider font-semibold text-[#777777] dark:text-[#A39E93] mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Zainab Malik"
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        required
                        className="w-full bg-[#F8F6F1] dark:bg-[#111114] border border-[#E5E0D8] dark:border-[#2C2A26] min-h-[44px] p-2.5 sm:p-3 text-sm text-[#171717] dark:text-[#FAF8F5] focus:outline-none focus:border-[#A67C52] dark:focus:border-[#C5A880]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                      <div>
                        <label className="block text-xs uppercase tracking-wider font-semibold text-[#777777] dark:text-[#A39E93] mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          placeholder="zainab.malik@example.com"
                          value={guestEmail}
                          onChange={(e) => setGuestEmail(e.target.value)}
                          required
                          className="w-full bg-[#F8F6F1] dark:bg-[#111114] border border-[#E5E0D8] dark:border-[#2C2A26] min-h-[44px] p-2.5 sm:p-3 text-sm text-[#171717] dark:text-[#FAF8F5] focus:outline-none focus:border-[#A67C52] dark:focus:border-[#C5A880]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-wider font-semibold text-[#777777] dark:text-[#A39E93] mb-1">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          placeholder="+92 321 9876543"
                          value={guestPhone}
                          onChange={(e) => setGuestPhone(e.target.value)}
                          required
                          className="w-full bg-[#F8F6F1] dark:bg-[#111114] border border-[#E5E0D8] dark:border-[#2C2A26] min-h-[44px] p-2.5 sm:p-3 text-sm text-[#171717] dark:text-[#FAF8F5] focus:outline-none focus:border-[#A67C52] dark:focus:border-[#C5A880]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider font-semibold text-[#777777] dark:text-[#A39E93] mb-1">
                        Special Inquiries / Arrival Time / Dietary
                      </label>
                      <textarea
                        rows={3}
                        placeholder="e.g. Late check-in after 20:00, high floor preference, airport transfer requested..."
                        value={specialRequests}
                        onChange={(e) => setSpecialRequests(e.target.value)}
                        className="w-full bg-[#F8F6F1] dark:bg-[#111114] border border-[#E5E0D8] dark:border-[#2C2A26] p-2.5 sm:p-3 text-sm text-[#171717] dark:text-[#FAF8F5] focus:outline-none focus:border-[#A67C52] dark:focus:border-[#C5A880]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 5: Final Review & Submission */}
              {activeStep === 5 && (
                <div className="space-y-4 sm:space-y-6 animate-in fade-in duration-200">
                  <div className="border-b border-[#E5E0D8] dark:border-[#2C2A26] pb-3 sm:pb-4">
                    <h2 className="text-lg sm:text-2xl font-serif-luxury text-[#171717] dark:text-[#FAF8F5]">
                      Step 5: Review & Confirm Request
                    </h2>
                    <p className="text-xs text-[#777777] dark:text-[#A39E93]">
                      Review all reservation specifications prior to submitting.
                    </p>
                  </div>

                  <div className="bg-[#F8F6F1] dark:bg-[#111114] border border-[#E5E0D8] dark:border-[#2C2A26] p-3.5 sm:p-6 space-y-3 sm:space-y-4 text-xs sm:text-sm">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <div>
                        <span className="text-stone-500 dark:text-stone-400 block text-xs">Primary Guest:</span>
                        <span className="font-semibold text-stone-900 dark:text-stone-100">{guestName}</span>
                      </div>
                      <div className="break-words">
                        <span className="text-stone-500 dark:text-stone-400 block text-xs">Contact:</span>
                        <span className="font-semibold text-stone-900 dark:text-stone-100 break-all">{guestEmail}</span>
                        <span className="text-stone-700 dark:text-stone-300 block">{guestPhone}</span>
                      </div>
                      <div>
                        <span className="text-stone-500 dark:text-stone-400 block text-xs">Selected Suite:</span>
                        <span className="font-semibold text-stone-900 dark:text-stone-100">{currentRoom.name}</span>
                      </div>
                      <div>
                        <span className="text-stone-500 dark:text-stone-400 block text-xs">Stay Dates:</span>
                        <span className="font-semibold text-stone-900 dark:text-stone-100">{checkIn} to {checkOut} ({nights} {nights === 1 ? 'night' : 'nights'})</span>
                      </div>
                    </div>

                    {specialRequests && (
                      <div className="pt-2 border-t border-[#E5E0D8] dark:border-[#2C2A26]">
                        <span className="text-stone-500 dark:text-stone-400 block text-xs">Special Notes:</span>
                        <p className="text-stone-800 dark:text-stone-300 italic">{specialRequests}</p>
                      </div>
                    )}
                  </div>

                  <div className="p-3 sm:p-4 bg-amber-50/70 dark:bg-amber-950/30 border border-[#A67C52]/30 text-xs text-stone-700 dark:text-stone-300">
                    <strong>Demo Note:</strong> No payment or credit card is required. Clicking "Confirm Booking Request" will generate a local demo confirmation reference.
                  </div>
                </div>
              )}

              {/* Stepper Navigation Buttons */}
              <div className="pt-5 sm:pt-8 border-t border-[#E5E0D8] dark:border-[#2C2A26] flex items-center justify-between gap-3">
                {activeStep > 1 ? (
                  <button
                    type="button"
                    onClick={() => setActiveStep(activeStep - 1)}
                    className="inline-flex items-center gap-1.5 px-3 py-2.5 min-h-[44px] text-xs uppercase tracking-wider font-semibold text-[#171717] dark:text-stone-200 hover:text-[#A67C52] dark:hover:text-[#C5A880] transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                ) : (
                  <div />
                )}

                {activeStep < 5 ? (
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="px-5 sm:px-6 py-3 min-h-[44px] bg-[#171717] dark:bg-[#A67C52] hover:bg-[#A67C52] dark:hover:bg-[#8C653E] text-white text-xs uppercase tracking-[0.16em] font-semibold transition-colors flex items-center gap-2 active:scale-98"
                  >
                    <span>Continue</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleFinalSubmit}
                    className="px-5 sm:px-8 py-3.5 min-h-[44px] bg-[#A67C52] hover:bg-[#8C653E] text-white text-xs uppercase tracking-[0.18em] font-semibold transition-colors shadow-lg flex items-center gap-2 active:scale-98"
                  >
                    <span>Confirm Booking</span>
                    <CheckCircle2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Right Side: Live Dynamic Booking Summary */}
            <div className="lg:col-span-4 bg-white dark:bg-[#16161A] border border-[#E5E0D8] dark:border-[#2C2A26] p-4 sm:p-6 shadow-md space-y-4 sm:space-y-6 lg:sticky lg:top-28 transition-colors">
              <div className="border-b border-[#E5E0D8] dark:border-[#2C2A26] pb-3">
                <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#A67C52] dark:text-[#C5A880] font-semibold block">
                  Stay Summary
                </span>
                <h3 className="text-base sm:text-xl font-serif-luxury text-[#171717] dark:text-[#FAF8F5]">{currentRoom.name}</h3>
                <p className="text-[11px] sm:text-xs text-[#777777] dark:text-[#A39E93]">{currentRoom.floorLevel}</p>
              </div>

              <div className="space-y-2 text-xs text-stone-600 dark:text-stone-400">
                <div className="flex justify-between">
                  <span>Check-In:</span>
                  <span className="font-semibold text-stone-900 dark:text-stone-100">{checkIn}</span>
                </div>
                <div className="flex justify-between">
                  <span>Check-Out:</span>
                  <span className="font-semibold text-stone-900 dark:text-stone-100">{checkOut}</span>
                </div>
                <div className="flex justify-between">
                  <span>Nights:</span>
                  <span className="font-semibold text-stone-900 dark:text-stone-100 tabular-nums">{nights}</span>
                </div>
                <div className="flex justify-between">
                  <span>Guests:</span>
                  <span className="font-semibold text-stone-900 dark:text-stone-100 tabular-nums">{guests}</span>
                </div>
                <div className="flex justify-between">
                  <span>Rooms:</span>
                  <span className="font-semibold text-stone-900 dark:text-stone-100 tabular-nums">{roomsCount}</span>
                </div>
              </div>

              <div className="pt-3 sm:pt-4 border-t border-[#E5E0D8] dark:border-[#2C2A26] space-y-2 text-xs">
                <div className="flex justify-between text-stone-600 dark:text-stone-400 gap-2">
                  <span>Rate per night</span>
                  <span className="font-mono tabular-nums shrink-0 text-stone-900 dark:text-stone-100">{formatPKR(currentRoom.pricePerNightPKR)}</span>
                </div>
                <div className="flex justify-between text-stone-600 dark:text-stone-400 gap-2">
                  <span>Room Subtotal</span>
                  <span className="font-mono tabular-nums shrink-0 text-stone-900 dark:text-stone-100">{formatPKR(subtotal)}</span>
                </div>
                <div className="flex justify-between text-stone-600 dark:text-stone-400 gap-2">
                  <span>Hospitality Tax (16%)</span>
                  <span className="font-mono tabular-nums shrink-0 text-stone-900 dark:text-stone-100">{formatPKR(tax)}</span>
                </div>
                <div className="pt-2 border-t border-[#E5E0D8] dark:border-[#2C2A26] flex justify-between font-semibold text-stone-900 dark:text-stone-100 text-sm gap-2">
                  <span>Estimated Total</span>
                  <span className="font-mono tabular-nums text-[#A67C52] dark:text-[#C5A880] text-sm sm:text-base shrink-0">
                    {formatPKR(total)}
                  </span>
                </div>
              </div>

              <div className="pt-2 text-[10px] sm:text-[11px] text-stone-500 dark:text-stone-400 border-t border-[#E5E0D8] dark:border-[#2C2A26] space-y-1">
                <div className="flex items-center gap-1.5 text-stone-700 dark:text-stone-300">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#A67C52] dark:text-[#C5A880] shrink-0" />
                  <span>Complimentary Valet & Wi-Fi</span>
                </div>
                <div>Free cancellation up to 24 hours prior.</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
