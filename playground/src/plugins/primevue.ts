import { defineNuxtPlugin } from "#app";
import PrimeVue from "primevue/config";
import Button from "primevue/button";
import ProgressBar from "primevue/progressbar";
import Listbox from "primevue/listbox";
import Toast from "primevue/toast";
import ToastService from 'primevue/toastservice';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(PrimeVue, { ripple: true });
  nuxtApp.vueApp.use(ToastService);
  nuxtApp.vueApp.component("Button", Button);
  nuxtApp.vueApp.component("ProgressBar", ProgressBar);
  nuxtApp.vueApp.component("Listbox", Listbox);
  nuxtApp.vueApp.component("Toast", Toast);
});
