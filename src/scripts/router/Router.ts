import { Routes } from './Routes';
import { IRoute } from '../../types/router/IRoute';
import { Main } from '../pages/main/Main';
import { Page } from '../../types/templates/Page';
import { NotFound } from '../pages/notFound/NotFound';
import { IRouter } from '../../types/router/IRouter';

class Router implements IRouter {
  private routes: IRoute[];
  private currentPage: Page;
  private rootElement: HTMLElement;

  constructor(rootElement: HTMLElement) {
    this.rootElement = rootElement;
    this.currentPage = new Main();
    this.routes = [];
    this.routes = Routes;
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
    this.currentPage.destroy();
    this.currentPage = page;
    this.rootElement.append(page.render());
  }
}

const router = new Router(document.body);

export default router;
