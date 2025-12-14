import { Link } from "react-router-dom";

const LoadingScreen = ({ title = "Loading", subtitle = "Preparing your ReflectHub experience..." }) => {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-[#F6F3FF] overflow-hidden">
      <div className="pointer-events-none absolute -top-20 -left-24 w-[28rem] h-[28rem] rounded-full bg-purple-300/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-20 w-[28rem] h-[28rem] rounded-full bg-pink-300/30 blur-3xl" />

      <div className="relative z-10 w-full max-w-md mx-auto text-center px-6">
        <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-1 rounded-full text-sm font-semibold mb-6">
          ReflectHub
        </div>

        <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl border border-purple-50 p-8">
          <div className="w-full flex justify-center">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mt-5">{title}</h1>
          <p className="text-gray-500 mt-2">{subtitle}</p>

          <div className="mt-6">
            <Link to="/" className="btn btn-ghost btn-sm rounded-full text-primary">
              Go Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
