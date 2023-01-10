import { IFilterState } from './IFilterState';
import { IProduct } from './IProduct';
import { ICartState } from './ICartState';

export interface IState {
  products: IProduct[];
  filter: IFilterState | null;
  cart: ICartState;
  load(): Promise<void>;
}
