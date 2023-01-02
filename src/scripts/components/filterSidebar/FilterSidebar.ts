import { Component } from '../../../types/templates/Component';
import { ElementGenerator } from '../../helpers/ElementGenerator';
import { Filter } from '../../../scripts/components/filter/Filter';
import { Slider } from '../../../scripts/components/slider/Slider';
import { SearchInput } from '../../components/contentContainer/searchInput/SearchInput';
import { IProduct } from '../../../types/models/IProduct';
import { FilterTypeEnum } from '../../../types/enums/FilterTypeEnum';
import state from '../../state/State';
import { Button } from '../../../scripts/components/button/Button';
import './filterSidebar.scss';
import router from '../../router/Router';

export class FilterSidebar extends Component {
  private brandsFilter: Filter<IProduct>;
  private categorysFilter: Filter<IProduct>;
  private priceSlider: Slider<IProduct>;
  private stockSlider: Slider<IProduct>;
  private search: SearchInput;
  private copyButton: Button;
  private clearButton: Button;

  constructor(tagName: string, className: string) {
    super(tagName, className);
    this.clearButton = new Button(
      'filter__reset btn btn-outline-primary',
      'Reset Filters',
      this.clearEventHandler.bind(this)
    );
    this.copyButton = new Button('filter__copy btn btn-outline-primary', 'Copy Link', this.copyEventHandler.bind(this));
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
      className: 'sidebar__content d-flex flex-column position-sticky',
    });
    const buttonsContainer = ElementGenerator.createCustomElement<HTMLDivElement>('div', {
      className: 'filter__buttons d-flex flex-column',
    });
    buttonsContainer.append(this.clearButton.render());
    buttonsContainer.append(this.copyButton.render());
    navcontainer.append(this.search.render());
    navcontainer.append(this.brandsFilter.render());
    navcontainer.append(this.categorysFilter.render());
    navcontainer.append(this.priceSlider.render());
    navcontainer.append(this.stockSlider.render());
    navcontainer.append(buttonsContainer);
    navElement.append(navcontainer);
    this.container.append(navElement);
    return this.container;
  }

  init(): FilterSidebar {
    return this;
  }

  private clearEventHandler(): void {
    if (state.filter) {
      state.filter.filterQuery = '';
      this.search.value = '';
      router.updateQuery('');
    }
  }

  private copyEventHandler(event: MouseEvent): void {
    const currentTarget = event.target;
    if (currentTarget instanceof HTMLButtonElement) {
      const currenText = currentTarget.textContent;
      currentTarget.textContent = 'Copied';
      navigator.clipboard.writeText(window.location.href);
      setTimeout(() => {
        currentTarget.textContent = currenText;
      }, 500);
    }
  }
}
