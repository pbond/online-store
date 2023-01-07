import { Component } from '../../../types/templates/Component';
import { ElementGenerator } from '../../helpers/ElementGenerator';
import state from '../../state/State';
import './vitrine.scss';
import { IProduct } from '../../../types/models/IProduct';
import eventBus from '../../helpers/EventBus';
import { ViewModeEnum } from '../../../types/enums/ViewModeEnum';
import { VitrineCard } from '../../../scripts/components/cardInVitrine/VitrineCard';

export class Vitrine extends Component {
  private vitrineCards: VitrineCard[];
  constructor(tagName: string, className: string) {
    super(tagName, className);
    this.vitrineCards = [];
    this.changeViewUpdateHandler = this.changeViewUpdateHandler.bind(this);
    this.updateFilterHandler = this.updateFilterHandler.bind(this);
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
    eventBus.on('updatefilter', this.updateFilterHandler);
    eventBus.on('changeViewMode', this.changeViewUpdateHandler);
    return this;
  }

  private updateFilterHandler(filteredProducts: IProduct[]) {
    if (state.filter) {
      this.updateVitrine(filteredProducts, state.filter.viewMode);
    }
  }

  private changeViewUpdateHandler(viewMode: ViewModeEnum) {
    if (state.filter) {
      this.updateVitrine(state.filter.filteredProducts, viewMode);
    }
  }

  private updateVitrine(filteredProducts: IProduct[], viewMode: ViewModeEnum) {
    this.container.innerHTML = '';
    if (filteredProducts.length === 0) {
      this.elements.vitrine = ElementGenerator.createCustomElement('h3', {
        className: 'card__notfound',
        textContent: 'No products found',
      });
    } else {
      this.elements.vitrine = this.renderVitrine(filteredProducts, viewMode);
    }
    this.container.append(this.elements.vitrine);
  }

  private renderVitrine(products: IProduct[], viewMode: ViewModeEnum): HTMLElement {
    let container = ElementGenerator.createCustomElement('div', {
      className: 'grid-container row row-cols-1 row-cols-sm-2  row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-2',
    });
    if (viewMode === ViewModeEnum.List) {
      container = ElementGenerator.createCustomElement('div', {
        className: 'grid-container row row-cols-1 g-2',
      });
    }
    products.forEach((product) => {
      const column = ElementGenerator.createCustomElement('div', {
        className: 'col',
      });
      let vitrineCard = this.vitrineCards.find((card) => card.product.id === product.id);
      if (vitrineCard) {
        column.append(vitrineCard.getRenderedCard(viewMode));
      } else {
        vitrineCard = new VitrineCard('div', 'vitrine-card', product, viewMode);
        this.vitrineCards.push(vitrineCard);
        column.append(vitrineCard.render());
      }
      container.append(column);
    });
    return container;
  }

  destroy(): void {
    eventBus.off('updatefilter', this.updateFilterHandler);
    eventBus.off('changeViewMode', this.changeViewUpdateHandler);
    this.vitrineCards?.forEach((card) => card.destroy());
  }
}
