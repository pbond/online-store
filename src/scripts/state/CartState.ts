import { ICartProducts } from '../../types/models/ICartProduct';
import { IProduct } from '../../types/models/IProduct';
import eventBus from '../helpers/EventBus';
import { ICartState } from '../../types/models/ICartState';

class CartState implements ICartState {
  products: ICartProducts = [];

  constructor() {
    const cartProducts = localStorage.getItem('cartProducts');
    if (cartProducts !== null) {
      this.products = JSON.parse(cartProducts);
    }
  }

  init() {
    this.addToCart = this.addToCart.bind(this);
    this.removeFromCart = this.removeFromCart.bind(this);
    this.saveCart = this.saveCart.bind(this);
    eventBus.on('addProductToCart', this.addToCart);
    eventBus.on('removeProductFromCart', this.removeFromCart);
    eventBus.on('cartUpdated', this.saveCart);
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

  saveCart(): void {
    localStorage.setItem('cartProducts', JSON.stringify(this.products));
  }
}

const cartState = new CartState();
cartState.init();

export default cartState;
