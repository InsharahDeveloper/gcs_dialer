// pages/ChatWindow.jsx - Pure UI Component
import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const ChatWindow = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // UI State
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const [replyTo, setReplyTo] = useState(null);
  const [editingMessage, setEditingMessage] = useState(null);
  
  // Chat Data State (API se replace hoga)
  const [chat, setChat] = useState({
    id: id,
    name: id === "10" ? "Ayesha Khan" : id === "11" ? "Hamza Ali" : "Sarah Ahmed",
    avatar: id === "10" ? "AK" : id === "11" ? "HA" : "SA",
    status: "online",
    lastSeen: "Online",
    phone: "+92 300 1234567",
    isOnline: true,
    isGroup: false
  });
  
  // Messages State (API se replace hoga)
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [typingUsers, setTypingUsers] = useState({});
  
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const typingTimeoutRef = useRef(null);
  
  // Load messages (API call replace karein)
  useEffect(() => {
    loadMessages();
  }, [id]);
  
  const loadMessages = () => {
    setLoading(true);
    // TODO: Replace with actual API call
    // const response = await fetch(`/api/messages/${id}`);
    // const data = await response.json();
    // setMessages(data);
    
    // Mock data for UI
    setTimeout(() => {
      const mockMessages = [
        {
          id: "1",
          chatId: id,
          text: "Hey! How are you doing?",
          senderId: "user2",
          senderName: chat.name,
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          status: "read",
          type: "text",
          reactions: { "👍": ["user2"] }
        },
        {
          id: "2",
          chatId: id,
          text: "I'm good! Working on the new chat app. It's coming along nicely! 🚀",
          senderId: "current-user",
          senderName: "You",
          timestamp: new Date(Date.now() - 3500000).toISOString(),
          status: "read",
          type: "text",
          reactions: {}
        },
        {
          id: "3",
          chatId: id,
          text: "That's awesome! Can I test it? 😊",
          senderId: "user2",
          senderName: chat.name,
          timestamp: new Date(Date.now() - 3400000).toISOString(),
          status: "read",
          type: "text",
          reactions: {}
        }
      ];
      setMessages(mockMessages);
      setLoading(false);
    }, 500);
  };
  
  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
  // Send message (API call replace karein)
  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;
    
    const tempMessage = {
      id: Date.now().toString(),
      chatId: id,
      text: newMessage,
      senderId: "current-user",
      senderName: "You",
      timestamp: new Date().toISOString(),
      status: "sending",
      type: "text",
      reactions: {}
    };
    
    // Add to UI immediately
    setMessages(prev => [...prev, tempMessage]);
    setNewMessage("");
    setShowEmojiPicker(false);
    
    // TODO: Replace with actual API call
    // await fetch(`/api/messages/${id}`, {
    //   method: "POST",
    //   body: JSON.stringify({ text: newMessage })
    // });
    
    // Update message status after "sent"
    setTimeout(() => {
      setMessages(prev => prev.map(msg => 
        msg.id === tempMessage.id 
          ? { ...msg, status: "sent" }
          : msg
      ));
    }, 500);
    
    setTimeout(() => {
      setMessages(prev => prev.map(msg => 
        msg.id === tempMessage.id 
          ? { ...msg, status: "delivered" }
          : msg
      ));
    }, 1000);
    
    // Simulate reply (optional)
    simulateReply();
  };
  
  const simulateReply = () => {
    setTimeout(() => {
      const replyMessage = {
        id: (Date.now() + 1000).toString(),
        chatId: id,
        text: getAutoReply(newMessage),
        senderId: "user2",
        senderName: chat.name,
        timestamp: new Date().toISOString(),
        status: "read",
        type: "text",
        reactions: {}
      };
      setMessages(prev => [...prev, replyMessage]);
    }, 2000);
  };
  
  const getAutoReply = (message) => {
    const replies = [
      "Interesting! Tell me more 😊",
      "I see! That's great 👍",
      "Thanks for sharing! 🙏",
      "Let's catch up soon! 🎉",
      "Sounds good to me! ✅"
    ];
    return replies[Math.floor(Math.random() * replies.length)];
  };
  
  // Typing indicator
  const handleTyping = (e) => {
    setNewMessage(e.target.value);
    
    if (!isTyping && e.target.value.length > 0) {
      setIsTyping(true);
      // TODO: Send typing status to API
      // await fetch(`/api/typing/${id}`, { method: "POST" });
    }
    
    clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
    }, 1000);
  };
  
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  // Emoji handling
  const addEmoji = (emoji) => {
    setNewMessage(prev => prev + emoji);
    inputRef.current?.focus();
  };
  
  // Add reaction to message
  const addReaction = (messageId, emoji) => {
    // TODO: API call to add reaction
    setMessages(prev => prev.map(msg => {
      if (msg.id === messageId) {
        const reactions = { ...msg.reactions };
        if (!reactions[emoji]) reactions[emoji] = [];
        reactions[emoji].push("current-user");
        return { ...msg, reactions };
      }
      return msg;
    }));
  };
  
  // Format utilities
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    
    if (diff < 60000) return "Just now";
    if (diff < 3600000) return `${Math.floor(diff / 60000)} min ago`;
    if (diff < 86400000) return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    return date.toLocaleDateString();
  };
  
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) return "Today";
    if (date.toDateString() === yesterday.toDateString()) return "Yesterday";
    return date.toLocaleDateString([], { month: "short", day: "numeric" });
  };
  
  const getMessageStatusIcon = (status) => {
    switch(status) {
      case "sending": return <i className="ri-time-line text-xs"></i>;
      case "sent": return <i className="ri-check-line text-xs"></i>;
      case "delivered": return <i className="ri-check-double-line text-xs"></i>;
      case "read": return <i className="ri-check-double-line text-xs text-blue-400"></i>;
      default: return null;
    }
  };
  
  // Group messages by date
  const groupedMessages = messages.reduce((groups, message) => {
    const date = formatDate(message.timestamp);
    if (!groups[date]) groups[date] = [];
    groups[date].push(message);
    return groups;
  }, {});
  
  const commonEmojis = ["😀", "😂", "❤️", "👍", "😮", "😢", "🙏", "🎉", "🔥", "✨", "🥺", "😎"];
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-zinc-400">Loading messages...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col h-full bg-gradient-to-b min-w-[200px] from-zinc-900 to-zinc-950">
      {/* Chat Header */}
      <div className="sticky top-0 z-10 bg-zinc-900/95 backdrop-blur-sm border-b border-white/10">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate(-1)}
              className="lg:hidden p-2 -ml-2 rounded-full hover:bg-white/10 transition"
            >
              <i className="ri-arrow-left-line text-xl"></i>
            </button>
            
            <div className="relative cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white font-semibold">
                {chat.avatar}
              </div>
              {chat.isOnline && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-zinc-900"></div>
              )}
            </div>
            
            <div>
              <h2 className="font-semibold">{chat.name}</h2>
              <p className="text-xs text-zinc-400">
                {isTyping ? (
                  <span className="text-green-400">typing...</span>
                ) : (
                  chat.isOnline ? "Online" : "Offline"
                )}
              </p>
            </div>
          </div>
          
          <div className="flex gap-1">
            <button className="p-2 rounded-full hover:bg-white/10 transition">
              <i className="ri-phone-line text-xl"></i>
            </button>
            <button className="p-2 rounded-full hover:bg-white/10 transition">
              <i className="ri-vidicon-line text-xl"></i>
            </button>
            <button className="p-2 rounded-full hover:bg-white/10 transition">
              <i className="ri-more-2-fill text-xl"></i>
            </button>
          </div>
        </div>
      </div>
      
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {Object.entries(groupedMessages).map(([date, dateMessages]) => (
          <div key={date}>
            <div className="flex justify-center mb-4">
              <div className="px-3 py-1 rounded-full bg-white/10 text-xs text-zinc-400">
                {date}
              </div>
            </div>
            
            {dateMessages.map((message, idx) => {
              const isOwnMessage = message.senderId === "current-user";
              const showAvatar = !isOwnMessage && 
                (idx === 0 || dateMessages[idx - 1]?.senderId !== message.senderId);
              
              return (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex mb-2 ${isOwnMessage ? "justify-end" : "justify-start"}`}
                >
                  <div className={`flex gap-2 max-w-[75%] ${isOwnMessage ? "flex-row-reverse" : ""}`}>
                    {!isOwnMessage && showAvatar && (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white text-xs font-semibold flex-shrink-0 mt-1">
                        {chat.avatar}
                      </div>
                    )}
                    
                    <div className={`relative group ${!isOwnMessage && !showAvatar ? "ml-10" : ""}`}>
                      <div className={`
                        px-3 py-2 rounded-2xl relative
                        ${isOwnMessage 
                          ? "bg-[#005C4B] text-white" 
                          : "bg-[#202C33] text-white"
                        }
                      `}>
                        <p className="text-sm whitespace-pre-wrap break-words pr-6">
                          {message.text}
                        </p>
                        
                        <div className={`flex items-center gap-1 mt-1 text-[10px] ${isOwnMessage ? "justify-end" : "justify-start"} opacity-70`}>
                          <span>{formatTime(message.timestamp)}</span>
                          {isOwnMessage && getMessageStatusIcon(message.status)}
                        </div>
                      </div>
                      
                      {/* Reactions */}
                      {Object.keys(message.reactions).length > 0 && (
                        <div className="flex gap-1 mt-1 ml-2">
                          {Object.entries(message.reactions).map(([emoji, users]) => (
                            <button
                              key={emoji}
                              onClick={() => addReaction(message.id, emoji)}
                              className="px-1.5 py-0.5 bg-white/10 rounded-full text-xs hover:bg-white/20 transition"
                            >
                              {emoji} {users.length}
                            </button>
                          ))}
                        </div>
                      )}
                      
                      {/* Message Actions */}
                      <div className={`
                        absolute top-1/2 -translate-y-1/2 hidden group-hover:flex gap-1
                        ${isOwnMessage ? "-left-16" : "-right-16"}
                      `}>
                        <button 
                          onClick={() => {
                            setReplyTo(message);
                            inputRef.current?.focus();
                          }}
                          className="p-1.5 rounded-full bg-zinc-800 hover:bg-zinc-700 text-xs"
                        >
                          <i className="ri-reply-line"></i>
                        </button>
                        <button 
                          onClick={() => setShowActions(!showActions)}
                          className="p-1.5 rounded-full bg-zinc-800 hover:bg-zinc-700 text-xs"
                        >
                          <i className="ri-emoji-sticker-line"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ))}
        
        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex justify-start mb-2">
            <div className="bg-[#202C33] px-4 py-2 rounded-2xl">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-white/50 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></span>
                <span className="w-2 h-2 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      {/* Reply Preview */}
      {replyTo && (
        <div className="border-t border-white/10 bg-white/5 px-4 py-2 flex justify-between items-center">
          <div className="flex-1">
            <p className="text-xs text-orange-400">Replying to {replyTo.senderName}</p>
            <p className="text-sm text-zinc-400 truncate">{replyTo.text}</p>
          </div>
          <button onClick={() => setReplyTo(null)} className="p-1 hover:bg-white/10 rounded">
            <i className="ri-close-line"></i>
          </button>
        </div>
      )}
      
      {/* Message Input */}
      <div className="sticky bottom-0 bg-zinc-900/95 backdrop-blur-sm border-t border-white/10 px-4 py-3">
        <div className="flex items-end gap-2">
          <button 
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className="p-2 rounded-full hover:bg-white/10 transition flex-shrink-0"
          >
            <i className="ri-emotion-line text-xl"></i>
          </button>
          
          <button className="p-2 rounded-full hover:bg-white/10 transition flex-shrink-0">
            <i className="ri-attachment-2 text-xl"></i>
          </button>
          
          <div className="flex-1 relative">
            <textarea
              ref={inputRef}
              value={newMessage}
              onChange={handleTyping}
              onKeyPress={handleKeyPress}
              placeholder="Type a message"
              className="w-full px-4 py-2 bg-[#202C33] rounded-2xl focus:outline-none resize-none text-white placeholder:text-zinc-400 max-h-32"
              rows={1}
              style={{ minHeight: "42px" }}
              onInput={(e) => {
                e.target.style.height = "auto";
                e.target.style.height = `${Math.min(e.target.scrollHeight, 128)}px`;
              }}
            />
          </div>
          
          <button
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className={`
              p-2 rounded-full transition flex-shrink-0
              ${newMessage.trim() 
                ? "text-[#00A884] hover:bg-white/10" 
                : "text-zinc-600 cursor-not-allowed"
              }
            `}
          >
            <i className="ri-send-plane-fill text-2xl"></i>
          </button>
        </div>
        
        {/* Emoji Picker */}
        <AnimatePresence>
          {showEmojiPicker && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute bottom-full left-0 right-0 mb-2 p-3 bg-[#202C33] rounded-2xl shadow-xl"
            >
              <div className="grid grid-cols-8 gap-2">
                {commonEmojis.map((emoji, idx) => (
                  <button
                    key={idx}
                    onClick={() => addEmoji(emoji)}
                    className="w-10 h-10 hover:bg-white/10 rounded-lg transition text-2xl"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ChatWindow;