import { Page } from '../../../types/templates/Page';
import { Filter } from '../../../scripts/components/filter/Filter';
import { IProduct } from '../../../types/models/IProduct';
import state from '../../state/State';

export class Main extends Page {
  brandsFilter: Filter<IProduct>;

  constructor(path?: string) {
    super(path);
    this.brandsFilter = new Filter<IProduct>('div', 'filter__brand', 'brand', state.products, state.filteredProducts);
  }

  render(): HTMLElement {
    this.container.append(this.brandsFilter.render());
    //const f1 = 0;
    return this.container;
  }
}
