import { MenuItem } from '../types';

export const RESTAURANT_INFO = {
  name: 'The Ember Table',
  tagline: 'Open-hearth gastronomy rooted in seasonal terroir and artisan craft.',
  cuisine: 'Modern Continental & Elevated Local Fusion',
  hours: {
    breakfast: '06:30 – 10:30 (Daily)',
    lunch: '12:30 – 15:30 (Daily)',
    dinner: '19:00 – 23:30 (Daily)',
    lounge: '16:00 – 00:00 (Daily)'
  },
  dressCode: 'Smart Casual / Elegant',
  seatingCapacity: '75 indoor covers · 24 terrace seats'
};

export const MENU_ITEMS: MenuItem[] = [
  // Breakfast
  {
    id: 'b1',
    name: 'Aurelia Benedict',
    category: 'breakfast',
    description: 'Poached organic eggs, house-cured beef bresaola, saffron hollandaise, toasted sourdough brioche, baby micro-greens.',
    pricePKR: 3200,
    tag: 'Chef Signature',
    isSignature: true
  },
  {
    id: 'b2',
    name: 'Margalla Honey & Granola Bowl',
    category: 'breakfast',
    description: 'Wild local acacia honey, house-roasted oat clusters, compressed seasonal berries, whipped Greek yogurt.',
    pricePKR: 2400,
    tag: 'Healthy Living'
  },
  {
    id: 'b3',
    name: 'Truffled Wild Mushroom Omelette',
    category: 'breakfast',
    description: 'Free-range eggs, sautéed Himalayan morels, aged Gruyère, fresh chives, grilled sourdough.',
    pricePKR: 2900
  },
  {
    id: 'b4',
    name: 'Almond & Cardamom French Toast',
    category: 'breakfast',
    description: 'Brioche soaked in spiced vanilla custard, crushed roasted almonds, burnt orange caramel, clotted cream.',
    pricePKR: 2600
  },

  // Starters
  {
    id: 's1',
    name: 'Charcoal Smoked Burrata',
    category: 'starters',
    description: 'Artisanal burrata kissed by applewood smoke, heritage heirloom tomatoes, basil oil, 12-year balsamic reduction.',
    pricePKR: 3800,
    tag: 'Popular'
  },
  {
    id: 's2',
    name: 'Ember-Roasted Bone Marrow',
    category: 'starters',
    description: 'Prime beef marrow, herb gremolata, pickled shallots, charred rustic country bread, Maldon sea salt.',
    pricePKR: 4200,
    isSignature: true
  },
  {
    id: 's3',
    name: 'Chilled Seafood Ceviche',
    category: 'starters',
    description: 'Line-caught Arabian Sea red snapper, tiger milk marinade, compressed cucumber, avocado mousse, crispy lotus root.',
    pricePKR: 4500
  },
  {
    id: 's4',
    name: 'Velvety Roasted Butternut & Truffle Bisque',
    category: 'starters',
    description: 'Caramelized squash, black truffle cream, toasted pumpkin seeds, garlic thyme crisps.',
    pricePKR: 2800
  },

  // Mains
  {
    id: 'm1',
    name: 'Prime Wagyu Ribeye (300g)',
    category: 'mains',
    description: 'Wood-fired prime beef grilled over charcoal embers, smoked garlic purée, charred broccolini, green peppercorn jus.',
    pricePKR: 12500,
    tag: 'Ember Special',
    isSignature: true
  },
  {
    id: 'm2',
    name: 'Chilean Sea Bass en Papillote',
    category: 'mains',
    description: 'Oven-steamed sea bass in parchment with lemongrass, ginger broth, braised baby bok choy, jasmine rice crisps.',
    pricePKR: 9800
  },
  {
    id: 'm3',
    name: 'Slow-Braised Shinwari Lamb Shank',
    category: 'mains',
    description: 'Tender 14-hour braised lamb shank in rich native aromatic jus, saffron polenta, glazed baby carrots, pomegranate reduction.',
    pricePKR: 7200,
    isSignature: true
  },
  {
    id: 'm4',
    name: 'Morel & Forest Porcini Risotto',
    category: 'mains',
    description: 'Acquerello carnaroli rice, Northern Pakistan forest morels, 24-month Parmigiano-Reggiano, white truffle oil.',
    pricePKR: 5600
  },

  // Desserts
  {
    id: 'd1',
    name: 'Smoked Dark Chocolate Dome',
    category: 'desserts',
    description: '70% Valrhona dark chocolate mousse, hazelnut praline core, warm gold-dusted espresso ganache pour.',
    pricePKR: 2800,
    tag: 'Signature'
  },
  {
    id: 'd2',
    name: 'Cardamom & Rosewater Mille-Feuille',
    category: 'desserts',
    description: 'Caramelized inverted puff pastry, infused diplomatic cream, candied pistachios, edible gold leaf.',
    pricePKR: 2500
  },
  {
    id: 'd3',
    name: 'Yuzu & Passionfruit Tartlet',
    category: 'desserts',
    description: 'Crisp sable shell, tart citrus curd, torched Italian meringue, mint crystals.',
    pricePKR: 2400
  },

  // Beverages
  {
    id: 'bv1',
    name: 'Aurelia Smoked Saffron Mocktail',
    category: 'beverages',
    description: 'Infused saffron nectar, smoked rosemary, fresh grapefruit juice, sparkling tonic, dehydrated citrus wheel.',
    pricePKR: 1800,
    tag: 'Signature Zero-Proof'
  },
  {
    id: 'bv2',
    name: 'Wild Blackberry & Thyme Shrub',
    category: 'beverages',
    description: 'Cold-pressed local blackberries, botanical herb reduction, apple cider vinegar, soda water.',
    pricePKR: 1600
  },
  {
    id: 'bv3',
    name: 'Single Origin Cold Brew Reserve',
    category: 'beverages',
    description: 'Slow-dripped Ethiopian Yirgacheffe, crystal ice sphere, served with Madagascar vanilla cream.',
    pricePKR: 1400
  }
];
