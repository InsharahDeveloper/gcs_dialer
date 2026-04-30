import { Outlet, useLocation, useMatch } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import IconSidebar from "../components/IconSidebar";
import SlidingSidebar from "../components/SlidingSidebar";
import DialerToggleButton from "../components/DialerToggleButton";

const Dashboard = () => {
  const location = useLocation();
  const isDialerRoute = useMatch("/dialer");

  // "calls" | "messages" | "contacts" | "dialer" | ""
  const section = location.pathname.split("/")[1];
  const hasSidebar = ["calls", "messages", "contacts"].includes(section);

  return (
    <div className="h-screen flex bg-zinc-950 text-white overflow-hidden">

      {/* 1. Icon Sidebar — always visible */}
      <IconSidebar />

      {/* 2. Sliding Sidebar — only calls/messages/contacts */}
      <AnimatePresence>
        {hasSidebar && !isDialerRoute && (
          <SlidingSidebar key={section} />
        )}
      </AnimatePresence>

      {/* 3. Main Content */}
      <div className="flex-1 min-w-0 overflow-hidden relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="h-full"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 4. Dialer toggle button — mobile only */}
      {!isDialerRoute && <DialerToggleButton />}

    </div>
  );
};

export default Dashboard;