import { IProduct } from '../../types/models/IProduct';
import router from '../router/Router';
import eventBus from '../helpers/EventBus';
import { FilterTypeEnum } from '../../types/enums/FilterTypeEnum';
import { SortTypeEnum } from '../../types/enums/SortTypeEnum';
import { IFilterState } from '../../types/models/IFilterState';
import { ViewModeEnum } from '../../types/enums/ViewModeEnum';

export class FilterState implements IFilterState {
  private products: IProduct[];
  filteredProducts: IProduct[];
  filterParams: URLSearchParams;
  private _viewMode: ViewModeEnum;

  get filterQuery() {
    return this.filterParams.toString();
  }

  set filterQuery(query: string) {
    this.filterParams = new URLSearchParams(query);
    this.updateFilter();
    router.updateQuery(this.filterQuery);
  }

  get viewMode() {
    return this._viewMode;
  }

  set viewMode(mode: ViewModeEnum) {
    this._viewMode = mode;
    eventBus.trigger('changeViewMode', mode);
  }

  constructor(products: IProduct[]) {
    this.products = products;
    this.filteredProducts = [];
    this.filterParams = new URLSearchParams();
    this._viewMode = ViewModeEnum.Grid;
  }

  updateFilter(): void {
    this.filteredProducts = this.getFilteredProducts(this.products, this.filterParams);
    eventBus.trigger('updatefilter', this.filteredProducts);
  }

  getFilteredProducts(products: IProduct[], filterParams: URLSearchParams): IProduct[] {
    const names = [...new Set(filterParams.keys())];
    let filteredProducts = [...products];

    const groupNames = names.filter(
      (n) =>
        n !== FilterTypeEnum.Search &&
        n !== FilterTypeEnum.Sort &&
        !n.startsWith('sl-') &&
        !n.endsWith('-from') &&
        !n.endsWith('-to')
    );
    groupNames.forEach((name) => {
      const values = filterParams.getAll(name);
      filteredProducts = filteredProducts.filter((product) =>
        values.some((v) => v === Object.getOwnPropertyDescriptor(product, name)?.value)
      );
    });

    let sliderNames = names
      .filter((n) => n.startsWith('sl-') && (n.endsWith('-from') || n.endsWith('-to')))
      .map((n) => n.replace('sl-', '').replace('-from', '').replace('-to', ''));
    sliderNames = [...new Set(sliderNames)];
    sliderNames.forEach((name) => {
      const from = filterParams.get(`sl-${name}-from`);
      const to = filterParams.get(`sl-${name}-to`);
      if (from) {
        filteredProducts = filteredProducts.filter(
          (product) => Number(Object.getOwnPropertyDescriptor(product, name)?.value) >= Number(from)
        );
      }
      if (to) {
        filteredProducts = filteredProducts.filter(
          (product) => Number(Object.getOwnPropertyDescriptor(product, name)?.value) <= Number(to)
        );
      }
    });

    const searchValue = filterParams.get(FilterTypeEnum.Search);
    if (searchValue) {
      filteredProducts = filteredProducts.filter((product) =>
        Object.values(product).some((v) => String(v).toLowerCase().includes(searchValue?.toLowerCase()))
      );
    }

    const sortValue = filterParams.get(FilterTypeEnum.Sort);
    if (sortValue) {
      const [sortName, sortType] = sortValue.split('-');
      filteredProducts.sort((a, b) => {
        return this.comparer(
          Object.getOwnPropertyDescriptor(a, sortName)?.value,
          Object.getOwnPropertyDescriptor(b, sortName)?.value,
          sortType as SortTypeEnum
        );
      });
    }
    return filteredProducts;
  }

  setSearchParams(name: string, value: string): void {
    if (!name || !value) {
      return;
    }
    this.filterParams.set(name, value);
    this.updateFilter();
    router.updateQuery(this.filterQuery);
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

  deleteAllSearchParamsByName(name: string): void {
    this.filterParams.delete(name);
    this.updateFilter();
    router.updateQuery(this.filterQuery);
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
