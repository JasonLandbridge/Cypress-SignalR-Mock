/// <reference types="cypress" />
import { vi, test, expect, beforeEach } from "vitest";
import { useCypressSignalRMock } from "../src";

test("Should create a mockHubConnection when Cypress is running", () => {
  vi.stubGlobal("Cypress", {});
  const hubConnection = useCypressSignalRMock("testHub");
  expect(hubConnection).not.toBeNull();
});

test("Should return null when Cypress is not running", () => {
  const hubConnection = useCypressSignalRMock("testHub");
  expect(hubConnection).toBeNull();
});
