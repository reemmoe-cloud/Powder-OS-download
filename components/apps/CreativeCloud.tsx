
import React from 'react';

const CreativeCloud: React.FC = () => {
    const products = [
        { name: 'Photoshop', icon: 'fa-paintbrush', color: 'text-blue-400' },
        { name: 'Illustrator', icon: 'fa-pen-nib', color: 'text-orange-500' },
        { name: 'InDesign', icon: 'fa-lines-leaning', color: 'text-pink-600' },
        { name: 'Premiere Pro', icon: 'fa-film', color: 'text-purple-500' },
        { name: 'After Effects', icon: 'fa-burst', color: 'text-indigo-400' },
    ];

    return (
        <div className="h-full bg-[#2c2c2c] text-white font-sans flex flex-col">
            <div className="p-4 flex items-center space-x-3 border-b border-white/10">
                <i className="fa-solid fa-cloud text-2xl text-red-500"></i>
                <span className="font-bold">Creative Cloud</span>
            </div>
            <div className="flex-1 p-6">
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <h2 className="text-2xl font-semibold">Your Apps</h2>
                        <p className="text-xs text-white/50">Keep your creativity up to date.</p>
                    </div>
                    <button className="text-xs bg-red-600 px-4 py-1.5 rounded font-bold hover:bg-red-700">Check for updates</button>
                </div>
                <div className="space-y-4">
                    {products.map(p => (
                        <div key={p.name} className="bg-white/5 p-3 rounded flex items-center justify-between border border-white/5 hover:border-white/10 transition-colors">
                            <div className="flex items-center space-x-4">
                                <div className={`w-10 h-10 bg-black/40 rounded flex items-center justify-center text-xl ${p.color}`}>
                                    <i className={`fa-solid ${p.icon}`}></i>
                                </div>
                                <div>
                                    <div className="text-sm font-medium">{p.name}</div>
                                    <div className="text-[10px] text-white/40">Latest version installed</div>
                                </div>
                            </div>
                            <button className="text-xs border border-white/20 px-4 py-1 rounded hover:bg-white/10">Open</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CreativeCloud;
