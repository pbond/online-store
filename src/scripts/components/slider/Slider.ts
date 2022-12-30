import { Component } from '../../../types/templates/Component';
import * as noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
import './slider.scss';
import { ElementGenerator } from '../../helpers/ElementGenerator';
import state from '../../state/State';
import eventBus from '../../helpers/EventBus';
import { IProduct } from '../../../types/models/IProduct';

export class Slider<T extends object> extends Component {
  private defaultMin: number;
  private defaultMax: number;
  private min: number;
  private max: number;
  private propertyName: string;
  private prefix: string;
  private slider: noUiSlider.target | null;
  private minSpan: HTMLSpanElement | null;
  private maxSpan: HTMLSpanElement | null;

  constructor(tagName: string, className: string, propertyName: string, etalonList: T[], prefix = '') {
    super(tagName, className);
    this.propertyName = propertyName;
    this.prefix = prefix;
    this.defaultMin = this.getMin(etalonList, propertyName);
    this.defaultMax = this.getMax(etalonList, propertyName);
    this.min = this.defaultMin;
    this.max = this.defaultMax;
    this.slider = null;
    this.minSpan = null;
    this.maxSpan = null;
  }

  render(): HTMLElement {
    const wrapper = ElementGenerator.createCustomElement<HTMLDivElement>('div', {
      className: 'slider__wrapper',
    });
    const title = ElementGenerator.createCustomElement('h5', { className: 'slider__title' });
    title.innerText = this.propertyName.toUpperCase();
    const amounts = ElementGenerator.createCustomElement<HTMLDivElement>('div', {
      className: 'slider__amounts',
    });
    this.minSpan = ElementGenerator.createCustomElement<HTMLSpanElement>('span', {
      className: 'slider__min',
    });
    this.maxSpan = ElementGenerator.createCustomElement<HTMLSpanElement>('span', {
      className: 'slider__max',
    });
    this.slider = ElementGenerator.createCustomElement<noUiSlider.target>('div', {
      className: 'filter__slider',
    });
    amounts.append(this.minSpan);
    amounts.append(this.maxSpan);
    wrapper.append(title);
    wrapper.append(this.slider);
    wrapper.append(amounts);
    noUiSlider.create(this.slider, {
      start: [this.defaultMin, this.defaultMax],
      connect: true,
      range: {
        min: this.defaultMin,
        max: this.defaultMax,
      },
    });
    this.min = this.defaultMin;
    this.max = this.defaultMax;
    this.updateSliderProperties(state.filteredProducts);
    this.container.classList.add('slider__container');
    this.container.append(wrapper);
    this.init();
    return this.container;
  }

  init(): Slider<T> {
    eventBus.on('updatefilter', (filteredProducts: IProduct[]) => {
      this.updateSliderProperties(filteredProducts);
    });
    this.slider?.noUiSlider?.on('change', this.sliderChangeEventHandler.bind(this));
    return this;
  }

  private sliderChangeEventHandler(values: (string | number)[], handleNumber: number) {
    const paramName = handleNumber === 0 ? `sl-${this.propertyName}-from` : `sl-${this.propertyName}-to`;
    state.setSearchParams(paramName, Math.floor(Number(values[handleNumber])).toString());
  }

  private sliderUpdateEventHandler(values: (string | number)[]) {
    const [min, max] = values;
    if (this.minSpan) {
      this.min = Math.floor(Number(min));
      this.minSpan.textContent = `${this.prefix}${this.min}`;
    }
    if (this.maxSpan) {
      this.max = Math.floor(Number(max));
      this.maxSpan.textContent = `${this.prefix}${this.max}`;
    }
  }

  private updateSliderProperties<T>(list: T[]): void {
    const from = state.filterParams.get(`sl-${this.propertyName}-from`);
    const to = state.filterParams.get(`sl-${this.propertyName}-to`);

    let min = from ?? this.getMin(list, this.propertyName);
    min = !Number.isFinite(Number(min)) ? this.min : min;
    if (this.minSpan) {
      this.min = Math.floor(Number(min));
      this.minSpan.textContent = `${this.prefix}${this.min}`;
    }
    let max = to ?? this.getMax(list, this.propertyName);
    max = !Number.isFinite(Number(max)) ? this.max : max;
    if (this.maxSpan) {
      this.max = Math.floor(Number(max));
      this.maxSpan.textContent = `${this.prefix}${this.max}`;
    }
    if (this.slider) {
      this.slider.noUiSlider?.off('update');
      this.slider.noUiSlider?.set([min, max]);
      this.slider.noUiSlider?.on('update', this.sliderUpdateEventHandler.bind(this));
    }
  }

  private getMin<T>(list: T[], propertyName: string): number {
    return Math.min.apply(
      null,
      list.map((item) => Number(Object.getOwnPropertyDescriptor(item, propertyName)?.value))
    );
  }

  private getMax<T>(list: T[], propertyName: string): number {
    return Math.max.apply(
      null,
      list.map((item) => Number(Object.getOwnPropertyDescriptor(item, propertyName)?.value))
    );
  }
}
