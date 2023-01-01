import { EventCallback, EventsDictionary } from '../../types/helpers/IEventBus';

type EnentBusType =
  | 'updatefilter'
  | 'cartUpdated'
  | 'addProductToCart'
  | 'removeProductFromCart'
  | 'changeViewMode'
  | 'setFilterButtonVisibility'
  | 'toggleSidebarClass';

class EventBus {
  private readonly events: EventsDictionary;

  constructor() {
    this.events = {};
  }

  on(name: EnentBusType, func: EventCallback): void {
    this.events[name] = this.events[name] || [];
    this.events[name].push(func);
  }

  off(name: EnentBusType, func: EventCallback): void {
    if (name in this.events) {
      this.events[name] = this.events[name].filter((f) => f !== func);
    }
  }

  trigger<T>(name: EnentBusType, params?: T): void {
    if (name in this.events) {
      for (const func of this.events[name]) {
        func(params);
      }
    }
  }
}

const eventBus = new EventBus();
export default eventBus;
