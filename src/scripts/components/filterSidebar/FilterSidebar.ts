import { Component } from '../../../types/templates/Component';
import { ElementGenerator } from '../../helpers/ElementGenerator';
import { Filter } from '../../../scripts/components/filter/Filter';
import { Slider } from '../../../scripts/components/slider/Slider';
import { SearchInput } from '../../components/contentContainer/searchInput/SearchInput';
import { IProduct } from '../../../types/models/IProduct';
import { FilterTypeEnum } from '../../../types/enums/FilterTypeEnum';
import state from '../../state/State';
import './filterSidebar.scss';

export class FilterSidebar extends Component {
  private brandsFilter: Filter<IProduct>;
  private categorysFilter: Filter<IProduct>;
  private priceSlider: Slider<IProduct>;
  private stockSlider: Slider<IProduct>;
  private search: SearchInput;

  constructor(tagName: string, className: string) {
    super(tagName, className);
    this.search = new SearchInput('div', 'filter__search');
    this.brandsFilter = new Filter<IProduct>('div', 'filter__brand', FilterTypeEnum.Brand, state.products);
    this.categorysFilter = new Filter<IProduct>('div', 'filter__category', FilterTypeEnum.Category, state.products);
    this.priceSlider = new Slider<IProduct>('div', 'filter__price', FilterTypeEnum.Price, state.products, '$');
    this.stockSlider = new Slider<IProduct>('div', 'filter__stock', FilterTypeEnum.Stock, state.products);
  }

  render(): HTMLElement {
    const navElement = ElementGenerator.createCustomElement<HTMLElement>('nav', {
      className: 'filter__nav collapse d-lg-block sidebar collapse bg-white',
      id: 'sidebarMenu',
    });
    const navcontainer = ElementGenerator.createCustomElement<HTMLElement>('div', {
      className: 'sidebar__content position-sticky',
    });
    navcontainer.append(this.search.render());
    navcontainer.append(this.brandsFilter.render());
    navcontainer.append(this.categorysFilter.render());
    navcontainer.append(this.priceSlider.render());
    navcontainer.append(this.stockSlider.render());
    navElement.append(navcontainer);
    this.container.append(navElement);
    return this.container;
  }

  init(): FilterSidebar {
    return this;
  }
}
