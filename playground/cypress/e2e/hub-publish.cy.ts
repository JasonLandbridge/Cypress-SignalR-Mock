describe("cy.hubPublish demo", () => {
  it("Should keep sending progress when cy.hubPublish is sent multiple times", () => {
    cy.visit("http://localhost:3030/");
    // page-load-completed is a data-cy attribute that is added in the layouts/default.vue file
    cy.get('[data-cy="page-load-completed"]', { timeout: 10000 }).then(() => {
      // Mock the usage of a progress bar
      Cypress._.times(11, (i) => {
        cy.hubPublish("demo-hub", "progress", i * 10);
        cy.get('[data-cy="progress-bar"]').should(
          "have.attr",
          "aria-valuenow",
          `${i * 10}`
        );
        cy.wait(500);
      });
    });
  });

  it("Should sending message whith multiple cy.hubPublish parameters", () => {
    cy.visit("http://localhost:3030/");
    cy.get('[data-cy="page-load-completed"]', { timeout: 10000 }).then(() => {
      cy.hubPublish("demo-hub", "message", "info", "Info", "This is an info message");
      cy.wait(500);
      cy.get(".p-toast-message-info").should("exist").and("contain.text", "This is an info message").then(() => {
        cy.hubPublish("demo-hub", "message", "error", "Error", "This is an error message");
        cy.wait(500);
        cy.get(".p-toast-message-error").should("exist").and("contain.text", "This is an error message")
      });
    });
  });
});
