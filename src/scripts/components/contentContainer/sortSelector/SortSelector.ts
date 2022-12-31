import { FilterTypeEnum } from '../../../../types/enums/FilterTypeEnum';
import { SortTypeEnum } from '../../../../types/enums/SortTypeEnum';
import { Component } from '../../../../types/templates/Component';
import { ElementGenerator } from '../../../helpers/ElementGenerator';
import state from '../../../state/State';
import './sortSelector.scss';

interface ISortOption {
  propertyForSort: string;
  text: string;
  type?: SortTypeEnum;
}

export class SortSelector extends Component {
  private select: HTMLSelectElement | null;
  private sortOptions: ISortOption[];

  constructor(tagName: string, className: string, options: string[]) {
    super(tagName, className);
    this.sortOptions = options.reduce((acc: ISortOption[], option: string) => {
      acc.push({ propertyForSort: option, text: `Sort by ${option} ${SortTypeEnum.Asc}`, type: SortTypeEnum.Asc });
      acc.push({ propertyForSort: option, text: `Sort by ${option} ${SortTypeEnum.Desc}`, type: SortTypeEnum.Desc });
      return acc;
    }, []);
    this.select = null;
  }

  render(): HTMLElement {
    this.select = ElementGenerator.createCustomElement<HTMLSelectElement>('select', {
      className: 'sort__select form-select',
    });

    const optiontitle = ElementGenerator.createCustomElement<HTMLOptionElement>('option', {
      className: 'sort__item',
      disabled: true,
      value: 'title',
      text: 'Sort options:',
      selected: true,
    });
    this.select?.options.add(optiontitle);

    this.sortOptions.forEach((option) => {
      const optionElement = ElementGenerator.createCustomElement<HTMLOptionElement>('option', {
        className: 'sort__item',
      });
      optionElement.value = `${option.propertyForSort}-${option.type}`;
      optionElement.text = option.text;
      this.select?.options.add(optionElement);
    });
    this.updateProperties();
    this.init();
    this.container.append(this.select);
    return this.container;
  }

  init(): SortSelector {
    this.select?.addEventListener('change', this.selectEventHandler.bind(this));
    return this;
  }

  private selectEventHandler(e: Event): void {
    const targetElement = e.target;
    if (targetElement instanceof HTMLSelectElement) {
      const option = targetElement.options[targetElement.selectedIndex];
      if (option.value) {
        state.filter?.setSearchParams(FilterTypeEnum.Sort, option.value);
      }
    }
  }

  private updateProperties() {
    if (!this.select) {
      return;
    }
    const value = state.filter?.filterParams.get(FilterTypeEnum.Sort);
    if (!value) {
      return;
    }
    const optionElement = [...this.select.options].find((option) => option.value === value);
    if (optionElement) {
      optionElement.selected = true;
    }
  }
}
