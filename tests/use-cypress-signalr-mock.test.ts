import { vi, test, expect, describe } from "vitest";
import { useCypressSignalRMock } from "../src";

describe("Use Cypress SignalR Mock method", () => {
  test("Should create a mockHubConnection when Cypress is running", () => {
    vi.stubGlobal("Cypress", {
      Commands: {
        add: () => {},
      },
    });
    const hubConnection = useCypressSignalRMock("testHub");
    expect(hubConnection).not.toBeNull();
  });

  test("Should return null when Cypress is not running", () => {
    const hubConnection = useCypressSignalRMock("testHub");
    expect(hubConnection).toBeNull();
  });
});
