/// <reference types="cypress" />

describe("The Coda Collection Searching Section", () => {
  let searchData;
  beforeEach(() => {
    cy.fixture("search-results").then((data) => {
      searchData = data;
    });

    cy.visit("/");
    cy.acceptCookies();
  });

  it("Checks searches results for a specific author", () => {
    // Search for a band, assert the filtering and show all results
    cy.get('[data-testid="searchPreview-container"]')
      .click()
      .then(() => {
        cy.get('[data-testid="searchPreview-input"]')
          .click()
          .type(searchData.bandName);
        cy.wait(225);
        cy.get('[data-testid="searchPreview-artists"]')
          .find("a")
          .should("have.text", searchData.bandName);
        cy.get('[data-testid="searchPreview-seeAll"]')
          .scrollIntoView()
          .should("be.visible")
          .click();
      });

    // Assert that the full search page has the author name
    cy.get('[data-testid="search-modal-input"]').should(
      "have.value",
      searchData.bandName
    );

    cy.get("div")
      .contains(`Showing Results For "${searchData.bandName}"`)
      .should("be.visible");

    // Assert that the categories of this band are showing
    cy.get('[data-testid="searchModal-artists"]')
      .find("h3")
      .should("be.visible")
      .and("have.text", "Artists");

    cy.get('[data-testid="searchModal-collections"]')
      .find("h3")
      .should("be.visible")
      .and("have.text", "Collections");

    cy.get('[data-testid="searchModal-series"]')
      .find("h3")
      .should("be.visible")
      .and("have.text", "Series");

    cy.get('[data-testid="searchModal-videos"]')
      .find("h3")
      .should("be.visible")
      .and("have.text", "Videos");

    cy.get('[data-testid="searchModal-stories"]')
      .find("h3")
      .should("be.visible")
      .and("have.text", "Stories");

    // Check and assert results for each category
    // Check Artists Section
    cy.get("button").contains("Artists").click();
    cy.get("div").find("h2").should("be.visible").and("have.text", "Radiohead");

    // Check Collections Section Results
    cy.get("button").contains("Collections").click();
    for (let i = 0; i < searchData.collections.length; i++) {
      cy.get('[data-testid="collectionTitle"]')
        .find("div")
        .should("be.visible")
        .and("contains.text", searchData.collections[i]);
    }

    // Check Video Section Results
    cy.get("button").contains("Videos").click();
    for (let i = 0; i < searchData.videos.length; i++) {
      cy.get('[data-testid="BaseCell-Title"]')
        .should("be.visible")
        .and("contains.text", searchData.videos[i]);
    }

    cy.get("button").contains("Stories").click();
    for (let i = 0; i < searchData.stories.length; i++) {
      cy.get('[data-testid="BaseCell-Title"]')
        .should("be.visible")
        .and("contains.text", searchData.stories[i]);
    }
  });
});
