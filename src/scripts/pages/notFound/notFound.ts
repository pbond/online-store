import { Page } from '../../../types/templates/Page';
import { ElementGenerator } from '../../helpers/ElementGenerator';
import './notFound.scss';

export class NotFound extends Page {
  constructor(path?: string) {
    super();
    this.path = path ?? '';
  }

  render(): HTMLElement {
    const content = ElementGenerator.createCustomElement<HTMLElement>('h2', {
      className: 'notfound__content',
      innerHTML: `
        <div>404 Page NOT found</div>
        <div>
          <a href="#/main" class="btn btn-primary mt-4">Return to main page</a>
        </div>`,
    });
    this.container.append(content);
    this.container.classList.add('notfound');
    this.container.classList.add('container');
    return this.container;
  }
}
