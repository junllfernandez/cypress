/// <reference types="cypress" />

import pageElements from "../AudioElements/PageElements";

function formatString(text) {
  return text.replace("\n", "").trim();
}

const urls = Cypress.env("url");

describe("NewstalkZB Functional Tests - Desktop view", () => {
  urls.forEach((url) => {
    describe(`url: ${url}`, () => {
      beforeEach(() => {
        Cypress.on("uncaught:exception", (err, runnable) => {
          // returning false here prevents Cypress from
          // failing the test
          return false;
        });
        cy.visit(url);
        cy.viewport(1920, 1080);
      });

      it("Verify On Air section elements", () => {
        pageElements.newsElements.onAirSection().should("be.visible");
        pageElements.newsElements.onAirShow().should("be.visible");
        pageElements.newsElements.onAirShowImage().should("be.visible");
        pageElements.newsElements.onAirShowTitle().should("be.visible");
        pageElements.newsElements.onAirShowDescription().should("be.visible");
        pageElements.newsElements.onAirShowListen().should("be.visible");
      });

      it("Verify follow podcast buttom for iHeart", () => {
        pageElements.newsElements
          .mainNavigationMenu()
          .contains("On Air")
          .click({ force: true });
        pageElements.newsElements.podcastTitle().eq(0).click();
        cy.get(".contentpart").eq(1).click();
        pageElements.newsElements.followPodcastContainer().should("be.visible");
        pageElements.newsElements.followPodcastButton().should("be.visible");
        cy.get('[data-track-action="follow"]')
          .invoke("attr", "href")
          .as("followLink");
        cy.get("@followLink").then((followLink) => {
          expect(followLink).to.include("?follow=true");
        });
      });
    });
  });
});

describe("NewstalkZB Functional Tests - Mobile view", () => {
  urls.forEach((url) => {
    describe(`url: ${url}`, () => {
      beforeEach(() => {
        Cypress.on("uncaught:exception", (err, runnable) => {
          // returning false here prevents Cypress from
          // failing the test
          return false;
        });
        cy.visit(url);
        cy.viewport("iphone-8");
      });

      it("Verify iHeart link changes when region radio station changes - Auckland", () => {
        pageElements.musicElements.regionDisplayText().click();
        pageElements.musicElements.regionPicker().should("be.visible");

        cy.get("form").contains("Auckland").click({ force: true });
        pageElements.musicElements
          .regionDisplayText()
          .should("contain.text", "Auckland");
        cy.get('[data-track-action="listen live"]')
          .should("have.attr", "href")
          .and(
            "include",
            "https://www.iheart.com/live/Newstalk-ZB-6187/?autoplay=true"
          );
        cy.get(".js-showTitle")
          .invoke("text")
          .then(formatString)
          .as("showTitle");

        cy.request("/umbraco/api/regionalapi/get?region=Auckland").as("akl");

        cy.get("@akl")
          .its("body")
          .its("Show")
          .its("Name")
          .then((akl) => {
            cy.get("@showTitle").then((showTitle) => {
              expect(showTitle).to.contain(akl);
            });
          });
      });

      it("Verify iHeart link changes when region radio station changes - Wellington", () => {
        pageElements.musicElements.regionDisplayText().click();
        pageElements.musicElements.regionPicker().should("be.visible");

        cy.get("form").contains("Wellington").click({ force: true });
        pageElements.musicElements
          .regionDisplayText()
          .should("contain.text", "Wellington");
        cy.get('[data-track-action="listen live"]')
          .should("have.attr", "href")
          .and(
            "include",
            "http://www.iheart.com/live/Newstalk-ZB-Wellington-6188/?autoplay=true"
          );
        cy.get(".js-showTitle")
          .invoke("text")
          .then(formatString)
          .as("showTitle");

        cy.request("/umbraco/api/regionalapi/get?region=Wellington").as("wlg");

        cy.get("@wlg")
          .its("body")
          .its("Show")
          .its("Name")
          .then((wlg) => {
            cy.get("@showTitle").then((showTitle) => {
              expect(showTitle).to.contain(wlg);
            });
          });
      });

      it("Verify iHeart link changes when region radio station changes - Christchurch", () => {
        pageElements.musicElements.regionDisplayText().click();
        pageElements.musicElements.regionPicker().should("be.visible");

        cy.get("form").contains("Christchurch").click({ force: true });
        pageElements.musicElements
          .regionDisplayText()
          .should("contain.text", "Christchurch");
        cy.get('[data-track-action="listen live"]')
          .should("have.attr", "href")
          .and(
            "include",
            "http://www.iheart.com/live/Newstalk-ZB-Christchurch-6189/?autoplay=true"
          );
        cy.get(".js-showTitle")
          .invoke("text")
          .then(formatString)
          .as("showTitle");

        cy.request("/umbraco/api/regionalapi/get?region=Christchurch").as(
          "chc"
        );

        cy.get("@chc")
          .its("body")
          .its("Show")
          .its("Name")
          .then((chc) => {
            cy.get("@showTitle").then((showTitle) => {
              expect(showTitle).to.contain(chc);
            });
          });
      });

      it("Assert sticky footer menu and buttons are displayed", () => {
        pageElements.newsElements.listenLiveMenu().should("be.visible");
        cy.log("Listen live menu is displayed");
        pageElements.newsElements.stickyMenu().should("be.visible");
        cy.log("Sticky footer menu is displayed");
        pageElements.musicElements
          .stickyFooterMenuButton()
          .contains("Home")
          .should("be.visible");
        cy.log("Home button is displayed");
        pageElements.musicElements
          .stickyFooterMenuButton()
          .contains("Shows")
          .should("be.visible");
        cy.log("Shows button is displayed");
        pageElements.musicElements
          .stickyFooterMenuButton()
          .contains("Podcast")
          .should("be.visible");
        cy.log("Podcast menu is displayed");
        pageElements.musicElements
          .stickyFooterMenuButton()
          .contains("News")
          .should("be.visible");
        cy.log("News button is displayed");
        pageElements.musicElements
          .stickyFooterButtonMenu()
          .should("be.visible");
        cy.log("Menu button is displayed");
      });

      it("Footer menu click Menu button", () => {
        pageElements.newsElements.menuButton().click();
        pageElements.newsElements.mainMenu().should("be.visible");
      });

      it("Footer menu click Shows button", () => {
        pageElements.musicElements
          .stickyFooterMenuButton()
          .contains("Shows")
          .click();

        cy.get("body").then(($body) => {
          if (
            $body.find(".off-canvas--mobile-menu.left-off-canvas-menu").length >
            0
          ) {
            pageElements.newsElements
              .subMenu()
              .contains("All On Air")
              .click({ force: true });
            pageElements.newsElements
              .mobilePageHeader()
              .should("have.text", "On Air Schedule")
              .should("be.visible");
          } else {
            pageElements.newsElements
              .mobilePageHeader()
              .should("have.text", "On Air Schedule")
              .should("be.visible");
          }
        });
      });

      it("Footer menu click Podcast button", () => {
        pageElements.musicElements
          .stickyFooterMenuButton()
          .contains("Podcast")
          .click();
        cy.get("body").then(($body) => {
          if (
            $body.find(".off-canvas--mobile-menu.left-off-canvas-menu").length >
            0
          ) {
            pageElements.newsElements
              .subMenu()
              .contains("All Podcasts")
              .click({ force: true });
            pageElements.newsElements
              .mobilePageHeader()
              .should("have.text", "Podcasts")
              .should("be.visible");
          } else {
            pageElements.newsElements
              .mobilePageHeader()
              .should("have.text", "Podcasts")
              .should("be.visible");
          }
        });
      });

      it("Footer menu click News button", () => {
        pageElements.musicElements
          .stickyFooterMenuButton()
          .contains("News")
          .click();
        pageElements.newsElements
          .mobilePageHeader()
          .should("have.text", "News")
          .should("be.visible");
      });
    });
  });
});

