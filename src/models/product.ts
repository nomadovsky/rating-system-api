import { Review } from "./review";

export interface Product {
  productName: string;
  description: string;
  price: number;
  rating: number;
  reviews: Review[];
}
