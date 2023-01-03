import { Page } from '../../../types/templates/Page';
import './details.scss';
import { CardDetails } from '../../components/cardInDetails/CardDetails';
import { IProduct } from '../../../types/models/IProduct';
import state from '../../state/State';
import { ElementGenerator } from '../../helpers/ElementGenerator';
import { BreadCrumbs } from '../../../scripts/components/breadCrumbs/BreadCrumbs';
import { ViewModeEnum } from '../../../types/enums/ViewModeEnum';

export class Details extends Page {
  private cardDetails: CardDetails | null;
  private product: IProduct | null;
  private breadcrumb: BreadCrumbs<IProduct> | null;

  constructor(path?: string) {
    super(path);
    this.product = this.getProductByPath(path);
    this.cardDetails = null;
    this.breadcrumb = null;
    if (this.product) {
      this.cardDetails = new CardDetails('section', 'details__card', this.product);
      this.breadcrumb = new BreadCrumbs<IProduct>('nav', 'bread-crumbs', this.product, ['category', 'brand', 'title'], {
        name: 'Store',
        link: '#/main',
        viewMode: state.filter?.viewMode || ViewModeEnum.Grid,
      });
    }
  }

  render(): HTMLElement {
    if (this.breadcrumb) {
      this.container.append(this.breadcrumb.render());
    }
    if (this.cardDetails) {
      this.container.append(this.cardDetails.render());
    } else {
      const notFoundElement = ElementGenerator.createCustomElement('h3', {
        className: 'details__notfound',
        textContent: 'No products found',
      });
      this.container.append(notFoundElement);
    }
    this.container.classList.add('details');
    return this.container;
  }

  private getProductByPath(path?: string): IProduct | null {
    if (!path) {
      return null;
    }
    const pathParams = new URLSearchParams(path);
    const id = pathParams.get('id');
    if (!id) {
      return null;
    }
    const product = state.products.find((prod) => prod.id.toString() === id);
    if (!product) {
      return null;
    }
    return product;
  }
}