describe("NewstalkZB Functional Percy - Desktop view", () => {
    urls.forEach((url) => {
        describe(`url: ${url}`, () => {
            beforeEach(() => {
                Cypress.on("uncaught:exception", (err, runnable) => {
                    // returning false here prevents Cypress from
                    // failing the test
                    return false;
                });
                cy.visit(url);
                cy.viewport(1920, 1080)
            });

            it("Grab screenshot of NewstalkZB main page", () => {
                cy.get(".header-main__logo").click({ force: true });
                cy.log("NewstalkZB main page");
                cy.percySnapshot('NewstalkZB main page', {
                    widths: [1920],
                });
            });

            it("Grab screenshot of NewstalkZB on air page", () => {
                pageElements.newsElements
                    .mainNavigationMenu()
                    .contains("On Air")
                    .click({ force: true });
                cy.log("NewstalkZB on air page");
                cy.percySnapshot('NewstalkZB on air page', {
                    widths: [1920],
                });
            });

            it("Grab screenshot of NewstalkZB on demand page", () => {
                pageElements.newsElements
                    .mainNavigationMenu()
                    .contains("On Demand")
                    .click({ force: true });
                cy.log("NewstalkZB on demand page");
                cy.percySnapshot('NewstalkZB on demand page', {
                    widths: [1920],
                });
            });

            it("Grab screenshot of NewstalkZB opinion page", () => {
                pageElements.newsElements
                    .mainNavigationMenu()
                    .contains("Opinion")
                    .click({ force: true });
                cy.log("NewstalkZB opinion page");
                cy.percySnapshot('NewstalkZB opinion page', {
                    widths: [1920],
                });
            });
        });
    });
});

describe("NewstalkZB Functional Percy - Mobile view", () => {
    urls.forEach((url) => {
        describe(`url: ${url}`, () => {
            beforeEach(() => {
                Cypress.on("uncaught:exception", (err, runnable) => {
                    // returning false here prevents Cypress from
                    // failing the test
                    return false;
                });
                cy.visit(url);
                cy.viewport("iphone-8");
                cy.wait(2000);
            });

            it("Grab screenshot of NewstalkZB main page - Mobile", () => {
                cy.log("NewstalkZB main page");
                cy.percySnapshot("NewstalkZB main page - Mobile", {
                    widths: [375],
                });
            });

            it("Grab screenshot of NewstalkZB on air page", () => {
                pageElements.newsElements
                    .mainNavigationMenu()
                    .contains("On Air")
                    .click({ force: true });
                cy.log("NewstalkZB on air page");
                cy.percySnapshot("NewstalkZB on air page - Mobile", {
                    widths: [375],
                });

                it("Grab screenshot of NewstalkZB on demand page", () => {
                    pageElements.newsElements
                        .mainNavigationMenu()
                        .contains("On Demand")
                        .click({ force: true });
                    cy.log("NewstalkZB on demand page");
                    cy.percySnapshot("NewstalkZB on demand page - Mobile", {
                        widths: [375],
                    });

                    it("Grab screenshot of NewstalkZB opinion page", () => {
                        pageElements.newsElements
                            .mainNavigationMenu()
                            .contains("Opinion")
                            .click({ force: true });
                        cy.log("NewstalkZB opinion page");
                        cy.percySnapshot("NewstalkZB opinion page - Mobile", {
                            widths: [375],
                        });
                    });
                });
            });
        });
    });
});