import './index.scss';
import './bootstrap/bootstrap.ts';
import { IRouter } from './types/router/IRouter';
import router from './scripts/router/Router';
import state from './scripts/state/State';
import { Header } from './scripts/components/header/Header';
import { Footer } from './scripts/components/footer/Footer';

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

    const footer = new Footer();
    document.body.insertAdjacentElement('beforeend', footer.render());
  }
}

const app = new Application();
app.render();
app.run();
