import { Page } from '../../../types/templates/Page';
import { FilterSidebar } from '../../../scripts/components/filterSidebar/FilterSidebar';
import state from '../../state/State';
//import { ElementGenerator } from '../../helpers/ElementGenerator';
import { ContentContainer } from '../../../scripts/components/contentContainer/ContentContainer';
import './main.scss';

export class Main extends Page {
  private filterSidebar: FilterSidebar;
  private contentContainer: ContentContainer;

  constructor(path?: string) {
    super(path);
    if (state.filter) {
      state.filter.filterQuery = path ?? '';
    }
    this.filterSidebar = new FilterSidebar('aside', 'shop__filters');
    this.contentContainer = new ContentContainer('section', 'shop__content');
  }

  render(): HTMLElement {
    this.container.append(this.filterSidebar.render());
    this.container.append(this.contentContainer.render());
    this.container.classList.add('shop');
    return this.container;
  }

  destroy(): void {
    this.filterSidebar.destroy();
    this.contentContainer.destroy();
    super.destroy();
  }
}
