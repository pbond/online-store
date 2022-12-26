export class ElementGenerator {
  public static createElementByinnerHtml(innerHTML: string, className?: string): Element {
    const container = document.createElement('template');
    container.innerHTML = innerHTML;
    if (!container.firstElementChild) {
      throw new Error(`FirstElementChild didn't match any elements.`);
    }
    if (className) {
      container.firstElementChild.className = className;
    }
    return container.firstElementChild;
  }

  public static createElementByName(element: string, className?: string): Element {
    const container = document.createElement(element);
    if (className) {
      container.className = className;
    }
    return container;
  }
}
