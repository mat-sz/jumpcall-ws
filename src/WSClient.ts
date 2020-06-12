import { v4 as uuid } from 'uuid';
import WebSocket from 'ws';

import { Client } from './types/Client';

export class WSClient implements Client {
  readonly clientId = uuid();
  readonly firstSeen = new Date();
  lastSeen = new Date();
  networkName: string;

  constructor(private ws: WebSocket) {}

  setNetworkName(networkName: string, networkMessage: (name: string) => void) {
    const previousName = this.networkName;
    this.networkName = networkName;

    if (previousName) {
      networkMessage(previousName);
    }

    if (networkName) {
      networkMessage(networkName);
    }
  }

  send(data: string) {
    if (this.ws.readyState !== 1) {
      return;
    }

    this.ws.send(data);
  }

  get readyState() {
    return this.ws.readyState;
  }

  close() {
    this.ws.close();
  }
}
