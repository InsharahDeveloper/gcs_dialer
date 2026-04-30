import { Outlet, useMatch, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import IconSidebar from "../components/IconSidebar";
import SlidingSidebar from "../components/SlidingSidebar";
import DialerPanel from "../components/DialerPanel";
import DialerToggleButton from "../components/DialerToggleButton";

export default function Dashboard() {
  const location = useLocation();

  const callsMatch = useMatch("/calls/*");
  const messagesMatch = useMatch("/messages/*");
  const contactsMatch = useMatch("/contacts/*");
  const dialerMatch = useMatch("/dialer");

  const hasSidebar = callsMatch || messagesMatch || contactsMatch;
  // Mobile/tablet: dialer only when route is /dialer
  // lg+: dialer ALWAYS visible (permanent right panel)
  const showDialerMobile = !!dialerMatch;

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-zinc-950 text-white">
      {/* Left icon sidebar */}
      <IconSidebar />

      {/* Sliding sidebar (calls/messages/contacts list) */}
      <AnimatePresence mode="wait">
        {hasSidebar && <SlidingSidebar key={location.pathname.split("/")[1]} />}
      </AnimatePresence>

      {/* Main content — pushed left on lg when dialer is permanent */}
      <main className="flex-1 min-w-0 overflow-y-auto lg:pr-[420px]">
        <Outlet />
      </main>

      {/* Mobile/tablet dialer (overlay, only when /dialer route) */}
      <AnimatePresence>
        {showDialerMobile && (
          <div className="lg:hidden ">
            <DialerPanel />
          </div>
        )}
      </AnimatePresence>

      {/* lg+ permanent dialer on right side */}
      <aside className="hidden lg:flex  fixed top-0 right-0 h-full w-[340px] z-[40] border-l border-zinc-800 bg-zinc-900">
        <DialerPanel permanent />
      </aside>

      {/* Floating dialer button — only mobile/tablet, hidden on lg+ and on /dialer route */}
      {!showDialerMobile && (
        <div className="lg:hidden">
          <DialerToggleButton />
        </div>
      )}
    </div>
  );
}
