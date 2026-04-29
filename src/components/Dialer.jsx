import { useState } from "react";
import "../App.css"

export default function Dialer() {
    const [number, setNumber] = useState("");
    const [status, setStatus] = useState("");
    const [callHistory, setCallHistory] = useState(["Call 1", "Call 2"]);
    const [voicemail, setVoicemail] = useState(["Voice 1", "Voice 2"]);
    const [archive, setArchive] = useState(["Archived 1"]);
    const [spam, setSpam] = useState(["Spam 1", "Spam 2"]);
    const [activeTab, setActiveTab] = useState("");
    const [showHistory, setShowHistory] = useState(false);
    const theme = {
        primary: "#2563eb",
        success: "#22c55e",
        danger: "#ef4444",
        bg: "#f9fafb",
        card: "#ffffff"
    };

    const handleClick = (digit) => {
        setNumber(number + digit);
    };

    const handleCall = () => {
        if (!number) return;
        setStatus("Calling...");
        setHistory([number, ...history]);

        setTimeout(() => setStatus("Connected"), 200);
    };

    return (
        <div className="h-screen bg-[#f9fafb]">
            <div className="header w-full border-1 h-[10vh]"></div>
            <div className="flex h-[89vh] justify-between">

                {/* LEFT PANEL */}
                <div className="backdrop-blur-lg border-r left-s border-gray-200 bg-[#f9fafb] shadow-xl flex relative">

                    {/* ICON BAR */}
                    <div className="icon h-full border-r border-gray-200 w-[50px] pr-2 z-100 bg-[#f9fafb] relative">

                        <div
                            onClick={() => { setActiveTab("calls"); setShowHistory(true); }}
                            className={`flex items-center justify-center text-2xl my-1 py-1 cursor-pointer 
      ${activeTab === "calls" ? "bg-orange-100 text-orange-600" : "hover:bg-gray-200"}`}
                        >
                            <i className="ri-phone-line"></i>
                        </div>

                        <div
                            onClick={() => { setActiveTab("voice-mail"); setShowHistory(true); }}
                            className={`flex items-center justify-center text-2xl my-1 py-1 cursor-pointer 
      ${activeTab === "voice-mail" ? "bg-orange-100 text-orange-600" : "hover:bg-gray-200"}`}
                        >
                            <i className="ri-record-mail-line"></i>
                        </div>

                        <div
                            onClick={() => { setActiveTab("archieve"); setShowHistory(true); }}
                            className={`flex items-center justify-center text-2xl my-1 py-1 cursor-pointer 
      ${activeTab === "archieve" ? "bg-orange-100 text-orange-600" : "hover:bg-gray-200"}`}
                        >
                            <i className="ri-inbox-archive-line"></i>
                        </div>

                        <div
                            onClick={() => { setActiveTab("spam"); setShowHistory(true); }}
                            className={`flex items-center justify-center text-2xl my-1 py-1 cursor-pointer 
      ${activeTab === "spam" ? "bg-orange-100 text-orange-600" : "hover:bg-gray-200"}`}
                        >
                            <i className="ri-spam-line"></i>
                        </div>
                    </div>

                    {/* HISTORY PANEL */}
                    <div
                        className={`history px-4 bg-[#f9fafb] py-6 w-[210px] sm:w-[250px] lg:w-[300px] shadow-lg
    absolute left-[50px] top-0 h-full
    transform transition-transform duration-300
    ${showHistory ? "translate-x-0" : "-translate-x-full"}
    md:absolute md:translate-x-0 md:block`}
                    >

                        {/* CLOSE BUTTON (mobile only) */}
                        <div className="sm:hidden flex justify-end mb-2 ">
                            <button className="bg-orange-100 text-orange-600 px-1 font-bold cursor-pointer active:scale-[.9] rounded-full" onClick={() => {setShowHistory(false) ; setActiveTab("")}}>
                                <i className="ri-close-line text-xl"></i>
                            </button>
                        </div>

                        {/* DATA */}
                        {!activeTab ? (
  <p className="text-gray-400 text-xl w-full h-full flex items-center justify-center">
    Hello Dear
  </p>
) : (
  <>
    {activeTab === "calls" && (
      callHistory.length === 0 ? (
        <p className="text-gray-400 w-full h-full flex items-center justify-center ">No calls yet</p>
      ) : (
        callHistory.map((num, i) => (
          <div
            key={i}
            onClick={() => setNumber(num)}
            className="cursor-pointer p-3 rounded-lg hover:bg-gray-100 transition mb-2"
          >
            <i className="ri-phone-fill mr-2"></i> {num}
          </div>
        ))
      )
    )}

    {activeTab === "voice-mail" && (
      voicemail.length === 0 ? (
        <p className="text-gray-400 w-full h-full flex items-center justify-center ">No Voice Mails yet</p>
      ) : (
        voicemail.map((num, i) => (
          <div
            key={i}
            onClick={() => setNumber(num)}
            className="cursor-pointer p-3 rounded-lg hover:bg-gray-100 transition mb-2"
          >
            <i className="ri-record-mail-line mr-3"></i> {num}
          </div>
        ))
      )
    )}

    {activeTab === "archieve" && (
      archive.length === 0 ? (
        <p className="text-gray-400 w-full h-full flex items-center justify-center ">No Voice Mails yet</p>
      ) : (
        archive.map((num, i) => (
          <div
            key={i}
            onClick={() => setNumber(num)}
            className="cursor-pointer p-3 rounded-lg hover:bg-gray-100 transition mb-2"
          >
            <i className="ri-inbox-archive-line mr-2"></i> {num}
          </div>
        ))
      )
    )}

    {activeTab === "spam" && (
      spam.length === 0 ? (
        <p className="text-gray-400 w-full h-full flex items-center justify-center ">No Voice Mails yet</p>
      ) : (
        spam.map((num, i) => (
          <div
            key={i}
            onClick={() => setNumber(num)}
            className="cursor-pointer p-3 rounded-lg hover:bg-gray-100 transition mb-2"
          >
            <i className="ri-spam-line mr-2"></i> {num}
          </div>
        ))
      )
    )}
  </>
)}
                    </div>
                </div>

                {/* RIGHT PANEL */}
                <div className="backdrop-blur-md inset-shadow-sm/20 z-[1] dial-pad w-[300px] flex items-center justify-center items-center">

                    <div className=" h-full w-full flex flex-col justify-around items-center text-center py-4">

                        {/* Number Display */}
                        <div className="flex w-full border-1 border-gray-200 text-gray-500 justify-between px-5 py-2 items-center">

                            <div name="" id="">
                                {number || "Enter a number"}
                            </div>

                            <button
                                onClick={handleCall}
                                disabled={!number}  // 👈 yahan condition lagayi
                                className={`flex items-center justify-center px-6 py-3 rounded-3xl transition 
      ${!number ? "bg-gray-100 text-gray-300 cursor-not-allowed" : "bg-gray-200 text-gray-500"}
    `}
                            >
                                <i className="ri-phone-fill"></i>
                            </button>

                        </div>

                        {/* Status */}
                        <div className="text-sm text-gray-400">{status}</div>



                        {/* Dial Pad */}
                        <div className="grid grid-cols-3 items-center gap-x-5 gap-y-3">
                            {["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "#", "reset"].map((d, index) => (
                                <button
                                    key={index}
                                    onClick={() => d === "reset" ? setNumber(number.slice(0, -1)) : handleClick(d)}
                                    disabled={d === "reset" && !number} // 👈 yahan add kiya
                                    className={`w-13 h-12 rounded-full transition
        font-semibold 
        ${d === "reset"
                                            ? `col-start-2 ${!number ? "bg-gray-100 text-gray-300 cursor-not-allowed inset-shadow-xs" : "cursor-pointer bg-white shadow-md hover:shadow-xl hover:scale-105  inset-shadow-sm/20"}`
                                            : "cursor-pointer bg-white shadow-md hover:shadow-xl hover:scale-105  inset-shadow-sm/20"}
        ${d === "*" ? "text-4xl pt-2" : "text-xl"}
      `}
                                >
                                    {d === "reset" ? <i className="ri-close-fill"></i> : d}
                                </button>
                            ))}
                        </div>
                        {/* Call Buttons */}
                        <div className="flex justify-center items-center gap-10 w-[70%]">


                            <button
                                onClick={() => setStatus("Call Ended")}
                                className="text-orange-100 bg-orange-600 font-semibold px-6 py-2 rounded-full shadow-lg hover:scale-105 transition"
                            >
                                End
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}