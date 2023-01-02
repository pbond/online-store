import { Component } from '../../../types/templates/Component';
import { ElementGenerator } from '../../helpers/ElementGenerator';
import state from '../../state/State';
//import { Button } from '../../../scripts/components/button/Button';
import './vitrineCard.scss';
import { IProduct } from '../../../types/models/IProduct';
import eventBus from '../../helpers/EventBus';
import { ViewModeEnum } from '../../../types/enums/ViewModeEnum';
import { Button } from '../button/Button';

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
      column.append(this.renderCardGrid(product));
      gridContainer.append(column);
    });
    return gridContainer;
  }

  private renderListVitrine(products: IProduct[]): HTMLElement {
    const gridContainer = ElementGenerator.createCustomElement('div', {
      className: 'grid-container row row-cols-1 g-2',
    });
    products.forEach((product) => {
      const column = ElementGenerator.createCustomElement('div', {
        className: 'col',
      });
      column.append(this.renderCardList(product));
      gridContainer.append(column);
    });
    return gridContainer;
  }

  private renderCardGrid(product: IProduct): HTMLElement {
    const buttonElement = this.getCartButtonElement(product);
    const cardPriceCont = ElementGenerator.createElementByInnerHtml(`
    <div class="card__price d-flex justify-content-end align-items-center">
      <span class="card__price-amount card-text"><b>$${product.price}</b></span>
    </div>`);
    const card = ElementGenerator.createElementByInnerHtml(`
    <div class="card card-grid mb-3">
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
            <div class="card__info-container">
              <div class="card__info">
                <p class="card__info-item card-text"><small class="text-muted">Catygory: ${product.category}</small></p>
                <p class="card__info-item card-text"><small class="text-muted">Brand: ${product.brand}</small></p>
                <p class="card__info-item card-text"><small class="text-muted">Stock: ${product.stock}</small></p>
                <p class="card__info-item card-text"><small class="text-muted">Rating: ${product.rating}</small></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>`);
    cardPriceCont.append(buttonElement);
    card.append(cardPriceCont);
    return card;
  }

  private renderCardList(product: IProduct): HTMLElement {
    const buttonElement = this.getCartButtonElement(product);
    const cardPriceCont = ElementGenerator.createElementByInnerHtml(`
    <div class="card__price d-flex justify-content-end align-items-center">
      <span class="card__price-amount card-text"><b>$${product.price}</b></span>
    </div>`);
    const card = ElementGenerator.createElementByInnerHtml(`
    <div class="card">
      <div class="row g-0">
        <div class="col-sm-4">
          <a href="#/details?id=${product.id}" class="card__link">
            <img src="${product.thumbnail}" class="card-list__image card-img-top" alt="${product.title}">
          </a>
        </div>
        <div class="col-sm-8">
          <div class="card-body">
            <h5 class="card-title">${product.title}</h5>
            <p class="card__description card-text">${product.description}</p>
            <div class="card__info-container">
              <div class="card__info">
                <p class="card__info-item card-text"><small class="text-muted">Catygory: ${product.category}</small></p>
                <p class="card__info-item card-text"><small class="text-muted">Brand: ${product.brand}</small></p>
                <p class="card__info-item card-text"><small class="text-muted">Stock: ${product.stock}</small></p>
                <p class="card__info-item card-text"><small class="text-muted">Rating: ${product.rating}</small></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>`);
    cardPriceCont.append(buttonElement);
    card.append(cardPriceCont);
    return card;
  }

  private getCartButtonElement(product: IProduct): HTMLElement {
    const index = state.cart.products.findIndex((cartProd) => cartProd.product.id === product.id);
    let button = null;
    if (index >= 0) {
      button = new Button('card__btn btn btn-danger incart', 'Drop from cart', this.addToCartHandler.bind(this));
    } else {
      button = new Button('card__btn btn btn-success', 'Add to cart', this.addToCartHandler.bind(this));
    }
    const buttonElement = button.render();
    buttonElement.setAttribute('product-id', product.id.toString());
    return buttonElement;
  }

  private addToCartHandler(event: MouseEvent): void {
    const currentTarget = event.target;
    if (currentTarget instanceof HTMLButtonElement) {
      if (currentTarget.classList.contains('incart')) {
        currentTarget.classList.remove('incart');
        currentTarget.classList.remove('btn-danger');
        currentTarget.classList.add('btn-success');
        currentTarget.innerText = 'Add to cart';
        eventBus.trigger('removeProductFromCart', currentTarget.getAttribute('product-id'));
      } else {
        currentTarget.classList.add('incart');
        currentTarget.classList.remove('btn-success');
        currentTarget.classList.add('btn-danger');
        currentTarget.innerText = 'Drop from cart';
        eventBus.trigger('addProductToCart', currentTarget.getAttribute('product-id'));
      }
    }
  }
}
