import { User } from "./user";

export interface Review {
  user: User;
  rating: number;
  review?: string;
}
