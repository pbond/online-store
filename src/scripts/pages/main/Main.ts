import { Page } from '../../../types/templates/Page';
import { Filter } from '../../../scripts/components/filter/Filter';
import { Slider } from '../../../scripts/components/slider/Slider';
import { IProduct } from '../../../types/models/IProduct';
import state from '../../state/State';

export class Main extends Page {
  private brandsFilter: Filter<IProduct>;
  private categorysFilter: Filter<IProduct>;
  private slider: Slider<IProduct>;

  constructor(path?: string) {
    super(path);
    state.filterQuery = path ?? '';
    this.brandsFilter = new Filter<IProduct>('div', 'filter__brand', 'brand', state.products).init();
    this.categorysFilter = new Filter<IProduct>('div', 'filter__category', 'category', state.products).init();
    this.slider = new Slider<IProduct>('div', 'filter__test', 'test', state.products).init();
  }

  render(): HTMLElement {
    this.container.append(this.brandsFilter.render());
    this.container.append(this.categorysFilter.render());
    this.container.append(this.slider.render());
    return this.container;
  }
}
