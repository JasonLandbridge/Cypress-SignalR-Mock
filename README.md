# Cypress-SignalR-Mock

## Features

- Mocks signals from and to the SignalR hub in the back-end!
- No replacement of the Socket object on the window object!
- Multiple hubs can be mocked at the same time!
- Full TypeScript support!

## Install

Install with npm:

```bash
npm install --save-dev cypress-signalr-mock
```

Install with yarn:

```bash
yarn add cypress-signalr-mock --dev
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

## Contributing

## Credits

Shout-out to [cypress-plugin-signalr](https://github.com/basslagter/cypress-plugin-signalr/) for the inspiration and the
methods used. It's unfortunately not maintained anymore, so I decided to make a spiritual successor to it.
