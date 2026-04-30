import { useNavigate, useMatch } from "react-router-dom";
import { motion } from "framer-motion";
import { SIDEBAR_CONFIG } from "../config/sidebarConfig";

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

  if (!activeConfig) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.2 }}
      className="w-[280px] h-screen bg-zinc-900 border-r border-white/10 flex flex-col flex-shrink-0 overflow-hidden"
    >
      {/* HEADER */}
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <h2 className="text-lg font-semibold capitalize">
          {activeConfig.title}
        </h2>
        <button
          onClick={() => navigate("/")}
          className="lg:hidden p-1 rounded-lg bg-white/5 hover:bg-white/10 transition"
        >
          <i className="ri-close-line text-lg" />
        </button>
      </div>

      {/* LIST */}
      <div className="flex-1 overflow-y-auto p-3">
        {activeConfig.items.length === 0 ? (
          <p className="text-zinc-500 text-sm p-2">No items found.</p>
        ) : (
          activeConfig.items.map((item, index) => {
            const isActive = String(item.id) === String(activeId);
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.03 }}
                onClick={() => navigate(item.path)}
                className={`
                  p-3 rounded-xl cursor-pointer mb-2 transition
                  ${isActive
                    ? "bg-orange-500/20 text-orange-400 border border-orange-500/30"
                    : "bg-white/5 hover:bg-white/10"
                  }
                `}
              >
                <p className="font-medium text-sm">{item.name}</p>
                {item.subtitle && (
                  <p className="text-xs text-zinc-500 mt-0.5">{item.subtitle}</p>
                )}
              </motion.div>
            );
          })
        )}
      </div>
    </motion.div>
  );
};

export default SlidingSidebar;