import state from '../../state/State';
import { Page } from '../../../types/templates/Page';
import { CartCard } from '../../components/cardInCart/CartCard';
import { Pagination } from '../../components/pagination/Pagination';

export class Cart extends Page {
  constructor(path?: string) {
    super('section');
    this.path = path ?? '';
  }

  render(): HTMLElement {
    this.container.innerHTML = `
      <div class="container">
        <h2 class="my-2 my-sm-3 my-md-4 offset-md-1 offset-lg-0">
          Products in cart
        </h2>
        <div class="row">
          <div class="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-0">
            <div class="card">
            </div>
          </div>   
          <div class="col-12 col-md-10 offset-md-1 col-lg-4 offset-lg-0 my-3 my-lg-0">
            <div class="card cart_summary">
              <div class="card-header">
                <p class="text-center fw-bold m-0">Cart summary</p>
              </div>
              <div class="card-body">
                <div class="row">
                  <div class="col-6">Products:</div>
                  <div class="col-6 text-end">123456</div>
                </div>
                <div class="row">
                  <div class="col-6">Total price:</div>
                  <div class="col-6 text-end">$123.456</div>
                </div>
                <div class="row my-3">
                  <label for="">
                    <input type="text" class="form-control" placeholder="Enter promo code"/>
                    Test code: "online-store"
                  </label>
                </div>
                <div class="row">
                  <div class="col">
                    <button class="btn btn-outline-success form-control">Buy now</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    const pagination = new Pagination(state.cart.products.length);
    this.container.querySelector('.card')?.append(pagination.render());
    state.cart.products.forEach((cartItem) => {
      const card = new CartCard(cartItem.product, cartItem.count);
      this.container.querySelector('.card')?.append(card.render());
    });
    return this.container;
  }

  destroy() {
    this.container.remove();
  }
}
