import { ICartProducts } from '../../types/models/ICartProduct';
import { IProduct } from '../../types/models/IProduct';
import { IState } from '../../types/models/IState';
import { Webrequest } from '../helpers/WebRequest';
import { IProductResponse } from '../../types/models/IProductResponse';

class State implements IState {
  products: IProduct[];
  filterQuery: string;
  filteredProducts: IProduct[];
  cart: ICartProducts;
  constructor() {
    this.products = [];
    this.filterQuery = '';
    this.filteredProducts = [];
    this.cart = {};
  }
  updateFiler(query: string): void {
    this.filterQuery = query;
  }
  async load(): Promise<void> {
    const result = await Webrequest.get<IProductResponse>('https://dummyjson.com/products?limit=100');
    this.products = result.products;
    this.filteredProducts = result.products;
  }
}

const state = new State();
export default state;
