import state from '../../state/State';
import { Page } from '../../../types/templates/Page';
import { CartCard } from '../../components/cardInCart/CartCard';
import { Pagination } from '../../components/pagination/Pagination';
import eventBus from '../../helpers/EventBus';
import { ElementGenerator } from '../../helpers/ElementGenerator';
import { ICartProducts } from '../../../types/models/ICartProduct';

export class Cart extends Page {
  private pageLimit: number;
  private cartItems: CartCard[];
  private cardsContainerElement: HTMLDivElement | null;
  private pagination: Pagination;

  constructor(path?: string) {
    super(path);
    this.pageLimit = 3;
    this.cartItems = [];
    this.pagination = new Pagination(state.cart.products.length, this.pageLimit);

    this.cardsContainerElement = null;
  }

  render(): HTMLElement {
    this.container.classList.add('container');

    const pageHeader = ElementGenerator.createCustomElement<HTMLHeadingElement>('h2', {
      className: 'my-2 my-sm-3 my-md-4 offset-md-1 offset-lg-0',
      innerHTML: 'Products in cart',
    });
    const contentRow = ElementGenerator.createCustomElement<HTMLDivElement>('div', {
      className: 'row',
    });
    const contentColumns = ElementGenerator.createCustomElement<HTMLDivElement>('div', {
      className: 'col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-0',
    });
    const summaryColumns = ElementGenerator.createCustomElement<HTMLDivElement>('div', {
      className: 'col-12 col-md-10 offset-md-1 col-lg-4 offset-lg-0 my-3 my-lg-0',
    });
    const cardsContainer = ElementGenerator.createCustomElement<HTMLDivElement>('div', {
      className: 'card',
    });

    // const summary = new Summary();
    cardsContainer.append(this.pagination.render());
    contentColumns.append(cardsContainer);
    contentRow.append(contentColumns, summaryColumns);
    this.container.append(pageHeader, contentRow);

    this.cardsContainerElement = cardsContainer;
    this.showCartPage(1);
    this.init();
    return this.container;
  }

  init() {
    this.changeCartPaginationLimit = this.changeCartPaginationLimit.bind(this);
    this.showCartPage = this.showCartPage.bind(this);
    eventBus.on('changeCartPaginationLimit', this.changeCartPaginationLimit);
    eventBus.on('showCartPage', this.showCartPage);
    // eventBus.on('cartUpdated', this.action());
  }

  destroy() {
    eventBus.off('showCartPage', this.showCartPage);
    eventBus.off('changeCartPaginationLimit', this.changeCartPaginationLimit);
    this.container.remove();
  }

  private changeCartPaginationLimit(limit: number) {
    this.pageLimit = limit;
    this.showCartPage(1);
    this.pagination.updateButtons();
  }

  private showCartPage(pageNum: number) {
    this.clearExistCards();
    this.cartItems = this.selectPageProducts(pageNum).map((item) => new CartCard(item.product, item.count));
    this.cartItems.forEach((item) => {
      this.cardsContainerElement?.append(item.render());
    });
    this.pagination.updateButtons();
  }

  private clearExistCards(): void {
    this.cartItems.forEach((item) => {
      item.destroy();
    });
  }

  private selectPageProducts(pageNum: number): ICartProducts {
    const startPosition = this.pageLimit * (pageNum - 1);
    const lastPosition = startPosition + this.pageLimit;
    return state.cart.products.slice(startPosition, lastPosition);
  }
}
