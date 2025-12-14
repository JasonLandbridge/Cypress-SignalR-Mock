import { vi, test, expect, describe } from "vitest";
import { useCypressSignalRMock, hubMockInvoke, hubUnmockInvoke } from "../src";

describe("cy.hubMockInvoke() method", () => {
  test("Should return mocked response when Invoke() is called", async () => {
    vi.stubGlobal("Cypress", {});

    const connection = useCypressSignalRMock("testHub");
    hubMockInvoke("testHub", "test", "Hello World!");
    const invokeResult = await connection.invoke("test");

    expect(invokeResult).toBe("Hello World!");
  });
});

describe("cy.hubUnmockInvoke() method", () => {
  test("Should return unmocked response when Invoke() is called", async () => {
    vi.stubGlobal("Cypress", {});

    const connection = useCypressSignalRMock("testHub2");
    hubMockInvoke("testHub2", "test", "Hello World!");
    const invokeResult = await connection.invoke("test");
    const invokeResult2 = await connection.invoke("test");

    
    hubUnmockInvoke("testHub2", "test", "Hello World!");
    const invokeResult3 = await connection.invoke("test");

    expect(invokeResult).toBe("Hello World!");
    expect(invokeResult2).toBe("Hello World!");
    expect(invokeResult3).toBe(0);
  });
});
