import { IProduct } from './IProduct';

export interface ICartProducts {
  [key: number]: {
    product: IProduct;
    count: number;
  };
}
