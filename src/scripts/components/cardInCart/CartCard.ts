import './cartCard.scss';
import { Component } from '../../../types/templates/Component';
import { IProduct } from '../../../types/models/IProduct';
import { ElementGenerator } from '../../helpers/ElementGenerator';
import eventBus from '../../helpers/EventBus';

export class CartCard extends Component {
  product: IProduct;

  constructor(product: IProduct) {
    super('div', 'card');
    this.product = product;
  }

  render(): HTMLElement {
    this.container.append(this.createCardHeader());
    this.container.append(this.createCardBody());
    return this.container;
  }

  private createCardHeader(): HTMLDivElement {
    const cardHeader = ElementGenerator.createCustomElement<HTMLDivElement>('div', { className: 'card-header' });
    const headerRow = ElementGenerator.createCustomElement<HTMLDivElement>('div', { className: 'row' });
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
    headerRow.append(titleColumn, priceColumn);
    cardHeader.append(headerRow);
    return cardHeader;
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
    const controlsCol = ElementGenerator.createCustomElement<HTMLDivElement>('div', { className: 'col-8 d-flex' });
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
      className: 'col-8 d-flex',
      // innerText: this.product.price * this.
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
    eventBus.trigger('', 1);
  }

  private removeItem(): void {
    console.log('remove item');
    eventBus.trigger('', 1);
  }
}

//Как лучше привязывать события к контролам, которые генерируются кодом?

// <div class="card">
// <div class="card-header">
// <a href="#">Product name</a>
// </div>
// <div class="card-body">
// <div class="row">
// <div class="col-3">
// <img src="" alt="product image" />
//   </div>
//   <div class="col-6">
//   Product description
// </div>
// <div class="col-3">
// <div class="row">
// <div class="col-8">
// <div class="input-group amount-controls">
// <button class="btn btn-outline-secondary form-control">-</button>
//   <label>
//    <input type="number" min="0" max="100" step="1" value="0" class="form-control text-center border-0"/>
//   </label>
//   <button class="btn btn-outline-secondary form-control">+</button>
//   </div>
//   </div>
//   <div class="col-4 d-flex align-content-center flex-wrap">
//   $123,456
// </div>
// </div>
// </div>
// </div>
// </div>
// </div>
