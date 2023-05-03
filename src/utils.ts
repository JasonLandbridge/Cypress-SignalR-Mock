export function isCypressRunning(): boolean {
  return window.hasOwnProperty("Cypress");
}
