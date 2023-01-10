import { ICartProducts } from './ICartProduct';
import { IProduct } from './IProduct';
import { IPromoCode } from './IPromoCode';

export interface ICartState {
  products: ICartProducts;
  promoCodes: IPromoCode[];
  init: () => void;
  addToCart: (product: IProduct) => void;
  removeFromCart: (product: IProduct) => void;
  addItemToCart: (product: IProduct) => void;
  removeItemFromCart: (product: IProduct) => void;
  saveCart: (products: ICartProducts) => void;
}
