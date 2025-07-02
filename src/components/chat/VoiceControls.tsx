import { useEffect, useState } from "react";
import { useRoomContext, useLocalParticipant } from "@livekit/components-react";
import { RemoteParticipant } from "livekit-client";

interface VoiceControlsProps {
  onSpeechToText: (text: string, isVoiceMessage: boolean) => void;
  onUserSpeakingStatus: (speaking: boolean) => void;
}

export function VoiceControls({
  onSpeechToText,
  onUserSpeakingStatus,
}: VoiceControlsProps) {
  const { localParticipant, isMicrophoneEnabled } = useLocalParticipant();
  const room = useRoomContext();

  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    if (!localParticipant || isMicrophoneEnabled) return;

    let isMounted = true;

    (async () => {
      try {
        await navigator.mediaDevices.getUserMedia({ audio: true });
        await localParticipant.setMicrophoneEnabled(true);
        if (isMounted) console.log("Mic enabled automatically");
      } catch (e) {
        console.error("Mic permission denied or error", e);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, [localParticipant, isMicrophoneEnabled]);

  // Update user speaking status for local participant
  useEffect(() => {
    if (!localParticipant) return;
    onUserSpeakingStatus(localParticipant.isSpeaking);

    const onSpeakingChanged = (speaking: boolean) => {
      onUserSpeakingStatus(speaking);
    };

    localParticipant.on("isSpeakingChanged", onSpeakingChanged);
    return () => {
      localParticipant.off("isSpeakingChanged", onSpeakingChanged);
    };
  }, [localParticipant, onUserSpeakingStatus]);

  // Handle remote participant audio tracks (simulate STT here)
  useEffect(() => {
    if (!room || !localParticipant) return;

    const handleTrackSubscribed = (
      track: any,
      _publication: any,
      participant: RemoteParticipant
    ) => {
      if (
        track.kind === "audio" &&
        participant.identity !== localParticipant.identity
      ) {
        console.log(
          `Subscribed to remote audio track from ${participant.identity}`
        );

        setIsListening(true);

        // Simulate STT delay and result
        setTimeout(() => {
          const transcribedText =
            "Simulated voice transcription of your speech.";
          onSpeechToText(transcribedText, true);
          setIsListening(false);
        }, 2000);
        const audio = new Audio();
        audio.srcObject = new MediaStream([track.mediaStreamTrack]);
        audio.autoplay = true;
        audio.play().catch(console.error);
      }
    };

    room.on("trackSubscribed", handleTrackSubscribed);
    return () => {
      room.off("trackSubscribed", handleTrackSubscribed);
    };
  }, [room, localParticipant, onSpeechToText]);
  return (
    <div className="flex flex-col items-center text-white mt-3">
      {isListening && (
        <div className="wave-animation mt-2 text-yellow-400">
          <svg viewBox="0 0 100 20" width="100" height="20">
            <path
              d="M0 10 C 30 15, 70 5, 100 10 L 100 20 L 0 20 Z"
              fill="currentColor"
              opacity="0.7"
            />
            <path
              d="M0 10 C 25 18, 75 2, 100 10 L 100 20 L 0 20 Z"
              fill="currentColor"
              opacity="0.4"
            />
            <path
              d="M0 10 C 35 12, 65 8, 100 10 L 100 20 L 0 20 Z"
              fill="currentColor"
              opacity="0.2"
            />
          </svg>
        </div>
      )}
    </div>
  );
}
