import { Component } from '../../../types/templates/Component';
import './contentContainer.scss';
//import { ViewModeToggle } from './viewModeToggle/ViewModeToggle';
import { ContentHeader } from './contentHeader/ContentHeader';
import { VitrineCard } from '../cardInVitrine/VitrineCard';

export class ContentContainer extends Component {
  private contentHeader: ContentHeader;
  private vitrine: VitrineCard;
  constructor(tagName: string, className: string) {
    super(tagName, className);
    this.contentHeader = new ContentHeader('div', 'shop-content__header');
    this.vitrine = new VitrineCard('div', 'shop-content__vitrine');
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
}
