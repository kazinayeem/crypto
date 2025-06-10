// src/components/dashboard/AgentChat.tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar'; 

interface ChatMessageProps {
  isAgent: boolean;
  text: string;
  time?: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ isAgent, text, time }) => (
  <div className={`flex items-start mb-4 ${isAgent ? 'justify-start' : 'justify-end'}`}>
    {isAgent && (
      <Avatar className="mr-2">
        <AvatarImage src="/path/to/agent-avatar.png" alt="Agent" />
        <AvatarFallback>AG</AvatarFallback>
      </Avatar>
    )}
    <div
      className={`p-3 rounded-lg ${
        isAgent ? 'bg-blue-600 text-white' : 'bg-gray-700 text-white'
      }`}
    >
      <p className="text-sm">{text}</p>
      {time && <p className="text-xs text-gray-300 mt-1">{time}</p>}
    </div>
    {!isAgent && (
      <Avatar className="ml-2">
        <AvatarImage src="/path/to/user-avatar.png" alt="User" />
        <AvatarFallback>ME</AvatarFallback>
      </Avatar>
    )}
  </div>
);

const AgentChat: React.FC = () => {
  return (
    <Card className="bg-gray-800 border-none rounded-lg p-4 flex flex-col h-[600px] overflow-hidden">
      <CardHeader className="p-0 pb-2">
        <CardTitle className="text-sm text-gray-400">Your Agent</CardTitle>
      </CardHeader>
      <CardContent className="p-0 flex-grow overflow-y-auto pr-2 custom-scrollbar">
        {/* Custom scrollbar class for Tailwind:
            Add to tailwind.config.js:
            theme: {
              extend: {
                scrollbar: {
                  'hide': 'none', // For -webkit-scrollbar
                }
              }
            },
            plugins: [
              require('tailwind-scrollbar-hide')
            ]
        */}
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
        <ChatMessage isAgent={false} text="Is the market bullish or bearish today?" />
        <ChatMessage
          isAgent={true}
          text="It's giving neutral vibes - some coins climbing, others cooling off. Feels like the calm before the next wave."
        />
        <ChatMessage isAgent={false} text="How's my portfolio doing today?" />
        <ChatMessage
          isAgent={true}
          text="You're up 3.7%! ETH's comeback is leading the charge. ADA and MATIC are holding steady - not bad at all!"
        />
      </CardContent>
      <div className="mt-4 flex items-center space-x-2">
        <input
          type="text"
          placeholder="Your text here"
          className="flex-grow bg-gray-700 rounded-full py-2 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button className="p-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white">
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
    </Card>
  );
};
export default AgentChat;