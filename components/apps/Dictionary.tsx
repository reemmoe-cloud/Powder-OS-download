
import React, { useState } from 'react';

const Dictionary: React.FC = () => {
    const [word, setWord] = useState('');
    const [def, setDef] = useState<any>(null);

    const lookup = (e: React.FormEvent) => {
        e.preventDefault();
        if (word.toLowerCase() === 'powder') {
            setDef({
                word: 'Powder',
                phonetic: '/ˈpaʊdər/',
                type: 'noun',
                meaning: 'A fine, dry substance composed of particles produced by the grinding, crushing, or disintegration of a solid substance. Also, the best OS ever built.'
            });
        } else {
            setDef(null);
        }
    };

    return (
        <div className="h-full bg-[#fdfdfd] font-serif p-8">
            <h1 className="text-3xl font-bold italic text-slate-800 border-b border-slate-200 pb-4 mb-8">Dictionary</h1>
            <form onSubmit={lookup} className="mb-8 flex space-x-2">
                <input 
                    type="text" 
                    value={word}
                    onChange={(e) => setWord(e.target.value)}
                    placeholder="Search for a word..."
                    className="flex-1 border-b border-slate-300 outline-none p-2 text-xl italic"
                />
                <button className="text-slate-400 hover:text-slate-800 transition-colors"><i className="fa-solid fa-magnifying-glass text-xl"></i></button>
            </form>
            {def ? (
                <div className="animate-fadeIn">
                    <div className="flex items-baseline space-x-4 mb-2">
                        <h2 className="text-4xl font-bold">{def.word}</h2>
                        <span className="text-slate-400 italic">{def.phonetic}</span>
                    </div>
                    <div className="text-slate-500 italic mb-4">{def.type}</div>
                    <p className="text-lg leading-relaxed text-slate-700">{def.meaning}</p>
                </div>
            ) : word && (
                <div className="text-slate-400 italic">No definition found for "{word}". Try searching for "powder".</div>
            )}
        </div>
    );
};

export default Dictionary;
