import { eventCallback, eventsDictionary } from '../../types/helpers/IEventBus';

class EventBus {
  private readonly events: eventsDictionary;

  constructor() {
    this.events = {};
  }

  on(name: string, func: eventCallback): void {
    this.events[name] = this.events[name] || [];
    this.events[name].push(func);
  }

  off(name: string, func: eventCallback): void {
    // const idx = this.events[name].indexOf(func);
    // this.events[name] = this.events[name].splice(idx, 1);
    if (name in this.events) {
      this.events[name] = this.events[name].filter((f) => f !== func);
    }
  }

  trigger<T>(name: string, params?: T): void {
    if (name in this.events) {
      for (const func of this.events[name]) {
        func(params);
      }
    }
  }
}

const eventBus = new EventBus();
export default eventBus;
