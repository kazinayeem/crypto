import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send, Image, Mic, Plus } from "lucide-react";
import React, { useRef, useEffect } from "react";

interface MessageProps {
  sender: "agent" | "user";
  text: string;
  avatarIcon?: React.ReactNode;
  avatarFallback: string;
}

const ChatMessage: React.FC<MessageProps> = ({
  sender,
  text,
  avatarIcon,
  avatarFallback,
}) => (
  <div
    className={`flex items-start mb-4 ${
      sender === "user" ? "justify-end" : ""
    }`}
  >
    {sender === "agent" && (
      <Avatar className="mr-2 border-none">
        {avatarIcon ? (
          <div className="w-full h-full rounded-full bg-yellow-400 flex items-center justify-center">
            {avatarIcon}
          </div>
        ) : (
          <AvatarFallback className="bg-yellow-400 text-gray-900 font-bold">
            {avatarFallback}
          </AvatarFallback>
        )}
      </Avatar>
    )}
    <div
      className={`p-3 text-sm sm:text-base max-w-[80%] md:max-w-[60%] break-words ${
        sender === "agent"
          ? "bg-muted text-foreground rounded-bl-none"
          : "bg-primary text-primary-foreground rounded-br-none"
      }`}
      style={{
        borderRadius:
          sender === "agent" ? "12px 12px 12px 2px" : "12px 12px 2px 12px",
      }}
    >
      {text}
    </div>
    {sender === "user" && (
      <Avatar className="ml-2 border-none">
        {avatarIcon ? (
          <div className="w-full h-full rounded-full bg-primary flex items-center justify-center">
            {avatarIcon}
          </div>
        ) : (
          <AvatarFallback className="bg-primary text-primary-foreground font-bold">
            {avatarFallback}
          </AvatarFallback>
        )}
      </Avatar>
    )}
  </div>
);

export default function FullScreenChat() {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const AIBotIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-5 h-5 text-gray-900"
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9v-2h2v2zm0-4H9V8h2v4zm4 4h-2v-2h2v2zm0-4h-2V8h2v4zm-1.5-7.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5S14 5.67 14 6.5s-.67 1.5-1.5 1.5z" />
    </svg>
  );

  const UserAvatarIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-5 h-5 text-white"
    >
      <path
        fillRule="evenodd"
        d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.438-.695z"
        clipRule="evenodd"
      />
    </svg>
  );

  const messages = [
    {
      sender: "agent" as const,
      text: "What's STC doing right now?",
      avatarIcon: AIBotIcon,
      avatarFallback: "AI",
    },
    {
      sender: "agent" as const,
      text: "Bitcoin's riding a mid-wave - up 14% in the last hour\nMight be warming up for a breakout... or just teasing us again",
      avatarIcon: AIBotIcon,
      avatarFallback: "AI",
    },
    {
      sender: "user" as const,
      text: "ADA-USD",
      avatarIcon: UserAvatarIcon,
      avatarFallback: "DD",
    },
    {
      sender: "agent" as const,
      text: "User: Amet DD ADA USD\nCrypto AI\n✅ Analyzing ADA-USD\nCurrent price: $0.42\n⬇ Down 1% in the last 6 hours\n📈 RSI: 38 (nearing oversold)\n⚠️ A potential bounce zone ahead",
      avatarIcon: AIBotIcon,
      avatarFallback: "AI",
    },
    {
      sender: "user" as const,
      text: "is the market bullish or bearish today?",
      avatarIcon: UserAvatarIcon,
      avatarFallback: "DD",
    },
    {
      sender: "agent" as const,
      text: "It's giving neutral vibes - some coins climbing, others cooling off. Feels like the calm before the next wave",
      avatarIcon: AIBotIcon,
      avatarFallback: "AI",
    },
    {
      sender: "user" as const,
      text: "How's my portfolio doing today?",
      avatarIcon: UserAvatarIcon,
      avatarFallback: "DD",
    },
    {
      sender: "agent" as const,
      text: "You're up 3.7% ETH's comeback is leading the charge. ADA and MATIC are holding steady - chill but solid",
      avatarIcon: AIBotIcon,
      avatarFallback: "AI",
    },
  ];

  return (
    <div className="h-[90vh] w-full bg-background p-4">
      <Card className="h-full w-full bg-background text-foreground border-none shadow-lg rounded-lg flex flex-col">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg sm:text-xl font-semibold">Your Agent</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow overflow-y-auto px-4 py-2 custom-scrollbar">
          {messages.map((msg, index) => (
            <ChatMessage
              key={index}
              sender={msg.sender}
              text={msg.text}
              avatarIcon={msg.avatarIcon}
              avatarFallback={msg.avatarFallback}
            />
          ))}
          <div ref={messagesEndRef} />
        </CardContent>
        <div className="p-3 border-t border-border flex items-center gap-2 bg-background rounded-b-lg flex-wrap">
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground rounded-full">
            <Plus size={20} />
          </Button>
          <Input
            placeholder="Type a message..."
            className="flex-grow min-w-[150px] bg-muted text-foreground border-none rounded-full px-4 py-2 focus:ring-ring focus:ring-offset-0 placeholder:text-muted-foreground"
          />
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground rounded-full">
              <Mic size={20} />
            </Button>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground rounded-full">
              <Image size={20} />
            </Button>
          </div>
          <Button className="ml-auto bg-yellow-400 text-black hover:bg-yellow-500 rounded-full p-2">
            <Send size={20} />
          </Button>
        </div>
      </Card>
    </div>
  );
}
