
import React from 'react';

const Adium: React.FC = () => {
    const buddies = [
        { name: 'Duckling', status: 'Online', icon: 'fa-duck', color: 'text-green-500' },
        { name: 'Admin', status: 'Away', icon: 'fa-user-gear', color: 'text-yellow-500' },
        { name: 'Bill G.', status: 'Offline', icon: 'fa-user', color: 'text-slate-300' },
        { name: 'Steve J.', status: 'Offline', icon: 'fa-user-tie', color: 'text-slate-300' },
    ];

    return (
        <div className="h-full bg-[#f0f0f0] border-l-4 border-white flex flex-col font-sans">
            <div className="p-4 flex items-center space-x-3 bg-gradient-to-b from-white to-slate-200 border-b border-slate-300">
                <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center text-white text-2xl shadow-inner">
                    <i className="fa-solid fa-duck"></i>
                </div>
                <div>
                    <div className="text-sm font-bold text-slate-800">Powder Duck</div>
                    <div className="text-[10px] text-green-600 font-medium italic">Available</div>
                </div>
            </div>
            <div className="flex-1 bg-white m-2 border border-slate-300 shadow-inner overflow-y-auto">
                <div className="bg-slate-100 px-3 py-1 text-[10px] font-bold text-slate-500 uppercase border-b border-slate-200">Buddies</div>
                {buddies.map(b => (
                    <div key={b.name} className="px-4 py-2 flex items-center space-x-3 hover:bg-blue-50 cursor-pointer transition-colors group">
                        <div className={`text-xs ${b.color}`}><i className="fa-solid fa-circle"></i></div>
                        <div className="flex-1 min-w-0">
                            <div className="text-xs font-semibold text-slate-700 truncate">{b.name}</div>
                            <div className="text-[9px] text-slate-400">{b.status}</div>
                        </div>
                        <div className="text-xs text-slate-300 group-hover:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
                            <i className="fa-solid fa-message"></i>
                        </div>
                    </div>
                ))}
            </div>
            <div className="p-2 flex space-x-1">
                <input type="text" placeholder="Search buddies..." className="flex-1 text-[10px] px-2 py-1 rounded border border-slate-300 outline-none" />
                <button className="w-6 h-6 bg-slate-200 rounded flex items-center justify-center text-slate-500 hover:bg-blue-100 hover:text-blue-600 transition-colors">
                    <i className="fa-solid fa-plus text-[10px]"></i>
                </button>
            </div>
        </div>
    );
};

export default Adium;
