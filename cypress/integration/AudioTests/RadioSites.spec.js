/// <reference types="cypress" />

import pageElements from "../AudioElements/PageElements";

function formatString(text) {
  return text.replace("\n", "").trim();
}

describe("Radio sites tests - Mobile view", () => {
        
        const url = Cypress.env("url");
        const podcast = Cypress.env("podcast");
        const shows = Cypress.env("shows");
        const win = Cypress.env("win");
        const latest = Cypress.env("latest");

                beforeEach(() => {
                    Cypress.on("uncaught:exception", (err, runnable) => {
                        // returning false here prevents Cypress from
                        // failing the test
                        return false;
                    });
                    cy.viewport("iphone-8");
                    //cy.visit(url);

                    cy.get("body").then(($body) => {
                        if ($body.find('[data-test-ui="region-modal"]').length > 0) {
                            cy.get("form").contains("Auckland").click({ force: true });
                            pageElements.musicElements
                                .regionDisplayText()
                                .should("contain.text", "Auckland");
                        }
                    });
                });

                it("Navigate to Podcasts page", () => {
                    cy.visit(url + podcast);
                    cy.title().as("title");
                    pageElements.musicElements
                        .headingTitle()
                        .should("contain.text", "Podcast");
                    pageElements.percySnapshot.phone();
                });

                it("Verifies that correct podcast is playing", () => {

                    cy.visit(url + podcast);
                    cy.title().as("title");
                    pageElements.musicElements
                        .headingTitle()
                        .should("contain.text", "Podcast");

                    pageElements.musicElements
                        .headingTitle()
                        .should("contain.text", "Podcast");

                    cy.get(
                        '[data-csref="listing:item:tier1"][style="position: absolute; left: 0px; top: 0px;"] > .pod > .block-link__overlay-link'
                    )
                        .eq(0)
                        .click({ force: true });

                    cy.get(".media > iframe").should("be.visible");
                    cy.get(".media > iframe")
                        .iframe('body [data-test="play-button"]')
                        .should("be.visible");

                    cy.intercept(
                        "POST",
                        "https://nz.api.iheart.com/api/v2/playback/streams"
                    ).as("currentEpisode");

                    cy.get(".media > iframe")
                        .iframe('body [data-test="play-button"]')
                        .click({ force: true });

                    cy.wait("@currentEpisode", { timeout: 15000 }).should(
                        ({ request, response }) => {
                        expect(response.statusCode).be.approximately(200, 4);
                        }
                    );

                });

                it("Navigate to Shows page", () => {
                    cy.visit(url + shows);
                    cy.title().as("title");
                    pageElements.musicElements
                        .headingTitle()
                        .should("contain.text", "Shows");
                    pageElements.percySnapshot.phone();
                });

                it("Navigate to Win page", () => {
                    cy.visit(url + win);
                    cy.title().as("title");
                    cy.get(".ts-page-heading")
                        .invoke("text")
                        .then(text => {
                            expect(['Win', '#WINNING']).to.include(text)});
                    pageElements.percySnapshot.phone();
                });

                it("Navigate to The Latest page", () => {
                    cy.visit(url + latest);
                    cy.title().as("title");
                    pageElements.musicElements
                        .bannerTitle()
                        .eq(0)
                        .should("contain.text", "Latest");
                    pageElements.percySnapshot.phone();
                });

                it("Sticky footer - Phone", () => {
                    //cy.visit(url);
                    cy.log("Music site main page - Phone");
                    pageElements.musicElements.stickyFooterOnAir().should("be.visible");
                    pageElements.musicElements.stickyOnAirListenLive().should("be.visible");
                    pageElements.musicElements.stickyFooterMenu().should("be.visible");
                    pageElements.musicElements
                        .stickyFooterMenuButton()
                        .contains("Home")
                        .should("be.visible");
                    pageElements.musicElements
                        .stickyFooterButtonMenu()
                        .should("be.visible");
                    pageElements.musicElements
                        .headerLogo()
                        .should("have.css", "height")
                        .and("eq", "50px");
                });

                it("Sticky footer - Tablet portrait", () => {
                    cy.visit(url);
                    cy.viewport(768, 1024);
                    cy.log("Music site main page - Tablet portrait");
                    pageElements.musicElements.stickyFooterOnAir().should("not.be.true");
                    pageElements.musicElements
                        .stickyOnAirListenLive()
                        .should("not.be.visible");
                    pageElements.musicElements.stickyFooterMenu().should("not.be.visible");
                    pageElements.musicElements
                        .stickyFooterMenuButton()
                        .contains("Home")
                        .should("not.be.visible");
                    pageElements.musicElements
                        .stickyFooterButtonMenu()
                        .should("not.be.visible");
                    pageElements.musicElements
                        .headerLogo()
                        .should("have.css", "height")
                        .and("eq", "80px");
                });

                it("Sticky footer - Tablet landscape", () => {
                    cy.visit(url);
                    cy.viewport(1024, 1024);
                    cy.log("Music site main page - Tablet landscape");
                    pageElements.musicElements.stickyFooterOnAir().should("not.be.true");
                    pageElements.musicElements
                        .stickyOnAirListenLive()
                        .should("not.be.visible");
                    pageElements.musicElements.stickyFooterMenu().should("not.be.visible");
                    pageElements.musicElements
                        .stickyFooterMenuButton()
                        .contains("Home")
                        .should("not.be.visible");
                    pageElements.musicElements
                        .stickyFooterButtonMenu()
                        .should("not.be.visible");
                    pageElements.musicElements
                        .headerLogo()
                        .should("have.css", "height")
                        .and("eq", "130px");
                });
});

