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
    const result = await Webrequest.get<IProductResponse>('https://dummyjson.com/products?limit=100');
    state.products = result.products;
    state.filteredProducts = result.products;
    router.listen();
    router.navigate();
  }
}

const app = new Application();
app.run();
