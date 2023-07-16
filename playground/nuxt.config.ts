import { defineNuxtConfig } from "nuxt/config";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  srcDir: "src",
  css: ["primevue/resources/themes/lara-light-blue/theme.css"],
  build: {
    // "transpile: ["rxjs"]" fixes the error: "[nuxt] [request error] [unhandled] [500] Cannot find module './internal/Observable'"
    // This most likely is only needed when Cypress-SignalR-Mock is referenced via a relative path
    transpile: ["rxjs", "primevue"],
  },
});
