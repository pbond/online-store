export abstract class Page {
  protected element: HTMLElement;
  protected path: string;

  protected constructor(path?: string) {
    this.element = this.render();
    this.path = path ?? '';
  }

  render(): HTMLElement {
    this.element = document.createElement('div');
    this.element.innerHTML = this.path;
    return this.element;
  }

  destroy(): void {
    this.element.remove();
  }
}
