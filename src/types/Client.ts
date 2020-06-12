export interface Client {
  readonly clientId: string;
  readonly firstSeen: Date;
  lastSeen: Date;
  networkName: string;
  readonly readyState: number;

  setNetworkName(
    networkName: string,
    networkMessage: (name: string) => void
  ): void;
  send(data: string): void;
  close(): void;
}
