import { ICartProducts } from '../../types/models/ICartProduct';
import { IProduct } from '../../types/models/IProduct';
import { IState } from '../../types/models/IState';
import { Webrequest } from '../helpers/WebRequest';
import { IProductResponse } from '../../types/models/IProductResponse';
import router from '../router/Router';
import { FilterTypeEnum } from '../../types/enums/FilterTypeEnum';
import { SortTypeEnum } from '../../types/enums/SortTypeEnum';
import eventBus from '../helpers/EventBus';

class State implements IState {
  products: IProduct[];
  filteredProducts: IProduct[];
  cart: ICartProducts;
  filterParams: URLSearchParams;

  get filterQuery() {
    return this.filterParams.toString();
  }

  set filterQuery(query: string) {
    this.filterParams = new URLSearchParams(query);
    this.updateFilter();
  }

  constructor() {
    this.products = [];
    this.filteredProducts = [];
    this.cart = {};
    this.filterParams = new URLSearchParams();
  }

  updateFilter(): void {
    const names = [...new Set(this.filterParams.keys())];
    this.filteredProducts = this.products;

    const groupNames = names.filter((n) => n !== FilterTypeEnum.Search && n !== FilterTypeEnum.Sort);
    groupNames.forEach((name) => {
      const values = this.filterParams.getAll(name);
      this.filteredProducts = this.filteredProducts.filter((product) =>
        values.some((v) => v === Object.getOwnPropertyDescriptor(product, name)?.value)
      );
    });

    const searchValue = this.filterParams.get(FilterTypeEnum.Search);
    if (searchValue) {
      this.filteredProducts = this.filteredProducts.filter((product) =>
        Object.values(product).some((v) => String(v).toLowerCase().includes(searchValue?.toLowerCase()))
      );
    }

    const sortValue = this.filterParams.get(FilterTypeEnum.Sort);
    //const sortValue = 'id-Desc';
    if (sortValue) {
      const [sortName, sortType] = sortValue.split('-');
      this.filteredProducts.sort((a, b) => {
        return this.comparer(
          Object.getOwnPropertyDescriptor(a, sortName)?.value,
          Object.getOwnPropertyDescriptor(b, sortName)?.value,
          sortType as SortTypeEnum
        );
      });
    }

    eventBus.trigger('updatefilter', this.filteredProducts);
  }

  appendSearchParams(name: string, value: string): void {
    if (!name || !value) {
      return;
    }
    this.filterParams.append(name, value);
    this.updateFilter();
    router.updateQuery(this.filterQuery);
  }

  deleteSearchParams(name: string, value: string): void {
    this.filterParams = new URLSearchParams(
      [...this.filterParams].filter(([key, val]) => !(key === name && val === value))
    );
    this.updateFilter();
    router.updateQuery(this.filterQuery);
  }

  async load(): Promise<void> {
    const result = await Webrequest.get<IProductResponse>('https://dummyjson.com/products?limit=100');
    this.products = result.products;
    this.filteredProducts = result.products;
  }

  private comparer(a: string | number, b: string | number, sortType: SortTypeEnum): number {
    if (sortType == SortTypeEnum.Desc) {
      [a, b] = [b, a];
    }
    if (typeof a === 'string' && typeof b === 'string') {
      return a.localeCompare(b);
    }
    if (typeof a === 'number' && typeof b === 'number') {
      return a - b;
    }
    return 0;
  }
}

const state = new State();
export default state;
