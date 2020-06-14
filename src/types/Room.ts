export interface Room {
  readonly roomId: string;
  readonly roomCode: string;
  readonly created: Date;
  clients: string[];
}
