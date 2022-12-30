import { FilterTypeEnum } from '../../../../types/enums/FilterTypeEnum';
import { Component } from '../../../../types/templates/Component';
import { ElementGenerator } from '../../../helpers/ElementGenerator';
import state from '../../../state/State';
import './searchInput.scss';

export class SearchInput extends Component {
  private input: HTMLInputElement | null;
  constructor(tagName: string, className: string) {
    super(tagName, className);
    this.input = null;
  }

  render(): HTMLElement {
    this.input = ElementGenerator.createCustomElement<HTMLInputElement>('input', {
      className: 'serch__input form-control',
      type: 'search',
      placeholder: 'Search...',
      autocomplete: 'off',
      ariaLabel: 'Small',
      ariaDescribedby: 'inputGroup-sizing-sm',
    });
    this.updateProperties();
    this.init();
    this.container.append(this.input);
    return this.container;
  }

  init(): SearchInput {
    this.input?.addEventListener('input', this.inputEventHandler.bind(this));
    return this;
  }

  private inputEventHandler(e: Event): void {
    const targetElement = e.target;
    if (targetElement instanceof HTMLInputElement) {
      if (targetElement.value) {
        state.setSearchParams(FilterTypeEnum.Search, targetElement.value);
      } else {
        state.deleteAllSearchParamsByName(FilterTypeEnum.Search);
      }
    }
  }

  private updateProperties() {
    if (this.input) {
      const value = state.filterParams.get(FilterTypeEnum.Search);
      this.input.value = value ?? '';
    }
  }
}
