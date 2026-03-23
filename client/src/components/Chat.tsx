import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { io } from "socket.io-client";

interface Props {}

let socket
const Chat = ({}: Props) => {
  const [searchParams] = useSearchParams();

  const name = searchParams.get("name");
  const room = searchParams.get("room"); 

  useEffect(() => {
    socket = io("http://localhost:5000")
  }, [])
  return <div>Chat</div>;
};

export default Chat;
