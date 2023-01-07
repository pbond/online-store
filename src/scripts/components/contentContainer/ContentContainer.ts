import { Component } from '../../../types/templates/Component';
import './contentContainer.scss';
import { ContentHeader } from './contentHeader/ContentHeader';
import { Vitrine } from '../vitrine/Vitrine';

export class ContentContainer extends Component {
  private contentHeader: ContentHeader;
  private vitrine: Vitrine;
  constructor(tagName: string, className: string) {
    super(tagName, className);
    this.contentHeader = new ContentHeader('div', 'shop-content__header');
    this.vitrine = new Vitrine('div', 'shop-content__vitrine');
  }

  render(): HTMLElement {
    this.container.append(this.contentHeader.render());
    this.container.append(this.vitrine.render());
    this.container.classList.add('content-container');
    this.init();
    return this.container;
  }

  init(): ContentContainer {
    return this;
  }

  destroy(): void {
    this.contentHeader.destroy();
    this.vitrine.destroy();
    super.destroy();
  }
}
