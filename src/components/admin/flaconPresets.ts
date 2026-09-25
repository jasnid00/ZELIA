import { IMAGES } from '../../assets/images';

export interface FlaconPreset {
  id: string;
  name: string;
  tag: string;
  image: string;
}

export const FLACON_PRESETS: FlaconPreset[] = [
  {
    id: 'lumina-gold',
    name: "Lumina d'Or Flacon",
    tag: 'Gold Cap & Crystal',
    image: IMAGES.zeliaHeroPerfume
  },
  {
    id: 'rose-eternelle',
    name: 'Rose Éternelle Flacon',
    tag: 'Rose Gold & Blush Tint',
    image: IMAGES.zeliaRoseEternelle
  },
  {
    id: 'oud-celeste',
    name: 'Oud Céleste Flacon',
    tag: 'Smoked Noir & Gold',
    image: IMAGES.zeliaOudCeleste
  },
  {
    id: 'blanc-sublime',
    name: 'Blanc Sublime Flacon',
    tag: 'Frosted Alabaster & White Gold',
    image: IMAGES.zeliaBlancSublime
  },
  {
    id: 'jasmin-nocturne',
    name: 'Jasmin Nocturne Flacon',
    tag: 'Midnight Onyx & Champagne',
    image: IMAGES.zeliaJasminNocturne
  },
  {
    id: 'nuit-vanille',
    name: 'Nuit de Vanille Flacon',
    tag: 'Amber Glass & Satin Gold',
    image: IMAGES.zeliaNuitVanille
  },
  {
    id: 'amber-solaris',
    name: 'Ambre Solaris Flacon',
    tag: 'Golden Honey & Sunburst',
    image: IMAGES.zeliaAmberSolaris
  },
  {
    id: 'sapphire-crystal',
    name: 'Sapphire Nocturne Bottle',
    tag: 'Deep Blue Crystal & Facets',
    image: IMAGES.zeliaSapphireBottle
  },
  {
    id: 'ruby-crystal',
    name: 'Ruby Royale Bottle',
    tag: 'Crimson Crystal & Gold Neck',
    image: IMAGES.zeliaRubyBottle
  },
  {
    id: 'emerald-crystal',
    name: 'Emerald Aromatic Bottle',
    tag: 'Deep Jade & Polished Brass',
    image: IMAGES.zeliaEmeraldBottle
  },
  {
    id: 'cognac-amber',
    name: 'Santal & Cognac Flacon',
    tag: 'Warm Amber & Heavy Glass Base',
    image: IMAGES.zeliaCognacAmber
  },
  {
    id: 'fleur-soie',
    name: 'Fleur de Soie Flacon',
    tag: 'Soft Peach & Silk Ribbon',
    image: IMAGES.zeliaFleurSoie
  },
  {
    id: 'coffret-set',
    name: 'Coffret Voyage Privé',
    tag: '5-Piece Travel Gift Set',
    image: IMAGES.zeliaCoffretSet
  },
  {
    id: 'gold-atomizer',
    name: 'Gold Travel Atomizer',
    tag: 'Pocket Luxury Sprayer',
    image: IMAGES.zeliaGoldAtomizer
  },
  {
    id: 'attar-crystal',
    name: 'Pure Attar Crystal Tola',
    tag: 'Concentrated Oil Crystal',
    image: IMAGES.catAttarOil
  }
];
