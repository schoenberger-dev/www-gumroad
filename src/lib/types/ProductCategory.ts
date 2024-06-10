type ProductCategoryType =
  | '3d'
  | 'design'
  | 'drawing-and-painting'
  | 'software-development'
  | 'self-improvement'
  | 'fitness-and-health'
  | 'music-and-sound-design'
  | 'photography'
  | 'writing-and-publishing'
  | 'business-and-money'
  | 'education'
  | 'comics-and-graphic-novels'
  | 'fiction-books'
  | 'audio'
  | 'recorded-music'
  | 'films'
  | 'gaming'
  | 'other';

type ProductCategory = {
  name: string;
  slug: ProductCategoryType;
  identifier: number;
};
