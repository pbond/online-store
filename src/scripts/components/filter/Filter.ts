import { Component } from '../../../types/templates/Component';
import { ElementGenerator } from '../../helpers/ElementGenerator';
import './filter.scss';

interface FilterGroup {
  name: string;
  count: number;
  max: number;
}

//export class Filter<T extends { [key: string]: unknown }> extends Component {
export class Filter<T extends object> extends Component {
  private groupName: string;
  private etalonList: T[];
  private filteredList: T[];
  private groupArray: string[];
  private groups: FilterGroup[];

  constructor(tagName: string, className: string, groupName: string, etalonList: T[], filteredList: T[]) {
    super(tagName, className);
    this.groupName = groupName;
    this.etalonList = etalonList;
    this.filteredList = filteredList;
    //const groups = [...new Set(etalonList.map((l) => l[groupName]))];
    this.groupArray = [
      ...new Set(
        etalonList.map((l) => {
          //const ff = String(Object.entries(l).find(([k]) => k === groupName)?.[1]) as TGroup;
          return String(Object.entries(l).find(([k]) => k === groupName)?.[1]);
        })
      ),
    ];
    this.groups = this.initGroups(etalonList, filteredList, this.groupArray);
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
    return this.container;
  }

  createFilterItem(group: FilterGroup): HTMLElement {
    const item = ElementGenerator.createCustomElement<HTMLLIElement>('li', { className: 'filter__item' });
    const label = ElementGenerator.createCustomElement<HTMLLabelElement>('label', {
      className: 'filter__label form-check-label',
    });
    const checkbox = ElementGenerator.createCustomElement<HTMLInputElement>('input', {
      className: 'filter__checkbox form-check-input',
      type: 'checkbox',
      value: `${group.name}`,
    });
    const name = ElementGenerator.createCustomElement<HTMLSpanElement>('span', { className: 'filter__name' });
    name.textContent = group.name;
    const count = ElementGenerator.createCustomElement<HTMLSpanElement>('span', { className: 'filter__count' });
    count.textContent = `(${group.count}/${group.max})`;
    label.append(checkbox);
    label.append(name);
    label.append(count);
    item.append(label);
    return item;
  }

  private initGroups(etalonList: T[], filteredList: T[], groups: string[]): FilterGroup[] {
    return groups.reduce((acc, group) => {
      const count = filteredList.filter(
        (l) => String(Object.entries(l).find(([k]) => k === this.groupName)?.[1]) === group
      ).length;
      const max = etalonList.filter(
        (l) => String(Object.entries(l).find(([k]) => k === this.groupName)?.[1]) === group
      ).length;
      acc.push({ name: group, count: count, max: max });
      return acc;
    }, [] as FilterGroup[]);
  }
}
