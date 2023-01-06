import { Component } from '../../../types/templates/Component';
import { ElementGenerator } from '../../helpers/ElementGenerator';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import eventBus from '../../helpers/EventBus';

export class Pagination extends Component {
  private productsInCartCount: number;
  private cartPageLimit: number;
  private cartPageNumber: number;
  constructor(count: number) {
    super('div', 'card-header');
    this.productsInCartCount = count;
    this.cartPageLimit = parseInt(localStorage.getItem('cartPageLimit') ?? '5');
    this.cartPageNumber = 1;
  }

  render(): HTMLElement {
    const row = ElementGenerator.createCustomElement<HTMLDivElement>('div', { className: 'row' });
    const limit = ElementGenerator.createCustomElement<HTMLDivElement>('div', {
      className: 'col-12 col-sm-6 col-md-4 offset-md-2 col-lg-4 offset-lg-4 col-xl-3 offset-xl-5',
    });
    const pageNum = ElementGenerator.createCustomElement<HTMLDivElement>('div', {
      className: 'col-12 col-sm-6 col-lg-4 my-2 my-sm-0',
    });

    limit.append(this.createLimitRow());
    pageNum.append(this.createPagesRow());
    row.append(limit, pageNum);
    this.container.append(row);
    return this.container;
  }

  createLimitRow(): HTMLDivElement {
    const container = ElementGenerator.createCustomElement<HTMLDivElement>('div', {
      className: 'input-group',
      innerHTML: '<span class="input-group-text w-50">Limit: </span>',
    });

    const inputLimit = ElementGenerator.createCustomElement<HTMLInputElement>('input', {
      type: 'number',
      className: 'text-center w-50 form-control',
      min: 1,
      max: this.productsInCartCount,
      value: this.cartPageLimit,
    });

    this.elements.inputLimit = inputLimit;
    container.append(inputLimit);
    return container;
  }

  createPagesRow(): HTMLDivElement {
    const container = ElementGenerator.createCustomElement<HTMLDivElement>('div', {
      className: 'input-group justify-content-end',
      innerHTML: '<span class="input-group-text w-25">Page:</span>',
    });

    const list = ElementGenerator.createCustomElement<HTMLUListElement>('ul', {
      className: 'pagination mb-0 w-75',
    });

    const prevButton = ElementGenerator.createCustomElement<HTMLButtonElement>('button', {
      className: 'page-link disabled form-control',
      ariaLabel: 'Previous',
      innerHTML: '<span aria-hidden="true">&laquo;</span>',
      onclick: this.showPrevPage.bind(this),
    });

    const currButton = ElementGenerator.createCustomElement<HTMLButtonElement>('button', {
      className: 'page-link active form-control border-top-0',
      ariaLabel: 'Next',
      innerHTML: '1',
    });

    const nextButton = ElementGenerator.createCustomElement<HTMLButtonElement>('button', {
      className: 'page-link disabled form-control',
      ariaLabel: 'Next',
      innerHTML: '<span aria-hidden="true">&raquo;</span>',
      onclick: this.showNextPage.bind(this),
    });

    this.elements.prevButton = prevButton;
    this.elements.currButton = currButton;
    this.elements.nextButton = nextButton;

    [prevButton, currButton, nextButton].forEach((button) => {
      const listItemElement = ElementGenerator.createCustomElement<HTMLLIElement>('li', {
        className: 'page-item',
      });
      listItemElement.append(button);
      list.append(listItemElement);
    });

    container.append(list);
    return container;
    // <li class="page-item">
    // <button class="page-link disabled form-control" aria-label="Previous">
    // <span aria-hidden="true">&laquo;</span>
    // </button>
    // </li>
    // <li class="page-item">
    // <button class="page-link active form-control border-top-0">1</button>
    // </li>
    // <li class="page-item">
    // <button class="page-link form-control" aria-label="Next">
    // <span aria-hidden="true">&raquo;</span>
    // </button>
    // </li>
  }

  showPrevPage() {
    // this.cartPageNumber -= 1;
    // if (this.cartPageNumber === 1) {
    // }
    // eventBus.trigger('showCartPage', this.cartPageNumber);
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  showNextPage() {}

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  destroy(): void {}
}

// <div class="card-header">
// <div class="row">
// <div class="col-12 offset-0 col-sm-6 col-md-4 offset-md-2 col-lg-4 offset-lg-4 col-xl-3 offset-xl-5">
// <div class="input-group">
// <span class="input-group-text w-50">Limit: </span>
// <input type="number" min="1" max="5" value="2" class="text-center w-50 form-control"/>
//   </div>
//   </div>
//   <div class="col-12 col-sm-6 col-lg-4 my-2 my-sm-0">
// <div class="input-group justify-content-end">
// <span class="input-group-text w-25">Page:</span>
// <ul class="pagination mb-0 w-75">
// <li class="page-item">
// <button class="page-link disabled form-control" aria-label="Previous">
// <span aria-hidden="true">&laquo;</span>
// </button>
// </li>
// <li class="page-item"><button class="page-link active form-control border-top-0">1</button></li>
// <li class="page-item">
// <button class="page-link form-control" aria-label="Next">
// <span aria-hidden="true">&raquo;</span>
// </button>
// </li>
// </ul>
// </div>
// </div>
// </div>
// </div>
//
