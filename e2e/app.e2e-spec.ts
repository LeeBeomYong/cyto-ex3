import { CytoEx03Page } from './app.po';

describe('cyto-ex03 App', () => {
  let page: CytoEx03Page;

  beforeEach(() => {
    page = new CytoEx03Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
