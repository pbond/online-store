import { Component } from '../../../types/templates/Component';
import { ElementGenerator } from '../../helpers/ElementGenerator';
import state from '../../state/State';
import './cardDetails.scss';
import { IProduct } from '../../../types/models/IProduct';
import eventBus from '../../helpers/EventBus';
import { Button } from '../button/Button';

export class CardDetails extends Component {
  private product: IProduct;
  private isInCart: boolean;
  private imageSizeList: number[];
  constructor(tagName: string, className: string, product: IProduct) {
    super(tagName, className);
    this.product = product;
    this.isInCart = false;
    this.imageSizeList = [];
  }

  render(): HTMLElement {
    this.container.append(this.renderCardList());
    this.container.append(this.renderCardImages());
    this.init();
    return this.container;
  }

  init(): CardDetails {
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

  private renderCardList(): HTMLElement {
    this.elements.buttonElement = this.getCartButtonElement();
    const cardPriceCont = ElementGenerator.createElementByInnerHtml<HTMLDivElement>(`
    <div class="card__price d-flex justify-content-end align-items-center">
      <span class="card__price-amount card-text"><b>$${this.product.price}</b></span>
    </div>`);
    const card = ElementGenerator.createCustomElement<HTMLDivElement>('div', {
      className: 'card details__card-cont',
    });
    const row = ElementGenerator.createCustomElement<HTMLDivElement>('div', {
      className: 'row g-0',
    });
    const cardImgCont = ElementGenerator.createCustomElement<HTMLDivElement>('div', {
      className: 'col-sm-4 card__img-cont',
    });
    const cardLink = ElementGenerator.createCustomElement<HTMLLinkElement>('a', {
      className: 'card__link',
      href: `#/details?id=${this.product.id}`,
    });
    this.elements.mainImage = ElementGenerator.createCustomElement<HTMLImageElement>('img', {
      className: 'card-list__image card-img-top',
      src: `${this.product.thumbnail}`,
      alt: `${this.product.title}`,
    });
    const cardinfo = ElementGenerator.createElementByInnerHtml<HTMLDivElement>(`
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
            <p class="card__info-item card-text"><small class="text-muted">Discount: ${this.product.discountPercentage}%</small></p>
          </div>
        </div>
      </div>
    </div>`);
    cardLink.append(this.elements.mainImage);
    cardImgCont.append(cardLink);
    row.append(cardImgCont);
    row.append(cardinfo);
    card.append(row);
    cardPriceCont.append(this.elements.buttonElement);
    card.append(cardPriceCont);
    return card;
  }

  private renderCardList2(): HTMLElement {
    this.elements.buttonElement = this.getCartButtonElement();
    const cardPriceCont = ElementGenerator.createElementByInnerHtml(`
    <div class="card__price d-flex justify-content-end align-items-center">
      <span class="card__price-amount card-text"><b>$${this.product.price}</b></span>
    </div>`);
    const card = ElementGenerator.createElementByInnerHtml(`
    <div class="card details__card-cont">
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
                <p class="card__info-item card-text"><small class="text-muted">Discount: ${this.product.discountPercentage}%</small></p>
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

  private renderCardImages(): HTMLElement {
    const card = ElementGenerator.createCustomElement<HTMLDivElement>('div', {
      className: 'details__images',
    });
    this.product.images.forEach(async (img) => {
      const image = ElementGenerator.createCustomElement<HTMLImageElement>('img', {
        className: 'card-list__image_small',
        src: img,
      });
      const fileImg = await fetch(img).then((r) => r.blob());
      if (!this.imageSizeList.some((size) => size === fileImg.size)) {
        this.imageSizeList.push(fileImg.size);
        image.addEventListener('click', this.imageClickHandler.bind(this));
        card.append(image);
      }
    });
    return card;
  }

  private imageClickHandler(event: MouseEvent): void {
    const target = event.target;
    if (target instanceof HTMLImageElement && this.elements.mainImage instanceof HTMLImageElement) {
      this.elements.mainImage.src = target.src;
    }
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
    const target = event.target;
    if (target instanceof HTMLButtonElement) {
      if (this.isInCart) {
        eventBus.trigger('removeProductFromCart', this.product);
      } else {
        eventBus.trigger('addProductToCart', this.product);
      }
    }
  }
}
