import { Page } from '../../../types/pages/Page';

export class Main extends Page {
  constructor(path?: string) {
    super();
    this.element = this.render();
    this.path = path ?? '';
  }

  render(): HTMLElement {
    this.element = document.createElement('div');
    this.element.innerHTML = 'Main page';
    return this.element;
  }

  destroy() {
    this.element.remove();
  }
}
