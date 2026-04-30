import { NavLink } from "react-router-dom";

const menuItems = [
  { id: "home",      icon: <i class="ri-home-2-line"></i>, path: "/",          end: true  },
  { id: "calls",     icon: <i class="ri-phone-line"></i>, path: "/calls",     end: false },
  { id: "messages",  icon: <i class="ri-chat-1-line"></i>, path: "/messages",  end: false },
  { id: "contacts",  icon: <i class="ri-contacts-line"></i>, path: "/contacts",  end: false },
];

const IconSidebar = () => {
  return (
    <div className="w-[50px] sm:w-[70px] h-screen bg-zinc-900 flex flex-col z-50 items-center py-6 flex-shrink-0">
      {menuItems.map((item) => (
        <NavLink
          key={item.id}
          to={item.path}
          end={item.end}
          className={({ isActive }) =>
            `px-2 py-1 sm:px-3 sm:py-2 my-1 rounded-xl transition sm:text-xl
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