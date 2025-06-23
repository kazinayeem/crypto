import { AccessToken } from 'livekit-server-sdk';

const apiKey = "APIUYXsmcPrUhGA";
const apiSecret = "2yFeJ3hWJikk2vfjs5eR4PPLQLpOJtRLYeeLpyL6ZkBH";
const livekitUrl = "wss://sidekick-0epsx41j.livekit.cloud";

const generateRandomAlphanumeric = (length: number): string => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

export const generateLiveKitToken = async (metadata: Record<string, any> = {}) => {
  const roomName = `room-${generateRandomAlphanumeric(4)}-${generateRandomAlphanumeric(4)}`;
  const identity = `identity-${generateRandomAlphanumeric(4)}`;

  const at = new AccessToken(apiKey, apiSecret, {
    identity,
    metadata: JSON.stringify(metadata),
  });

  at.addGrant({
    room: roomName,
    roomJoin: true,
    canPublish: true,
    canSubscribe: true,
    canPublishData: true,
  });

  const token = await at.toJwt();

  return {
    identity,
    accessToken: token,
    roomName,
    livekitUrl,
  };
};
