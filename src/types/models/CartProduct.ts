import { Product } from './Product';

export interface CartProducts {
  [key: number]: {
    product: Product;
    count: number;
  };
}
