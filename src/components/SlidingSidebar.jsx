// SlidingSidebar.jsx - Updated with Chat List Integration
import { useNavigate, useMatch } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { SIDEBAR_CONFIG } from "../config/sidebarConfig";
import MessagesList from "../data/MessagesList";

const SlidingSidebar = () => {
  const navigate = useNavigate();

  // ALL useMatch hooks at top level inside the component — not in custom hook outside
  const callsMatch = useMatch("/calls/*");
  const msgsMatch  = useMatch("/messages/*");
  const contsMatch = useMatch("/contacts/*");

  const callDetailMatch = useMatch("/calls/:id");
  const msgDetailMatch  = useMatch("/messages/:id");
  const contDetailMatch = useMatch("/contacts/:id");

  // Find active section
  const activeConfig =
    callsMatch ? SIDEBAR_CONFIG.find((s) => s.match === "/calls")    :
    msgsMatch  ? SIDEBAR_CONFIG.find((s) => s.match === "/messages") :
    contsMatch ? SIDEBAR_CONFIG.find((s) => s.match === "/contacts") :
    null;

  // Find active item id
  const activeId =
    callDetailMatch?.params?.id ||
    msgDetailMatch?.params?.id  ||
    contDetailMatch?.params?.id ||
    null;

  // State for search and real-time updates
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  
  // Filter items based on search
  useEffect(() => {
    if (activeConfig && activeConfig.items) {
      if (searchTerm) {
        setFilteredItems(
          activeConfig.items.filter(item =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
        );
      } else {
        setFilteredItems(activeConfig.items);
      }
    }
  }, [searchTerm, activeConfig]);
  
  if (!activeConfig) return null;

  // Special rendering for messages tab with WhatsApp-style chat list
  const renderContent = () => {
    if (activeConfig.match === "/messages") {
      return <MessagesList activeId={activeId} />;
    }
    
    // For calls and contacts, use the existing list style
    return (
      <>
        {/* Search Bar for Calls & Contacts */}
        <div className="p-3 border-b border-white/10">
          <div className="relative">
            <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-sm"></i>
            <input
              type="text"
              placeholder={`Search ${activeConfig.title}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-lg bg-white/5 border border-white/10 focus:outline-none focus:border-orange-500/50 text-sm"
            />
          </div>
        </div>
        
        {/* List Items */}
        <div className="flex-1 overflow-y-auto p-2">
          {filteredItems.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-4xl mb-2 opacity-50">
                {activeConfig.match === "/calls" ? "📞" : "👤"}
              </div>
              <p className="text-zinc-500 text-sm">
                No {activeConfig.title} found
              </p>
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm("")}
                  className="mt-2 text-xs text-orange-400 hover:text-orange-300"
                >
                  Clear search
                </button>
              )}
            </div>
          ) : (
            filteredItems.map((item, index) => {
              const isActive = String(item.id) === String(activeId);
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.03 }}
                  onClick={() => navigate(item.path)}
                  className={`
                    p-3 rounded-xl cursor-pointer mb-2 transition-all
                    ${isActive
                      ? "bg-orange-500/20 text-orange-400 border-l-4 border-orange-500"
                      : "bg-white/5 hover:bg-white/10 hover:translate-x-1"
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    {/* Avatar for contacts */}
                    {activeConfig.match === "/contacts" && (
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white font-semibold text-sm">
                        {item.name.charAt(0)}
                      </div>
                    )}
                    
                    {/* Call icon for calls */}
                    {activeConfig.match === "/calls" && (
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                        <i className={`text-xl ${
                          item.type === "missed" 
                            ? "ri-phone-missed-line text-red-400" 
                            : item.type === "incoming"
                            ? "ri-phone-incoming-line text-green-400"
                            : "ri-phone-outgoing-line text-blue-400"
                        }`}></i>
                      </div>
                    )}
                    
                    <div className="flex-1">
                      <p className="font-medium text-sm">{item.name}</p>
                      {item.subtitle && (
                        <p className="text-xs text-zinc-500 mt-0.5">{item.subtitle}</p>
                      )}
                      {item.time && (
                        <p className="text-xs text-zinc-600 mt-0.5">{item.time}</p>
                      )}
                    </div>
                    
                    {/* Badge for unread */}
                    {item.unread && item.unread > 0 && (
                      <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-xs font-semibold">
                        {item.unread}
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })
          )}
        </div>
      </>
    );
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeConfig.match}
        initial={{ opacity: 1, x: -300 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 1, x: -300 }}
        transition={{ duration: 0.3 }}
        className={`
          w-[80%] sm:w-[320px] h-screen bg-zinc-900 border-r border-white/10 
          flex flex-col flex-shrink-0 overflow-hidden z-40
          ${activeId ? "hidden lg:flex" : "fixed sm:relative left-[50px] sm:left-0"}
        `}
      >
        {/* HEADER - Only for non-messages tabs */}
        {activeConfig.match !== "/messages" && (
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <h2 className="text-lg font-semibold capitalize bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
              {activeConfig.title}
            </h2>
            <button
              onClick={() => navigate("/")}
              className="lg:hidden p-1 rounded-lg bg-white/5 hover:bg-white/10 transition"
            >
              <i className="ri-close-line text-lg" />
            </button>
          </div>
        )}
        
        {/* Dynamic Content */}
        {renderContent()}
        
        {/* Footer Actions */}
        {activeConfig.match === "/contacts" && (
          <div className="p-3 border-t border-white/10">
            <button className="w-full py-2 rounded-lg bg-orange-500/20 text-orange-400 hover:bg-orange-500/30 transition text-sm font-medium flex items-center justify-center gap-2">
              <i className="ri-user-add-line"></i>
              <span>Add New Contact</span>
            </button>
          </div>
        )}
        
        {activeConfig.match === "/calls" && (
          <div className="p-3 border-t border-white/10">
            <button className="w-full py-2 rounded-lg bg-white/5 text-zinc-400 hover:bg-white/10 transition text-sm font-medium flex items-center justify-center gap-2">
              <i className="ri-history-line"></i>
              <span>Call History</span>
            </button>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default SlidingSidebar;