import { CartProducts } from './CartProduct';
import { Product } from './Product';

export interface State {
  products: Product[];
  filterQuery: string;
  filteredProducts: Product[];
  cart: CartProducts;
  updateFiler(query: string): void;
}
