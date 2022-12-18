// eslint-disable-next-line @typescript-eslint/ban-types
export type EventCallback = Function;

// export type EventCallback<T> = (params?: T) => void;
// export interface EventCallback {
//   <T extends CallbackArguments>(params?: T): void;
// }

// export interface CallbackArguments {
//   [key: string]: object;
// }

export interface EventsDictionary {
  [key: string]: Array<EventCallback>;
}
