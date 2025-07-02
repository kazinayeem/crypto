import { useCallback, useEffect, useRef, useState } from "react";

type ChatMessageInputProps = {
  placeholder: string;
  accentColor: string;
  height: number;
  onSend?: (message: string) => Promise<any> | void;
};

export const ChatMessageInput = ({
  placeholder,
  accentColor,
  height,
  onSend,
}: ChatMessageInputProps) => {
  const [message, setMessage] = useState("");
  const [inputTextWidth, setInputTextWidth] = useState(0);
  const [inputWidth, setInputWidth] = useState(0);
  const hiddenInputRef = useRef<HTMLSpanElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [inputHasFocus, setInputHasFocus] = useState(false);

  const handleSend = useCallback(() => {
    if (!onSend) {
      return;
    }
    if (message.trim() === "") {
      return;
    }

    onSend(message);
    setMessage("");
  }, [onSend, message]);

  useEffect(() => {
    if (message.length > 0) {
      setIsTyping(true);
      const timeout = setTimeout(() => {
        setIsTyping(false);
      }, 500);

      return () => clearTimeout(timeout);
    } else {
      setIsTyping(false);
    }
  }, [message]);

  useEffect(() => {
    if (hiddenInputRef.current) {
      setInputTextWidth(hiddenInputRef.current.clientWidth);
    }
  }, [hiddenInputRef, message]);

  useEffect(() => {
    if (inputRef.current) {
      setInputWidth(inputRef.current.clientWidth);
    }
  }, [inputRef, message]);

  return (
    <div
      className="flex flex-col gap-2 border-t border-t-gray-800"
      style={{ height: height }}
    >
      <div className="flex flex-row pt-3 gap-2 items-center relative">
        <div
          className={`w-2 h-4 absolute left-2 ${
            !isTyping && inputHasFocus ? "cursor-animation" : ""
          }`}
          style={{
            backgroundColor: inputHasFocus ? accentColor : "#4b5563",
            boxShadow: inputHasFocus ? `0 0 8px ${accentColor}` : "none",
            transform:
              "translateX(" +
              (message.length > 0
                ? Math.min(inputTextWidth, inputWidth - 20) - 4
                : 0) +
              "px)",
          }}
        ></div>
        <input
          ref={inputRef}
          className={`w-full text-xs caret-transparent bg-transparent opacity-25 text-gray-300 p-2 pr-6 rounded-sm focus:opacity-100 focus:outline-none focus:ring-1`}
          style={{
            paddingLeft: message.length > 0 ? "12px" : "24px",
            caretShape: "block",
            borderColor: inputHasFocus ? accentColor : undefined,
            boxShadow: inputHasFocus ? `0 0 0 1px ${accentColor}` : undefined,
          }}
          placeholder={placeholder}
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          onFocus={() => {
            setInputHasFocus(true);
          }}
          onBlur={() => {
            setInputHasFocus(false);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSend();
            }
          }}
        ></input>
        <span
          ref={hiddenInputRef}
          className="absolute top-0 left-0 text-xs pl-3 text-amber-500 pointer-events-none opacity-0"
        >
          {message.replace(/ /g, "\u00a0")}
        </span>
        <button
          disabled={message.length === 0 || !onSend}
          onClick={handleSend}
          className={`text-xs uppercase p-2 rounded-md ${
            message.length > 0
              ? `text-[${accentColor}] hover:bg-[${accentColor}95]`
              : "text-gray-500 opacity-25 pointer-events-none"
          }`}
          style={{
            color: message.length > 0 ? accentColor : "#6b7280",
            backgroundColor: message.length > 0 ? undefined : undefined,
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};
