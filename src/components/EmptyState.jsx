// EmptyState.jsx
const EmptyState = ({ title, description, icon }) => {
  return (
    <div className="h-full flex items-center justify-center">
      <div className="text-center">
        <div className="text-5xl mb-4 opacity-60">{icon}</div>
        <h2 className="text-2xl font-semibold mb-2">{title}</h2>
        <p className="text-zinc-400">{description}</p>
      </div>
    </div>
  );
};

export default EmptyState;