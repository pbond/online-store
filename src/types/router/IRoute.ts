import { Page } from '../templates/Page';

export interface IRoute {
  path: string;
  getPageComponent: (path?: string) => Page;
}
