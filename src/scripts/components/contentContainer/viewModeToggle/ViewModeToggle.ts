import { Component } from '../../../../types/templates/Component';
import { ElementGenerator } from '../../../helpers/ElementGenerator';
import { ViewModeEnum } from '../../../../types/enums/ViewModeEnum';
import './viewModeToggle.scss';
import state from '../../../state/State';

export class ViewModeToggle extends Component {
  constructor(tagName: string, className: string) {
    super(tagName, className);
  }

  render(): HTMLElement {
    this.elements.radioGrid = ElementGenerator.createCustomElement<HTMLInputElement>('input', {
      type: 'radio',
      className: 'display__radio btn-check',
      name: 'display-option',
      id: ViewModeEnum.Grid,
      autocomplete: 'off',
      checked: state.filter?.viewMode === ViewModeEnum.Grid,
    });
    const displayGrid = this.createDisplayOption(this.elements.radioGrid, 'display-option', 'bi bi-grid-3x3-gap');
    this.elements.radioList = ElementGenerator.createCustomElement<HTMLInputElement>('input', {
      type: 'radio',
      className: 'display__radio btn-check',
      name: 'display-option',
      id: ViewModeEnum.List,
      autocomplete: 'off',
      checked: state.filter?.viewMode === ViewModeEnum.List,
    });
    const displayList = this.createDisplayOption(this.elements.radioList, 'display-option', 'bi bi-list');
    this.container.append(displayGrid);
    this.container.append(displayList);
    this.init();
    return this.container;
  }

  init(): ViewModeToggle {
    this.elements.radioGrid.addEventListener('change', this.radioChangeHandler.bind(this));
    this.elements.radioList.addEventListener('change', this.radioChangeHandler.bind(this));
    return this;
  }

  private radioChangeHandler(e: Event): void {
    const target = e.target;
    if (target instanceof HTMLInputElement && state.filter) {
      state.filter.viewMode = target.id as ViewModeEnum;
    }
  }

  private createDisplayOption(inputElement: HTMLElement, className: string, iconClass: string): HTMLDivElement {
    const display = ElementGenerator.createCustomElement<HTMLDivElement>('div', {
      className: className,
    });
    const label = ElementGenerator.createCustomElement<HTMLLabelElement>('label', {
      className: 'btn btn-outline-secondary',
      htmlFor: inputElement.id,
    });
    const icon = ElementGenerator.createCustomElement<HTMLElement>('i', {
      className: iconClass,
    });
    label.append(icon);
    display.append(inputElement);
    display.append(label);
    return display;
  }
}
