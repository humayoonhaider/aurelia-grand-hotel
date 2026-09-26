import { AmenityItem } from '../types';

export const AMENITIES: AmenityItem[] = [
  {
    id: 'infinity-pool',
    title: 'Rooftop Infinity Pool',
    subtitle: 'Horizon Sanctuary',
    description: 'Heated crystal-clear infinity pool on Level 22 offering uninterrupted vistas of the Margalla Hills. Features shaded cabanas, submerged underwater loungers, and dedicated beverage service.',
    icon: 'Waves',
    hours: '06:00 – 22:00 Daily',
    location: 'Rooftop Level 22',
    features: ['Temperature Controlled (28°C)', 'Private Cabanas Available', 'Sunset Cocktail Bar', 'Towel & Robe Service']
  },
  {
    id: 'spa-wellness',
    title: 'Spa & Wellness Sanctuary',
    subtitle: 'Holistic Rejuvenation',
    description: 'A serene subterranean oasis featuring private treatment suites, Himalayan salt steam rooms, Swedish saunas, and bespoke botanical therapies tailored to restorative relaxation.',
    icon: 'Sparkles',
    hours: '09:00 – 21:00 Daily',
    location: 'Level -1 Oasis Floor',
    features: ['Himalayan Salt Steam Room', 'Aromatherapy Suites', 'Finnish Dry Sauna', 'Deep Tissue Therapies']
  },
  {
    id: 'fitness-studio',
    title: 'Precision Fitness Studio',
    subtitle: 'High-Performance Training',
    description: 'Equipped with the latest Technogym biomechanical equipment, free weights, Peloton cycle stations, and panoramic city views to energize your daily workout routine.',
    icon: 'Dumbbell',
    hours: '24 Hours Access',
    location: 'Level 4 Wellness Wing',
    features: ['Technogym Connected Systems', 'Dedicated Yoga & Stretch Room', 'Personal Training on Request', 'Cold Pressed Juices']
  },
  {
    id: 'business-lounge',
    title: 'The Executive Lounge',
    subtitle: 'Connected Workspaces',
    description: 'An exclusive haven for business leaders offering soundproof private meeting pods, high-speed fiber connectivity, curated library, all-day refreshments, and quiet work zones.',
    icon: 'Briefcase',
    hours: '07:00 – 23:00 Daily',
    location: 'Level 18 Club Wing',
    features: ['Fiber 1 Gbps Mesh Wi-Fi', 'Private Conference Boardrooms', 'Complimentary Evening Canapés', 'Wireless Presentation Screens']
  },
  {
    id: 'rooftop-terrace',
    title: 'Skyline Rooftop Terrace',
    subtitle: 'Open-Air Stargazing',
    description: 'Perched above the capital, our open-air terrace is the destination for twilight lounge music, artisanal mocktails, fire pit gatherings, and stargazing above the Margalla ridgeline.',
    icon: 'SunDim',
    hours: '17:00 – 01:00 Daily',
    location: 'Penthouse Level 24',
    features: ['Architectural Fire Pits', 'Acoustic Ambient Music', 'Artisan Beverage Bar', 'Stargazing Telescopes']
  },
  {
    id: 'concierge-service',
    title: '24/7 Bespoke Concierge',
    subtitle: 'Attentive Care',
    description: 'Our knowledgeable concierge team orchestrates personalized city itineraries, curated cultural expeditions, private gallery viewings, and seamless dining reservations across Islamabad.',
    icon: 'ShieldCheck',
    hours: '24/7 Continuous',
    location: 'Main Grand Lobby',
    features: ['Curated City Expeditions', 'Private Jet / Heli Coordination', 'Bilingual Host Team', 'Luggage & Packing Assistance']
  },
  {
    id: 'airport-transfer',
    title: 'Chauffeured Airport Transfer',
    subtitle: 'Effortless Arrival',
    description: 'Experience seamless door-to-door transit between Islamabad International Airport (ISB) and Aurelia Grand in our premium fleet of Mercedes-Benz and Range Rover vehicles.',
    icon: 'Car',
    hours: 'On Demand (24/7)',
    location: 'Porte-Cochère & VIP Gate',
    features: ['ISB Airport Meet & Greet', 'Wi-Fi & Chilled Refreshments In-Car', 'Flight Tracking Synchronization', 'Express Luggage Handling']
  },
  {
    id: 'high-speed-wifi',
    title: 'Ultra-Fast Fiber Connectivity',
    subtitle: 'Seamless Digital Reach',
    description: 'Dedicated gigabit fiber network blanketed across the entire property, ensuring frictionless 4K video conferencing, ultra-low latency streaming, and secure guest access.',
    icon: 'Wifi',
    hours: 'Continuous 24/7',
    location: 'Property-Wide Coverage',
    features: ['1 Gbps Symmetric Bandwidth', 'Zero-Drop Roaming Technology', 'Dedicated Secure VPN Compatibility', 'Complimentary for All Guests']
  }
];
