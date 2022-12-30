import { ICartProducts } from './ICartProduct';
import { IProduct } from './IProduct';

export interface IState {
  products: IProduct[];
  filterQuery: string;
  filteredProducts: IProduct[];
  cart: ICartProducts;
  updateFilter(): void;
  setSearchParams(name: string, value: string): void;
  appendSearchParams(name: string, value: string): void;
  deleteSearchParams(name: string, value: string): void;
  deleteAllSearchParamsByName(name: string): void;
  load(): Promise<void>;
  emulateCart(): void;
}
