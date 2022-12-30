import './index.scss';
import './bootstrap/bootstrap.ts';
import { IRouter } from './types/router/IRouter';
import router from './scripts/router/Router';
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
