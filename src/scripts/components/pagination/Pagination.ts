import './pagination.scss';
import { Component } from '../../../types/templates/Component';
import { ElementGenerator } from '../../helpers/ElementGenerator';
import eventBus from '../../helpers/EventBus';
import { PaginationEnum } from '../../../types/enums/PaginationEnum';
import router from '../../router/Router';

export class Pagination extends Component {
  private productsInCartCount: number;
  private cartPageLimit: number;
  private cartPageNumber: number;
  private searchParams: URLSearchParams;

  constructor(count: number, limit: number, num: number) {
    super('div', 'card-header');
    this.productsInCartCount = count;
    this.cartPageLimit = limit;
    this.cartPageNumber = num;
    this.searchParams = new URLSearchParams();
  }

  public render(): HTMLElement {
    const row = ElementGenerator.createCustomElement<HTMLDivElement>('div', { className: 'row' });
    const limit = ElementGenerator.createCustomElement<HTMLDivElement>('div', {
      className: 'col-12 col-sm-6 col-lg-5',
    });
    const pageNum = ElementGenerator.createCustomElement<HTMLDivElement>('div', {
      className: 'col-12 col-sm-6 col-lg-5 offset-lg-2 my-2 my-sm-0',
    });

    limit.append(this.createLimitRow());
    pageNum.append(this.createPagesRow());
    this.updateButtons(this.productsInCartCount, this.cartPageNumber);
    row.append(limit, pageNum);
    this.container.append(row);
    return this.container;
  }

  private createLimitRow(): HTMLDivElement {
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
      onchange: this.changeLimit.bind(this),
    });

    this.elements.inputLimit = inputLimit;
    container.append(inputLimit);
    return container;
  }

  private createPagesRow(): HTMLDivElement {
    const container = ElementGenerator.createCustomElement<HTMLDivElement>('div', {
      className: 'input-group',
    });

    const list = ElementGenerator.createCustomElement<HTMLUListElement>('ul', {
      className: 'pagination mb-0 w-100 justify-content-between',
    });

    const prevButton = ElementGenerator.createCustomElement<HTMLButtonElement>('button', {
      className: 'page-link form-control',
      ariaLabel: 'Previous',
      innerHTML: '<span aria-hidden="true">&laquo;</span>',
      onclick: this.showPrevPage.bind(this),
    });

    const currButton = ElementGenerator.createCustomElement<HTMLButtonElement>('button', {
      className: 'page-link active form-control border-top-0',
      ariaLabel: 'Current',
      innerHTML: `1`,
    });

    const nextButton = ElementGenerator.createCustomElement<HTMLButtonElement>('button', {
      className: 'page-link form-control',
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
  }

  private changeLimit(): void {
    const input = this.elements.inputLimit as HTMLInputElement;
    if (isNaN(parseInt(input.value)) || parseInt(input.value) < 1) {
      input.value = '1';
    }
    if (parseInt(input.value) > this.productsInCartCount) {
      input.value = this.productsInCartCount + '';
    }

    this.cartPageLimit = parseInt(input.value);
    this.elements.currButton.innerHTML = '1';
    this.cartPageNumber = 1;
    eventBus.trigger('changeCartPaginationLimit', this.cartPageLimit);
    this.updateQuery();
  }

  private showPrevPage(): void {
    this.cartPageNumber -= 1;
    eventBus.trigger('showCartPage', this.cartPageNumber);
    this.updateQuery();
  }
  private showNextPage(): void {
    this.cartPageNumber += 1;
    eventBus.trigger('showCartPage', this.cartPageNumber);
    this.updateQuery();
  }

  private updateQuery() {
    this.searchParams.set(PaginationEnum.pageLimit, this.cartPageLimit + '');
    this.searchParams.set(PaginationEnum.pageNum, this.cartPageNumber + '');
    router.updateQuery(this.searchParams.toString());
  }

  public updateButtons(productsCount: number, pageNum: number): void {
    this.productsInCartCount = productsCount;
    this.cartPageNumber = pageNum;

    this.elements.currButton.innerHTML =
      this.cartPageNumber + `/${Math.ceil(this.productsInCartCount / this.cartPageLimit)}`;

    if (this.cartPageNumber === 1) {
      this.elements.prevButton.classList.add('disabled');
    } else {
      this.elements.prevButton.classList.remove('disabled');
    }

    if (this.productsInCartCount <= this.cartPageLimit * this.cartPageNumber) {
      this.elements.nextButton.classList.add('disabled');
    } else {
      this.elements.nextButton.classList.remove('disabled');
    }
  }

  destroy(): void {
    this.container.remove();
  }
}
