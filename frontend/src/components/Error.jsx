import { Link } from "react-router";

export default function Error() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center px-4">
      <h1 className="text-5xl font-bold text-black-600 mb-4">Uh oh...</h1>
      <h2 className="text-xl text-gray-700 mb-6">
        Something must have gone wrong :(
      </h2>
      <Link to="/">
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          Return to homepage
        </button>
      </Link>
    </div>
  );
}
