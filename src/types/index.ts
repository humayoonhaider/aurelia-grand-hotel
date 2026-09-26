export type RoomType = 'deluxe' | 'suite' | 'presidential';

export interface Room {
  id: string;
  name: string;
  category: RoomType;
  tagline: string;
  shortDescription: string;
  fullDescription: string;
  sizeM2: number;
  maxGuests: number;
  bedType: string;
  viewType: string;
  pricePerNightPKR: number;
  primaryImage: string;
  galleryImages: string[];
  amenities: string[];
  features: string[];
  floorLevel: string;
  isFeatured?: boolean;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  pricePKR: number;
  category: 'breakfast' | 'starters' | 'mains' | 'desserts' | 'beverages';
  tag?: string;
  isSignature?: boolean;
}

export interface AmenityItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  hours: string;
  location: string;
  features: string[];
}

export interface BookingState {
  roomId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  roomsCount: number;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  specialRequests: string;
}

export interface ConfirmedBookingRecord {
  bookingReference: string;
  createdAt: string;
  state: BookingState;
  room: Room;
  nights: number;
  subtotalPKR: number;
  taxPKR: number;
  totalPKR: number;
}

export interface TableReservation {
  id: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  date: string;
  time: string;
  guestsCount: number;
  diningSection: string;
  specialRequests?: string;
  createdAt: string;
}
