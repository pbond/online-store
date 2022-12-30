import './button.scss';
import { Component } from '../../../types/templates/Component';

export class Button extends Component {
  clickHandler: (event: MouseEvent) => void;

  get text() {
    return this.container.textContent ?? '';
  }
  set text(value: string) {
    this.container.textContent = value;
  }

  constructor(className: string, text: string, clickHandler: (event: MouseEvent) => void) {
    super('button', className);
    this.text = text;
    this.clickHandler = clickHandler;
  }

  render(): HTMLButtonElement {
    this.container.setAttribute('type', 'button');
    this.container.addEventListener('click', this.clickHandler);
    return this.container as HTMLButtonElement;
  }
}
