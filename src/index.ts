import './index.scss';
import './bootstrap/bootstrap.ts';
import { IRouter } from './types/router/IRouter';
import router from './scripts/router/Router';

class Application {
  private router: IRouter;
  constructor() {
    this.router = router;
  }

  run(): void {
    router.listen();
    router.navigate();
  }
}

const app = new Application();
app.run();
