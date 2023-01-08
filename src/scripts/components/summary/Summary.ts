import { Component } from '../../../types/templates/Component';
import { ElementGenerator } from '../../helpers/ElementGenerator';
import { ICartProducts } from '../../../types/models/ICartProduct';
import state from '../../state/State';
import { PromoCode } from './promoCode/PromoCode';
import eventBus from '../../helpers/EventBus';
import { IPromoCode } from '../../../types/models/IPromoCode';
import promoCodesList from '../../state/PromoCodesList';

export class Summary extends Component {
  private products: ICartProducts;
  private promoCodes: PromoCode[];
  constructor(products: ICartProducts) {
    super('div', 'card cart_summary');
    this.products = products;
    this.promoCodes = [];
  }

  public render(): HTMLElement {
    const header = ElementGenerator.createElementByInnerHtml<HTMLDivElement>(`
      <div class="card-header">
        <p class="text-center fw-bold m-0">Cart summary</p>
      </div>
    `);

    const cardBody = ElementGenerator.createCustomElement<HTMLDivElement>('div', {
      className: 'card-body',
    });

    cardBody.append(
      this.createProductsRow(),
      this.createPriceDiscountRow(),
      this.createPriceRow(),
      this.createPromoCodesRow(),
      this.createSubmitRow()
    );

    this.container.append(header, cardBody);

    this.init();
    return this.container;
  }

  private createProductsRow(): HTMLDivElement {
    const productsRow = ElementGenerator.createCustomElement<HTMLDivElement>('div', {
      className: 'row',
      innerHTML: '<h5 class="col-6">Products:</h5>',
    });

    const productsCol = ElementGenerator.createCustomElement<HTMLDivElement>('div', {
      className: `col-6 text-end`,
      innerHTML: this.calculateProductsCount(),
    });
    productsRow.insertAdjacentElement('beforeend', productsCol);

    this.elements.productsCol = productsCol;
    return productsRow;
  }

  private createPriceRow(): HTMLDivElement {
    const priceRow = ElementGenerator.createCustomElement<HTMLDivElement>('div', {
      className: 'row mt-2 text-decoration-line-through d-none',
      innerHTML: '<h5 class="col-6">Total price:</h5>',
    });
    const priceCol = ElementGenerator.createCustomElement<HTMLDivElement>('div', {
      className: `col-6 text-end`,
      innerHTML: this.calculateCartPrice(),
    });
    priceRow.insertAdjacentElement('beforeend', priceCol);

    this.elements.priceCol = priceCol;
    this.elements.priceRow = priceRow;
    return priceRow;
  }

  private createPriceDiscountRow(): HTMLDivElement {
    const priceDiscountRow = ElementGenerator.createCustomElement<HTMLDivElement>('div', {
      className: 'row mt-2',
      innerHTML: '<h5 class="col-6">Total price:</h5>',
    });

    const priceDiscountCol = ElementGenerator.createCustomElement<HTMLDivElement>('div', {
      className: `col-6 text-end`,
      innerHTML: this.calculateDiscountPrice(),
    });
    priceDiscountRow.insertAdjacentElement('beforeend', priceDiscountCol);

    this.elements.priceDiscountCol = priceDiscountCol;
    this.elements.priceDiscountRow = priceDiscountRow;
    return priceDiscountRow;
  }

  private createPromoCodesRow(): HTMLDivElement {
    const promoRow = ElementGenerator.createCustomElement<HTMLDivElement>('div', {
      className: 'row flex-column my-2',
    });

    const appliedCol = ElementGenerator.createCustomElement<HTMLDivElement>('div', {
      className: 'col mb-2 d-none',
      innerHTML: `
        <div class="row text-center border-1">
          <h6>Applied codes</h6>
        </div>
        <ol class="list-group list-group-numbered">
        </ol>
      `,
    });

    const promoLabel = ElementGenerator.createCustomElement<HTMLLabelElement>('label', {
      className: 'col my-3',
      innerHTML: `Test codes: ${promoCodesList.map((pc) => pc.id).join(', ')}`,
    });

    const promoInput = ElementGenerator.createCustomElement<HTMLInputElement>('input', {
      className: 'form-control',
      type: 'search',
      placeholder: 'Enter promo code',
      oninput: this.checkCode.bind(this),
      onsearch: this.clearSearchedCodes.bind(this),
    });

    const searchedColumn = ElementGenerator.createCustomElement<HTMLDivElement>('div', {
      className: 'col mb-2',
    });

    const searchedCodes = ElementGenerator.createCustomElement<HTMLDivElement>('ol', {
      className: 'list-group list-group-numbered',
    });

    this.elements.inpupPromoCode = promoInput;
    this.elements.appliedCodesList = appliedCol;
    this.elements.searchedCodes = searchedCodes;
    searchedColumn.append(searchedCodes);
    promoLabel.insertAdjacentElement('afterbegin', promoInput);
    promoRow.append(appliedCol, promoLabel, searchedColumn);

    return promoRow;
  }

