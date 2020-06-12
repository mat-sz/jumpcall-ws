import { v4 as uuid } from 'uuid';

import { ClientManager } from '../src/ClientManager';
import { Client } from '../src/types/Client';
import { MessageType, ActionMessageActionType } from '../src/types/MessageType';
import { TargetedMessageModel, ActionMessageModel } from '../src/types/Models';

export class TestClient implements Client {
  readonly clientId = uuid();
  readonly firstSeen = new Date();
  lastSeen = new Date();
  networkName: string;
  lastMessage: string;
  closed = false;
  readyState = 1;

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
    this.lastMessage = data;
  }

  close() {
    this.closed = true;
  }
}

describe('ClientManager', () => {
  it('welcomes the client', async () => {
    const clientManager = new ClientManager();

    const client = new TestClient();
    clientManager.addClient(client);

    expect(JSON.parse(client.lastMessage)).toMatchObject({
      type: MessageType.WELCOME,
      clientId: client.clientId,
    });
  });

  it('pings clients', async () => {
    const clientManager = new ClientManager();

    const client1 = new TestClient();
    clientManager.addClient(client1);

    const client2 = new TestClient();
    clientManager.addClient(client2);

    const client3 = new TestClient();
    clientManager.addClient(client3);

    clientManager.pingClients();

    expect(JSON.parse(client1.lastMessage)).toMatchObject({
      type: MessageType.PING,
    });

    expect(JSON.parse(client2.lastMessage)).toMatchObject({
      type: MessageType.PING,
    });

    expect(JSON.parse(client3.lastMessage)).toMatchObject({
      type: MessageType.PING,
    });
  });

  it('relays messages to target clients', async () => {
    const clientManager = new ClientManager();

    const client1 = new TestClient();
    clientManager.addClient(client1);

    const client2 = new TestClient();
    clientManager.addClient(client2);

    const targetedMessage: ActionMessageModel = {
      type: MessageType.ACTION,
      action: ActionMessageActionType.ACCEPT,
      targetId: client2.clientId,
      callId: 'test',
    };

    clientManager.handleMessage(client1, targetedMessage);

    expect(JSON.parse(client2.lastMessage)).toMatchObject({
      type: MessageType.ACTION,
    });
  });

  it('drops invalid messages', async () => {
    const clientManager = new ClientManager();

    const client1 = new TestClient();
    clientManager.addClient(client1);

    const client2 = new TestClient();
    clientManager.addClient(client2);

    const targetedMessage: TargetedMessageModel = {
      type: MessageType.ACTION,
      targetId: client2.clientId,
    };

    clientManager.handleMessage(client1, targetedMessage);

    expect(JSON.parse(client2.lastMessage)).toMatchObject({
      type: MessageType.WELCOME,
    });
  });
});
