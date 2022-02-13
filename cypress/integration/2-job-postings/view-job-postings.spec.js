/// <reference types="cypress" />

describe("View Job Postings", () => {
  let jobData;
  beforeEach(() => {
    cy.fixture("job-posting").then((data) => {
      jobData = data;
    });

    cy.visit("/");
    cy.acceptCookies();
  });

  it("Views the QA Engineer Job Posting", () => {
    cy.visit("/");
    cy.get('[data-testid="footerSection"]').scrollIntoView();
    cy.contains("Jobs").click();
    cy.contains(jobData.section).scrollIntoView();
    cy.contains(jobData.jobPostingName).click();

    // Optionally asserted some css values
    cy.get("div")
      .contains(jobData.jobPostingName)
      .should("be.visible")
      .and("have.css", "text-transform", "uppercase")
      .and("have.css", "font-size", "48px");

    cy.get('[data-testid="codaButton"]')
      .find("div")
      .should("contain.text", "Apply Now");
  });
});
