import { Page } from '../../../types/templates/Page';
import { Filter } from '../../../scripts/components/filter/Filter';
import { Slider } from '../../../scripts/components/slider/Slider';
import { IProduct } from '../../../types/models/IProduct';
import state from '../../state/State';
import { FilterTypeEnum } from '../../../types/enums/FilterTypeEnum';

export class Main extends Page {
  private brandsFilter: Filter<IProduct>;
  private categorysFilter: Filter<IProduct>;
  private priceSlider: Slider<IProduct>;
  private stockSlider: Slider<IProduct>;

  constructor(path?: string) {
    super(path);
    state.filterQuery = path ?? '';
    this.brandsFilter = new Filter<IProduct>('div', 'filter__brand', FilterTypeEnum.Brand, state.products).init();
    this.categorysFilter = new Filter<IProduct>(
      'div',
      'filter__category',
      FilterTypeEnum.Category,
      state.products
    ).init();
    this.priceSlider = new Slider<IProduct>('div', 'filter__price', FilterTypeEnum.Price, state.products, '$').init();
    this.stockSlider = new Slider<IProduct>('div', 'filter__stock', FilterTypeEnum.Stock, state.products).init();
  }

  render(): HTMLElement {
    this.container.append(this.brandsFilter.render());
    this.container.append(this.categorysFilter.render());
    this.container.append(this.priceSlider.render());
    this.container.append(this.stockSlider.render());
    return this.container;
  }
}
