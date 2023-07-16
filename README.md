# Cypress-SignalR-Mock

Easy way to publish messages from and to your SignalR hubs in Cypress E2E tests.

[![npm@latest](https://img.shields.io/npm/v/cypress-signalr-mock?style=for-the-badge&label=npm@latest)](https://www.npmjs.com/package/cypress-signalr-mock)
[![npm](https://img.shields.io/npm/dw/cypress-signalr-mock?style=for-the-badge)](https://www.npmjs.com/package/cypress-signalr-mock)
[![semantic-release: angular](https://img.shields.io/badge/semantic--release-angular-e10079?logo=semantic-release&style=for-the-badge)](https://github.com/semantic-release/semantic-release)

## Table of Contents

- [Features](#features)
- [Compatibility](#compatibility)
- [Install](#install)
- [Usage](#usage)
- [How does it work](#how-does-it-work)
- [Contributing](#contributing)
- [Credits](#credits)

## Features

- Provides Cypress commands to publish and verify messages from and to the SignalR hub!
- Full TypeScript support!
- Multiple hubs can be mocked at the same time!
- Provides mock support for all public HubConnection methods!
- Small footprint, easy install and very human!
- Also works for [Vitest](https://vitest.dev/) unit testing!

## Compatibility

The below are not hard requirements, but the plugin is tested against these versions. It will most likely work with
older versions.

- Cypress 10.0.0 or higher
- SignalR 6.0.0 or higher
- TypeScript 4.0.0 or higher
- RxJS 6.6.0 or higher
- Node 12.0.0 or higher

## Install

Install with npm:

```bash
npm install --save-dev cypress-signalr-mock
```

Install with yarn:

```bash
yarn add cypress-signalr-mock --dev
```

Install with pnpm:

```bash
pnpm add -D cypress-signalr-mock
```

## Usage

```typescript
// 01. Import the plugin to where your signalR connections are created.
import {useCypressSignalRMock} from 'cypress-signalr-mock';

// 02. Call "useCypressSignalRMock" to create a mock for the SignalR hub connection, make sure to give it an unique hub name. 
// It will return null when Cypress is not running, and thus create the real SignalR connection.
const hubConnection = useCypressSignalRMock('testHub') ??
    new HubConnectionBuilder().withUrl(`http://localhost:3000/testhub`).build();

// 03. Activate the plugin in your cypress/support/index.[js/ts] file.
import 'cypress-signalr-mock';

// 04. Use 'hubPublish()' in your E2E tests to publish messages as if it's the server.
cy.hubPublish(
    'testHub', // The name of the hub
    'hello-world', // The name of the message type
    {
        message: 'Hello World!', // The message payload
    },
);

// 05. The listener will receive the message as normal.
hubConnection.on('hello-world', (data) => {
    console.log(data); // { message: 'Hello World!' }
});
```

## `useCypressSignalRMock()` options

- `debug` - Enable debug logging. Default: `false`

```typescript
useCypressSignalRMock("testHub", {
    debug: true,
});
````

- `enableForVitest` - Enable the plugin to also work for vitest unit testing. Default: `false`

```typescript
useCypressSignalRMock("testHub", {
    enableForVitest: true,
});
````

## How does it work

Normally, a plugin like this would replace the `window.WebSocket` object with a mock object.
This is not ideal, as that same `window.WebSocket` object is also used by Cypress itself during runtime.
Instead, the `HubConnection` class from
the [@microsoft/signalr](https://www.npmjs.com/package/@microsoft/signalr) package is mocked with the same signatures,
while replacing the functionality with [Subjects](https://rxjs.dev/api/index/class/Subject)
from [Rx.js](https://rxjs.dev/guide/overview). This mimics the SignalR functionality of sending and receiving messages
from the server, while not interfering in any way with Cypress itself.

## Cypress Commands

### From Server to Client

```ts
/**
 * Simulates a message sent from the Server => Client
 */
cy.hubPublish("hubName", "messageType", {
    value: "messagePayload"
});

// The listener will receive the message as normal.
progressHubConnection.on('hello-world', (data) => {
    console.log(data); // { value: "messagePayload" }
});
```

### From Client to Server

```typescript
/**
 * This command verifies that a specific messageType has been invoked (Client => Server):
 */
cy.hubVerifyInvokes(hubName, messageType, (invokes) => {
    // Do something
    expect(invokes.length).to.equal(5, `${action} not invoked`);
});

```

## Limitations

- Multiple listeners for the same hub name are not supported

```typescript
// This will NOT work
const progressHubConnection1 = useCypressSignalRMock('progress') ??
    new HubConnectionBuilder().withUrl(`http://localhost:3000/progress1`).build();

const progressHubConnection2 = useCypressSignalRMock('progress') ??
    new HubConnectionBuilder().withUrl(`http://localhost:3000/progress2`).build();
```

```typescript
// This will work
const cypressMock = useCypressSignalRMock('progress');
const progressHubConnection1 = cypressMock ??
    new HubConnectionBuilder().withUrl(`http://localhost:3000/progress1`).build();

const progressHubConnection2 = cypressMock ??
    new HubConnectionBuilder().withUrl(`http://localhost:3000/progress2`).build();
```

- The `hubConnection.on` and `hubConnection.stream` cannot have the same message type name.

## Contributing

Any contributions, ideas and feedback are very welcome!

## Credits

Shout-out to [@BassSlagter](https://github.com/basslagter) for his great work on
the [cypress-plugin-signalr](https://github.com/basslagter/cypress-plugin-signalr/) plugin. His work and method was the
major inspiration for Cypress-SignalR-Mock. His plugin is unfortunately not maintained anymore, so I decided to make a
spiritual successor to it.
