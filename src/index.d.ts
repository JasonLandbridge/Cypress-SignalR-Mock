// load type definitions that come with Cypress module
// and then add our new commands to the "cy" object
/// <reference types="cypress" />
declare namespace Cypress {
  interface Chainable {
    signalrPublish(
      hubName: string,
      action: string,
      payload: any
    ): Cypress.Chainable;

    signalrPrintData(): Cypress.Chainable;
  }
}
