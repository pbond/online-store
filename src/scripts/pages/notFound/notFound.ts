import { Page } from '../../../types/templates/Page';

export class NotFound extends Page {
  constructor(path?: string) {
    super();
    this.path = path ?? '';
  }

  render(): HTMLElement {
    this.container.innerHTML = 'NotFound page';
    return this.container;
  }

  destroy() {
    this.container.remove();
  }
}
