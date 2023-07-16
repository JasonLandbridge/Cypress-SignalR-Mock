describe("cy.hubPublish demo", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3030/");
  });
  it("Should keep sending progress when cy.hubPublish is sent multiple times", () => {
    // page-load-completed is a data-cy attribute that is added in the layouts/default.vue file
    cy.get('[data-cy="page-load-completed"]').then(() => {
      cy.hubPrintData();
      cy.hubPublish("demo-hub", "tasks", {
        id: "1",
        name: "Task 1",
      });

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
});
