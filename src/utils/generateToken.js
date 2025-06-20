// src/utils/generateToken.js
import { RoomServiceClient } from 'livekit-server-sdk';

export function generateToken({ roomName, identity }) {
    const livekitHost = 'https://sidekick-0epsx41j.livekit.cloud';
    const apiKey = 'APIUYXsmcPrUhGA';
    const apiSecret = '2yFeJ3hWJikk2vfjs5eR4PPLQLpOJtRLYeeLpyL6ZkBH';

    const client = new RoomServiceClient(livekitHost, apiKey, apiSecret);

    const token = client.createToken(roomName, identity, {
        // Add permissions here if needed
        ttl: '10m',
    });

    return token;
}
