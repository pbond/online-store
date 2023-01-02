import { Component } from '../../../types/templates/Component';
import { ElementGenerator } from '../../helpers/ElementGenerator';
import state from '../../state/State';
import './vitrine.scss';
import { IProduct } from '../../../types/models/IProduct';
import eventBus from '../../helpers/EventBus';
import { ViewModeEnum } from '../../../types/enums/ViewModeEnum';
import { VitrineCard } from '../../../scripts/components/cardInVitrine/VitrineCard';

export class Vitrine extends Component {
  constructor(tagName: string, className: string) {
    super(tagName, className);
  }

  render(): HTMLElement {
    if (state.filter) {
      this.updateVitrine(state.filter.filteredProducts, state.filter.viewMode);
    }
    this.container.classList.add('vitrine-container');
    this.init();
    return this.container;
  }

  init(): Vitrine {
    eventBus.on('updatefilter', (filteredProducts: IProduct[]) => {
      if (state.filter) {
        this.updateVitrine(filteredProducts, state.filter.viewMode);
      }
    });
    eventBus.on('changeViewMode', (viewMode: ViewModeEnum) => {
      if (state.filter) {
        this.updateVitrine(state.filter.filteredProducts, viewMode);
      }
    });
    return this;
  }

  private updateVitrine(filteredProducts: IProduct[], viewMode: ViewModeEnum) {
    if (filteredProducts.length === 0) {
      this.elements.vitrine = ElementGenerator.createCustomElement('h3', {
        className: 'card__notfound',
        textContent: 'No products found',
      });
    } else {
      switch (viewMode) {
        case ViewModeEnum.List:
          this.elements.vitrine = this.renderListVitrine(filteredProducts);
          break;
        case ViewModeEnum.Grid:
          this.elements.vitrine = this.renderGridVitrine(filteredProducts);
          break;
        default:
          break;
      }
    }
    this.container.innerHTML = '';
    this.container.append(this.elements.vitrine);
  }

  private renderGridVitrine(products: IProduct[]): HTMLElement {
    const gridContainer = ElementGenerator.createCustomElement('div', {
      className: 'grid-container row row-cols-1 row-cols-sm-2  row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-2',
    });
    products.forEach((product) => {
      const column = ElementGenerator.createCustomElement('div', {
        className: 'col',
      });
      const vitrineCard = new VitrineCard('div', 'vitrine-card', product, ViewModeEnum.Grid);
      column.append(vitrineCard.render());
      gridContainer.append(column);
    });
    return gridContainer;
  }

  private renderListVitrine(products: IProduct[]): HTMLElement {
    const listContainer = ElementGenerator.createCustomElement('div', {
      className: 'grid-container row row-cols-1 g-2',
    });
    products.forEach((product) => {
      const column = ElementGenerator.createCustomElement('div', {
        className: 'col',
      });
      const vitrineCard = new VitrineCard('div', 'vitrine-card', product, ViewModeEnum.List);
      column.append(vitrineCard.render());
      listContainer.append(column);
    });
    return listContainer;
  }
}
