/**
 * Ultra-compact, low-latency SVG blur-up placeholders with ambient color grading
 * tailored to Aurelia Grand Hotel's luxury palette (warm taupe, walnut wood, gold bronze, dusk charcoal).
 */

// Helper to construct a lightweight base64 SVG blur placeholder
function createSvgBlur(stops: { color: string; offset: string }[]): string {
  const stopsXml = stops
    .map((s) => `<stop offset="${s.offset}" stop-color="${s.color}" />`)
    .join('');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 25" width="100%" height="100%">
    <defs>
      <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
        ${stopsXml}
      </linearGradient>
      <filter id="b" color-interpolation-filters="sRGB">
        <feGaussianBlur stdDeviation="3" />
        <feComponentTransfer>
          <feFuncA type="linear" slope="1" />
        </feComponentTransfer>
      </filter>
    </defs>
    <rect width="100%" height="100%" fill="url(#g)" filter="url(#b)" />
  </svg>`;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg.trim())}`;
}

export const BLUR_PLACEHOLDERS: Record<string, string> = {
  // Hero Hotel Facade (Dusk skyline, stone facade, warm gold lit windows)
  facade: createSvgBlur([
    { offset: '0%', color: '#1a1715' },
    { offset: '35%', color: '#3a2e24' },
    { offset: '65%', color: '#6d4c2b' },
    { offset: '85%', color: '#a67c52' },
    { offset: '100%', color: '#171717' },
  ]),

  // Deluxe King Room (Walnut paneling, warm ambient reading lamp, crisp linen)
  deluxeKing: createSvgBlur([
    { offset: '0%', color: '#2b231d' },
    { offset: '30%', color: '#4a3828' },
    { offset: '60%', color: '#8c6742' },
    { offset: '85%', color: '#dfd5c6' },
    { offset: '100%', color: '#26201b' },
  ]),

  // Executive Suite (Curved bouclé, travertine stone, warm cove lighting)
  executiveSuite: createSvgBlur([
    { offset: '0%', color: '#24211e' },
    { offset: '40%', color: '#4d433b' },
    { offset: '70%', color: '#9c836a' },
    { offset: '90%', color: '#e8e0d5' },
    { offset: '100%', color: '#1c1a17' },
  ]),

  // Presidential Suite (Penthouse bronze details, panoramic dusk hills)
  presidentialSuite: createSvgBlur([
    { offset: '0%', color: '#1c1917' },
    { offset: '35%', color: '#382f27' },
    { offset: '65%', color: '#7a5a3a' },
    { offset: '85%', color: '#ba9468' },
    { offset: '100%', color: '#121110' },
  ]),

  // The Ember Table Restaurant (Dark oak, glowing warm embers, candlelight)
  diningEmber: createSvgBlur([
    { offset: '0%', color: '#141210' },
    { offset: '40%', color: '#2e1e14' },
    { offset: '70%', color: '#803c1b' },
    { offset: '90%', color: '#d97736' },
    { offset: '100%', color: '#1c1510' },
  ]),

  // Rooftop Infinity Pool (Sunset mountain gradient, twilight azure water, teak deck)
  poolAmenity: createSvgBlur([
    { offset: '0%', color: '#18242c' },
    { offset: '30%', color: '#334856' },
    { offset: '60%', color: '#706456' },
    { offset: '85%', color: '#b58356' },
    { offset: '100%', color: '#1a2026' },
  ]),

  // Generic luxury hotel warm bronze fallback
  default: createSvgBlur([
    { offset: '0%', color: '#1e1c1a' },
    { offset: '50%', color: '#473a2d' },
    { offset: '100%', color: '#2a241e' },
  ]),
};

/**
 * Returns the best matching blur-up SVG for any image URL or key.
 */
export function getBlurPlaceholder(srcOrKey?: string): string {
  if (!srcOrKey) return BLUR_PLACEHOLDERS.default;

  const lower = srcOrKey.toLowerCase();
  if (lower.includes('facade') || lower.includes('hero')) {
    return BLUR_PLACEHOLDERS.facade;
  }
  if (lower.includes('deluxe')) {
    return BLUR_PLACEHOLDERS.deluxeKing;
  }
  if (lower.includes('executive')) {
    return BLUR_PLACEHOLDERS.executiveSuite;
  }
  if (lower.includes('presidential')) {
    return BLUR_PLACEHOLDERS.presidentialSuite;
  }
  if (lower.includes('dining') || lower.includes('ember')) {
    return BLUR_PLACEHOLDERS.diningEmber;
  }
  if (lower.includes('pool') || lower.includes('amenity')) {
    return BLUR_PLACEHOLDERS.poolAmenity;
  }

  return BLUR_PLACEHOLDERS.default;
}
