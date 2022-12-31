import { ICartProducts } from '../../types/models/ICartProduct';
import { IProduct } from '../../types/models/IProduct';
import { IState } from '../../types/models/IState';
import { IFilterState } from '../../types/models/IFilterState';
import { Webrequest } from '../helpers/WebRequest';
import { IProductResponse } from '../../types/models/IProductResponse';
import { FilterState } from '../../scripts/state/FilterState';

class State implements IState {
  products: IProduct[];
  filter: IFilterState | null;
  cart: ICartProducts;

  constructor() {
    this.products = [];
    this.filter = null;
    this.cart = [];
  }

  async load(): Promise<void> {
    const result = await Webrequest.get<IProductResponse>('https://dummyjson.com/products?limit=100');
    this.products = result.products;
    this.filter = new FilterState(this.products);
    const cartProducts = localStorage.getItem('cartProducts');
    if (cartProducts !== null) {
      this.cart = JSON.parse(cartProducts);
    }
  }
}

const state = new State();
export default state;
