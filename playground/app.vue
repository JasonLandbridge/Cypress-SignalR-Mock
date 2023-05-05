<template>
  <div>
    <NuxtWelcome />
  </div>
</template>
<script setup lang="ts">
import { useCypressSignalRMock } from "../src";
import { HubConnectionBuilder } from "@microsoft/signalr";

const connection =
  useCypressSignalRMock("demo-hub") ??
  new HubConnectionBuilder()
    .withUrl(`http://localhost:5000/demo-hub`)
    .withAutomaticReconnect()
    .build();

connection.on("tasks", (message) => {
  console.log(message);
});

console.log("demo-hub signalR has been set-up!");
</script>
