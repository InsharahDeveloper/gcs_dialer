import { NavLink } from "react-router-dom";

const menuItems = [
  { id: "home",      icon: "🏠", path: "/",          end: true  },
  { id: "calls",     icon: "📞", path: "/calls",     end: false },
  { id: "messages",  icon: "💬", path: "/messages",  end: false },
  { id: "contacts",  icon: "👤", path: "/contacts",  end: false },
  { id: "analytics", icon: "📊", path: "/analytics", end: false },
];

const IconSidebar = () => {
  return (
    <div className="w-[70px] h-screen bg-zinc-900 flex flex-col z-50 items-center py-6 flex-shrink-0">
      {menuItems.map((item) => (
        <NavLink
          key={item.id}
          to={item.path}
          end={item.end}
          className={({ isActive }) =>
            `px-3 py-2 my-1 rounded-xl transition text-xl
            ${isActive
              ? "bg-orange-500/20 text-orange-400"
              : "hover:bg-white/10"
            }`
          }
        >
          {item.icon}
        </NavLink>
      ))}
    </div>
  );
};

export default IconSidebar;