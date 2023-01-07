import { Component } from '../../../types/templates/Component';
import { ElementGenerator } from '../../helpers/ElementGenerator';
import state from '../../state/State';
import eventBus from '../../helpers/EventBus';
import './header.scss';

export class Header extends Component {
  constructor() {
    super('header', '');
  }

  init(): Header {
    this.updateCart = this.updateCart.bind(this);
    this.toggleFilterButton = this.toggleFilterButton.bind(this);

    eventBus.on('cartUpdated', this.updateCart);
    eventBus.on('setFilterButtonVisibility', this.toggleFilterButton);

    return this;
  }

  updateCart(): void {
    if (!this.elements.cartBadgeCount && state.cart.products.length > 0) {
      this.elements.cartBadgeCount = ElementGenerator.createCustomElement<HTMLSpanElement>('span', {
        className: 'badge position-absolute top-20 start-100 translate-middle bg-danger rounded-circle',
      });
      this.elements.cartAnchor.append(this.elements.cartBadgeCount);
    }

    if (!this.elements.cartBadgePrice && state.cart.products.length > 0) {
      this.elements.cartBadgePrice = ElementGenerator.createCustomElement<HTMLSpanElement>('span', {
        className: 'badge position-absolute top-100 start-50 translate-middle bg-primary rounded-pill w-100',
      });
      this.elements.cartAnchor.append(this.elements.cartBadgePrice);
    }

    if (state.cart.products.length > 0) {
      this.elements.cartBadgeCount.innerText = state.cart.products
        .reduce((acc, { count }) => acc + count, 0)
        .toString();
      this.elements.cartBadgePrice.innerText =
        '$' + state.cart.products.reduce((acc, { product }) => acc + product.price, 0).toFixed(2);
    } else {
      this.elements.cartBadgeCount?.remove();
      this.elements.cartBadgePrice?.remove();
    }
  }

  toggleFilterButton(isVisible: boolean): void {
    if (isVisible) {
      this.elements.filterButton.classList.remove('d-none');
    } else {
      this.elements.filterButton.classList.add('d-none');
    }
  }

  render(): HTMLElement {
    const nav = ElementGenerator.createCustomElement<HTMLElement>('nav', {
      className: 'navbar navbar-expand-lg navbar-dark bg-dark',
    });

    const fluid = ElementGenerator.createCustomElement<HTMLDivElement>('div', {
      className: 'container-fluid',
    });

    this.elements.filterButton = this.createFilterButton();
    this.elements.menuButton = this.createMenuButton();

    fluid.append(this.createBrandLink());
    fluid.append(this.elements.filterButton);
    fluid.append(this.elements.menuButton);
    fluid.append(this.createContentContainer());

    nav.append(fluid);
    this.container.append(nav);
    return this.container;
  }

  private createBrandLink(): HTMLAnchorElement {
    const link = ElementGenerator.createCustomElement<HTMLAnchorElement>('a', {
      className: 'navbar-brand',
      href: '#/main',
      innerText: 'Online store',
    });
    link.insertAdjacentHTML('afterbegin', '<i class="bi bi-shop-window px-2"></i>');
    return link;
  }

  private createFilterButton(): HTMLButtonElement {
    const button = ElementGenerator.createCustomElement<HTMLButtonElement>('button', {
      className: 'navbar-toggler me-auto border-0',
      type: 'button',
      ariaExpanded: 'false',
      ariaLabel: 'Toggle navigation',
    });
    button.setAttribute('data-bs-toggle', 'collapse');
    button.setAttribute('data-bs-target', '#sidebarMenu');
    button.setAttribute('aria-controls', 'sidebarMenu');

    button.insertAdjacentHTML('afterbegin', '<i class="bi bi-menu-app"></i>Filter');
    return button;
  }

  private createMenuButton(): HTMLButtonElement {
    const button = ElementGenerator.createCustomElement<HTMLButtonElement>('button', {
      className: 'navbar-toggler',
      type: 'button',
      ariaExpanded: 'false',
      ariaLabel: 'Toggle navigation',
      innerHTML: '<span class="navbar-toggler-icon"></span>',
    });
    button.setAttribute('data-bs-toggle', 'collapse');
    button.setAttribute('data-bs-target', '#navbarContent');
    button.setAttribute('aria-controls', 'navbarContent');
    return button;
  }

  private createContentContainer(): HTMLDivElement {
    const container = ElementGenerator.createCustomElement<HTMLDivElement>('div', {
      className: 'collapse navbar-collapse',
      id: 'navbarContent',
    });

    container.append(this.createMainNavigation());
    container.append(this.createUserControls());
    return container;
  }

  private createMainNavigation(): HTMLUListElement {
    const ul = ElementGenerator.createCustomElement<HTMLUListElement>('ul', {
      className: 'navbar-nav me-auto mb-2 mb-lg-0',
    });
    ul.insertAdjacentHTML(
      'afterbegin',
      `<li class="nav-item mr-auto">
        <a href="#/vendors" class="nav-link">
          <i class="bi bi-archive"></i>
          Vendors</a>
      </li>
      <li class="nav-item">
        <a href="#/contacts" class="nav-link">
          <i class="bi bi-diagram-3"></i>
          Contacts</a>
      </li>`
    );
    return ul;
  }

  private createUserControls(): HTMLUListElement {
    const ul = ElementGenerator.createCustomElement<HTMLUListElement>('ul', {
      className: 'nav navbar-nav navbar-right',
    });
    ul.insertAdjacentHTML(
      'afterbegin',
      `<li class="nav-item">
        <a href="#/profile" class="nav-link">
          <i class="bi bi-person-circle"></i>
          Profile</a>
      </li>`
    );
    const li = ElementGenerator.createCustomElement<HTMLLIElement>('li', {
      className: 'nav-item',
    });

    this.elements.cartAnchor = ElementGenerator.createCustomElement<HTMLAnchorElement>('a', {
      className: 'nav-link position-relative',
      href: '#/cart',
      innerHTML: '<i class="bi bi-cart pe-2"></i>Cart',
    });

    li.append(this.elements.cartAnchor);
    ul.prepend(li);
    return ul;
  }
}
