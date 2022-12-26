import { Page } from '../../../types/templates/Page';

export class Details extends Page {
  constructor(path?: string) {
    super();
    this.path = path ?? '';
  }

  render(): HTMLElement {
    this.container.innerHTML = 'Details page';
    return this.container;
  }

  destroy() {
    this.container.remove();
  }
}
