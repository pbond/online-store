import { ICartProducts } from '../../types/models/ICartProduct';
import { IProduct } from '../../types/models/IProduct';
import eventBus from '../helpers/EventBus';

class CartState {
  products: ICartProducts;

  constructor() {
    const cart = localStorage.getItem('cartProducts');
    if (cart !== null) {
      this.products = JSON.parse(cart);
    } else {
      this.products = [];
    }
  }

  init() {
    eventBus.on('addProductToCart', (product: IProduct) => {
      const prod = this.products.find((item) => item.product.id === product.id);
      if (prod) {
        prod.count += 1;
        return;
      }
      this.products.push({
        product,
        count: 1,
      });
    });
    eventBus.on('removeProductFromCart', (product) => {
      console.log('removeProductFromCart', product);
    });
  }
}

const state = new CartState();
export default state;
