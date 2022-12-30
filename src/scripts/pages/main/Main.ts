import { Page } from '../../../types/templates/Page';
import { Filter } from '../../../scripts/components/filter/Filter';
import { Slider } from '../../../scripts/components/slider/Slider';
import { SearchInput } from '../../components/contentContainer/searchInput/SearchInput';
import { SortSelector } from '../../components/contentContainer/sortSelector/SortSelector';
import { IProduct } from '../../../types/models/IProduct';
import state from '../../state/State';
import { FilterTypeEnum } from '../../../types/enums/FilterTypeEnum';
import { ElementGenerator } from '../../helpers/ElementGenerator';

export class Main extends Page {
  private brandsFilter: Filter<IProduct>;
  private categorysFilter: Filter<IProduct>;
  private priceSlider: Slider<IProduct>;
  private stockSlider: Slider<IProduct>;
  private search: SearchInput;
  private sortSelector: SortSelector;

  constructor(path?: string) {
    super(path);
    state.filterQuery = path ?? '';
    this.sortSelector = new SortSelector('div', 'filter__sort', ['price', 'rating', 'stock']);
    this.search = new SearchInput('div', 'filter__search');
    this.brandsFilter = new Filter<IProduct>('div', 'filter__brand', FilterTypeEnum.Brand, state.products);
    this.categorysFilter = new Filter<IProduct>('div', 'filter__category', FilterTypeEnum.Category, state.products);
    this.priceSlider = new Slider<IProduct>('div', 'filter__price', FilterTypeEnum.Price, state.products, '$');
    this.stockSlider = new Slider<IProduct>('div', 'filter__stock', FilterTypeEnum.Stock, state.products);
  }

  render(): HTMLElement {
    const filters = ElementGenerator.createCustomElement<HTMLElement>('aside', { className: 'shop__filters' });
    const products = ElementGenerator.createCustomElement<HTMLElement>('div', { className: 'shop__products' });
    const productsHeader = ElementGenerator.createCustomElement<HTMLElement>('div', { className: 'products__header' });
    const productsList = ElementGenerator.createCustomElement<HTMLElement>('div', { className: 'products__list' });
    products.append(productsHeader);
    products.append(productsList);
    filters.append(this.sortSelector.render());
    filters.append(this.search.render());
    filters.append(this.brandsFilter.render());
    filters.append(this.categorysFilter.render());
    filters.append(this.priceSlider.render());
    filters.append(this.stockSlider.render());
    this.container.classList.add('shop_content');
    this.container.append(filters);
    return this.container;
  }
}
