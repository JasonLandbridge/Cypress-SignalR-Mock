import { vi, test, expect, describe } from "vitest";
import { useCypressSignalRMock, hubPublish } from "../src";

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

  test("Should receive multiple values in SignalR listener when hubPublish() is called with multiple parameters", () => {
    vi.stubGlobal("Cypress", {});

    let value1Result = null;
    let value2Result = null;
    let value3Result = null;
    useCypressSignalRMock("testHub2").on("testMultiple", (value1, value2, value3) => {
      value1Result = value1;
      value2Result = value2;
      value3Result = value3;
    });

    hubPublish("testHub2", "testMultiple", "Hello", "World", "!");
    expect(value1Result).toBe("Hello");
    expect(value2Result).toBe("World");
    expect(value3Result).toBe("!");
  });
 });