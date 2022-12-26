import { Component } from '../../../types/templates/Component';

interface FilterGroup {
  group: string;
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
    return this.container;
  }

  private initGroups(etalonList: T[], filteredList: T[], groups: string[]): FilterGroup[] {
    return groups.reduce((acc, group) => {
      const count = filteredList.filter(
        (l) => String(Object.entries(l).find(([k]) => k === this.groupName)?.[1]) === group
      ).length;
      const max = etalonList.filter(
        (l) => String(Object.entries(l).find(([k]) => k === this.groupName)?.[1]) === group
      ).length;
      acc.push({ group: group, count: count, max: max });
      return acc;
    }, [] as FilterGroup[]);
  }
}
