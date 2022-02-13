/// <reference types="cypress" />

describe("The Coda Collection Email Subscription", () => {
  let emailData;
  beforeEach(() => {
    cy.fixture("email-data").then((data) => {
      emailData = data;
    });

    cy.visit("/");
    cy.acceptCookies();
  });

  it("Get Subscribed to The Coda Collection List", () => {
    // Check the idle state of email section
    cy.get('[data-testid="FooterEmailSubscriptionForm-label"]')
      .scrollIntoView()
      .should("be.visible")
      .and("have.text", emailData.subscriptionLabel);

    // Check the invalid email validation
    cy.get('[data-testid="FooterEmailSubscriptionForm-text-input"]')
      .type(emailData.invalidEmail)
      .scrollIntoView()
      .blur();

    cy.get('[data-testid="FooterEmailSubscriptionForm-error-message"]')
      .should("be.visible")
      .and("have.text", emailData.errorText);

    // Subscribe with a valid email
    cy.get('[data-testid="FooterEmailSubscriptionForm-text-input"]')
      .clear()
      .type(emailData.validEmail);

    cy.get('[data-testid="FooterEmailSubscriptionForm-submit"]')
      .should("be.enabled")
      .click();

    cy.get('[data-testid="FooterEmailSubscriptionForm-success-message"]')
      .should("be.visible")
      .and("have.text", emailData.confirmationText);

    cy.get('[data-testid="FooterEmailSubscriptionForm-text-input"]').should(
      "be.disabled"
    );
    cy.get('[data-testid="FooterEmailSubscriptionForm-submit"]').should(
      "be.disabled"
    );
  });
});
