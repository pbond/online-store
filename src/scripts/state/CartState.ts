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
    this.addToCart = this.addToCart.bind(this);
    this.removeFromCart = this.removeFromCart.bind(this);
    eventBus.on('addProductToCart', this.addToCart);
    eventBus.on('removeProductFromCart', this.removeFromCart);
  }

  addToCart(product: IProduct): void {
    const prod = this.products.find((item) => item.product.id === product.id);
    if (prod) {
      prod.count += 1;
    } else {
      this.products.push({
        product,
        count: 1,
      });
    }
    eventBus.trigger('cartUpdated', this.products);
  }

  removeFromCart(product: IProduct): void {
    const prod = this.products.find((item) => item.product.id === product.id);
    if (prod) {
      prod.count -= 1;
      if (prod.count === 0) {
        this.products = this.products.splice(this.products.indexOf(prod), 1);
      }
    } else {
      console.error("Can't remove product ", product);
    }
    eventBus.trigger('cartUpdated', this.products);
  }
}

const state = new CartState();
state.init();

export default state;
