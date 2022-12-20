import { Page } from '../pages/Page';

export interface IRoute {
  path: string;
  getPageComponent: (path?: string) => Page;
}
