import { Link, useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-[#F6F3FF] overflow-hidden">

      {/* Decorative blobs */}
      <div className="pointer-events-none absolute -top-20 -left-24 w-[28rem] h-[28rem] rounded-full bg-purple-300/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-20 w-[28rem] h-[28rem] rounded-full bg-pink-300/30 blur-3xl" />

      {/* Card */}
      <div className="relative z-10 max-w-2xl mx-auto text-center px-6">
        <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-1 rounded-full text-sm font-semibold mb-6">
          ReflectHub
        </div>

        <h1 className="text-[6rem] leading-none font-extrabold tracking-tight bg-gradient-to-r from-[#7C3AED] via-[#8B5CF6] to-[#EC4899] bg-clip-text text-transparent drop-shadow-sm">
          404
        </h1>

        <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mt-4">
          Page not found
        </h2>
        <p className="text-gray-500 mt-3 max-w-xl mx-auto">
          The page you’re looking for doesn’t exist or has been moved.
          Let’s get you back on track.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="btn btn-primary text-white rounded-full px-8 shadow-lg hover:shadow-xl"
          >
            Go Home
          </Link>
          <Link
            to="/lessons"
            className="btn btn-outline border-primary text-primary rounded-full px-8"
          >
            Explore Lessons
          </Link>
          <button
            onClick={() => navigate(-1)}
            className="btn btn-ghost rounded-full"
          >
            Go Back
          </button>
        </div>

        <p className="text-xs text-gray-400 mt-6">
          If you believe this is a mistake, please contact support.
        </p>
      </div>
    </div>
  );
};

export default NotFound;