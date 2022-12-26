export abstract class Page {
  protected container: HTMLElement;
  protected path: string;

  protected constructor(path?: string) {
    this.container = document.createElement('div');
    this.path = path ?? '';
  }

  render(): HTMLElement {
    this.container.innerHTML = this.path;
    return this.container;
  }

  destroy(): void {
    this.container.remove();
  }
}
