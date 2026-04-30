import { useNavigate } from "react-router-dom";

const DialerToggleButton = () => {

  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/dialer")}
      className="lg:hidden fixed bottom-5 right-5 z-[100] w-14 h-14 rounded-full bg-orange-500"
    >
      <i className="ri-phone-fill text-2xl"></i>
    </button>
  );
};

export default DialerToggleButton;