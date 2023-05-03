# Cypress-SignalR-Mock

Mock SignalR hub connections in Cypress E2E tests.

## Features

- Provides Cypress commands to publish and verify messages from and to the SignalR hub!
- No replacement of the Socket object on the window object!
- Multiple hubs can be mocked at the same time!
- Full TypeScript support!
- Provides mock support for all public HubConnection methods!

## Compatibility

The below are not hard requirements, but the plugin is tested against these versions.

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
// 01. Import the plugin to where your signalR connections are created
import {useCypressSignalRMock} from 'cypress-signalr-mock';

// 02. Call "useCypressSignalRMock" to create a mock for the SignalR hub connection
//     or use the real connection if not running in Cypress E2E mode
const progressHubConnection = useCypressSignalRMock('progress') ??
    new HubConnectionBuilder().withUrl(`http://localhost:3000/progress`).build();

// 03. Activate the plugin in your cypress/support/index.js file
import 'cypress-signalr-mock';

// 04. Use the plugin in your tests
cy.signalrPublish(
    'progress', // The name of the hub connection
    'hello-world', // The name of the message type
    {
        message: 'Hello World!', // The message payload
    },
);

```

## How does it work

Uses Rx.js behind the scenes to create an observable that can be subscribed to. The observable is created
when the `createCypressSignalrMock` function is called. The observable is then used to publish messages

## Cypress Commands

### From Server to Client

### From Client to Server

## Limitations

- Multiple listeners for the same message type are not supported

```typescript
// This will not work

```

- The `hubConnection.on` and `hubConnection.stream` cannot have the same message type name.

```typescript
// This will not work

```

## Contributing

## Credits

Shout-out to [cypress-plugin-signalr](https://github.com/basslagter/cypress-plugin-signalr/) for the inspiration and the
methods used. It's unfortunately not maintained anymore, so I decided to make a spiritual successor to it.
