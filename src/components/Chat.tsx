import { useEffect, useRef, useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Mic } from "lucide-react";
import { LiveKitRoom } from "@livekit/components-react";
import "@livekit/components-styles";
import { useLiveKitConnection } from "@/hooks/useLiveKitConnection";
import ChatMessage from "./chat/ChatMessage";
import { VoiceControls } from "./chat/VoiceControls";
import { Wave } from "./ui/wave";

interface MessageProps {
  sender: "agent" | "user";
  text: string;
}

export default function FullScreenChat() {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { connection, connect, disconnect } = useLiveKitConnection();

  const [messages, setMessages] = useState<MessageProps[]>([]);
  const [input, setInput] = useState("");
  const [voiceActive, setVoiceActive] = useState(false);
  const [isAgentSpeaking, setIsAgentSpeaking] = useState(false);
  const [isUserSpeakingViaVoice, setIsUserSpeakingViaVoice] = useState(false);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleAgentResponse = useCallback(
    async (messageText: string, shouldSpeak: boolean) => {
      // Replace with your actual AI response logic
      const response = `Response to: "${messageText}"`;
      
      setMessages((prev) => [...prev, { sender: "agent", text: response }]);
      
      if (shouldSpeak && voiceActive) {
        setIsAgentSpeaking(true);
        speechSynthesis.cancel();
        
        const utterance = new SpeechSynthesisUtterance(response);
        utterance.onend = () => setIsAgentSpeaking(false);
        utterance.onerror = () => setIsAgentSpeaking(false);
        speechSynthesis.speak(utterance);
      }
    },
    [voiceActive]
  );

  const sendTextMessage = () => {
    if (!input.trim()) return;
    const message = input.trim();
    setMessages((prev) => [...prev, { sender: "user", text: message }]);
    setInput("");
    handleAgentResponse(message, false);
  };

  const toggleVoiceChat = async () => {
    if (!voiceActive) {
      try {
        await connect({});
        setVoiceActive(true);
      } catch (error) {
        console.error("Failed to connect voice chat:", error);
      }
    } else {
      speechSynthesis.cancel();
      disconnect();
      setVoiceActive(false);
      setIsUserSpeakingViaVoice(false);
      setIsAgentSpeaking(false);
    }
  };

  const handleSpeechToText = useCallback(
    (text: string) => {
      if (!text.trim()) return;
      setMessages((prev) => [...prev, { sender: "user", text }]);
      handleAgentResponse(text, true);
    },
    [handleAgentResponse]
  );

  const handleUserSpeakingStatus = useCallback((speaking: boolean) => {
    setIsUserSpeakingViaVoice(speaking);
  }, []);

  return (
    <div className="min-h-screen w-full flex justify-center font-sans bg-transparent">
      <Card className="w-full md:w-[380px] h-[88vh] text-gray-100 rounded-2xl shadow-xl border border-white flex flex-col overflow-hidden bg-transparent">
        <CardHeader className="pb-2 border-b border-white/10">
          <CardTitle className="text-lg sm:text-xl font-semibold text-yellow-400">
            {isAgentSpeaking ? "Agent Speaking..." : "Your Agent"}
          </CardTitle>
        </CardHeader>

        <CardContent className="flex-grow overflow-y-auto px-4 py-2 custom-scrollbar bg-transparent">
          {messages.map((msg, i) => (
            <ChatMessage key={i} sender={msg.sender} text={msg.text} />
          ))}
          <div ref={messagesEndRef} />
        </CardContent>

        {voiceActive && connection.token && connection.wsUrl && (
          <LiveKitRoom
            token={connection.token}
            serverUrl={connection.wsUrl}
            connect={connection.shouldConnect}
            audio
            video={false}
            onDisconnected={() => {
              setVoiceActive(false);
              setIsUserSpeakingViaVoice(false);
              setIsAgentSpeaking(false);
            }}
            style={{ display: "none" }}
          >
            <VoiceControls
              onSpeechToText={handleSpeechToText}
              onUserSpeakingStatus={handleUserSpeakingStatus}
            />
          </LiveKitRoom>
        )}

        <div className="p-3 border-t border-white/10 flex items-center gap-2 bg-transparent">
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleVoiceChat}
              className={`rounded-full relative z-10 ${
                voiceActive ? "text-green-500" : "text-muted-foreground"
              } ${
                voiceActive && isUserSpeakingViaVoice ? "bg-green-600/30" : ""
              } ${
                voiceActive && isAgentSpeaking ? "bg-yellow-400/30" : ""
              }`}
            >
              <Mic size={20} />
            </Button>
            {voiceActive && isUserSpeakingViaVoice && (
              <div className="absolute inset-0 pointer-events-none">
                <Wave color="green" />
              </div>
            )}
            {voiceActive && isAgentSpeaking && (
              <div className="absolute inset-0 pointer-events-none">
                <Wave color="yellow" />
              </div>
            )}
          </div>

          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendTextMessage()}
            placeholder="Type a message"
            className="flex-grow bg-[#292a55] text-white border-none rounded-full px-4 py-2"
          />

          <Button variant="ghost" size="icon" onClick={sendTextMessage}>
            <Send size={20} />
          </Button>
        </div>
      </Card>
    </div>
  );
}