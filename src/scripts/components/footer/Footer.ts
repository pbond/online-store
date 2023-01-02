import { Component } from '../../../types/templates/Component';
import './footer.scss';
export class Footer extends Component {
  constructor() {
    super('footer', 'footer');
  }

  render(): HTMLElement {
    this.container.insertAdjacentHTML(
      'afterbegin',
      `
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
          <a href="https://rs.school" class="navbar-brand logo"></a>
          <div class="info">
            <a href="https://github.com/iharant" class="text-white me-3">
              <i class="bi bi-github"></i>
              IharAnt
            </a>
            <a href="https://github.com/pbond" class="text-white">
              <i class="bi bi-github"></i>
              pbond
            </a>
            <p class="copyright text-white text-center m-0 py-2">
              <i class="bi bi-c-circle"></i>
              2022
            </p>
          </div>
        </div>
      </nav>
    `
    );
    return this.container;
  }
}
