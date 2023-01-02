import { ICartProducts } from './ICartProduct';
import { IProduct } from './IProduct';

export interface ICartState {
  products: ICartProducts;
  init: () => void;
  addToCart: (product: IProduct) => void;
  removeFromCart: (product: IProduct) => void;
}
