import './index.scss';
import './bootstrap/bootstrap.ts';
import { IRouter } from './types/router/IRouter';
import router from './scripts/router/Router';
import { Webrequest } from './scripts/helpers/WebRequest';
import { IProductResponse } from './types/models/IProductResponse';
import state from './scripts/state/State';

class Application {
  private router: IRouter;

  constructor() {
    this.router = router;
  }

  async run(): Promise<void> {
    await state.load();
    router.listen();
    router.navigate();
  }
}

const app = new Application();
app.run();
