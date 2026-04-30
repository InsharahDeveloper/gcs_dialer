// components/MessagesList.jsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const MessagesList = ({ activeId }) => {
  const navigate = useNavigate();
  const [chats, setChats] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  
  // Load chats (API se replace hoga)
  useEffect(() => {
    loadChats();
  }, []);
  
  const loadChats = () => {
    setLoading(true);
    // TODO: Replace with actual API call
    // const response = await fetch("/api/chats");
    // const data = await response.json();
    // setChats(data);
    
    setTimeout(() => {
      const mockChats = [
        { 
          id: "10", 
          name: "Ayesha Khan", 
          avatar: "AK", 
          lastMessage: "Hey! How are you?", 
          lastMessageTime: new Date(Date.now() - 300000), 
          unread: 2, 
          online: true,
          typing: false
        },
        { 
          id: "11", 
          name: "Hamza Ali", 
          avatar: "HA", 
          lastMessage: "See you tomorrow!", 
          lastMessageTime: new Date(Date.now() - 3600000), 
          unread: 0, 
          online: false,
          typing: false
        },
        { 
          id: "12", 
          name: "Sarah Ahmed", 
          avatar: "SA", 
          lastMessage: "Meeting at 3pm", 
          lastMessageTime: new Date(Date.now() - 86400000), 
          unread: 1, 
          online: true,
          typing: false
        },
        { 
          id: "13", 
          name: "Bilal Chaudhry", 
          avatar: "BC", 
          lastMessage: "Thanks for the update!", 
          lastMessageTime: new Date(Date.now() - 172800000), 
          unread: 0, 
          online: false,
          typing: false
        }
      ];
      setChats(mockChats);
      setLoading(false);
    }, 500);
  };
  
  const formatTime = (date) => {
    const now = new Date();
    const diff = now - date;
    
    if (diff < 60000) return "Just now";
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m`;
    if (diff < 86400000) return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    return date.toLocaleDateString();
  };
  
  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-orange-500 border-t-transparent"></div>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-white/10">
        <h2 className="text-xl font-semibold mb-3">Chats</h2>
        
        {/* Search */}
        <div className="relative">
          <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"></i>
          <input
            type="text"
            placeholder="Search or start new chat"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-3 py-2 rounded-lg bg-white/5 border border-white/10 focus:outline-none focus:border-orange-500/50 text-sm"
          />
        </div>
      </div>
      
      {/* New Chat Button */}
      <button className="mx-4 mt-3 p-2 rounded-lg bg-orange-500/20 text-orange-400 hover:bg-orange-500/30 transition flex items-center justify-center gap-2">
        <i className="ri-chat-new-line"></i>
        <span className="text-sm font-medium">New Chat</span>
      </button>
      
      {/* Chat List */}
      <div className="flex-1 overflow-y-auto mt-2">
        {filteredChats.map((chat, index) => (
          <motion.div
            key={chat.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.03 }}
            onClick={() => navigate(`/messages/${chat.id}`)}
            className={`
              flex items-center gap-3 p-3 cursor-pointer hover:bg-white/5 transition
              ${activeId === chat.id ? "bg-white/5" : ""}
            `}
          >
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white font-semibold">
                {chat.avatar}
              </div>
              {chat.online && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-zinc-900"></div>
              )}
            </div>
            
            {/* Chat Info */}
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline">
                <h3 className="font-medium truncate">{chat.name}</h3>
                <span className="text-xs text-zinc-500 flex-shrink-0">
                  {formatTime(chat.lastMessageTime)}
                </span>
              </div>
              <div className="flex items-center gap-1">
                {chat.typing ? (
                  <p className="text-sm text-green-400">typing...</p>
                ) : (
                  <p className="text-sm text-zinc-400 truncate">{chat.lastMessage}</p>
                )}
              </div>
            </div>
            
            {/* Unread Badge */}
            {chat.unread > 0 && (
              <div className="w-5 h-5 rounded-full bg-[#00A884] flex items-center justify-center text-xs font-semibold flex-shrink-0">
                {chat.unread}
              </div>
            )}
          </motion.div>
        ))}
        
        {filteredChats.length === 0 && (
          <div className="text-center py-12">
            <i className="ri-chat-3-line text-5xl text-zinc-700 mb-3"></i>
            <p className="text-zinc-500">No chats found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesList;