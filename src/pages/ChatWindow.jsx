import { useParams } from "react-router-dom";

const ChatWindow = () => {
  const { id } = useParams();

  return (
    <div className="h-full p-6 overflow-y-auto">
      <h2 className="text-xl mb-4">💬 Chat ID: {id}</h2>
      <div className="h-[80%] bg-white/5 rounded-xl p-4">
        <p className="text-zinc-400">Messages for chat {id} will appear here...</p>
      </div>
    </div>
  );
};

export default ChatWindow;