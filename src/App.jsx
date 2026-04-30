import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";

import CallDetail from "./pages/CallDetail";
import ChatWindow from "./pages/ChatWindow";
import ContactProfile from "./pages/ContactProfile";

import EmptyState from "./components/EmptyState";

import DialerPanel from "./components/DialerPanel";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Routes>

      <Route path="/" element={<Dashboard />}>

        {/* HOME */}
        <Route
          index
          element={<Home />}
        />

        {/* CALLS */}
        <Route path="calls">

          <Route
            index
            element={
              <EmptyState
                icon="📞"
                title="No Call Selected"
              />
            }
          />

          <Route
            path=":id"
            element={<CallDetail />}
          />

        </Route>

        {/* MESSAGES */}
        <Route path="messages">

          <Route
            index
            element={
              <EmptyState
                icon="💬"
                title="No Chat Selected"
              />
            }
          />

          <Route
            path=":id"
            element={<ChatWindow />}
          />

        </Route>

        {/* CONTACTS */}
        <Route path="contacts">

          <Route
            index
            element={
              <EmptyState
                icon="👤"
                title="No Contact Selected"
              />
            }
          />

          <Route
            path=":id"
            element={<ContactProfile />}
          />

        </Route>

        {/* DIALER */}
        <Route
          path="dialer"
          element={<DialerPanel/>}
        />

      </Route>

    </Routes>
  );
}

export default App;