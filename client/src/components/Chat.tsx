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
  const [users, setUser] = useState([]);

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

    socket.on("userList", ({ roomUsers }) => {
      setUser(roomUsers);
    });

    return () => {
      socket.disconnect();
      socket.close();
    };
  }, []);

  const sendMessage = (e?: React.KeyboardEvent<HTMLInputElement>) => {
    if (e && e.key !== "Enter") return; // if keyboard event, only fire on Enter
    if (inputRef.current?.value) {
      socket.emit("message", inputRef.current.value);
      inputRef.current.value = "";
    }
  };

  return (
    <div className="flex w-full max-w-4xl mx-auto h-[calc(100vh-73px)] overflow-hidden gap-3">
      {/* User List Sidebar */}
      <div className="w-48 shrink-0 flex flex-col rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md overflow-hidden">
        <div className="px-4 py-3 border-b border-white/10">
          <p className="text-white/60 text-xs font-semibold uppercase tracking-widest">
            Users
          </p>
        </div>
        <ScrollArea className="flex-1">
          <div className="flex flex-col gap-1 p-2">
            {users.map((user: any, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-white/5 transition-all"
              >
                <div className="w-2 h-2 rounded-full bg-emerald-400 shadow shadow-emerald-400/50 shrink-0" />
                <span className="text-white/70 text-sm truncate">
                  {user.name}
                </span>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Chat Section */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <div className="shrink-0 flex items-center justify-between px-6 py-4 rounded-t-2xl border border-white/10 bg-white/5 backdrop-blur-md">
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
        <ScrollArea className="flex-1 min-h-0 px-6 py-4 border-x border-white/10 bg-white/2">
          <div className="flex flex-col gap-3">
            {messages?.map((message: Message, index) => {
              const isSelf = message.user === name;
              const isSystem = message.user === "System";

              if (isSystem) {
                return (
                  <div key={index} className="flex justify-center">
                    <span className="text-white/30 text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10">
                      {message.text}
                    </span>
                  </div>
                );
              }

              return (
                <div
                  key={index}
                  className={`flex flex-col gap-1 ${isSelf ? "items-end" : "items-start"}`}
                >
                  {!isSelf && (
                    <span className="text-white/40 text-xs px-1">
                      {message.user}
                    </span>
                  )}
                  <div
                    className={`max-w-[75%] text-sm px-4 py-2.5 rounded-2xl ${
                      isSelf
                        ? "bg-linear-to-br from-violet-600 to-blue-600 text-white rounded-tr-sm shadow-lg shadow-violet-500/20"
                        : "bg-white/10 border border-white/10 text-white/80 rounded-tl-sm"
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>

        {/* Input */}
        <div className="shrink-0 flex items-center gap-3 px-4 py-4 rounded-b-2xl border border-white/10 bg-white/5 backdrop-blur-md">
          <Input
            ref={inputRef}
            onKeyDown={sendMessage}
            placeholder="Type a message..."
            className="flex-1 bg-white/5 border-white/10 text-white placeholder-white/20 focus-visible:ring-violet-500 rounded-xl"
          />
          <Button
            onClick={() => sendMessage()}
            className="bg-gradient-to-br from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white rounded-xl shadow-lg shadow-violet-500/30 px-4"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
