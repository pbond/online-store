import { Component } from '../../../../types/templates/Component';
import { ElementGenerator } from '../../../helpers/ElementGenerator';
import eventBus from '../../../helpers/EventBus';
import { IPromoCode } from '../../../../types/models/IPromoCode';

export class PromoCode extends Component {
  private promoCode: IPromoCode;
  private isNewCode: boolean;
  constructor(promo: IPromoCode, isNew: boolean) {
    super('li', 'list-group-item d-flex justify-content-between align-items-start');
    this.promoCode = promo;
    this.isNewCode = isNew;
  }

  render(): HTMLElement {
    this.container.innerHTML = `
      <div class="me-auto">
        <div>
          <strong>${this.promoCode.title}</strong>
          <strong class="ms-auto">(${this.promoCode.discountPercentage}%)</strong>
        </div>
        ${this.promoCode.description}
      </div>
    `;

    const button = this.isNewCode ? this.applyButton() : this.dropButton();
    this.container.append(button);
    return this.container;
  }

  private applyButton(): HTMLButtonElement {
    return ElementGenerator.createCustomElement<HTMLButtonElement>('button', {
      className: `btn btn-outline-primary`,
      innerText: 'Apply',
      onclick: () => eventBus.trigger('applyPromoCode', this.promoCode),
    });
  }

  private dropButton(): HTMLButtonElement {
    return ElementGenerator.createCustomElement<HTMLButtonElement>('button', {
      className: `btn btn-outline-warning`,
      innerText: 'Drop',
      onclick: () => eventBus.trigger('dropPromoCode', this.promoCode),
    });
  }

  public get id(): number | string {
    return this.promoCode.id;
  }

  public get discount(): number {
    return this.promoCode.discountPercentage;
  }
}
