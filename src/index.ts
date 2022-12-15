import './index.scss';

class Application {
  constructor() {
    console.log('Hello');
  }

  run(): void {
    console.log('world');
  }
}

const app = new Application();
app.run();
