import { vi, test, expect, describe } from "vitest";
import { useCypressSignalRMock } from "../src";
import { hubPublish } from "../src/cypress-commands";

describe("cy.hubPublish() method", () => {
  test("Should receive value in SignalR listener when hubPublish() is called", () => {
    vi.stubGlobal("Cypress", {});

    let publishResult = null;
    useCypressSignalRMock("testHub").on("test", (value) => {
      publishResult = value;
    });

    hubPublish("testHub", "test", "Hello World!");
    expect(publishResult).toBe("Hello World!");
  });
});
