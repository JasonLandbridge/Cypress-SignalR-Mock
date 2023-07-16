import { vi, test, expect, describe } from "vitest";
import { useCypressSignalRMock, hubPublish } from "../src";

describe("hubPublish() method", () => {
  test("Should receive all values in SignalR listener when hubPublish() is called multiple times", () => {
    // Arrange
    let publishResult: string[] = [];
    const connection = useCypressSignalRMock("testHub", {
      enableForVitest: true,
    });

    connection.on("progress", (value) => {
      publishResult.push(value);
    });

    // Act
    for (let i = 0; i <= 10; i++) {
      hubPublish("testHub", "progress", `${i}%`);
    }

    // Assert
    for (let i = 0; i <= 10; i++) {
      expect(publishResult[i]).toBe(`${i}%`);
    }
  });
});
