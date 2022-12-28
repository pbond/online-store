import { ICartProducts } from './ICartProduct';
import { IProduct } from './IProduct';

export interface IState {
  products: IProduct[];
  filterQuery: string;
  filteredProducts: IProduct[];
  cart: ICartProducts;
  updateFiler(): void;
  appendSearchParams(name: string, value: string): void;
  deleteSearchParams(name: string, value: string): void;
  load(): Promise<void>;
}
