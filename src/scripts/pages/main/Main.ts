import { Page } from '../../../types/templates/Page';

export class Main extends Page {
  constructor(path?: string) {
    super(path);
  }

  render(): HTMLElement {
    this.element = document.createElement('div');
    this.element.innerHTML = 'Main page';
    return this.element;
  }
}
