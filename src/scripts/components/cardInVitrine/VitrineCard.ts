import { Component } from '../../../types/templates/Component';
import { ElementGenerator } from '../../helpers/ElementGenerator';
import state from '../../state/State';
import './vitrineCard.scss';
import { IProduct } from '../../../types/models/IProduct';
import eventBus from '../../helpers/EventBus';
import { ViewModeEnum } from '../../../types/enums/ViewModeEnum';
import { Button } from '../button/Button';

export class VitrineCard extends Component {
  private product: IProduct;
  private ViewMode: ViewModeEnum;
  private isInCart: boolean;
  constructor(tagName: string, className: string, product: IProduct, viewMode: ViewModeEnum) {
    super(tagName, className);
    this.product = product;
    this.ViewMode = viewMode;
    this.isInCart = false;
  }

  render(): HTMLElement {
    switch (this.ViewMode) {
      case ViewModeEnum.Grid:
        this.container = this.renderCardGrid();
        break;
      case ViewModeEnum.List:
        this.container = this.renderCardList();
        break;
    }
    this.init();
    return this.container;
  }

  init(): VitrineCard {
    eventBus.on('addProductToCart', this.addProductToCartHandler.bind(this));
    eventBus.on('removeProductFromCart', this.removeProductFromCartHandler.bind(this));
    return this;
  }

  private addProductToCartHandler(product: IProduct): void {
    if (this.product.id === product.id) {
      if (!this.elements) {
        return;
      }
      this.elements.buttonElement.classList.remove('btn-success');
      this.elements.buttonElement.classList.add('btn-danger');
      this.elements.buttonElement.innerText = 'Drop from cart';
      this.isInCart = true;
    }
  }

  private removeProductFromCartHandler(product: IProduct): void {
    if (this.product.id === product.id) {
      if (!this.elements) {
        return;
      }
      this.elements.buttonElement.classList.remove('btn-danger');
      this.elements.buttonElement.classList.add('btn-success');
      this.elements.buttonElement.innerText = 'Add to cart';
      this.isInCart = false;
    }
  }

  private renderCardGrid(): HTMLElement {
    this.elements.buttonElement = this.getCartButtonElement();
    const cardPriceCont = ElementGenerator.createElementByInnerHtml(`
    <div class="card__price-vitrine d-flex justify-content-end align-items-center">
      <span class="card__price-amount card-text"><b>$${this.product.price}</b></span>
    </div>`);
    const card = ElementGenerator.createElementByInnerHtml(`
    <div class="card card-vitrine card-grid mb-3">
      <div class="row flex-column g-0">
        <div class="col card__img-cont">
          <a href="#/details?id=${this.product.id}" class="card__link">
            <img src="${this.product.thumbnail}" class="card__image card-img-top" alt="${this.product.title}">
          </a>
        </div>
        <div class="col">
          <div class="card-body">
            <h5 class="card-title">${this.product.title}</h5>
            <p class="card__description card-text">${this.product.description}</p>
            <div class="card__info-container">
              <div class="card__info">
                <p class="card__info-item card-text"><small class="text-muted">Catygory: ${this.product.category}</small></p>
                <p class="card__info-item card-text"><small class="text-muted">Brand: ${this.product.brand}</small></p>
                <p class="card__info-item card-text"><small class="text-muted">Stock: ${this.product.stock}</small></p>
                <p class="card__info-item card-text"><small class="text-muted">Rating: ${this.product.rating}</small></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>`);
    cardPriceCont.append(this.elements.buttonElement);
    card.append(cardPriceCont);
    return card;
  }

  private renderCardList(): HTMLElement {
    this.elements.buttonElement = this.getCartButtonElement();
    const cardPriceCont = ElementGenerator.createElementByInnerHtml(`
    <div class="card__price-vitrine d-flex justify-content-end align-items-center">
      <span class="card__price-amount card-text"><b>$${this.product.price}</b></span>
    </div>`);
    const card = ElementGenerator.createElementByInnerHtml(`
    <div class="card card-vitrine">
      <div class="row g-0">
        <div class="col-sm-4 card__img-cont">
          <a href="#/details?id=${this.product.id}" class="card__link">
            <img src="${this.product.thumbnail}" class="card-list__image card-img-top" alt="${this.product.title}">
          </a>
        </div>
        <div class="col-sm-8">
          <div class="card-body">
            <h5 class="card-title">${this.product.title}</h5>
            <p class="card__description card-text">${this.product.description}</p>
            <div class="card__info-container">
              <div class="card__info">
                <p class="card__info-item card-text"><small class="text-muted">Catygory: ${this.product.category}</small></p>
                <p class="card__info-item card-text"><small class="text-muted">Brand: ${this.product.brand}</small></p>
                <p class="card__info-item card-text"><small class="text-muted">Stock: ${this.product.stock}</small></p>
                <p class="card__info-item card-text"><small class="text-muted">Rating: ${this.product.rating}</small></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>`);
    cardPriceCont.append(this.elements.buttonElement);
    card.append(cardPriceCont);
    return card;
  }

  private getCartButtonElement(): HTMLElement {
    const index = state.cart.products.findIndex((cartProd) => cartProd.product.id === this.product.id);
    let button: Button;
    if (index >= 0) {
      this.isInCart = true;
      button = new Button('card__btn btn btn-danger', 'Drop from cart', this.changeCartStateHandler.bind(this));
    } else {
      this.isInCart = false;
      button = new Button('card__btn btn btn-success', 'Add to cart', this.changeCartStateHandler.bind(this));
    }
    const buttonElement = button.render();
    return buttonElement;
  }

  private changeCartStateHandler(event: MouseEvent): void {
    const currentTarget = event.target;
    if (currentTarget instanceof HTMLButtonElement) {
      if (this.isInCart) {
        eventBus.trigger('removeProductFromCart', this.product);
      } else {
        eventBus.trigger('addProductToCart', this.product);
      }
    }
  }
}
