import './index.scss';
import './bootstrap/bootstrap.ts';
import { IRouter } from './types/router/IRouter';
import router from './scripts/router/Router';
import eventBus from './scripts/helpers/EventBus';
import { Page } from './types/pages/Page';
import { NotFound } from './scripts/pages/notFound/NotFound';

class Application {
  protected router: IRouter;
  protected eventBus;
  protected rootElement: HTMLElement;
  protected currentPage: Page;
  constructor() {
    this.router = router;
    this.eventBus = eventBus;
    this.rootElement = document.body;
    this.currentPage = new NotFound();
  }

  init() {
    this.renderChild = this.renderChild.bind(this);
    eventBus.on('changePage', this.renderChild);
  }

  renderChild(page: Page): void {
    this.currentPage.destroy();
    this.currentPage = page;
    this.rootElement.append(page.render());
  }

  run(): void {
    router.listen();
    router.navigate();
  }
}

const app = new Application();
app.init();
app.run();
