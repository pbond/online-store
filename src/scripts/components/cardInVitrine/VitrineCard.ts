import { Component } from '../../../types/templates/Component';
import { ElementGenerator } from '../../helpers/ElementGenerator';
import state from '../../state/State';
//import { Button } from '../../../scripts/components/button/Button';
import './vitrineCard.scss';
import { IProduct } from '../../../types/models/IProduct';
import eventBus from '../../helpers/EventBus';
import { ViewModeEnum } from '../../../types/enums/ViewModeEnum';

export class VitrineCard extends Component {
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

  init(): VitrineCard {
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
    switch (viewMode) {
      case ViewModeEnum.List:
        this.elements.vitrine = this.renderGridVitrine(filteredProducts);
        break;
      case ViewModeEnum.Grid:
        this.elements.vitrine = this.renderGridVitrine(filteredProducts);
        break;
      default:
        break;
    }
    this.container.innerHTML = '';
    this.container.append(this.elements.vitrine);
  }

  private update(filteredProducts: IProduct[]): void {
    this.elements.vitrine = this.renderGridVitrine(filteredProducts);
  }

  private clearEventHandler(): void {
    if (state.filter) {
      state.filter.filterQuery = '';
      //this.search.value = '';
    }
  }

  private copyEventHandler(event: MouseEvent): void {
    const currentTarget = event.target;
    if (currentTarget instanceof HTMLButtonElement) {
      const currenText = currentTarget.textContent;
      currentTarget.textContent = 'Copied';
      navigator.clipboard.writeText(window.location.href);
      setTimeout(() => {
        currentTarget.textContent = currenText;
      }, 500);
    }
  }

  private renderGridVitrine(products: IProduct[]): HTMLElement {
    const gridContainer = ElementGenerator.createCustomElement('div', {
      className: 'grid-container row row-cols-1 row-cols-sm-2  row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-2',
    });
    products.forEach((product) => {
      const column = ElementGenerator.createCustomElement('div', {
        className: 'col',
      });
      column.innerHTML = this.renderCardGrid(product);
      gridContainer.append(column);
    });
    return gridContainer;
  }

  private renderCardGrid(product: IProduct): string {
    return `<div class="card mb-3">
    <div class="row flex-column g-0">
      <div class="col">
        <a href="#/details?id=${product.id}" class="card__link">
          <img src="${product.thumbnail}" class="card__image card-img-top" alt="${product.title}">
        </a>
      </div>
      <div class="col">
        <div class="card-body">
          <h5 class="card-title">${product.title}</h5>
          <p class="card__description card-text">${product.description}</p>
          <div class="card__info-container d-flex flex-column">
            <div class="card__info">
              <p class="card__info-item card-text"><small class="text-muted">Catygory: ${product.category}</small></p>
              <p class="card__info-item card-text"><small class="text-muted">Brand: ${product.brand}</small></p>
              <p class="card__info-item card-text"><small class="text-muted">Stock: ${product.stock}</small></p>
            </div>
            <div class="card__price d-flex justify-content-end align-items-center">
              <span class="card__price-amount card-text"><b>$${product.price}</b></span>
              <a href="#" class="card__btn btn btn-primary">Add to cart</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`;
  }
}
