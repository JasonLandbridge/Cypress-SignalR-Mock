describe("cy.hubPublish demo", () => {
  it("passes", () => {
    cy.visit("http://localhost:3030/");
    // We wait here to ensure the SignalR has had time to be set-up during page-load
    // Normally, we would await page-load before using xy.hubPublish
    cy.wait(1000).then(() => {
      cy.hubPrintData();
      cy.hubPublish("demo-hub", "tasks", {
        id: "1",
        name: "Task 1",
      });
    });
  });
});
