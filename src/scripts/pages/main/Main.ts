import { Page } from '../../../types/templates/Page';
import { Filter } from '../../../scripts/components/filter/Filter';
import { IProduct } from '../../../types/models/IProduct';
import state from '../../state/State';

export class Main extends Page {
  private brandsFilter: Filter<IProduct>;
  private categorysFilter: Filter<IProduct>;

  constructor(path?: string) {
    super(path);
    state.filterQuery = path ?? '';
    this.brandsFilter = new Filter<IProduct>('div', 'filter__brand', 'brand', state.products).init();
    this.categorysFilter = new Filter<IProduct>('div', 'filter__category', 'category', state.products).init();
  }

  render(): HTMLElement {
    this.container.append(this.brandsFilter.render());
    this.container.append(this.categorysFilter.render());
    return this.container;
  }
}
