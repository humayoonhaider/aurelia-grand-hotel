import React, { createContext, useContext, useState, useEffect } from 'react';
import { BookingState, ConfirmedBookingRecord, Room, TableReservation } from '../types';
import { ROOMS, getRoomById } from '../data/rooms';

interface BookingContextType {
  searchDates: {
    checkIn: string;
    checkOut: string;
    guests: number;
    roomsCount: number;
  };
  setSearchDates: React.Dispatch<React.SetStateAction<{
    checkIn: string;
    checkOut: string;
    guests: number;
    roomsCount: number;
  }>>;
  selectedRoom: Room | null;
  setSelectedRoom: (room: Room | null) => void;
  bookingDraft: BookingState;
  setBookingDraft: React.Dispatch<React.SetStateAction<BookingState>>;
  confirmedBookings: ConfirmedBookingRecord[];
  tableReservations: TableReservation[];
  createBooking: (state: BookingState) => ConfirmedBookingRecord;
  createTableReservation: (reservation: Omit<TableReservation, 'id' | 'createdAt'>) => TableReservation;
  calculateNights: (checkIn: string, checkOut: string) => number;
  calculateTotals: (room: Room, nights: number, roomsCount: number) => {
    subtotal: number;
    tax: number;
    total: number;
  };
  formatPKR: (amount: number) => string;
  clearBookingDraft: () => void;
}

// Helpers for initial dates (tomorrow & 3 days from now)
const getTomorrowDate = () => {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split('T')[0];
};

const getFutureDate = (daysAhead: number) => {
  const d = new Date();
  d.setDate(d.getDate() + daysAhead);
  return d.toISOString().split('T')[0];
};

const STORAGE_KEY_BOOKINGS = 'aurelia_grand_demo_bookings';
const STORAGE_KEY_TABLES = 'aurelia_grand_demo_tables';

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [searchDates, setSearchDates] = useState({
    checkIn: getTomorrowDate(),
    checkOut: getFutureDate(4),
    guests: 2,
    roomsCount: 1,
  });

  const [selectedRoom, setSelectedRoom] = useState<Room | null>(ROOMS[0]);

  const [bookingDraft, setBookingDraft] = useState<BookingState>({
    roomId: 'deluxe-king',
    checkIn: getTomorrowDate(),
    checkOut: getFutureDate(4),
    guests: 2,
    roomsCount: 1,
    guestName: '',
    guestEmail: '',
    guestPhone: '',
    specialRequests: '',
  });

  const [confirmedBookings, setConfirmedBookings] = useState<ConfirmedBookingRecord[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_BOOKINGS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [tableReservations, setTableReservations] = useState<TableReservation[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_TABLES);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_BOOKINGS, JSON.stringify(confirmedBookings));
    } catch (e) {
      console.warn('Unable to persist bookings to localStorage', e);
    }
  }, [confirmedBookings]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_TABLES, JSON.stringify(tableReservations));
    } catch (e) {
      console.warn('Unable to persist table reservations to localStorage', e);
    }
  }, [tableReservations]);

  const calculateNights = (checkInStr: string, checkOutStr: string): number => {
    if (!checkInStr || !checkOutStr) return 1;
    const cin = new Date(checkInStr);
    const cout = new Date(checkOutStr);
    const diffTime = cout.getTime() - cin.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  };

  const calculateTotals = (room: Room, nights: number, roomsCount: number) => {
    const subtotal = room.pricePerNightPKR * nights * (roomsCount || 1);
    const tax = Math.round(subtotal * 0.16); // 16% standard hospitality tax
    const total = subtotal + tax;
    return { subtotal, tax, total };
  };

  const formatPKR = (amount: number): string => {
    return `PKR ${amount.toLocaleString('en-US')}`;
  };

  const createBooking = (state: BookingState): ConfirmedBookingRecord => {
    const room = getRoomById(state.roomId) || ROOMS[0];
    const nights = calculateNights(state.checkIn, state.checkOut);
    const { subtotal, tax, total } = calculateTotals(room, nights, state.roomsCount);

    const refSuffix = Math.floor(10000 + Math.random() * 90000);
    const record: ConfirmedBookingRecord = {
      bookingReference: `AUR-${refSuffix}`,
      createdAt: new Date().toISOString(),
      state,
      room,
      nights,
      subtotalPKR: subtotal,
      taxPKR: tax,
      totalPKR: total,
    };

    setConfirmedBookings(prev => [record, ...prev]);
    return record;
  };

  const createTableReservation = (data: Omit<TableReservation, 'id' | 'createdAt'>): TableReservation => {
    const newReservation: TableReservation = {
      ...data,
      id: `TAB-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString(),
    };
    setTableReservations(prev => [newReservation, ...prev]);
    return newReservation;
  };

  const clearBookingDraft = () => {
    setBookingDraft({
      roomId: 'deluxe-king',
      checkIn: getTomorrowDate(),
      checkOut: getFutureDate(4),
      guests: 2,
      roomsCount: 1,
      guestName: '',
      guestEmail: '',
      guestPhone: '',
      specialRequests: '',
    });
  };

  return (
    <BookingContext.Provider
      value={{
        searchDates,
        setSearchDates,
        selectedRoom,
        setSelectedRoom,
        bookingDraft,
        setBookingDraft,
        confirmedBookings,
        tableReservations,
        createBooking,
        createTableReservation,
        calculateNights,
        calculateTotals,
        formatPKR,
        clearBookingDraft,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
