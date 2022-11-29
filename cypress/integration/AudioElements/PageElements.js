class pageElements {
  newsElements = {
    //Desktop view
    mainNavigationMenu: () => cy.get(".navigation__section-link"),
    subNavigationMenu: () => cy.get(".navigation__ticker-link"),
    followPodcastContainer: () => cy.get("[data-test-ui=follow-podcast]"),
    followPodcastButton: () => cy.get("[data-test-ui=follow-podcast-button]"),
    podcastTitle: () => cy.get(".listing__heading"),

    onAirSection: () => cy.get(".onair"),
    onAirShow: () => cy.get(".onair__show"),
    onAirShowImage: () => cy.get(".onair__show-image"),
    onAirShowTitle: () => cy.get(".onair__show-title"),
    onAirShowDescription: () => cy.get(".onair__show-description"),
    onAirShowListen: () => cy.get(".onair__listen"),

    //Mobile view
    mobilePageHeader: () => cy.get(".ts-page-heading"),
    listenLiveMenu: () => cy.get('[data-track-action="listen live"]').eq(1),
    stickyMenu: () => cy.get('[data-test-ui="sticky-menu"]'),
    homeMenuButton: () => cy.get('[data-track-action="link: home"]'),
    showsMenuButton: () => cy.get('[data-track-action="menu: shows"]'),
    podcastMenuButton: () => cy.get('[data-track-action="link: podcasts"]'),
    newsMenuButton: () => cy.get('[data-track-action="link: news"]'),
    menuButton: () => cy.get('[data-track-action="menu"]'),

    mainMenu: () => cy.get(".off-canvas--mobile-menu.left-off-canvas-menu"),
    subMenuCanvasTitle: () =>
      cy.get(".left-submenu.move-right > .off-canvas-title"),
    subMenu: () => cy.get(".off-canvas-links.list--stacked"),
  };

  musicElements = {
    //Desktop view

    regionPicker: () => cy.get('[data-test-ui="region-modal"]'),
    regionPickerBtn: () => cy.get('[data-test-ui="region-radio-option"]'),
    regionDisplayText: () => cy.get('[data-test-ui="region-display-text"]'),

    menuButton: () => cy.get(".menu__btn"),
    subMenuHeader: () => cy.get(".menu__heading-link.js-menu-heading-title"),
    firstLevelMenu: () => cy.get('[data-csref="menu:level1:link"]'),
    secondLevelMenu: () => cy.get('[data-csref="menu:level2:link"]'),

    podcastIframePlayer: () => cy.get(".embed-container > iframe"),
    podcastIframePlayButton: () =>
      cy
        .get(".embed-container > iframe")
        .iframe('body [data-test="play-button"]'),
    podcastIframeTitle: () =>
      cy
        .get(".embed-container > iframe")
        .iframe('body [data-test="widget-sub-heading"]'),

    followPodcastContainer: () => cy.get("[data-test-ui=follow-podcast]"),
    followPodcastButton: () => cy.get("[data-test-ui=follow-podcast-button]"),
    headerLogo: () => cy.get(".header__logo"),
    headingTitle: () => cy.get(".ts-page-heading"),

    iheartYourLibraryButton: () =>
      cy.get('[data-test="your-library-menu"]').eq(1),
    iheartYourPodcastButton: () =>
      cy.get('[data-test="your-library-podcasts-icon"]').eq(1),

    //Mobile view
    menuLink: () => cy.get(".menu__link "),
    bannerTitle: () => cy.get(".banner__title"),

    stickyFooterOnAir: () => cy.get('[data-test-ui="sticky-on-air"]'),
    stickyOnAirListenLive: () => cy.get('[data-track-action="listen live"]'),
    stickyFooterMenu: () => cy.get('[data-test-ui="sticky-menu"]'),
    stickyFooterButtonMenu: () => cy.get('[data-test-ui="sticky-menu-button"]'),
    stickyFooterMenuNews: () => cy.get('[data-track-action="link: news"]'),
    stickyFooterMenuButton: () => cy.get('[data-test-ui="sticky-menu-link"]'),
    stickyOnAirNowPlaying: () =>
      cy.get('[data-test-ui="sticky-on-air-now-playing"]'),
    stickyOnAirFallbackImage: () =>
      cy.get('[data-test-ui="sticky-on-air-fallback-image"]'),
  };

  percySnapshot = {

    desktop: () => {
      cy.title().then((pageTitle) => {
        cy.get('.header__logo-image').invoke('attr', 'title').then((siteTitle) => {
          cy.percySnapshot(`${siteTitle}: ${pageTitle} - Desktop`, {
            widths: [1920],
          });
          cy.log(`${siteTitle}: ${pageTitle} - Desktop`);
        });
      });
    },

    phone: () => {
      cy.title().then((pageTitle) => {
        cy.get('.header__logo-image').invoke('attr', 'title').then((siteTitle) => {
          cy.percySnapshot(`${siteTitle}: ${pageTitle} - Phone`, {
            widths: [375],
          });
          cy.log(`${siteTitle}: ${pageTitle} - Phone`);
        });
      });
    },

    tabletPortrait: () => {
      cy.title().then((pageTitle) => {
        cy.get('.header__logo-image').invoke('attr', 'title').then((siteTitle) => {
          cy.percySnapshot(`${siteTitle}: ${pageTitle} - Tablet portrait`, {
            widths: [768],
          });
          cy.log(`${siteTitle}: ${pageTitle} - Tablet portrait`);
        });
      });
    },

    tabletLandscape: () => {
      cy.title().then((pageTitle) => {
        cy.get('.header__logo-image').invoke('attr', 'title').then((siteTitle) => {
          cy.percySnapshot(`${siteTitle}: ${pageTitle} - Tablet landscape`, {
            widths: [1024],
          });
          cy.log(`${siteTitle}: ${pageTitle} - Tablet landscape`);
        });
      });
    },
  };
}
module.exports = new pageElements();