describe("Radio sites tests - Desktop view", () => {

    const url = Cypress.env("url");
    const podcast = Cypress.env("podcast");
    const shows = Cypress.env("shows");
    const win = Cypress.env("win");
    const latest = Cypress.env("latest");
  
    beforeEach(() => {
        Cypress.on("uncaught:exception", (err, runnable) => {
            // returning false here prevents Cypress from
            // failing the test
            return false;
        });
        cy.visit(url);
        cy.viewport(1920, 1000);
        cy.get("body").then(($body) => {
            if ($body.find('[data-test-ui="region-modal"]').length > 0) {
            cy.get("form").contains("Auckland").click({ force: true });
            pageElements.musicElements
                .regionDisplayText()
                .should("contain.text", "Auckland");
            }
        });
    });

    it("Music site main page - Desktop: Should not have sticky footer", () => {
    cy.viewport(1831, 1080);
    cy.log("Music site main page - Desktop");
    pageElements.musicElements.stickyFooterOnAir().should("not.be.true");
    pageElements.musicElements
        .stickyOnAirListenLive()
        .should("not.be.visible");
    pageElements.musicElements.stickyFooterMenu().should("not.be.visible");
    pageElements.musicElements
        .stickyFooterMenuButton()
        .contains("Home")
        .should("not.be.visible");
    pageElements.musicElements
        .stickyFooterButtonMenu()
        .should("not.be.visible");
    pageElements.musicElements
        .headerLogo()
        .should("have.css", "height")
        .and("eq", "140px");
    });

    it("Navigate to Podcasts page", () => {
        cy.visit(url + podcast);
        cy.title().as("title");
        pageElements.musicElements
            .headingTitle()
            .should("contain.text", "Podcast");
        pageElements.percySnapshot.desktop();
    });

    it("Navigate to Shows page", () => {
        cy.visit(url + shows);
        cy.title().as("title");
        pageElements.musicElements
            .headingTitle()
            .should("contain.text", "Shows");
        pageElements.percySnapshot.desktop();
    });

    it("Navigate to Win page", () => {
        cy.visit(url + win);
        cy.title().as("title");
        pageElements.musicElements
            .headingTitle()
            .should("contain.text", "Win");
        pageElements.percySnapshot.desktop();
    });

    it("Navigate to The Latest page", () => {
        cy.visit(url + latest);
        cy.title().as("title");
        pageElements.musicElements
            .bannerTitle()
            .eq(0)
            .should("contain.text", "Latest");
        pageElements.percySnapshot.desktop();
    });

});

