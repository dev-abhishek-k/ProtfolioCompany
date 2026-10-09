export const profile = {
  name: 'MONOCHROME MUSE', handle: '@yourhandle',
  tagline: 'Your life. Your art. Your digital museum.',
  introduction: 'I collect fleeting moments and turn them into visual stories. Fashion is my medium; curiosity is the thread that connects every frame.',
  journey: 'What began as a personal archive became a practice in seeing differently. Through portraits, places, movement, and style, I create work that feels both intimate and larger than life.',
  instagram: '', email: '', location: 'Available worldwide',
};
export type MediaItem = { id: number; title: string; category: string; image: string; video?: string; instagramUrl?: string; note?: string };
export const gallery: MediaItem[] = [
  { id: 1, title: 'The quiet statement', category: 'Fashion', image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=1400&q=85', note: 'An exercise in presence, form, and restraint.' },
  { id: 2, title: 'After the light', category: 'Portraits', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1200&q=85', note: 'A portrait of the space between moments.' },
  { id: 3, title: 'City in motion', category: 'Lifestyle', image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&q=85', note: 'Everyday ritual, seen through an editorial lens.' },
  { id: 4, title: 'Elsewhere, always', category: 'Travel', image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=1400&q=85', note: 'A study of movement and belonging.' },
  { id: 5, title: 'Shape of a feeling', category: 'Editorial', image: 'https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?w=1200&q=85', note: 'Softness with an edge.' },
  { id: 6, title: 'Between takes', category: 'Fashion', image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=1200&q=85', note: 'The beautiful, unplanned in-between.' },
];
export const reels: MediaItem[] = [
  { id: 1, title: 'Dressed for the moment', category: 'Fashion', image: gallery[0].image, note: 'A moving editorial' },
  { id: 2, title: 'A slower kind of morning', category: 'Lifestyle', image: gallery[2].image, note: 'The everyday, reimagined' },
  { id: 3, title: 'Postcards from elsewhere', category: 'Travel', image: gallery[3].image, note: 'A visual diary' },
  { id: 4, title: 'In my own light', category: 'Portraits', image: gallery[5].image, note: 'A study in self expression' },
];
