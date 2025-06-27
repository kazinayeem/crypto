// import { useCallback } from "react";
// import { useRoomContext } from "@livekit/components-react";

// export const useSendText = () => {
//   const room = useRoomContext();

//   const sendText = useCallback(
//     async (message: string) => {
//       if (!room?.localParticipant) return;

//       try {
//         const info = await room.localParticipant.sendText(message, {
//           topic: "lk.chat",
//         });
//       } catch (e) {
//         console.error("Failed to send message:", e);
//       }
//     },
//     [room]
//   );

//   return sendText;
// };

import { useCallback } from "react";
import { useRoomContext } from "@livekit/components-react";

export const useSendText = () => {
  const room = useRoomContext();

  const sendText = useCallback(
    async (message: string) => {
      if (!room?.localParticipant) {
        console.warn("Local participant not available, cannot send text.");
        return;
      }

      try {
        // Send as a text message with a specific topic
        await room.localParticipant.sendText(message, { topic: "lk.chat" });
      } catch (e) {
        console.error("Failed to send message:", e);
      }
    },
    [room]
  );

  return sendText;
};
