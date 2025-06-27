import { generateLiveKitToken } from "@/lib/generateLiveKitToken";
import { useState, useCallback, createContext, useContext } from "react";
import type { ReactNode } from "react";
import { Room } from "livekit-client";
export interface ConnectionDetails {
  wsUrl: string;
  token: string;
  roomName?: string;
  shouldConnect: boolean;
}

export interface LiveKitConnectionContextType {
  connection: ConnectionDetails;
  connect: (metadata?: Record<string, any>) => Promise<void>;
  disconnect: () => void;
  room: Room | null;
}

const LiveKitConnectionContext = createContext<
  LiveKitConnectionContextType | undefined
>(undefined);

export const LiveKitConnectionProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [room, setRoom] = useState<Room | null>(null);
  const [connection, setConnection] = useState<ConnectionDetails>({
    wsUrl: "",
    token: "",
    shouldConnect: false,
  });
  const connect = useCallback(async (metadata?: Record<string, any>) => {
    try {
      const data = await generateLiveKitToken(metadata);
      const newRoom = new Room();
      setRoom(newRoom);
      setConnection({
        wsUrl: data.livekitUrl,
        token: data.accessToken,
        roomName: data.roomName,
        shouldConnect: true,
      });
    } catch (error) {
      console.error("Error generating LiveKit token:", error);
      setConnection({ wsUrl: "", token: "", shouldConnect: false });
      setRoom(null);
    }
  }, []);

  // const connect = useCallback(async (metadata?: Record<string, any>) => {
  //   try {
  //     const response = await fetch("http://localhost:3001/api/token", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ metadata }),
  //     });

  //     if (!response.ok) {
  //       const errorData = await response.json();
  //       throw new Error(
  //         errorData.error || `Failed to fetch token: ${response.statusText}`
  //       );
  //     }

  //     const data = await response.json();
  //     setConnection({
  //       wsUrl: data.livekitUrl,
  //       token: data.accessToken,
  //       roomName: data.roomName,
  //       shouldConnect: true,
  //     });
  //   } catch (error) {
  //     console.error("Error connecting to LiveKit:", error);
  //     setConnection({ wsUrl: "", token: "", shouldConnect: false });
  //   }
  // }, []);

  const disconnect = useCallback(() => {
    setConnection({ wsUrl: "", token: "", shouldConnect: false });
  }, []);

  return (
    <LiveKitConnectionContext.Provider
      value={{ connection, connect, disconnect, room }}
    >
      {children}
    </LiveKitConnectionContext.Provider>
  );
};

export const useLiveKitConnection = () => {
  const context = useContext(LiveKitConnectionContext);
  if (context === undefined) {
    throw new Error(
      "useLiveKitConnection must be used within a LiveKitConnectionProvider"
    );
  }
  return context;
};
