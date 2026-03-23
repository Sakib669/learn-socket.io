import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Send, X } from "lucide-react";

interface Props {}

type Message = {
  user: string;
  text: string;
};

let socket: Socket;
const Chat = ({}: Props) => {
  const [searchParams] = useSearchParams();
  const inputRef = useRef<HTMLInputElement>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  const name = searchParams.get("name");
  const room = searchParams.get("room");

  useEffect(() => {
    socket = io("http://localhost:5000");

    socket.emit("join", { name, room }, (error: string) => {
      if (error) {
        alert(error);
      }
    });

    socket.on("message", (message) => {
      setMessages((existingMessages) => [...existingMessages, message]);
    });
  }, []);

  const sendMessage = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && e.currentTarget.value) {
      socket.emit("message", e.currentTarget.value);
      if (inputRef.current) {
        inputRef.current.value = ""; // ← clears it properly
      }
    }
  };

  return (
    <div className="flex flex-col w-full max-w-2xl mx-auto h-[calc(100vh-73px)]">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 rounded-t-2xl border border-white/10 bg-white/5 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-emerald-400 shadow shadow-emerald-400/50" />
          <span className="text-white font-semibold text-sm">Room:</span>
          <Badge className="bg-violet-600 hover:bg-violet-500 text-white border-0">
            {room}
          </Badge>
        </div>
        <Link to="/">
          <Button
            variant="ghost"
            size="icon"
            className="text-white/50 hover:text-white hover:bg-white/10 rounded-full"
          >
            <X className="w-4 h-4" />
          </Button>
        </Link>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 px-6 py-4 border-x border-white/10 bg-white/2">
        <div className="flex flex-col gap-3">
          <div className="self-start max-w-[75%] bg-white/10 border border-white/10 text-white/80 text-sm px-4 py-2.5 rounded-2xl rounded-tl-sm">
            Test Message
          </div>
          {messages?.map((message: Message, index) => (
            <div
              key={index}
              className="self-start max-w-[75%] bg-white/10 border border-white/10 text-white/80 text-sm px-4 py-2.5 rounded-2xl rounded-tl-sm"
            >
              {message.user} : {message.text}
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="flex items-center gap-3 px-4 py-4 rounded-b-2xl border border-white/10 bg-white/5 backdrop-blur-md">
        <Input
          ref={inputRef}
          onKeyDown={sendMessage}
          placeholder="Type a message..."
          className="flex-1 bg-white/5 border-white/10 text-white placeholder-white/20 focus-visible:ring-violet-500 rounded-xl"
        />
      </div>
    </div>
  );
};

export default Chat;
