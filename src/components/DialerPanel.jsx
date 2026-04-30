import { useNavigate } from "react-router-dom";

const DialerPanel = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-full bg-zinc-900 p-6 overflow-y-auto">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Dialer</h2>
        <button
          onClick={() => navigate(-1)}
          className="lg:hidden p-2 rounded-xl bg-white/5 hover:bg-white/10 transition"
        >
          <i className="ri-close-line text-xl" />
        </button>
      </div>

      {/* INPUT */}
      <input
        type="text"
        placeholder="Enter number"
        className="w-full p-3 rounded-xl bg-white/5 border border-white/10 outline-none"
      />

      {/* KEYPAD */}
      <div className="grid grid-cols-3 gap-4 mt-6">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, "*", 0, "#"].map((item, index) => (
          <button
            key={index}
            className="h-14 rounded-xl bg-white/5 hover:bg-white/10 transition text-lg font-medium"
          >
            {item}
          </button>
        ))}
      </div>

      <button className="w-full h-14 rounded-xl bg-orange-500 mt-6 font-semibold hover:bg-orange-600 transition">
        Call
      </button>

    </div>
  );
};

export default DialerPanel;