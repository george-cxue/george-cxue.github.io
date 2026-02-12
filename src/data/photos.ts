export interface Photo {
  src: string;
  alt: string;
  caption?: string;
}

export interface Exhibit {
  slug: string;
  title: string;
  date: string;
  description?: string;
  cover: string;
  photos: Photo[];
}

export const EXHIBITS: Exhibit[] = [
  {
    slug: 'philadelphia',
    title: 'Philadelphia',
    date: '2024-06-15',
    description: 'Scenes from around the city',
    cover: '/media/home/philly.jpg',
    photos: [
      {
        src: '/media/home/philly.jpg',
        alt: 'Philadelphia skyline',
        caption: 'The skyline from South Street Bridge',
      },
      {
        src: '/media/home/friends.jpg',
        alt: 'Friends in Philadelphia',
      },
      {
        src: '/media/home/icecream.jpg',
        alt: 'Ice cream in the city',
        caption: 'Matcha ice cream on a summer afternoon',
      },
    ],
  },
  {
    slug: 'misc',
    title: 'Miscellaneous',
    date: '2024-03-08',
    description: 'A collection of moments',
    cover: '/media/home/car.jpg',
    photos: [
      {
        src: '/media/home/car.jpg',
        alt: 'A cool car',
      },
      {
        src: '/media/home/box.jpg',
        alt: 'Music box from Boston',
        caption: 'Found this in a shop in Boston',
      },
      {
        src: '/media/home/pc.jpg',
        alt: 'Pledge class photo',
      },
    ],
  },
];
