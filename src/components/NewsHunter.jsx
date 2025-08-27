import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function NewsHunter() {
    const [newsData, setNewsData] = useState({
        "The Economic Times": [],
        "The Hindu": [],
        "NDTV": [],
    });
    const [selectedArticle, setSelectedArticle] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchNews() {
            try {
                const response = await fetch("http://localhost:5000/news");
                const data = await response.json();

                setNewsData({
                    "The Economic Times": data["The Economic Times"] || [],
                    "The Hindu": data["The Hindu"] || [],
                    "NDTV": data["NDTV"] || [],
                });
            } catch (err) {
                console.error("Frontend error:", err);
            }
        }
        fetchNews();
    }, []);

    const goToChat = () => {
        navigate("/chat", { state: { article: selectedArticle } });
    };

    return (
        <div className="min-h-screen min-w-screen bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white p-6">
            <h1 className="text-4xl font-bold text-center mb-8 tracking-wide text-yellow-400">
                NEWS HUNTER
            </h1>
            <Link to="/notes">
                <button className="mb-5 px-6 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 transition">
                    Go to Notes
                </button>
            </Link>

            <div className="grid md:grid-cols-3 gap-6">
                {Object.keys(newsData).map((paper, idx) => (
                    <div
                        key={idx}
                        className="bg-gray-800 rounded-2xl shadow-xl border border-gray-700 hover:shadow-2xl transition-all"
                    >
                        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-t-2xl p-3">
                            <h2 className="text-xl font-semibold text-center">{paper}</h2>
                        </div>

                        <div className="h-64 overflow-y-auto p-4 space-y-3">
                            {Array.isArray(newsData[paper]) && newsData[paper].length > 0 ? (
                                newsData[paper].map((article, i) => (
                                    <div
                                        key={i}
                                        onClick={() => setSelectedArticle(article)}
                                        className="block bg-gray-700 p-3 rounded-lg hover:bg-gray-600 transition cursor-pointer text-sm"
                                    >
                                        • {article.title}
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-400 text-sm italic">
                                    No headlines found
                                </p>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Summary panel */}
            {selectedArticle && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-gray-900 max-w-lg w-full rounded-2xl shadow-2xl p-6 relative">
                        {/* Close button */}
                        <button
                            onClick={() => setSelectedArticle(null)}
                            className="absolute top-3 right-3 text-gray-400 hover:text-white cursor-pointer"
                        >
                            ✕
                        </button>

                        <h2 className="text-2xl font-bold mb-3 text-yellow-400">
                            {selectedArticle.title}
                        </h2>
                        <p className="text-gray-300 mb-4">
                            {selectedArticle.description || "No summary available."}
                        </p>
                        <a
                            href={selectedArticle.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block bg-yellow-500 text-sky-50 px-4 py-2 rounded-lg hover:bg-yellow-400 transition"
                        >
                            Read Full Article →
                        </a>

                        <button
                            onClick={goToChat}
                            className="mb-5 ml-4 px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                        >
                            Chat with AI
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}