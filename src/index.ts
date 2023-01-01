import './index.scss';
import './bootstrap/bootstrap.ts';
import { IRouter } from './types/router/IRouter';
import router from './scripts/router/Router';
import state from './scripts/state/State';
import { Header } from './scripts/components/header/Header';

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

  render() {
    const header = new Header();
    document.body.insertAdjacentElement('afterbegin', header.render());

    header.init();
  }
}

const app = new Application();
app.render();
app.run();
