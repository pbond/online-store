import './index.scss';
import { Card } from './scripts/components/card/Card';
import { BreadCrumbs } from './scripts/components/breadCrumbs/BreadCrumbs';

class Application {
  protected card: Card;
  protected breadCrumbs: BreadCrumbs;
  constructor() {
    console.log('Hello');
    this.card = new Card();
    this.breadCrumbs = new BreadCrumbs();
  }

  run(): void {
    console.log('world');
  }
}

const app = new Application();
app.run();
