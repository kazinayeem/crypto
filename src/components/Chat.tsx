import { useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send, Image, Mic, Plus } from "lucide-react";
import React from "react";

interface MessageProps {
  sender: "agent" | "user";
  text: string;
  avatarFallback: string;
}

const ChatMessage: React.FC<MessageProps> = ({ sender, text }) => {
  const isUser = sender === "user";

  const AIBotIcon = (
    <svg
      className="w-4 h-4 text-gray-900"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9v-2h2v2zm0-4H9V8h2v4zm4 4h-2v-2h2v2zm0-4h-2V8h2v4zm-1.5-7.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5S14 5.67 14 6.5s-.67 1.5-1.5 1.5z" />
    </svg>
  );

  const UserAvatarIcon = (
    <svg className="w-4 h-4 text-black" viewBox="0 0 24 24" fill="currentColor">
      <path
        fillRule="evenodd"
        d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.438-.695z"
        clipRule="evenodd"
      />
    </svg>
  );

  return (
    <div
      className={`flex p-2 gap-2 max-w-full ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      {/* Message bubble */}
      <div
        className={`relative p-3 text-sm sm:text-base max-w-[80%] md:max-w-[60%] break-words flex items-end
          ${
            isUser
              ? "bg-gray-200 text-black rounded-tl-xl rounded-bl-xl rounded-br-xl rounded-tr-sm pl-10"
              : "bg-[#393b78] text-white rounded-tr-xl rounded-bl-xl rounded-br-xl rounded-tl-sm pr-10"
          }`}
      >
        {text}

        {/* Avatar */}
        <Avatar
          className={`absolute bottom-0 ${
            isUser ? "-right-6" : "-left-6"
          } border-2 border-[#191919] z-10`}
        >
          <AvatarFallback
            className={`font-bold w-full h-full flex items-center justify-center
              ${isUser ? "bg-white text-black" : "bg-yellow-400 text-gray-900"}
            `}
          >
            {isUser ? UserAvatarIcon : AIBotIcon}
          </AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};

export default function FullScreenChat() {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const messages = [
    {
      sender: "user" as const,
      text: "What's BTC doing right now?",
      avatarFallback: "ME",
    },
    {
      sender: "agent" as const,
      text: "Bitcoin's riding a mild wave —\nup 1.4% in the last hour.\nMight be warming up for a breakout…\nor just teasing us again.",
      avatarFallback: "AI",
    },
    {
      sender: "user" as const,
      text: "ADA-USD",
      avatarFallback: "ME",
    },
    {
      sender: "agent" as const,
      text: `User: Asset ID: ADA-USD\nCrypto AI:\n✅ Analyzing ADA-USD...\n💵 Current price: $0.42\n📉 Down 1.1% in the last 6 hours\n📊 RSI: 38 (nearing oversold)\n⚠️ Potential bounce zone ahead.\nMight be a good time to watch for a reversal signal.`,
      avatarFallback: "AI",
    },
    {
      sender: "user" as const,
      text: "Is the market bullish or bearish today?",
      avatarFallback: "ME",
    },
    {
      sender: "agent" as const,
      text: "It's giving neutral vibes — some coins climbing, others cooling off. Feels like the calm before the next wave.",
      avatarFallback: "AI",
    },
  ];

  return (
    <div className="min-h-screen w-full  flex justify-center font-sans">
      <Card className="w-full md:w-[380px] h-[90vh] text-gray-100 rounded-2xl p-5 shadow-xl border border-white/10 flex flex-col overflow-hidden bg-transparent">
        <CardHeader className="pb-2 border-b border-white/10">
          <CardTitle className="text-lg sm:text-xl font-semibold text-yellow-400">
            Your Agent
          </CardTitle>
        </CardHeader>

        <CardContent className="flex-grow overflow-y-auto px-4 py-2 custom-scrollbar">
          {messages.map((msg, index) => (
            <ChatMessage
              key={index}
              sender={msg.sender}
              text={msg.text}
              avatarFallback={msg.avatarFallback}
            />
          ))}

          <div className="flex justify-center my-4">
            <div className="bg-[#393b78] text-gray-300 text-sm py-2 px-4 rounded-full max-w-[80%] text-center border border-white/10">
              That's all for now!{" "}
              <span className="underline underline-offset-2 text-white">
                Upgrade to continue chatting with your AI assistant.
              </span>
            </div>
          </div>

          <div ref={messagesEndRef} />
        </CardContent>

        <div className="p-3 border-t border-white/10 flex items-center gap-2 bg-transparent flex-wrap">
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-white rounded-full"
          >
            <Plus size={20} />
          </Button>
          <Input
            placeholder="Your text here"
            className="flex-grow min-w-[150px] bg-[#292a55] text-white border-none rounded-full px-4 py-2 focus:ring-ring focus:ring-offset-0 placeholder:text-gray-400"
          />
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-white rounded-full"
            >
              <Mic size={20} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-white rounded-full"
            >
              <Image size={20} />
            </Button>
          </div>
          <Button className="ml-auto bg-blue-600 hover:bg-blue-700 text-white rounded-full p-2 w-10 h-10 flex items-center justify-center">
            <Send size={20} />
          </Button>
        </div>
      </Card>
    </div>
  );
}