describe("Radio sites tests - Percy Screenshots for different viewports", () => {

    const url = Cypress.env("url");
    const podcast = Cypress.env("podcast");
    const shows = Cypress.env("shows");
    const win = Cypress.env("win");
    const latest = Cypress.env("latest");

    beforeEach(() => {
    Cypress.on("uncaught:exception", (err, runnable) => {
        // returning false here prevents Cypress from
        // failing the test
        return false;
    });
    cy.visit(url);
    cy.title().as("title");
    cy.get("body").then(($body) => {
        if ($body.find('[data-test-ui="region-modal"]').length > 0) {
        cy.get("form").contains("Auckland").click({ force: true });
        pageElements.musicElements
            .regionDisplayText()
            .should("contain.text", "Auckland");
        }
    });
    });

    it(`${url}: Grab screenshot of Music site main page - Phone`, function () {
    cy.viewport("iphone-8").wait(5000);
    cy.log("Music site main page - Phone");
    pageElements.percySnapshot.phone();
    });

    it(`${url}: Grab screenshot of Music site main page - Tablet portrait`, () => {
    cy.viewport(768, 1024).wait(5000);
    cy.log("Music site main page - Tablet");
    pageElements.percySnapshot.tabletPortrait();
    });

    it(`${url}: Grab screenshot of Music site main page - Tablet landscape`, () => {
    cy.viewport(1024, 1024).wait(5000);
    cy.log("Music site main page - Tablet");
    pageElements.percySnapshot.tabletLandscape();
    });

    it(`${url}: Grab screenshot of Music site main page - Desktop`, () => {
    cy.viewport(1920, 1080).wait(5000);
    cy.log("Music site main page - Desktop");
    pageElements.percySnapshot.desktop();
    });

});

