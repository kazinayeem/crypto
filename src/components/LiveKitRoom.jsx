
import React, { useEffect, useState } from 'react';
import { LiveKitRoom } from '@livekit/components-react';
import { generateToken } from '../utils/generateToken';

const LiveKitRoomPage = () => {
    const [token, setToken] = useState(null);

    useEffect(() => {
        const token = generateToken({
            roomName: 'test-room',
            identity: 'client-user-' + Math.floor(Math.random() * 1000),
        });
        setToken(token);
    }, []);

    if (!token) return <div>Loading...</div>;

    return (
        <LiveKitRoom
            token={token}
            serverUrl="wss://sidekick-0epsx41j.livekit.cloud"
            connect
            video
            audio
        >
            <h2 className="text-white text-xl">You're in the room</h2>
        </LiveKitRoom>
    );
};

export default LiveKitRoomPage;
