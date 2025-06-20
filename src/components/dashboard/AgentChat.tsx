import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

interface ChatMessageProps {
  isAgent: boolean;
  text: string;
  time?: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({
  isAgent,
  text,
  time,
}) => (
  <div
    className={`flex items-start mb-4 ${
      isAgent ? "justify-start" : "justify-end"
    }`}
  >
    {isAgent && (
      <Avatar className="mr-2">
        <AvatarImage src="https://placehold.co/40x40/000000/FFFFFF?text=AG" alt="Agent" />
        <AvatarFallback>AG</AvatarFallback>
      </Avatar>
    )}
    <div
      className={`p-3 rounded-lg max-w-[75%] ${
        isAgent
          ? "bg-blue-600 text-white"
          : "bg-gray-700 text-white"
      }`}
    >
      <p className="text-sm">{text}</p>
      {time && (
        <p className="text-xs text-gray-300 mt-1">{time}</p>
      )}
    </div>
    {!isAgent && (
      <Avatar className="ml-2">
        <AvatarImage src="https://placehold.co/40x40/000000/FFFFFF?text=ME" alt="User" />
        <AvatarFallback>ME</AvatarFallback>
      </Avatar>
    )}
  </div>
);

const AgentChat: React.FC = () => {
  return (
    <Card
      className="text-white bg-red-500 rounded-2xl border-2 shadow-xl border-white/20 w-full max-w-4xl mx-auto h-[600px] p-4 flex flex-col"
      style={{
        background:
          "linear-gradient(to bottom, #0c0f1c 0%, #0c0f1c 80%, #111318 100%)",
      }}
    >
      <CardHeader className="p-0 pb-2">
        <CardTitle className="text-sm text-gray-400">
          Your Agent
        </CardTitle>
      </CardHeader>

      <CardContent className="p-0 flex-grow overflow-y-auto pr-2 custom-scrollbar">
        <ChatMessage isAgent={true} text="What's BTC doing right now?" />
        <ChatMessage
          isAgent={true}
          text="Bitcoin is doing a mild move — it fell 1% in the last hour. Might be warming up for a breakout... or just teasing us again."
        />
        <ChatMessage isAgent={false} text="ADA-USD" />
        <ChatMessage
          isAgent={true}
          text="User Asset 📈 ADA-USD. Crypto AI: Analyzing ADA-USD... Current Price: $0.42. Down 1% in the last 8 hours. RSI: 38 (Nearing oversold). A potential bounce zone ahead. Might be a good time to watch for a rebound signal."
        />
        <ChatMessage
          isAgent={false}
          text="Is the market bullish or bearish today?"
        />
        <ChatMessage
          isAgent={true}
          text="It's giving neutral vibes - some coins climbing, others cooling off. Feels like the calm before the next wave."
        />
        <ChatMessage
          isAgent={false}
          text="How's my portfolio doing today?"
        />
        <ChatMessage
          isAgent={true}
          text="You're up 3.7%! ETH's comeback is leading the charge. ADA and MATIC are holding steady - not bad at all!"
        />
      </CardContent>

      {/* Chat input */}
      <div className="mt-4 flex items-center space-x-2">
        <input
          type="text"
          placeholder="Your text here"
          className="flex-grow bg-gray-700 rounded-full py-2 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button className="p-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 0px;
          height: 0px;
        }
        .custom-scrollbar {
          scrollbar-width: none;
        }
        @media (hover: hover) and (pointer: fine) {
          .custom-scrollbar:hover::-webkit-scrollbar {
            width: 8px;
            height: 8px;
          }
          .custom-scrollbar:hover::-webkit-scrollbar-thumb {
            background: #555;
            border-radius: 10px;
          }
          .custom-scrollbar:hover::-webkit-scrollbar-track {
            background: #292a55;
            border-radius: 10px;
          }
        }
      `}</style>
    </Card>
  );
};

export default AgentChat;
