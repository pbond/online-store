import {IRoute} from "../../types/router/IRoute";

export const Routes: IRoute[] = [
  {
    path: '#/',
    component: 'Main'
  },
  {
    path: '#/details',
    component: 'Details'
  },
  {
    path: '#/cart',
    component: 'Cart'
  },
  {
    path: '#/404',
    component: 'NotFound'
  }
]
