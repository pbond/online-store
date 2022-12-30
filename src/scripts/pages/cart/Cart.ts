import { Page } from '../../../types/templates/Page';
import { CartCard } from '../../components/cardInCart/CartCard';
import state from '../../state/State';

export class Cart extends Page {
  constructor(path?: string) {
    super('section');
    this.path = path ?? '';
  }

  render(): HTMLElement {
    state.cart.forEach((cartItem) => {
      const card = new CartCard(cartItem.product, cartItem.count);
      this.container.append(card.render());
    });
    return this.container;
  }

  destroy() {
    this.container.remove();
  }
}
