import state from '../../state/State';
import { Page } from '../../../types/templates/Page';
import { CartCard } from '../../components/cardInCart/CartCard';
import { Pagination } from '../../components/pagination/Pagination';
import eventBus from '../../helpers/EventBus';
import { ElementGenerator } from '../../helpers/ElementGenerator';
import { ICartProducts } from '../../../types/models/ICartProduct';
import { Summary } from '../../components/summary/Summary';
import { PaginationEnum } from '../../../types/enums/PaginationEnum';

export class Cart extends Page {
  private pageLimit: number;
  private pageNum: number;
  private cartItems: CartCard[];
  private cardsContainerElement: HTMLDivElement;
  private pagination: Pagination;
  private summary: Summary;

  constructor(path?: string) {
    super(path);
    const searchParams = new URLSearchParams(path);
    this.pageLimit = 3;
    this.pageNum = 1;
    this.cartItems = [];
    this.summary = new Summary(state.cart.products);
    if (searchParams.get(PaginationEnum.pageLimit)) {
      this.pageLimit = parseInt(searchParams.get(PaginationEnum.pageLimit) ?? '');
    }
    if (searchParams.get(PaginationEnum.pageNum)) {
      this.pageNum = parseInt(searchParams.get(PaginationEnum.pageNum) ?? '');
    }
    this.pagination = new Pagination(state.cart.products.length, this.pageLimit, this.pageNum);
    this.cardsContainerElement = ElementGenerator.createCustomElement<HTMLDivElement>('div', {
      className: 'card',
    });
  }

  render(): HTMLElement {
    this.container.classList.add('container');

    const pageHeader = ElementGenerator.createCustomElement<HTMLHeadingElement>('h2', {
      className: 'my-2 my-sm-3 my-md-4 offset-md-1 offset-lg-0',
      innerHTML: 'Products in cart',
    });
    this.container.append(pageHeader);

    if (state.cart.products.length === 0) {
      return this.showEmptyCart();
    }

    const contentRow = ElementGenerator.createCustomElement<HTMLDivElement>('div', {
      className: 'row mb-4',
    });
    const contentColumns = ElementGenerator.createCustomElement<HTMLDivElement>('div', {
      className: 'col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-0',
    });
    const summaryColumns = ElementGenerator.createCustomElement<HTMLDivElement>('div', {
      className: 'col-12 col-md-10 offset-md-1 col-lg-4 offset-lg-0 my-3 my-lg-0',
    });

    this.cardsContainerElement.append(this.pagination.render());
    contentColumns.append(this.cardsContainerElement);
    summaryColumns.append(this.summary.render());
    contentRow.append(contentColumns, summaryColumns);
    this.container.append(contentRow);

    this.showCartPage(this.pageNum);
    this.init();
    if (this.path === 'immediately=true') {
      eventBus.trigger('showPaymentModal', null);
    }
    return this.container;
  }

  init() {
    this.changeCartPaginationLimit = this.changeCartPaginationLimit.bind(this);
    this.showCartPage = this.showCartPage.bind(this);
    this.onCartUpdated = this.onCartUpdated.bind(this);

    eventBus.on('changeCartPaginationLimit', this.changeCartPaginationLimit);
    eventBus.on('showCartPage', this.showCartPage);
    eventBus.on('cartUpdated', this.onCartUpdated);
  }

  private showEmptyCart(): HTMLElement {
    const content = ElementGenerator.createCustomElement<HTMLElement>('div', {
      className: 'card-body text-center my-4',
      innerHTML: `<h2>The cart is empty</h2>`,
    });
    this.cardsContainerElement.classList.add('my-4');
    this.cardsContainerElement.append(content);
    this.container.append(this.cardsContainerElement);
    return this.container;
  }

  destroy() {
    eventBus.off('showCartPage', this.showCartPage);
    eventBus.off('changeCartPaginationLimit', this.changeCartPaginationLimit);
    eventBus.off('cartUpdated', this.onCartUpdated);
    this.summary.destroy();
    this.container.remove();
  }

  private changeCartPaginationLimit(limit: number): void {
    this.pageLimit = limit;
    this.updateCardsList();
    this.pagination.updateButtons(state.cart.products.length, this.pageNum);
  }

  private showCartPage(pageNum: number): void {
    this.pageNum = pageNum;
    this.updateCardsList();
    this.pagination.updateButtons(state.cart.products.length, this.pageNum);
  }

  private onCartUpdated(products: ICartProducts): void {
    this.updateCardsList();
    this.pagination.updateButtons(products.length, this.pageNum);
  }

  private updateCardsList(): void {
    this.clearExistCards();
    this.cartItems = this.selectPageProducts().map(
      (item) => new CartCard(item.product, item.count, state.cart.products.indexOf(item) + 1)
    );

    if (this.cartItems.length === 0) {
      this.pagination.destroy();
      this.summary.destroy();
      this.container.lastElementChild?.remove();
      this.container = this.showEmptyCart();
    }

    this.cartItems.forEach((item) => {
      this.cardsContainerElement.append(item.render());
    });
  }

  private clearExistCards(): void {
    this.cartItems.forEach((item) => {
      item.destroy();
    });
  }

  private selectPageProducts(): ICartProducts {
    const startPosition = this.pageLimit * (this.pageNum - 1);
    const lastPosition = startPosition + this.pageLimit;
    const selected = state.cart.products.slice(startPosition, lastPosition);
    if (selected.length === 0 && state.cart.products.length > 0) {
      this.pageNum -= 1;
      return this.selectPageProducts();
    }
    return selected;
  }
}
