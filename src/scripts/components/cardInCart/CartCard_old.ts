import './cartCard.scss';
import { Component } from '../../../types/templates/Component';
import { IProduct } from '../../../types/models/IProduct';
import { ElementGenerator } from '../../helpers/ElementGenerator';
import eventBus from '../../helpers/EventBus';

export class CartCard_old extends Component {
  product: IProduct;
  count = 0;

  constructor(product: IProduct, count: number) {
    super('div', 'card');
    this.product = product;
    this.count = count;
  }

  render(): HTMLElement {
    this.container.append(this.createCardHeader());
    this.container.append(this.createCardBody());
    return this.container;
  }

  private createCardHeader(): HTMLDivElement {
    this.elements.cardHeader = ElementGenerator.createCustomElement<HTMLDivElement>('div', {
      className: 'card-header',
    });
    this.elements.headerRow = ElementGenerator.createCustomElement<HTMLDivElement>('div', { className: 'row' });
    const titleColumn = ElementGenerator.createCustomElement('div', { className: 'col-9' });
    const priceColumn = ElementGenerator.createCustomElement('div', {
      className: 'col-3 fw-bold',
      innerText: `Price: $${this.product.price}`,
    });
    const anchor = ElementGenerator.createCustomElement<HTMLAnchorElement>('a', {
      href: this.getProductURL(),
      innerText: this.product.title,
    });
    titleColumn.append(anchor);
    this.elements.headerRow.append(titleColumn, priceColumn);
    this.elements.cardHeader.append(this.elements.headerRow);
    return this.elements.cardHeader as HTMLDivElement;
  }

  private createCardBody(): HTMLDivElement {
    const cardBody = ElementGenerator.createCustomElement<HTMLDivElement>('div', { className: 'card-body' });
    const row = ElementGenerator.createCustomElement<HTMLDivElement>('div', { className: 'row' });
    const colLeft = ElementGenerator.createCustomElement<HTMLDivElement>('div', { className: 'col-3' });
    const img = ElementGenerator.createCustomElement<HTMLImageElement>('img', {
      src: this.getThumbnailURL(),
      alt: this.product.title,
      className: 'w-75',
    });
    const colCenter = ElementGenerator.createCustomElement<HTMLDivElement>('div', { className: 'col-6' });
    const colRight = ElementGenerator.createCustomElement<HTMLDivElement>('div', {
      className: 'col-3 d-flex flex-wrap align-content-center',
    });

    const description = ElementGenerator.createCustomElement<HTMLUListElement>('ul');
    description.append(
      ElementGenerator.createCustomElement<HTMLUListElement>('li', {
        innerText: this.product.category,
      }),
      ElementGenerator.createCustomElement<HTMLUListElement>('li', {
        innerText: this.product.brand,
      }),
      ElementGenerator.createCustomElement<HTMLUListElement>('li', {
        innerText: this.product.description,
      })
    );

    colLeft.append(img);
    colCenter.append(description);
    colRight.append(this.createControls());
    colRight.append(this.createTotalPrice());

    row.append(colLeft, colCenter, colRight);
    cardBody.append(row);

    return cardBody;
  }

  private createControls(): HTMLDivElement {
    const controlsRow = ElementGenerator.createCustomElement<HTMLDivElement>('div', { className: 'row w-100' });
    const controlsCol = ElementGenerator.createCustomElement<HTMLDivElement>('div', {
      className: 'col-8 d-flex align-items-center',
    });
    const inputGroup = ElementGenerator.createCustomElement<HTMLDivElement>('div', { className: 'input-group' });

    inputGroup.append(
      ElementGenerator.createCustomElement<HTMLButtonElement>('button', {
        className: 'btn btn-outline-secondary form-control',
        innerText: '-',
        onclick: this.removeItem.bind(this),
      }),
      ElementGenerator.createCustomElement<HTMLInputElement>('input', {
        type: 'number',
        value: 1,
        min: 1,
        max: this.product.stock,
        step: 1,
        className: 'form-control text-center border-0',
      }),
      ElementGenerator.createCustomElement<HTMLButtonElement>('button', {
        className: 'btn btn-outline-secondary form-control',
        innerText: '+',
        onclick: this.addItem.bind(this),
      })
    );

    const removeIcon = ElementGenerator.createCustomElement<HTMLElement>('i', { className: 'bi bi-trash fs-3' });
    const removeButton = ElementGenerator.createCustomElement<HTMLButtonElement>('button', {
      className: 'btn btn-outline-secondary form-control border-0 remove-icon',
    });
    const removeCol = ElementGenerator.createCustomElement<HTMLDivElement>('div', { className: 'col-4' });
    removeButton.append(removeIcon);
    removeCol.append(removeButton);

    controlsCol.append(inputGroup);
    controlsRow.append(controlsCol, removeCol);
    return controlsRow;
  }

  private createTotalPrice(): HTMLDivElement {
    const totalRow = ElementGenerator.createCustomElement<HTMLDivElement>('div', { className: 'row w-100' });
    const controlsCol = ElementGenerator.createCustomElement<HTMLDivElement>('div', {
      className: 'col-8 d-flex align-items-center',
      innerText: this.product.price * this.count,
    });
    totalRow.append(controlsCol);
    return totalRow;
  }

  private getProductURL(): string {
    return `/#/product/${this.product.id}`;
  }

  private getThumbnailURL(): string {
    return this.product.thumbnail;
  }

  private addItem(): void {
    console.log('add item');
    eventBus.trigger('addProductToCart', this.product.id);
  }

  private removeItem(): void {
    console.log('remove item');
    eventBus.trigger('removeProductFromCart', this.product.id);
  }
}
