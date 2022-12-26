import { ICartProducts } from '../../types/models/ICartProduct';
import { IProduct } from '../../types/models/IProduct';
import { IState } from '../../types/models/IState';

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
}

const state = new State();
export default state;
