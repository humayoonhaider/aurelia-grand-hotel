import { Room } from '../types';

export const ROOMS: Room[] = [
  {
    id: 'deluxe-king',
    name: 'Deluxe King',
    category: 'deluxe',
    tagline: 'Quiet refinement with floor-to-ceiling city views',
    shortDescription: 'Generously proportioned room featuring handcrafted walnut furnishings, plush king bedding, and an acoustic soundproof sanctuary overlooking the Islamabad skyline.',
    fullDescription: 'Designed for discerning business travelers and couples, the Deluxe King blends calming neutral textures with rich walnut finishes. Floor-to-ceiling windows bathe the room in natural light while double-glazed acoustic shielding guarantees uninterrupted tranquility. Includes an executive work desk, an Italian marble bathroom with a rainfall shower, and a curated artisan minibar.',
    sizeM2: 42,
    maxGuests: 2,
    bedType: '1 King Bed',
    viewType: 'City View',
    pricePerNightPKR: 28000,
    primaryImage: '/images/room_deluxe_king_1790449591596.jpg',
    galleryImages: [
      '/images/room_deluxe_king_1790449591596.jpg',
      '/images/room_executive_suite_1790449606103.jpg',
      '/images/hero_hotel_facade_1790449575779.jpg'
    ],
    amenities: [
      'High-speed Wi-Fi (1 Gbps)',
      '65" 4K Smart OLED TV',
      'Artisan Mini Bar & Espresso Machine',
      'Individual Climate Control',
      '24/7 In-Room Fine Dining',
      'Marble Bathroom with Rain Shower',
      'Bespoke Botanical Toiletries',
      'Nightly Turndown Service'
    ],
    features: [
      'High floor location (Levels 5-12)',
      'Acoustic soundproof glazing',
      'Ergonomic executive work console',
      'Plush 400-thread count Egyptian cotton linens'
    ],
    floorLevel: 'Floors 5 – 12',
    isFeatured: true,
  },
  {
    id: 'executive-suite',
    name: 'Executive Suite',
    category: 'suite',
    tagline: 'Expansive living quarters paired with bespoke hospitality',
    shortDescription: 'An elevated residential suite featuring a partitioned living salon, marble powder room, private dining alcove, and panoramic vistas of Islamabad.',
    fullDescription: 'The Executive Suite is crafted for travelers who appreciate dedicated zones for entertainment, work, and relaxation. Enter through a warm foyer into an expansive lounge furnished with curved bouclé seating and natural stone tables. The private master bedroom features a custom king bed dressed in 600-thread count linens, leading into an ensuite bathroom with a freestanding soaking tub and dual marble vanities.',
    sizeM2: 68,
    maxGuests: 3,
    bedType: '1 King Bed + Rollaway Option',
    viewType: 'Margalla Hills & City View',
    pricePerNightPKR: 42000,
    primaryImage: '/images/room_executive_suite_1790449606103.jpg',
    galleryImages: [
      '/images/room_executive_suite_1790449606103.jpg',
      '/images/room_deluxe_king_1790449591596.jpg',
      '/images/amenity_rooftop_pool_1790449648998.jpg'
    ],
    amenities: [
      'Dedicated Living & Dining Lounge',
      'Freestanding Deep Soaking Tub',
      'Dual Marble Vanities & Rain Shower',
      'Complimentary Executive Lounge Access',
      'Specialty Espresso & Tea Bar',
      'Bang & Olufsen Bluetooth Audio',
      'Complimentary Pressing Service (2 pieces)',
      'Priority Restaurant Reservations'
    ],
    features: [
      'Corner suite layout on Floors 14-20',
      'Separate guest powder room',
      'Personalized in-suite check-in on request',
      'Walk-in dressing wardrobe'
    ],
    floorLevel: 'Floors 14 – 20',
    isFeatured: true,
  },
  {
    id: 'presidential-suite',
    name: 'Presidential Suite',
    category: 'presidential',
    tagline: 'The pinnacle of private architectural luxury in the capital',
    shortDescription: 'Our crowning penthouse suite offering 110 square meters of curated luxury, panoramic Margalla views, private pantry, and dedicated butler service.',
    fullDescription: 'Set on the highest tier of Aurelia Grand, the Presidential Suite represents the highest expression of hospitality in Islamabad. Designed with bespoke bronze architectural millwork, private 8-person dining table, dedicated sommelier pantry, and a palatial master sanctuary. Floor-to-ceiling glass walls showcase uninhibited views of the Margalla hills and the capital city.',
    sizeM2: 110,
    maxGuests: 4,
    bedType: '1 Master King Bed + Executive Daybed',
    viewType: 'Panoramic Margalla Mountain & Horizon View',
    pricePerNightPKR: 75000,
    primaryImage: '/images/room_presidential_suite_1790449619590.jpg',
    galleryImages: [
      '/images/room_presidential_suite_1790449619590.jpg',
      '/images/hero_hotel_facade_1790449575779.jpg',
      '/images/amenity_rooftop_pool_1790449648998.jpg'
    ],
    amenities: [
      '24/7 Dedicated Butler Service',
      'Private 8-Seat Formal Dining Salon',
      'Master Marble Spa with Steam Shower',
      'Private Sommelier Bar & Temperature Wine Cellar',
      'Complimentary Chauffeured Airport Transfer',
      'Private Terrace Access with Mountain Horizon',
      'Curated Art Collection & Bespoke Library',
      'Unrestricted Access to All Hotel Facilities'
    ],
    features: [
      'Top Penthouse Level (Floor 24)',
      'Private elevator biometric access',
      'Soundproof master study with secure safe',
      'Dedicated kitchen prep pantry'
    ],
    floorLevel: 'Penthouse Level 24',
    isFeatured: true,
  }
];

export function getRoomById(id: string): Room | undefined {
  return ROOMS.find(room => room.id === id);
}
