import { ICartProducts } from './ICartProduct';
import { IFilterState } from './IFilterState';
import { IProduct } from './IProduct';

export interface IState {
  products: IProduct[];
  filter: IFilterState | null;
  cart: ICartProducts;
  load(): Promise<void>;
}
