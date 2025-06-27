// components/chat/ChatMessage.tsx
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface MessageProps {
  sender: "agent" | "user" | unknown;
  text: string;
}

const ChatMessage = ({ sender, text }: MessageProps) => {
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
      <div
        className={`relative p-3 text-sm sm:text-base max-w-[80%] md:max-w-[60%] break-words flex items-end
          ${
            isUser
              ? "bg-gray-200 text-black rounded-tl-xl rounded-bl-xl rounded-br-xl rounded-tr-sm pl-10"
              : "bg-[#393b78] text-white rounded-tr-xl rounded-bl-xl rounded-br-xl rounded-tl-sm pr-10"
          }`}
      >
        {text}
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

export default ChatMessage;
