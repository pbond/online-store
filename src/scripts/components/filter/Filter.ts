import { Component } from '../../../types/templates/Component';
import { ElementGenerator } from '../../helpers/ElementGenerator';
import state from '../../state/State';
import eventBus from '../../helpers/EventBus';
import './filter.scss';
import { IProduct } from '../../../types/models/IProduct';
import { IFilterGroup } from '../../../types/models/IFilterGroup';

//export class Filter<T extends { [key: string]: unknown }> extends Component {
export class Filter<T extends object> extends Component {
  private groupName: string;
  private etalonList: T[];
  private groupValues: string[];
  private groups: IFilterGroup[];

  constructor(tagName: string, className: string, groupName: string, etalonList: T[]) {
    super(tagName, className);
    this.groupName = groupName;
    this.etalonList = etalonList;
    //const groups = [...new Set(etalonList.map((l) => l[groupName]))];
    this.groupValues = [
      ...new Set(
        etalonList.map((item) => {
          //const ff = String(Object.entries(l).find(([k]) => k === groupName)?.[1]) as TGroup;
          return String(Object.getOwnPropertyDescriptor(item, groupName)?.value);
        })
      ),
    ];
    this.groups = this.initGroups(this.etalonList, this.groupValues);
    this.checkBoxEventHandler = this.checkBoxEventHandler.bind(this);
  }

  init(): Filter<T> {
    eventBus.on('updatefilter', (filteredProducts: IProduct[]) => {
      this.update(filteredProducts);
    });
    return this;
  }

  render(): HTMLElement {
    this.container.innerHTML = '';
    const title = ElementGenerator.createCustomElement('h5', { className: 'filter__title' });
    title.innerText = this.groupName.toUpperCase();
    const elementsContainer = ElementGenerator.createCustomElement('ul', { className: 'filter__elements' });
    this.groups.forEach((group) => {
      const item = this.createFilterItem(group);
      elementsContainer.append(item);
    });
    this.container.classList.add('filter__container');
    this.container.append(title);
    this.container.append(elementsContainer);
    this.init();
    return this.container;
  }

  createFilterItem(group: IFilterGroup): HTMLElement {
    const item = ElementGenerator.createCustomElement<HTMLLIElement>('li', { className: 'filter__item' });
    const label = ElementGenerator.createCustomElement<HTMLLabelElement>('label', {
      className: 'filter__label form-check-label',
    });
    const checkbox = ElementGenerator.createCustomElement<HTMLInputElement>('input', {
      className: 'filter__checkbox form-check-input',
      type: 'checkbox',
      value: `${group.name}`,
    });
    const nameSpan = ElementGenerator.createCustomElement<HTMLSpanElement>('span', { className: 'filter__name' });
    const countSpan = ElementGenerator.createCustomElement<HTMLSpanElement>('span', { className: 'filter__count' });
    group.checkBox = checkbox;
    group.nameSpan = nameSpan;
    group.countSpan = countSpan;
    if (state.filter) {
      this.updateFilterProperties(group, state.filter.filteredProducts);
    }
    checkbox.addEventListener('change', this.checkBoxEventHandler);
    label.append(checkbox);
    label.append(nameSpan);
    label.append(countSpan);
    item.append(label);
    return item;
  }

  private update(filteredProducts: IProduct[]): void {
    this.groups.forEach((group) => {
      this.updateFilterProperties(group, filteredProducts);
    });
  }

  private isChecked(group: IFilterGroup): boolean {
    if (!state.filter) {
      return false;
    }
    return state.filter.filterParams.getAll(this.groupName).some((param) => param === group.name);
  }

  private updateFilterProperties<T>(group: IFilterGroup, list: T[]): void {
    if (!this.isChecked(group)) {
      const filterParams = new URLSearchParams(state.filter?.filterQuery);
      filterParams.append(this.groupName, group.name);
      const posibleFilteredProducts = state.filter?.getFilteredProducts(state.products, filterParams);
      if (posibleFilteredProducts) {
        group.count = this.getItemsByGroupValue(posibleFilteredProducts, group.name).length;
      }
    } else {
      group.count = this.getItemsByGroupValue(list, group.name).length;
    }

    //group.count = this.getItemsByGroupValue(list, group.name).length;
    group.max = this.getItemsByGroupValue(this.etalonList, group.name).length;
    if (group.checkBox) {
      group.checkBox.removeEventListener('change', this.checkBoxEventHandler);
      group.checkBox.checked = this.isChecked(group);
      group.checkBox.addEventListener('change', this.checkBoxEventHandler);
    }
    if (group.nameSpan) {
      group.nameSpan.textContent = group.name;
    }
    if (group.countSpan) {
      group.countSpan.textContent = `(${group.count}/${group.max})`;
    }
  }

  private checkBoxEventHandler(e: Event) {
    const targetElement = e.target;
    if (targetElement instanceof HTMLInputElement) {
      if (targetElement.checked) {
        state.filter?.appendSearchParams(this.groupName, targetElement.value);
      } else {
        state.filter?.deleteSearchParams(this.groupName, targetElement.value);
      }
    }
  }

  private initGroups(etalonList: T[], groupValues: string[]): IFilterGroup[] {
    return groupValues.reduce((acc, value) => {
      const count = this.getItemsByGroupValue(etalonList, value).length;
      acc.push({ name: value, count: count, max: count });
      return acc;
    }, [] as IFilterGroup[]);
  }

  private getItemsByGroupValue<T>(list: T[], groupValue: string): T[] {
    return list.filter((item) => String(Object.getOwnPropertyDescriptor(item, this.groupName)?.value) === groupValue);
  }
}
