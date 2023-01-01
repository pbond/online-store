import { Page } from '../../../types/templates/Page';
import { FilterSidebar } from '../../../scripts/components/filterSidebar/FilterSidebar';
import state from '../../state/State';
import { ElementGenerator } from '../../helpers/ElementGenerator';

export class Main extends Page {
  private filterSidebar: FilterSidebar;

  constructor(path?: string) {
    super(path);
    if (state.filter) {
      state.filter.filterQuery = path ?? '';
    }
    this.filterSidebar = new FilterSidebar('aside', 'shop__filters');
    this.filterSidebar.init();
  }

  render(): HTMLElement {
    const products = ElementGenerator.createCustomElement<HTMLElement>('div', { className: 'shop__products' });
    const productsHeader = ElementGenerator.createCustomElement<HTMLElement>('div', { className: 'products__header' });
    const productsList = ElementGenerator.createCustomElement<HTMLElement>('div', { className: 'products__list' });
    products.append(productsHeader);
    products.append(productsList);
    this.container.classList.add('shop_content');
    this.container.append(this.filterSidebar.render());
    return this.container;
  }
}
