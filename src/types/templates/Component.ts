export abstract class Component {
  protected container: HTMLElement;

  protected elements: Record<string, HTMLElement>;

  protected constructor(tagName: string, className: string) {
    this.container = document.createElement(tagName);
    this.container.className = className;

    this.elements = {};
  }

  render(): HTMLElement {
    return this.container;
  }

  init(): Component {
    return this;
  }

  destroy(): void {
    this.container.remove();
  }
}
