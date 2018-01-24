import { GalleryAppPage } from './app.po';

describe('gallery-app App', () => {
  let page: GalleryAppPage;

  beforeEach(() => {
    page = new GalleryAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
