<template>
  <div>
    <Toast/>
    <h2>Loading something from the back-end</h2>
    <ProgressBar data-cy="progress-bar" :value="progressValue" />
  </div>
</template>

<script setup lang="ts">
import { useCypressSignalRMock } from "../../../src";
import { HubConnectionBuilder } from "@microsoft/signalr";
import { onMounted, ref } from "vue";
import Log from "consola";
import { useToast } from "primevue/usetoast";

const toast = useToast();
const progressValue = ref(0);

onMounted(() => {
  const connection =
    useCypressSignalRMock("demo-hub") ??
    new HubConnectionBuilder()
      .withUrl(`http://localhost:5050/demo-hub`)
      .withAutomaticReconnect()
      .build();

  // On start connection
  connection.start().then(() => {
    Log.info("Connected to demo-hub signalR!");
  });

  // On every update
  connection.on("progress", (value) => {
    progressValue.value = value;
  });

  connection.on("message", (severity, summary, detail) => {
    toast.add({severity: severity, summary: summary, detail: detail});
  });
});

console.log("demo-hub signalR has been set-up!");
</script>
