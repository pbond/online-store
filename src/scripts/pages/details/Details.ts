import { Page } from '../../../types/templates/Page';

export class Details extends Page {
  constructor(path?: string) {
    super();
    this.element = this.render();
    this.path = path ?? '';
  }

  render(): HTMLElement {
    this.element = document.createElement('div');
    this.element.innerHTML = 'Details page';
    return this.element;
  }

  destroy() {
    this.element.remove();
  }
}
