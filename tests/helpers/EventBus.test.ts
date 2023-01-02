import eventBus from '../../src/scripts/helpers/EventBus';
import { EventCallback } from '../../src/types/helpers/IEventBus';

describe('EventBus tests', () => {
  // const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  it('should add and call callback', () => {
    let data: Array<number> = [];
    const multiplier: EventCallback = (nums: Array<number>): void => {
      data = nums.map((n) => n * n);
    };

    eventBus.on('toggleSidebarClass', multiplier);
    eventBus.trigger<Array<number>>('toggleSidebarClass', [1, 2, 3]);
    expect(data).toStrictEqual([1, 4, 9]);
  });

  it('should remove callback', () => {
    let data: Array<number> = [];
    const multiplier: EventCallback = (nums: Array<number>): void => {
      data = nums.map((n) => n * n);
    };

    eventBus.on('toggleSidebarClass', multiplier);
    eventBus.trigger('toggleSidebarClass', [1, 2, 3]);
    expect(data).toStrictEqual([1, 4, 9]);

    eventBus.off('toggleSidebarClass', multiplier);
    eventBus.trigger('toggleSidebarClass', [2, 3, 4]);
    expect(data).toStrictEqual([1, 4, 9]); //value from previous call
  });
});
