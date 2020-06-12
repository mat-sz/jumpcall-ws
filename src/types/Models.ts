import { MessageType, ActionMessageActionType } from './MessageType';

export interface ClientModel {
  clientId: string;
  clientColor: string;
}

export interface MessageModel {
  type: MessageType;
}

export interface TargetedMessageModel extends MessageModel {
  targetId: string;
}

export interface WelcomeMessageModel extends MessageModel {
  type: MessageType.WELCOME;
  clientId: string;
  rtcConfiguration?: any;
}

export interface NameMessageModel extends MessageModel {
  type: MessageType.NAME;
  networkName: string;
}

export interface CallMessageModel extends TargetedMessageModel {
  type: MessageType.CALL;
  callId: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  clientId?: string;
}

export interface ActionMessageModel extends TargetedMessageModel {
  type: MessageType.ACTION;
  callId: string;
  action: ActionMessageActionType;
  clientId?: string;
}

export interface NetworkMessageModel extends MessageModel {
  type: MessageType.NETWORK;
  clients: ClientModel[];
}

export interface PingMessageModel extends MessageModel {
  type: MessageType.PING;
  timestamp: number;
}

export interface RTCDescriptionMessageModel extends TargetedMessageModel {
  type: MessageType.RTC_DESCRIPTION;
  data: any;
  callId: string;
  clientId?: string;
}

export interface RTCCandidateMessageModel extends TargetedMessageModel {
  type: MessageType.RTC_CANDIDATE;
  data: any;
  callId: string;
  clientId?: string;
}
