// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add("login", () => {
  cy.forceVisit("https://www.iheart.com/", { failOnStatusCode: false });
  cy.wait(3000);
  cy.get('[data-test="account-icon"]').eq(0).click({ force: true });
  cy.get('[data-test="login-dialog"]').invoke("show");
  cy.get('[data-test="login-dialog"]').should("be.visible");
  cy.get('[data-test="username-input-field"]').type("jun.fernandez@nzme.co.nz");
  cy.get('[data-test="password-input-field"]').type("IRONman01!");
  cy.get('[data-test="login-button"]').click({ force: true });
});

Cypress.Commands.add("forceVisit", (url) => {
  cy.window().then((win) => {
    return win.open(url, "_self");
  });
});

Cypress.Commands.add(
  "iframe",
  { prevSubject: "element" },
  ($iframe, selector) => {
    Cypress.log({
      name: "iframe",
      consoleProps() {
        return {
          iframe: $iframe,
        };
      },
    });
    return new Cypress.Promise((resolve) => {
      resolve($iframe.contents().find(selector));
    });
  }
);
