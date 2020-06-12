import {
  MessageModel,
  NameMessageModel,
  CallMessageModel,
  ActionMessageModel,
  RTCDescriptionMessageModel,
  RTCCandidateMessageModel,
} from './Models';
import { MessageType, ActionMessageActionType } from './MessageType';

export function isMessageModel(message: any): message is MessageModel {
  return message && 'type' in message && typeof message['type'] === 'string';
}

export function isNameMessageModel(
  message: MessageModel
): message is NameMessageModel {
  return (
    message.type === MessageType.NAME &&
    'networkName' in message &&
    typeof message['networkName'] === 'string'
  );
}

export function isCallMessageModel(
  message: MessageModel
): message is CallMessageModel {
  return (
    message.type === MessageType.CALL &&
    'callId' in message &&
    typeof message['callId'] === 'string' &&
    'fileName' in message &&
    typeof message['fileName'] === 'string' &&
    'fileSize' in message &&
    typeof message['fileSize'] === 'number' &&
    'fileType' in message &&
    typeof message['fileType'] === 'string' &&
    'targetId' in message &&
    typeof message['targetId'] === 'string'
  );
}

export function isActionMessageModel(
  message: MessageModel
): message is ActionMessageModel {
  return (
    message.type === MessageType.ACTION &&
    'callId' in message &&
    typeof message['callId'] === 'string' &&
    'action' in message &&
    typeof message['action'] === 'string' &&
    'targetId' in message &&
    typeof message['targetId'] === 'string' &&
    Object.values(ActionMessageActionType).includes(message['action'])
  );
}

export function isRTCDescriptionMessageModel(
  message: MessageModel
): message is RTCDescriptionMessageModel {
  return (
    message.type === MessageType.RTC_DESCRIPTION &&
    'data' in message &&
    typeof message['data'] === 'object' &&
    'type' in message['data'] &&
    typeof message['data']['type'] === 'string' &&
    'sdp' in message['data'] &&
    typeof message['data']['sdp'] === 'string' &&
    'targetId' in message &&
    typeof message['targetId'] === 'string' &&
    'callId' in message &&
    typeof message['callId'] === 'string'
  );
}

export function isRTCCandidateMessageModel(
  message: MessageModel
): message is RTCCandidateMessageModel {
  return (
    message.type === MessageType.RTC_CANDIDATE &&
    'data' in message &&
    typeof message['data'] === 'object' &&
    'targetId' in message &&
    typeof message['targetId'] === 'string' &&
    'callId' in message &&
    typeof message['callId'] === 'string'
  );
}
