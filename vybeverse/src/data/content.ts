export const creator = {
  name: 'YOUR NAME', handle: '@yourhandle', location: 'YOUR CITY',
  email: '', instagram: '',
  intro: 'A creator drawn to expressive style, vivid places, and the stories between the frames.',
  story: 'This is a space for experimentation, personal style, and a point of view that keeps evolving.',
};
export type Reel = { title:string; category:string; cover:string; video?:string; instagramUrl?:string };
export const reels: Reel[] = [
  {title:'A little afterglow',category:'Fashion',cover:'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&q=85'},
  {title:'City in motion',category:'Lifestyle',cover:'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=800&q=85'},
  {title:'Golden hour ritual',category:'Beauty',cover:'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&q=85'},
  {title:'Somewhere new',category:'Travel',cover:'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=85'},
  {title:'Off camera',category:'Behind the Scenes',cover:'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=85'},
];
export const categories = ['Fashion','Beauty','Travel','Lifestyle','Behind the Scenes'] as const;
export const gallery = [
  {title:'The silhouette',category:'Fashion',image:'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=1100&q=85'},
  {title:'Soft focus',category:'Beauty',image:'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=1100&q=85'},
  {title:'In transit',category:'Travel',image:'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1100&q=85'},
  {title:'Everyday magic',category:'Lifestyle',image:'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=1100&q=85'},
  {title:'Behind the frame',category:'Behind the Scenes',image:'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1100&q=85'},
];
export const timeline = [{year:'01',title:'The beginning',text:'Finding a visual voice.'},{year:'02',title:'The exploration',text:'Following curiosity across style and place.'},{year:'03',title:'The next chapter',text:'Making room for new stories together.'}];
export const collaborations: {brand:string; campaign:string; image:string; url?:string}[] = [];
export const statistics: {label:string; value:number; suffix:string}[] = [];
