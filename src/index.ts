import './index.scss';
import { Card } from './scripts/components/card/Card';
import { BreadCrumbs } from './scripts/components/breadCrumbs/BreadCrumbs';
import { Webrequest } from './scripts/helpers/WebRequest';
import { ProductResponse } from './types/models/ProductResponse';

class Application {
  protected card: Card;
  protected breadCrumbs: BreadCrumbs;
  constructor() {
    console.log('Hello');
    this.card = new Card();
    this.breadCrumbs = new BreadCrumbs();
  }

  async run(): Promise<void> {
    const data = await Webrequest.get<ProductResponse>('https://dummyjson.com/productsd?limit=100');
    console.log(data);
    console.log('world');
  }
}

const app = new Application();
app.run();
