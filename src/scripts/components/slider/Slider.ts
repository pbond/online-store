import { DualHRangeBar } from 'dual-range-bar';
import { Component } from '../../../types/templates/Component';

export class Slider<T extends object> extends Component {
  constructor(tagName: string, className: string, groupName: string, etalonList: T[]) {
    super(tagName, className);
  }

  render(): HTMLElement {
    const drbar = new DualHRangeBar('my-drbar-container');
    this.container.append(drbar.container);
    return this.container;
  }

  init(): Component {
    return this;
  }
}
