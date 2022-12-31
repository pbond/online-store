import { IProduct } from './IProduct';

export interface IFilterState {
  filterQuery: string;
  filteredProducts: IProduct[];
  filterParams: URLSearchParams;
  updateFilter(): void;
  getFilteredProducts(products: IProduct[], filterParams: URLSearchParams): IProduct[];
  setSearchParams(name: string, value: string): void;
  appendSearchParams(name: string, value: string): void;
  deleteSearchParams(name: string, value: string): void;
  deleteAllSearchParamsByName(name: string): void;
}
