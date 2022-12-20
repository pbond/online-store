import { Page } from '../../../types/pages/Page';

export class Cart extends Page {
  constructor(path?: string) {
    super();
    this.element = this.render();
    this.path = path ?? '';
  }

  render(): HTMLElement {
    this.element = document.createElement('div');
    this.element.innerHTML = 'Cart page';
    return this.element;
  }

  destroy() {
    this.element.remove();
  }
}
