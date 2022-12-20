// import { IRouter } from '../../types/router/IRouter';
import { Routes } from './Routes';
import { IRoute } from '../../types/router/IRoute';
import { Main } from '../pages/main/Main';
import { Page } from '../../types/pages/Page';
import { NotFound } from '../pages/notFound/NotFound';
import eventBus from '../helpers/EventBus';
import { IRouter } from '../../types/router/IRouter';

class Router implements IRouter {
  private page: Page;
  private routes: IRoute[];

  constructor() {
    this.page = new Main();
    this.routes = [];
  }

  addRoute(route: IRoute): void {
    this.routes.push(route);
  }

  getNotFoundRoute(): IRoute {
    return {
      path: 'NotFound',
      getPageComponent: (path?: string) => new NotFound(path),
    };
  }

  listen(): void {
    window.addEventListener('popstate', (event) => {
      this.navigate();
      console.log(event);
    });

    // window.addEventListener('hashchange', (event) => {
    //   const currentPath = window.location.hash;
    //   if (this.routes.some((r) => currentPath.startsWith(r.path))) {
    //     window.history.pushState(null, '', currentPath);
    //   }
    //   this.changePage('');
    // });
  }

  navigate(): void {
    const [hash, path] = window.location.hash.split('?');
    // window.history.pushState(null, '', hashpath);

    const route = this.routes.find((r) => hash === r.path) ?? this.getNotFoundRoute();
    const page = route.getPageComponent(path);
    eventBus.trigger('changePage', page);
  }
}

const router = new Router();
for (const route of Routes) {
  router.addRoute(route);
}

export default router;
