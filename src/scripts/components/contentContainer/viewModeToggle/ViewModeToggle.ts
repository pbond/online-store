import { Component } from '../../../../types/templates/Component';
import { ElementGenerator } from '../../../helpers/ElementGenerator';
import eventBus from '../../../helpers/EventBus';
import './viewModeToggle.scss';

export class ViewModeToggle extends Component {
  constructor(tagName: string, className: string) {
    super(tagName, className);
  }

  render(): HTMLElement {
    this.elements.radioGrid = ElementGenerator.createCustomElement<HTMLInputElement>('input', {
      className: 'display__radio btn-check',
      name: 'display-option',
      id: 'display-grid',
      autocomplete: 'off',
      checked: true,
    });
    const displayGrid = this.createDisplayOption(this.elements.radioGrid, 'display-option', 'bi bi-grid-3x3-gap');
    this.elements.radioList = ElementGenerator.createCustomElement<HTMLInputElement>('input', {
      className: 'display__radio btn-check',
      name: 'display-option',
      id: 'display-list',
      autocomplete: 'off',
      checked: false,
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
    if (target instanceof HTMLInputElement) {
      eventBus.trigger('changeViewMode', target.id);
    }
  }

  private createDisplayOption(inputElement: HTMLElement, className: string, iconClass: string): HTMLDivElement {
    const display = ElementGenerator.createCustomElement<HTMLDivElement>('div', {
      className: className,
    });
    const label = ElementGenerator.createCustomElement<HTMLLabelElement>('label', {
      className: 'btn btn-outline-secondary',
      for: inputElement.id,
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
