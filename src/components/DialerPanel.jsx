// DialerPanel.jsx - ONLY DialerContent body changed, rest same
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const DialerPanel = ({ permanent = false }) => {
  const navigate = useNavigate();

  // Permanent (lg+) — right side fixed panel
  if (permanent) {
    return (
      <div className="flex h-full w-full flex-col text-white border-l border-zinc-800">
        <DialerContent permanent onClose={() => navigate("/")} />
      </div>
    );
  }

  // Mobile/Tablet — centered modal with blurred backdrop
  return (
    <AnimatePresence>
      <motion.div
        key="dialer-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={() => navigate("/")}
        className="fixed inset-0 z-[60] flex items-center justify-center backdrop-blur-md p-4"
      >
        <motion.div
          key="dialer-panel"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ type: "spring", damping: 22, stiffness: 280 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-[380px] sm:max-w-[400px] max-h-[90vh] overflow-hidden border-1 border-gray-700 rounded-2xl bg-zinc-900 text-white shadow-2xl"
        >
          <DialerContent permanent={false} onClose={() => navigate("/")} />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const DialerContent = ({ permanent, onClose }) => {
  // --- ONLY THIS PART CHANGED ---
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isValid, setIsValid] = useState(false);

  const handleNumberClick = (value) => {
    let newNumber = phoneNumber;
    
    if (value === "×") {
      // Delete last character
      newNumber = phoneNumber.slice(0, -1);
    } else if (value === "+") {
      // Add + only if not already present at start
      if (!phoneNumber.startsWith("+")) {
        newNumber = "+" + phoneNumber;
      }
    } else {
      // Add number
      newNumber = phoneNumber + value.toString();
    }
    
    setPhoneNumber(newNumber);
    
    // Validate: has at least one number or + sign
    const hasValidChar = /[\d+]/.test(newNumber);
    setIsValid(hasValidChar && newNumber.length > 0);
  };

  const handleVideoCall = () => {
    if (isValid && phoneNumber) {
      console.log("Video Calling:", phoneNumber);
      // TODO: Implement actual calling logic
      alert(`Calling ${phoneNumber}...`);
    }
  };

    const handleCall = () => {
    if (isValid && phoneNumber) {
      console.log("Calling:", phoneNumber);
      // TODO: Implement actual calling logic
      alert(`Calling ${phoneNumber}...`);
    }
  };
  // --- END OF CHANGED PART ---

  return (
    <div className="flex h-full w-full flex-col">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-zinc-800 p-4">
        <h2 className="text-lg font-semibold">Dialer</h2>
        {!permanent && (
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-800 hover:bg-zinc-700 transition"
            aria-label="Close dialer"
          >
            <i className="ri-close-line text-xl" />
          </button>
        )}
      </div>

      {/* Body */}
      <div className="flex-1 ites-center overflow-y-wrap">
        {/* Input Field */}
        <div className="flex w-full p-3  bg-white/2 transition outline-none text-center text-lg ">
        <input
          type="tel"
          value={phoneNumber}
          onChange={(e) => {
            setPhoneNumber(e.target.value);
            const hasValidChar = /[\d+]/.test(e.target.value);
            setIsValid(hasValidChar && e.target.value.length > 0);
          }}
          placeholder="Enter number"
          className={`w-full ps-2 transition outline-none text-lg
            ${isValid 
              ? "border-orange-500/50 focus:border-orange-500" 
              : "border-white/10 focus:border-white/20"
            }
          `}
        />

         <div className="flex items-center justify-center gap-2">

        {/* Call Button - Disabled until valid number */}
        <button
          onClick={handleCall}
          disabled={!isValid}
          className={`py-2 px-3 rounded-xl text-xl transition-all
            ${isValid 
              ? "bg-zinc-700 text-gray-300 hover:shadow-lg hover:scale-105 active:scale-95" 
              : "bg-zinc-800 text-gray-500 cursor-not-allowed"
            }
          `}
        >
          <i className="ri-phone-line"></i>
        </button>

        {/* Video Call Button - Optional */}
        <button
          onClick={handleVideoCall}
          disabled={!isValid}
          className={`py-2 px-3 rounded-xl text-xl transition-all 
            ${isValid 
              ? "bg-zinc-700 text-gray-300 hover:shadow-lg hover:scale-105 active:scale-95" 
              : "bg-zinc-800 text-gray-500 cursor-not-allowed"
            }
          `}
        >
<i className="ri-vidicon-line"></i>
        </button>
        </div>

        </div>
        

        {/* Keypad Grid */}
        <div className="grid grid-cols-3 gap-5 mt-6 mx-8">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
            <button
              key={item}
              onClick={() => handleNumberClick(item)}
              className="py-4 backdrop-blur-sm border border-gray-200/20 rounded-xl bg-white/10 hover:bg-white/8 hover:border-orange-400/20 transition text-lg font-medium hover:scale-105 shadow-inner shadow-gray-400/20  hover:shadow-[inset_0_4px_10px_rgba(255,255,255,0.05)] active:scale-95"
            >
              {item}
            </button>
          ))}
          
          {/* Plus Button */}
          <button
            onClick={() => handleNumberClick("+")}
            className={`py-4 backdrop-blur-sm border border-gray-200/20 rounded-xl bg-white/10 hover:bg-white/8 hover:border-orange-400/20 transition text-lg font-medium hover:scale-105 shadow-inner shadow-gray-400/20  hover:shadow-[inset_0_4px_10px_rgba(255,255,255,0.05)] active:scale-95`}
          >
            +
          </button>
          
          {/* Zero Button */}
          <button
            onClick={() => handleNumberClick(0)}
            className="py-4 backdrop-blur-sm border border-gray-200/20 rounded-xl bg-white/10 hover:bg-white/8 hover:border-orange-400/20 transition text-lg font-medium hover:scale-105 shadow-inner shadow-gray-400/20  hover:shadow-[inset_0_4px_10px_rgba(255,255,255,0.05)] active:scale-95"
          >
            0
          </button>
          
          {/* Delete Button */}
          <button
            onClick={() => handleNumberClick("×")}
                className={`py-4 rounded-xl transition text-lg font-medium
              ${isValid 
              ? "backdrop-blur-sm border border-gray-200/20 bg-white/10 hover:bg-white/8 border-gray-200/20 hover:border-orange-400/20 hover:scale-105 shadow-inner active:scale-95 hover:shadow-[inset_0_4px_10px_rgba(255,255,255,0.05)]" 
              : "bg-white/3 text-gray-500 cursor-not-allowed"
            }`}     >
            ×
          </button>


        </div>
<div className="flex items-center justify-center my-5">
            <button
          onClick={handleVideoCall}
          disabled={!isValid}
          className={`px-5 py-4  rounded-full flex items-center justify-center text-2xl transition-all
            ${isValid 
              ? "bg-green-600 text-gray-100 hover:shadow-lg hover:scale-105 active:scale-95" 
              : "bg-green-600/20 text-white/10 cursor-not-allowed"
            }
          `}
        >
<i className="ri-phone-fill"></i>
        </button>
        </div>
      </div>
    </div>
  );
};

export default DialerPanel;