describe.skip("Check mobile footer details for different show scenarios", () => {

    const url = Cypress.env("url");
    const image = Cypress.env("image");
    const name = Cypress.env("name");
    const slogan = Cypress.env("slogan");

    //const id = Cypress.env("id");

    const onAir = require('../../fixtures/onAir.json')

    beforeEach(() => {
      Cypress.on("uncaught:exception", (err, runnable) => {
        // returning false here prevents Cypress from
        // failing the test
        return false;
      });
    });

    it(`Check mobile footer default positioners - url: ${url}`, () => {
        cy.intercept(`**/webapi/onair/music/data?regionName=**`)
            .as("currentShow");
      describe(`url: ${url}`, () => {
        cy.visit(url);
        cy.viewport(767, 1000);
        cy.get("body").then(($body) => {
          if ($body.find('[data-test-ui="region-modal"]').length > 0) {
            cy.get("form").contains("Auckland").click({ force: true });
            pageElements.musicElements
              .regionDisplayText()
              .should("contain.text", "Auckland");
          }
        });


        cy.wait("@currentShow", { timeout: 15000 }).should(
            ({ request, response }) => {

                expect(response.statusCode).be.approximately(200, 4);
                expect(response.body).to.include(image);
                expect(response.body).to.include(name);
                expect(response.body).to.include(slogan);
          }
        );

        pageElements.musicElements
          .stickyOnAirNowPlaying()
          .should("have.attr", "style", "--animate-marquee-offset:0;");
        pageElements.musicElements
          .stickyOnAirFallbackImage()
          .should("not.have.css", "display", "block");
      });
    });

    it("Check mobile footer when no show is available", () => {
        cy.intercept(`**/webapi/onair/music/data?regionName=**`, {
            fixture: "shows/emptyshow.json",
        }).as("currentShow");
        describe(`url: ${url}`, () => {
            cy.visit(url);
            cy.viewport(767, 1000);
            cy.get("body").then(($body) => {
                if ($body.find('[data-test-ui="region-modal"]').length > 0) {
                    cy.get("form").contains("Auckland").click({ force: true });
                    pageElements.musicElements
                        .regionDisplayText()
                        .should("contain.text", "Auckland");
                }
            });
            cy.wait("@currentShow", { timeout: 15000 }).should(
                ({ request, response }) => {
                    expect(response.statusCode).be.approximately(200, 4);
                }
            );

            pageElements.musicElements
                .stickyOnAirNowPlaying()
                .should("have.attr", "style", "--animate-marquee-offset:0;");
            pageElements.musicElements
                .stickyOnAirFallbackImage()
                .should("have.css", "display", "block");
        });
    });

    it("Check mobile footer when show is available but with image", () => {
      cy.intercept(`**/webapi/onair/music/data?regionName=**`, {
        fixture: "shows/showavailablewithimage.json",
      }).as("currentShow");
      describe(`url: ${url}`, () => {
        cy.visit(url);
        cy.viewport(767, 1000);
        cy.get("body").then(($body) => {
          if ($body.find('[data-test-ui="region-modal"]').length > 0) {
            cy.get("form").contains("Auckland").click({ force: true });
            pageElements.musicElements
              .regionDisplayText()
              .should("contain.text", "Auckland");
          }
        });
        cy.wait("@currentShow", { timeout: 15000 }).should(
          ({ request, response }) => {
            expect(response.statusCode).be.approximately(200, 4);
          }
        );

        pageElements.musicElements
          .stickyOnAirNowPlaying()
          .should("have.attr", "style", "--animate-marquee-offset:0;");
        pageElements.musicElements
          .stickyOnAirFallbackImage()
          .should("not.have.css", "display", "block");
      });
    });

    it("Check mobile footer when show is available without image", () => {
      cy.intercept(`**/webapi/onair/music/data?regionName=**`, {
        fixture: "shows/showavailablenoimage.json",
      }).as("currentShow");
      describe(`url: ${url}`, () => {
        cy.visit(url);
        cy.viewport(767, 1000);
        cy.get("body").then(($body) => {
          if ($body.find('[data-test-ui="region-modal"]').length > 0) {
            cy.get("form").contains("Auckland").click({ force: true });
            pageElements.musicElements
              .regionDisplayText()
              .should("contain.text", "Auckland");
          }
        });
        cy.wait("@currentShow", { timeout: 15000 }).should(
          ({ request, response }) => {
            expect(response.statusCode).be.approximately(200, 4);
          }
        );

        pageElements.musicElements
          .stickyOnAirNowPlaying()
          .should("have.attr", "style", "--animate-marquee-offset:0;");
        pageElements.musicElements
          .stickyOnAirFallbackImage()
          .should("have.css", "display", "block");
      });
    });

    it("Check mobile footer when show is available with very long name", () => {
      cy.intercept(`**/webapi/onair/music/data?regionName=**`, {
        fixture: "shows/longname.json",
      }).as("currentShow");
      describe(`url: ${url}`, () => {
        cy.visit(url);
        cy.viewport(767, 1000);
        cy.get("body").then(($body) => {
          if ($body.find('[data-test-ui="region-modal"]').length > 0) {
            cy.get("form").contains("Auckland").click({ force: true });
            pageElements.musicElements
              .regionDisplayText()
              .should("contain.text", "Auckland");
          }
        });
        cy.wait("@currentShow", { timeout: 15000 }).should(
          ({ request, response }) => {
            expect(response.statusCode).be.approximately(200, 4);
          }
        );

        pageElements.musicElements
          .stickyOnAirNowPlaying()
          .should("not.have.attr", "style", "--animate-marquee-offset:0;");
        pageElements.musicElements
          .stickyOnAirFallbackImage()
          .should("have.css", "animation");
      });
    });

    it("Check mobile footer when show is available with very long name - The Hits", () => {
      describe(`url: ${url}`, () => {
        cy.visit(url);
        cy.viewport(767, 1000);
        cy.get("body").then(($body) => {
          if ($body.find('[data-test-ui="region-modal"]').length > 0) {
            cy.log("This is The Hits website");
            cy.get("form").contains("Auckland").click({ force: true });
            pageElements.musicElements
              .regionDisplayText()
              .should("contain.text", "Auckland");

            pageElements.musicElements
              .regionDisplayText()
              .should("contain.text", "Auckland");
            cy.get('[data-track-action="listen live"]')
              .should("have.attr", "href")
              .and("include", "Auckland");

            pageElements.musicElements.regionDisplayText().eq(0).click();
            pageElements.musicElements.regionPicker().should("be.visible");

            cy.get("form").contains("Wellington").click({ force: true });
            pageElements.musicElements
              .regionDisplayText()
              .should("contain.text", "Wellington");
            cy.get('[data-track-action="listen live"]')
              .should("have.attr", "href")
              .and("include", "Wellington");

            pageElements.musicElements.regionDisplayText().eq(0).click();
            pageElements.musicElements.regionPicker().should("be.visible");

            cy.get("form").contains("Christchurch").click({ force: true });
            pageElements.musicElements
              .regionDisplayText()
              .should("contain.text", "Christchurch");
            cy.get('[data-track-action="listen live"]')
              .should("have.attr", "href")
              .and("include", "Christchurch");
          } else {
            cy.log("This is NOT The Hits website");
          }
        });
      });
    });
});
