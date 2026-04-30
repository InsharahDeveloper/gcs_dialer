// Home.jsx — flex-1 hata do, h-full rakho
const Home = () => {
  return (
    <div className="h-full flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold">👋 Welcome Back</h1>
        <p className="text-zinc-400 mt-2">Select a call, chat, or contact</p>
      </div>
    </div>
  );
};

export default Home;