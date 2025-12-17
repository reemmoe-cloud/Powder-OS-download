
import React, { useState } from 'react';

const Search: React.FC = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<string[]>([]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;
        // Mock search
        setResults([
            `Results for "${query}" on Powder Web...`,
            "Powder OS Official Documentation",
            "How to use Windows 7 in 2024",
            "Best Powder OS Apps for Productivity",
            "The History of Graphical User Interfaces"
        ]);
    };

    return (
        <div className="h-full flex flex-col bg-white overflow-hidden">
            <div className="flex items-center space-x-2 p-2 border-b border-slate-200 bg-slate-100">
                <div className="flex items-center space-x-1">
                    <button className="w-8 h-8 rounded hover:bg-white/50 text-slate-400"><i className="fa-solid fa-arrow-left"></i></button>
                    <button className="w-8 h-8 rounded hover:bg-white/50 text-slate-400"><i className="fa-solid fa-arrow-right"></i></button>
                    <button className="w-8 h-8 rounded hover:bg-white/50 text-slate-400"><i className="fa-solid fa-rotate-right"></i></button>
                </div>
                <div className="flex-1 bg-white border border-slate-300 rounded px-3 py-1 text-sm text-slate-600 flex items-center">
                    <i className="fa-solid fa-lock text-green-600 mr-2 text-xs"></i>
                    <span>https://www.google.com/powder</span>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-8 flex flex-col items-center">
                <div className="text-6xl font-bold mb-8 flex items-center">
                    <span className="text-blue-500">P</span>
                    <span className="text-red-500">o</span>
                    <span className="text-yellow-500">w</span>
                    <span className="text-blue-500">d</span>
                    <span className="text-green-500">e</span>
                    <span className="text-red-500">r</span>
                    <span className="ml-2 text-slate-400 font-light">Search</span>
                </div>

                <form onSubmit={handleSearch} className="w-full max-w-xl flex items-center shadow-lg rounded-full border border-slate-200 hover:shadow-xl transition-shadow overflow-hidden bg-white mb-8">
                    <i className="fa-solid fa-magnifying-glass ml-4 text-slate-400"></i>
                    <input 
                        type="text" 
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search the web or type a URL"
                        className="flex-1 px-4 py-3 outline-none text-slate-700"
                    />
                    <i className="fa-solid fa-microphone mr-4 text-blue-500 cursor-pointer"></i>
                </form>

                <div className="w-full max-w-xl space-y-6">
                    {results.map((res, i) => (
                        <div key={i} className="animate-fadeIn">
                            <div className="text-xs text-slate-500 mb-0.5 truncate">https://powder-os.net/guide/{res.toLowerCase().replace(/\s/g, '-')}</div>
                            <div className="text-xl text-blue-700 hover:underline cursor-pointer">{res}</div>
                            <div className="text-sm text-slate-600 line-clamp-2">This is a simulated search result in Powder OS. It mimics the behavior of a real web search engine integrated into the Windows 7 style environment.</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Search;
