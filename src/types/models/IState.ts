import { ICartProducts } from './ICartProduct';
import { IProduct } from './IProduct';

export interface IState {
  products: IProduct[];
  filterQuery: string;
  filteredProducts: IProduct[];
  cart: ICartProducts;
  updateFiler(query: string): void;
  load(): Promise<void>;
}
