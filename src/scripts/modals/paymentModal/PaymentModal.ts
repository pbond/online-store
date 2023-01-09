import { Component } from '../../../types/templates/Component';
import './paymentModal.scss';
import { ElementGenerator } from '../../helpers/ElementGenerator';
export class PaymentModal extends Component {
  constructor() {
    super('div', 'payment-modal');
  }

  render(): HTMLElement {
    this.container.innerHTML = `
      <div class="overlay"></div>
      <div class="modal fade show d-block">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5">Personal details:</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
          </div>
        </div>
      </div>
    `;

    const modalBody = ElementGenerator.createElementByInnerHtml<HTMLDivElement>(`
      <div class="modal-body">              
        <div class="row">
          <div class="col">
          </div>
        </div>
      </div>
    `);

    const modalFooter = ElementGenerator.createCustomElement<HTMLDivElement>('div', {
      className: 'modal-footer',
    });
    const submitButton = ElementGenerator.createCustomElement<HTMLButtonElement>('button', {
      type: 'button',
      className: 'btn btn-outline-success form-control',
      innerText: 'Submit',
      onclick: () => this.formSubmit(),
    });

    this.elements.submitButton = submitButton;
    modalFooter.append(submitButton);

    modalBody.append(...this.createPersonalInfo(), this.createCardLayout());

    this.container.lastElementChild?.firstElementChild?.firstElementChild?.append(modalBody, modalFooter);
    this.init();
    return this.container;
  }

  init(): Component {
    this.container.addEventListener('pointerdown', (event: PointerEvent) => {
      const target = event.target as HTMLElement;
      if (target.classList.contains('btn-close') || target.classList.contains('modal')) {
        event.stopPropagation();
        this.destroy();
      }
    });
    return this;
  }

  private createPersonalInfo(): HTMLDivElement[] {
    const inputName = ElementGenerator.createCustomElement<HTMLInputElement>('input', {
      type: 'text',
      className: 'form-control',
      placeholder: 'Name',
      name: 'name',
      oninput: () => this.validateName(),
    });

    const inputPhone = ElementGenerator.createCustomElement<HTMLInputElement>('input', {
      type: 'tel',
      className: 'form-control',
      placeholder: 'Phone',
      name: 'phone',
      oninput: () => this.validatePhone(),
    });

    const inputLocation = ElementGenerator.createCustomElement<HTMLInputElement>('input', {
      type: 'text',
      className: 'form-control',
      placeholder: 'Delivery address',
      name: 'location',
      oninput: () => this.validateLocation(),
    });

    const inputEmail = ElementGenerator.createCustomElement<HTMLInputElement>('input', {
      type: 'email',
      className: 'form-control',
      placeholder: 'Email',
      name: 'email',
      oninput: () => this.validateEmail(),
    });

    return [inputName, inputEmail, inputPhone, inputLocation].map((input) => {
      this.elements[input.name] = input;
      const container = ElementGenerator.createCustomElement<HTMLDivElement>('div', {
        className: 'row mb-2',
        innerHTML: `<div class="col"></div>`,
      });
      container.firstElementChild?.append(input);
      return container;
    });
  }

  private createCardLayout(): HTMLDivElement {
    const card = ElementGenerator.createCustomElement<HTMLDivElement>('div', {
      className: 'card',
    });

    const cardHeader = ElementGenerator.createCustomElement<HTMLDivElement>('div', {
      className: 'card-header',
      innerHTML: 'Credit card details',
    });

    const cardVendorImage = ElementGenerator.createCustomElement<HTMLImageElement>('img', {
      className: 'float-end',
      src: '',
      alt: 'Card vendor',
    });

    const cardBody = ElementGenerator.createCustomElement<HTMLDivElement>('div', {
      className: 'card-body',
    });

    const cardNumberInput = ElementGenerator.createCustomElement<HTMLDivElement>('input', {
      type: 'number',
      className: 'form-control',
      minlength: '16',
      maxlength: '16',
      oninput: () => this.validateCardNumber(),
    });

    const cardNumberRow = ElementGenerator.createElementByInnerHtml<HTMLDivElement>(`
      <div class="row">
        <div class="col text-center">
          <h6>Card number</h6>
        </div>
      </div>
    `);

    const cardDetailsRow = ElementGenerator.createElementByInnerHtml<HTMLDivElement>(`<div class="row mt-2"></div>`);

    const dateInputCol = ElementGenerator.createElementByInnerHtml<HTMLDivElement>(`
      <div class="col-6 text-center">
        <h6>MM/YY</h6>
      </div>
    `);

    const dateInput = ElementGenerator.createCustomElement<HTMLInputElement>('input', {
      type: 'text',
      className: 'form-control',
      minlength: '5',
      maxlength: '5',
      oninput: () => this.validateCardCvv(),
    });

    const cvvInputCol = ElementGenerator.createElementByInnerHtml<HTMLDivElement>(`
      <div class="col-6 text-center">
        <h6>CVV</h6>
      </div>
    `);

    const cvvInput = ElementGenerator.createCustomElement<HTMLInputElement>('input', {
      type: 'number',
      className: 'form-control',
      minlength: '3',
      maxlength: '3',
      oninput: () => this.validateCardCvv(),
    });

    this.elements.cardNumberInput = cardNumberInput;
    this.elements.cardDateInput = dateInput;
    this.elements.cardCvvInput = cvvInput;

    dateInputCol.firstElementChild?.append(dateInput);
    cvvInputCol.firstElementChild?.append(cvvInput);
    cardNumberRow.firstElementChild?.append(cardNumberInput);
    cardDetailsRow.append(dateInputCol, cvvInputCol);
    cardHeader.append(cardVendorImage);
    cardBody.append(cardNumberRow, cardDetailsRow);
    card.append(cardHeader, cardBody);
    return card;
  }

  private validateName(): boolean {
    return false;
  }

  private validatePhone(): boolean {
    return false;
  }

  private validateLocation(): boolean {
    return false;
  }

  private validateEmail(): boolean {
    return false;
  }

  private validateCardNumber(): boolean {
    return false;
  }

  private validateCardDate(): boolean {
    return false;
  }

  private validateCardCvv(): boolean {
    return false;
  }

  private formSubmit(): void {
    setTimeout(() => {
      console.log('submit');
    }, 1);
  }

  destroy() {
    super.destroy();
  }
}
