import { IRoute } from '../../types/router/IRoute';
import { Main } from '../pages/main/Main';
import { Details } from '../pages/details/Details';
import { Cart } from '../pages/cart/Cart';

export const Routes: IRoute[] = [
  {
    path: '#/',
    getPageComponent: (path?: string) => new Main(path),
  },
  {
    path: '#/main',
    getPageComponent: (path?: string) => new Main(path),
  },
  {
    path: '#/details',
    getPageComponent: (path?: string) => new Details(path),
  },
  {
    path: '#/cart',
    getPageComponent: (path?: string) => new Cart(path),
  },
];
