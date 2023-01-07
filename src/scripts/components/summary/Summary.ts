import { Component } from '../../../types/templates/Component';
import { ElementGenerator } from '../../helpers/ElementGenerator';

export class Summary extends Component {
  constructor() {
    super('div', 'card cart_summary');
  }

  public render(): HTMLElement {
    const header = ElementGenerator.createElementByInnerHtml<HTMLDivElement>(`
      <div class="card-header">
        <p class="text-center fw-bold m-0">Cart summary</p>
      </div>
    `);

    const body = ElementGenerator.createCustomElement<HTMLDivElement>('div', {
      className: 'card-body',
    });

    const productsRow = ElementGenerator.createCustomElement<HTMLDivElement>('div', {
      className: 'row',
      innerHTML: '<div class="col-6">Products:</div>',
    });

    const productsCol = ElementGenerator.createCustomElement<HTMLDivElement>('div', {
      className: '<div class="col-6 text-end">123456</div>',
    });
    productsRow.insertAdjacentElement('beforeend', productsCol);

    const priceRow = ElementGenerator.createCustomElement<HTMLDivElement>('div', {
      className: 'row',
      innerHTML: '<div class="col-6">Total price:</div>',
    });

    const priceCol = ElementGenerator.createCustomElement<HTMLDivElement>('div', {
      className: '<div class="col-6 text-end">123456</div>',
    });
    priceRow.insertAdjacentElement('beforeend', priceCol);

    const promoRow = ElementGenerator.createCustomElement<HTMLDivElement>('div', {
      className: 'row my-3',
    });

    const promoLabel = ElementGenerator.createCustomElement<HTMLLabelElement>('label', {
      className: 'col',
      innerHTML: 'Test codes: "NY2023", "BONUS7"',
    });

    const promoInput = ElementGenerator.createCustomElement<HTMLInputElement>('input', {
      className: 'form-control',
      type: 'text',
      placeholder: 'Enter promo code',
      onchange: this.addPromoCode.bind(this),
    });

    promoLabel.insertAdjacentElement('afterbegin', promoInput);
    promoRow.append(promoLabel);

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

    body.append(productsRow, priceRow, promoRow, submitRow);

    this.container.append(header, body);
    return this.container;
  }

  private addPromoCode(event: Event): void {
    console.log(event);
  }
  private buyProducts(event: Event): void {
    console.log(event);
  }
}
