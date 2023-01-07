import './breadCrumbs.scss';
import { Component } from '../../../types/templates/Component';
import { ElementGenerator } from '../../helpers/ElementGenerator';
import { ViewModeEnum } from '../../../types/enums/ViewModeEnum';

export class BreadCrumbs<T extends object> extends Component {
  private product: T;
  private crumbsProperties: string[];
  private homeLink: { name: string; link: string; viewMode: ViewModeEnum };
  constructor(
    tagName: string,
    className: string,
    product: T,
    crumbsProperties: string[],
    homeLink: { name: string; link: string; viewMode: ViewModeEnum }
  ) {
    super(tagName, className);
    this.product = product;
    this.crumbsProperties = crumbsProperties;
    this.homeLink = homeLink;
  }

  render(): HTMLElement {
    const breadCrumbs = ElementGenerator.createCustomElement<HTMLOListElement>('ol', {
      className: 'breadcrumb',
    });
    let link = `${this.homeLink.link}?view-mode=${this.homeLink.viewMode}`;

    const firstItem = ElementGenerator.createElementByInnerHtml<HTMLLIElement>(`
    <li class="breadcrumb-item"><a href="${link}">${this.homeLink.name.toUpperCase()}</a></li>`);
    breadCrumbs.append(firstItem);

    this.crumbsProperties.slice(0, -1).forEach((crumb) => {
      const crumbValue = String(Object.getOwnPropertyDescriptor(this.product, crumb)?.value);
      link = `${link}&${crumb}=${crumbValue}`;
      const item = ElementGenerator.createElementByInnerHtml<HTMLLIElement>(`
      <li class="breadcrumb-item"><a href="${link}">${crumbValue.toUpperCase()}</a></li>`);
      breadCrumbs.append(item);
    });

    const lastCrumbValue = Object.getOwnPropertyDescriptor(
      this.product,
      this.crumbsProperties[this.crumbsProperties.length - 1]
    )?.value;
    const lastItem = ElementGenerator.createCustomElement<HTMLLIElement>('ol', {
      className: 'breadcrumb-item active',
      innerText: lastCrumbValue.toString(),
    });
    lastItem.setAttribute('aria-current', 'page');

    breadCrumbs.append(lastItem);
    this.container.append(breadCrumbs);
    this.container.setAttribute('aria-label', 'breadcrumb');
    return this.container;
  }

  init(): BreadCrumbs<T> {
    return this;
  }
}
