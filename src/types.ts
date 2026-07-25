export type CategoryType = 
  | 'All' 
  | 'Kurtis & Sets' 
  | 'Sarees' 
  | 'Party Wear' 
  | 'Tops & Tunics' 
  | 'Nightwear' 
  | 'Wholesale';

export type ProductTag = 'NEW ARRIVAL' | 'BESTSELLER' | 'LIMITED STOCK' | 'WHOLESALE AVAILABLE' | 'HOT SALE';

export type SizeOption = 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL' | 'Free Size';

export interface Product {
  id: string;
  title: string;
  titleTamil?: string;
  category: CategoryType;
  price: number;
  mrp: number;
  image: string;
  additionalImages?: string[];
  sizes: SizeOption[];
  fabricCare: string;
  fabricCareTamil?: string;
  description: string;
  descriptionTamil?: string;
  tag?: ProductTag;
  inStock: boolean;
  featured?: boolean;
  color?: string;
  code?: string;
}

export interface Review {
  id: string;
  author: string;
  location: string;
  rating: number;
  comment: string;
  date: string;
  verifiedBuyer: boolean;
  productName?: string;
}

export interface CategoryInfo {
  id: CategoryType;
  name: string;
  nameTamil: string;
  image: string;
  itemCount: number;
}

export type Language = 'EN' | 'TA';
