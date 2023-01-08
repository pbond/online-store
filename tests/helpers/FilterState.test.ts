import { FilterState } from '../../src/scripts/state/FilterState';
import { ViewModeEnum } from '../../src/types/enums/ViewModeEnum';
import productList from './../mocks/FakeProducts';
import router from '../../src/scripts/router/Router';
import eventBus from '../../src/scripts/helpers/EventBus';
import { FilterTypeEnum } from '../../src/types/enums/FilterTypeEnum';

let updatedQuery = '';

jest.mock('../../src/scripts/router/Router', () => ({
  updateQuery: jest.fn((query: string) => (updatedQuery = query)),
}));

describe('FelterState tests', () => {
  const filter = new FilterState(productList);

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(eventBus, 'trigger').mockRestore();
    filter.filterQuery = '';
  });

  it('empty filter query should generate filteredProducts equals products', () => {
    const products = [...productList];
    expect(filter.filteredProducts).toEqual(products);
  });

  it('wrong filter query should generate empty filteredProducts', () => {
    filter.filterQuery = '1';
    expect(filter.filteredProducts.length).toStrictEqual(0);
  });

  it('right filter query should generate right filteredProducts', () => {
    const products = [productList[1]];
    filter.filterQuery =
      'brand=Apple&brand=Samsung&category=smartphones&sort=price-Desc&sl-stock-to=88&sl-price-to=1204';
    expect(filter.filteredProducts).toEqual(products);
  });

  it('set viewMode to ViewModeEnum.Grid should call router.updateQuery method with query=view-mode=grid', () => {
    filter.viewMode = ViewModeEnum.Grid;
    expect(updatedQuery).toStrictEqual('view-mode=grid');
    expect(router.updateQuery).toBeCalledWith('view-mode=grid');
  });

  it('set viewMode to ViewModeEnum.List should call router.updateQuery method with query=view-mode=list', () => {
    filter.viewMode = ViewModeEnum.List;
    expect(updatedQuery).toStrictEqual('view-mode=list');
    expect(router.updateQuery).toBeCalledWith('view-mode=list');
  });

  it('set viewMode to ViewModeEnum.List should call eventBus.trigger method with changeViewMode and viewMode args', () => {
    jest.spyOn(eventBus, 'trigger');
    filter.viewMode = ViewModeEnum.List;
    expect(eventBus.trigger).toBeCalledWith('changeViewMode', filter.viewMode);
  });

  it('getFilteredProducts method should return products equivalent to the filter query', () => {
    let products = [productList[0], productList[1], productList[3]];
    let filterParams = new URLSearchParams('brand=Apple&category=smartphones&brand=OPPO');
    let result = filter.getFilteredProducts(productList, filterParams);
    expect(result).toEqual(products);

    products = [productList[0], productList[1]];
    filterParams = new URLSearchParams('brand=Apple&category=smartphones');
    result = filter.getFilteredProducts(productList, filterParams);
    expect(result).toEqual(products);

    products = [productList[3], productList[2]];
    filterParams = new URLSearchParams('brand=OPPO&brand=Samsung&sort=stock-Desc');
    result = filter.getFilteredProducts(productList, filterParams);
    expect(result).toEqual(products);

    products = [productList[2]];
    filterParams = new URLSearchParams('search=sams&sort=rating-Desc');
    result = filter.getFilteredProducts(productList, filterParams);
    expect(result).toEqual(products);

    products = [productList[3]];
    filterParams = new URLSearchParams('sl-price-to=368&sl-price-from=112&sl-stock-to=125&sl-stock-from=95');
    result = filter.getFilteredProducts(productList, filterParams);
    expect(result).toEqual(products);
  });

  it('appendSearchParams method should update filteredProducts and call updateQuery method', () => {
    let products = [...productList];
    filter.filterQuery = 'category=smartphones';
    const firstFilteredProducts = filter.filteredProducts;
    expect(filter.filteredProducts).toEqual(productList);

    filter.appendSearchParams(FilterTypeEnum.Brand, 'Apple');
    products = [productList[0], productList[1]];
    expect(filter.filteredProducts).toEqual(products);
    expect(filter.filteredProducts).not.toEqual(firstFilteredProducts);
    expect(updatedQuery).toStrictEqual('category=smartphones&brand=Apple');
    expect(router.updateQuery).toBeCalled();
  });

  it('setSearchParams method should update filteredProducts and call updateQuery method', () => {
    let products = [productList[0], productList[1], productList[2]];
    filter.filterQuery = 'brand=Apple&brand=Samsung';
    const firstFilteredProducts = filter.filteredProducts;
    expect(filter.filteredProducts).toEqual(products);

    filter.setSearchParams(FilterTypeEnum.Search, 'universe');
    products = [productList[2]];
    expect(filter.filteredProducts).toEqual(products);
    expect(filter.filteredProducts).not.toEqual(firstFilteredProducts);
    expect(updatedQuery).toStrictEqual('brand=Apple&brand=Samsung&search=universe');
    expect(router.updateQuery).toBeCalled();
  });

  it('deleteSearchParams method should update filteredProducts and call updateQuery method', () => {
    let products = [productList[0], productList[1], productList[2]];
    filter.filterQuery = 'brand=Apple&brand=Samsung';
    const firstFilteredProducts = filter.filteredProducts;
    expect(filter.filteredProducts).toEqual(products);

    filter.deleteSearchParams('brand', 'Samsung');
    products = [productList[0], productList[1]];
    expect(filter.filteredProducts).toEqual(products);
    expect(filter.filteredProducts).not.toEqual(firstFilteredProducts);
    expect(updatedQuery).toStrictEqual('brand=Apple');
    expect(router.updateQuery).toBeCalled();
  });

  it('deleteAllSearchParamsByName method should update filteredProducts and call updateQuery method', () => {
    let products = [productList[2]];
    filter.filterQuery = 'brand=Apple&brand=Samsung&search=univ';
    const firstFilteredProducts = filter.filteredProducts;
    expect(filter.filteredProducts).toEqual(products);

    filter.deleteAllSearchParamsByName(FilterTypeEnum.Search);
    products = [productList[0], productList[1], productList[2]];
    expect(filter.filteredProducts).toEqual(products);
    expect(filter.filteredProducts).not.toEqual(firstFilteredProducts);
    expect(updatedQuery).toStrictEqual('brand=Apple&brand=Samsung');
    expect(router.updateQuery).toBeCalled();
  });
});
