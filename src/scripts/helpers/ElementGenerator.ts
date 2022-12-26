export class ElementGenerator {
  public static createElementByInnerHtml<T extends Element>(innerHTML: string, className?: string): T {
    const container = document.createElement('template');
    container.innerHTML = innerHTML;
    if (!container.firstElementChild) {
      throw new Error(`FirstElementChild didn't match any elements.`);
    }
    if (className) {
      container.firstElementChild.className = className;
    }
    return container.firstElementChild as T;
  }

  public static createCustomElement<T extends HTMLElement>(tag: string, options: object = {}): T {
    return Object.assign(document.createElement(tag), options) as T;
  }
}
