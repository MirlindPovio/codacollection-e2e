/// <reference types="cypress" />

// CI test

describe("The Coda Collection Film Exploration", () => {
  let filmData;
  beforeEach(() => {
    cy.fixture("films-data").then((data) => {
      filmData = data;
    });

    cy.visit("/");
    cy.acceptCookies();
  });

  it("Navigates and explores a film", () => {
    cy.contains("Films").click();
    cy.url().should("eq", `${Cypress.config().baseUrl}/films`);
    cy.get('[placeholder="Search Films"]').type(filmData.filmName);

    // Assert the searched result and click on the film
    cy.get("div").contains(filmData.filmName).should("be.visible").click();

    //Assert that the film cart is showing
    cy.get('[data-testid="videoplayer-video"]').should("be.visible");
    cy.get("h2").contains(filmData.filmName).should("be.visible");

    // Go to the film page
    cy.get('[data-testid="codaButton"]').click();

    // Assert that you are on the film's page
    cy.get('[data-testid="contentHeading-title"]')
      .contains(filmData.filmName)
      .should("be.visible");

    cy.get('[data-testid="contentHeading-artist"]')
      .contains(filmData.bandName)
      .should("be.visible");

    cy.get('[data-testid="videoplayer-previewPlayer"]').should("be.visible");
  });
});
