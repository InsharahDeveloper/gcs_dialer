import { useParams } from "react-router-dom";

const CallDetail = () => {
  const { id } = useParams();

  return (
    <div className="h-full p-6 overflow-y-auto">
      <h2 className="text-2xl font-bold">📞 Call ID: {id}</h2>
      <div className="mt-4 bg-white/5 p-4 rounded-xl">
        <p>Duration: 2 min</p>
        <p>Status: Completed</p>
      </div>
    </div>
  );
};

export default CallDetail;