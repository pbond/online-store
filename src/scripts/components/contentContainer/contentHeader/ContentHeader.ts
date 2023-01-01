import { Component } from '../../../../types/templates/Component';
import { ElementGenerator } from '../../../helpers/ElementGenerator';
import { SortSelector } from '../../contentContainer/sortSelector/SortSelector';
import './contentHeader.scss';
import { ViewModeToggle } from '../viewModeToggle/ViewModeToggle';
import eventBus from '../../../helpers/EventBus';
import { IProduct } from '../../../../types/models/IProduct';

export class ContentHeader extends Component {
  private sortSelector: SortSelector;
  private viewModeToggle: ViewModeToggle;

  constructor(tagName: string, className: string) {
    super(tagName, className);
    this.sortSelector = new SortSelector('div', 'filter__sort', ['price', 'rating', 'stock']);
    this.viewModeToggle = new ViewModeToggle('div', 'display-container');
  }

  render(): HTMLElement {
    this.elements.countSpan = ElementGenerator.createCustomElement<HTMLSpanElement>('span', {
      className: 'products__count',
    });
    this.container.append(this.sortSelector.render());
    this.container.append(this.elements.countSpan);
    this.container.append(this.viewModeToggle.render());
    this.container.classList.add('content-header-container');
    this.init();
    return this.container;
  }

  init(): ContentHeader {
    eventBus.on('updatefilter', (filteredProducts: IProduct[]) => {
      this.update(filteredProducts);
    });
    return this;
  }

  private update(filteredProducts: IProduct[]): void {
    this.elements.countSpan.textContent = `Count: ${filteredProducts.length}`;
  }
}
