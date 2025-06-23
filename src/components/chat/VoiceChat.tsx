import {
  LiveKitRoom,
  useRoomContext,
  useLocalParticipant,
} from "@livekit/components-react";
import "@livekit/components-styles";
import { useEffect } from "react";
import { useLiveKitConnection } from "../../hooks/useLiveKitConnection";

const VoiceChat = () => {
  const { connection, connect, disconnect } = useLiveKitConnection();

  useEffect(() => {
    if (!connection.shouldConnect && !connection.token) {
      connect();
    }
  }, [connection.shouldConnect, connection.token, connect]);

  if (!connection.token || !connection.wsUrl) {
    return <div className="text-white">Connecting to LiveKit...</div>;
  }

  return (
    <LiveKitRoom
      token={connection.token}
      serverUrl={connection.wsUrl}
      connect={connection.shouldConnect}
      audio={true}
      video={false}
      onDisconnected={() => disconnect()}
    >
      <VoiceControls />
    </LiveKitRoom>
  );
};

const VoiceControls = () => {
  const { localParticipant, isMicrophoneEnabled } = useLocalParticipant();
  const room = useRoomContext();

  // Auto-enable mic & request permissions on mount
  useEffect(() => {
    const enableMic = async () => {
      if (localParticipant && !isMicrophoneEnabled) {
        try {
          await navigator.mediaDevices.getUserMedia({ audio: true });
          await localParticipant.setMicrophoneEnabled(true);
          console.log("Mic enabled automatically");
        } catch (err) {
          console.error("Mic permission denied or error", err);
        }
      }
    };
    enableMic();
  }, [localParticipant, isMicrophoneEnabled]);

  // Play local audio track muted (for debugging local audio capture)
  useEffect(() => {
    const audioTrackPublication = localParticipant
      ?.getTrackPublications()
      .find((pub) => pub.kind === "audio");
    const audioTrack = audioTrackPublication?.track;
    if (audioTrack && audioTrack.mediaStreamTrack) {
      const mediaStream = new MediaStream([audioTrack.mediaStreamTrack]);
      const audioElement = new Audio();
      audioElement.srcObject = mediaStream;
      audioElement.autoplay = true;
      audioElement.muted = true; // mute to avoid feedback
      audioElement.play().catch(console.error);

      return () => {
        audioElement.pause();
        audioElement.srcObject = null;
      };
    }
  }, [localParticipant]);

  const isSpeaking = localParticipant?.isSpeaking ?? false;

  const toggleMic = async () => {
    if (!localParticipant) return;
    try {
      await localParticipant.setMicrophoneEnabled(!isMicrophoneEnabled);
    } catch (err) {
      console.error("Toggle mic failed", err);
    }
  };

  return (
    <div className="flex flex-col items-center text-white">
      <p className="text-sm">
        🎙 Mic is {isMicrophoneEnabled ? "ON" : "OFF"}{" "}
        {isSpeaking && <span className="text-green-400">(Speaking)</span>}
      </p>
      <div className="mt-2 flex gap-2">
        <button
          onClick={toggleMic}
          className="px-4 py-1 rounded bg-blue-600 hover:bg-blue-700 transition"
        >
          Toggle Mic
        </button>
        <button
          onClick={() => room.disconnect()}
          className="px-4 py-1 rounded bg-red-600 hover:bg-red-700 transition"
        >
          Leave Room
        </button>
      </div>
    </div>
  );
};

export default VoiceChat;
