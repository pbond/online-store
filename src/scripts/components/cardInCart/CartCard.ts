import { Component } from '../../../types/templates/Component';
import { ElementGenerator } from '../../helpers/ElementGenerator';
import { IProduct } from '../../../types/models/IProduct';
import eventBus from '../../helpers/EventBus';
import { Button } from '../button/Button';
import './cartCard.scss';

export class CartCard extends Component {
  private product: IProduct;
  private count: number;
  private position: number;

  constructor(product: IProduct, count: number, position: number) {
    super('div', 'card-body cartcard-hovered');
    this.product = product;
    this.count = count;
    this.position = position;
  }

  render(): HTMLElement {
    const cardLayout = ElementGenerator.createElementByInnerHtml<HTMLDivElement>(`
      <div class="row g-0">
        <div class="col-sm-4">
          <a href="#/details?id=${this.product.id}" class="card__link">
            <img src="${this.product.thumbnail}" class="card-list__image card-img-top" alt="${this.product.title}">
          </a>
        </div>
        <div class="col-sm-8">
          <div class="card-body">
            <h5 class="card-title">
              <div class="row">
                <div class="col">
                  <a href="#/details?id=${this.product.id}" class="card__link">
                    ${this.product.title}
                    ${this.product.title}
                    ${this.product.title}
                  </a>
                </div>
                <div class="col flex-grow-0 text-end text-muted">(${this.position})</div>
              </div>
            </h5>
            <p class="card__description card-text">${this.product.description}</p>
            <div class="card__info">
              <p class="card__info-item card-text"><small class="text-muted">Category: ${this.product.category}</small></p>
              <p class="card__info-item card-text"><small class="text-muted">Brand: ${this.product.brand}</small></p>
              <p class="card__info-item card-text"><small class="text-muted">Stock: ${this.product.stock}</small></p>
              <p class="card__info-item card-text"><small class="text-muted">Rating: ${this.product.rating}</small></p>
              <p class="card__info-item card-text"><small class="text-muted">Discount: ${this.product.discountPercentage}%</small></p>
            </div>
          </div>
        </div>
      </div>`);

    this.container.append(cardLayout);

    const controlsContainer = ElementGenerator.createCustomElement<HTMLDivElement>('div', {
      className: 'card__controls',
    });
    controlsContainer.append(this.createMinusButton(), this.createCountField(), this.createPlusButton());
    this.container.append(controlsContainer);

    const removeContainer = ElementGenerator.createCustomElement<HTMLDivElement>('div', { className: 'card__remove' });
    removeContainer.append(this.createRemoveButton());
    this.container.append(removeContainer);

    return this.container;
  }

  private createMinusButton(): HTMLButtonElement {
    const button = new Button('btn btn-outline-secondary form-control rounded', '-', this.removeItem.bind(this));
    return button.render();
  }

  private createCountField(): HTMLInputElement {
    const input = ElementGenerator.createCustomElement<HTMLInputElement>('input', {
      className: 'form-control text-center bi-input-cursor',
      type: 'number',
      min: 1,
      max: this.product.stock,
      value: this.count,
    });
    input.disabled = true;

    this.elements.countField = input;
    return input;
  }

  private createPlusButton(): HTMLButtonElement {
    const button = new Button('btn btn-outline-secondary form-control rounded', '+', this.addItem.bind(this));
    return button.render();
  }

  private createRemoveButton(): HTMLButtonElement {
    const button = new Button(
      'btn btn-outline-secondary form-control border-0 remove-icon',
      '',
      this.removeProductFromCart.bind(this)
    );
    const buttonElement = button.render();
    buttonElement.innerHTML = `<i class="bi bi-trash fs-3"></i>`;
    this.elements.removeButton = buttonElement;
    return buttonElement;
  }

  private addItem(/*event: PointerEvent*/): void {
    if (this.count < this.product.stock) {
      this.count += 1;
      (this.elements.countField as HTMLInputElement).value = this.count + '';
      eventBus.trigger('addProductItem', this.product);
    }
  }

  private removeItem(/*event: PointerEvent*/): void {
    this.count -= 1;
    (this.elements.countField as HTMLInputElement).value = this.count + '';
    eventBus.trigger('removeProductItem', this.product);
  }

  private removeProductFromCart(/*event: PointerEvent*/): void {
    eventBus.trigger('removeProductFromCart', this.product);
    this.container.remove();
  }
}
