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
      innerText: '404 Page NOT found',
    });
    this.container.append(content);
    this.container.classList.add('notfound');
    this.container.classList.add('container');
    return this.container;
  }
}
