export interface FilterOptions {
  category?: string;
  size?: string [];
  sort?: 'price_asc' | 'price_desc';
  page: number;
  limit: number;
}