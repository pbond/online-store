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
    this.addItemToCart = this.addItemToCart.bind(this);
    this.removeItemFromCart = this.removeItemFromCart.bind(this);
    this.onStorageUpdated = this.onStorageUpdated.bind(this);

    eventBus.on('addProductToCart', this.addToCart);
    eventBus.on('removeProductFromCart', this.removeFromCart);
    eventBus.on('addProductItem', this.addItemToCart);
    eventBus.on('removeProductItem', this.removeItemFromCart);
    eventBus.on('cartUpdated', this.saveCart);

    window.addEventListener('storage', this.onStorageUpdated);
  }

  addItemToCart(product: IProduct): void {
    const prod = this.products.find((item) => item.product.id === product.id);
    if (prod) {
      prod.count += 1;
      eventBus.trigger('cartUpdated', this.products);
    }
  }

  removeItemFromCart(product: IProduct): void {
    const prod = this.products.find((item) => item.product.id === product.id);
    if (prod) {
      prod.count -= 1;
      if (prod.count === 0) {
        this.products.splice(this.products.indexOf(prod), 1);
      }
      eventBus.trigger('cartUpdated', this.products);
    }
  }

  addToCart(product: IProduct): void {
    this.products.push({ product, count: 1 });
    eventBus.trigger('cartUpdated', this.products);
  }

  removeFromCart(product: IProduct): void {
    const prod = this.products.find((item) => item.product.id === product.id);
    if (prod) {
      this.products.splice(this.products.indexOf(prod), 1);
      eventBus.trigger('cartUpdated', this.products);
    }
  }

  saveCart(): void {
    window.removeEventListener('storage', this.onStorageUpdated);
    localStorage.setItem('cartProducts', JSON.stringify(this.products));
    window.addEventListener('storage', this.onStorageUpdated);
  }

  onStorageUpdated(event: StorageEvent) {
    if (event.newValue !== null) {
      this.products = JSON.parse(event.newValue);
      eventBus.trigger('cartUpdated', this.products);
    }
  }
}

const cartState = new CartState();
cartState.init();

export default cartState;
