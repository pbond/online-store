export class ElementGenerator {
  public static createElementByinnerHtml<T extends Element>(innerHTML: string, className?: string): T {
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

  public static createElementByName<T extends HTMLElement>(element: string, className?: string): T {
    const container = document.createElement(element);
    if (className) {
      container.className = className;
    }
    return container as T;
  }
}
