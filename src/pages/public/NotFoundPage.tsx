import {Link} from "react-router-dom";

export default function NotFoundPage() {
    return (
        <div
            className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 text-white px-4">
            <div className="text-center">
                <h1 className="text-9xl font-bold mb-4 bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
                    404
                </h1>
                <h2 className="text-4xl font-bold mb-4">Page Not Found</h2>
                <p className="text-xl text-gray-400 mb-8">
                    Sorry, the page you're looking for doesn't exist.
                </p>

                <div className="flex gap-4 justify-center">
                    <Link
                        to="/"
                        className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors"
                    >
                        Go Home
                    </Link>
                    <Link
                        to="/login"
                        className="px-8 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-semibold transition-colors"
                    >
                        Go to Login
                    </Link>
                </div>
            </div>
        </div>
    );
}
