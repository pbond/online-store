export interface IRouter {
  navigate: () => void;

  listen: () => void;
  goto: (path: string) => void;

  updateQuery: (query: string) => void;
}