  private createSubmitRow(): HTMLDivElement {
    const submitRow = ElementGenerator.createCustomElement<HTMLDivElement>('div', {
      className: 'row',
    });

    const submitCol = ElementGenerator.createCustomElement<HTMLDivElement>('div', {
      className: '<div class="col"></div>',
    });

    const submitButton = ElementGenerator.createCustomElement<HTMLButtonElement>('button', {
      className: 'btn btn-outline-success form-control',
      innerHTML: 'Buy now',
      onclick: this.buyProducts.bind(this),
    });

    submitCol.append(submitButton);
    submitRow.append(submitCol);

    return submitRow;
  }

  init() {
    this.onApplyPromoCode = this.onApplyPromoCode.bind(this);
    this.onDropPromoCode = this.onDropPromoCode.bind(this);
    this.onCartUpdated = this.onCartUpdated.bind(this);

    eventBus.on('applyPromoCode', this.onApplyPromoCode);
    eventBus.on('dropPromoCode', this.onDropPromoCode);
    eventBus.on('cartUpdated', this.onCartUpdated);
    return this;
  }

  private onApplyPromoCode(promo: IPromoCode): void {
    const promoCode = new PromoCode(promo, false);
    this.promoCodes.push(promoCode);
    this.elements.priceDiscountCol.innerHTML = this.calculateDiscountPrice();
    this.elements.appliedCodesList.append(promoCode.render());
    this.elements.appliedCodesList.classList.remove('d-none');
    this.elements.priceRow.classList.remove('d-none');
    this.elements.inpupPromoCode.dispatchEvent(new Event('search'));
    (this.elements.inpupPromoCode as HTMLInputElement).value = '';
  }

  private onDropPromoCode(promo: IPromoCode): void {
    const item = this.promoCodes.find((code) => promo.id === code.id);
    if (item) {
      this.promoCodes.splice(this.promoCodes.indexOf(item), 1);
      item.destroy();
    }
    this.elements.priceDiscountCol.innerHTML = this.calculateDiscountPrice();
    if (this.promoCodes.length < 1) {
      this.elements.appliedCodesList.classList.add('d-none');
      this.elements.priceRow.classList.add('d-none');
    }
  }

  private onCartUpdated(products: ICartProducts): void {
    this.products = products;
    this.elements.productsCol.innerHTML = this.calculateProductsCount();
    this.elements.priceCol.innerHTML = this.calculateCartPrice();
    this.elements.priceDiscountCol.innerHTML = this.calculateDiscountPrice();
  }

  private checkCode(event: Event): void {
    this.clearSearchedCodes();
    const codeInput = event.target as HTMLInputElement;
    const promo = state.cart.promoCodes.find((code) => code.id === codeInput.value);
    if (promo === undefined || this.promoCodes.some((code) => code.id === promo.id)) {
      return;
    }
    const item = new PromoCode(promo, true);
    this.elements.searchedCodes.append(item.render());
  }
  private buyProducts(event: Event): void {
    console.log(event);
  }

  private clearSearchedCodes(): void {
    this.elements.searchedCodes.childNodes.forEach((elem) => elem.remove());
  }

  private calculateProductsCount(): string {
    const total = this.products.reduce((acc, { count }) => acc + count, 0);
    return `<h5>${total}</h5>`;
  }

  private calculateCartPrice(): string {
    const total = this.products.reduce((acc, { product, count }) => acc + product.price * count, 0).toFixed(2);
    return `<h5>$${total}</h5>`;
  }

  private calculateDiscountPrice(): string {
    const price = this.products.reduce((acc, { product, count }) => acc + product.price * count, 0);
    const discount = this.promoCodes.reduce((acc, code) => acc + code.discount, 0);
    const total = (((100 - discount) * price) / 100).toFixed(2);
    return `<h5>$${total}</h5>`;
  }

  destroy() {
    eventBus.off('applyPromoCode', this.onApplyPromoCode);
    eventBus.off('dropPromoCode', this.onDropPromoCode);
    eventBus.off('cartUpdated', this.onCartUpdated);
    this.container.remove();
  }
}
