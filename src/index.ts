import './index.scss';
import './bootstrap/bootstrap.ts';
import { IRouter } from './types/router/IRouter';
import router from './scripts/router/Router';
import { Webrequest } from './scripts/helpers/WebRequest';
import { ProductResponse } from './types/models/ProductResponse';
import { Filter } from './scripts/components/filter/Filter';
import { Product } from './types/models/Product';

class Application {
  private router: IRouter;
  constructor() {
    this.router = router;
  }

  async run(): Promise<void> {
    const result = await Webrequest.get<ProductResponse>('https://dummyjson.com/products?limit=100');
    const filter = new Filter<Product>(
      'div',
      'filter__category',
      'brand',
      result.products,
      result.products.filter((f) => f.id > 50)
    );
    filter.render();
    router.listen();
    router.navigate();
  }
}

const app = new Application();
app.run();
