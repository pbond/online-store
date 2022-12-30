import { IProduct } from './IProduct';

// export interface ICartProducts {
//   [key: number]: {
//     product: IProduct;
//     count: number;
//   };
// }

interface ICartProduct {
  product: IProduct;
  count: number;
}

export type ICartProducts = Array<ICartProduct>;
