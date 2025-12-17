
import React from 'react';

const Discord: React.FC = () => {
    return (
        <div className="h-full bg-[#36393f] flex text-white font-sans overflow-hidden">
            <div className="w-16 bg-[#202225] p-3 flex flex-col items-center space-y-3 shrink-0">
                <div className="w-12 h-12 bg-[#5865f2] rounded-2xl flex items-center justify-center text-xl cursor-pointer hover:rounded-xl transition-all"><i className="fa-brands fa-discord"></i></div>
                <div className="w-8 h-0.5 bg-white/10 rounded"></div>
                <div className="w-12 h-12 bg-[#36393f] rounded-full flex items-center justify-center text-xl cursor-pointer hover:bg-[#3ba55d] hover:text-white transition-all text-[#3ba55d]"><i className="fa-solid fa-plus"></i></div>
                <div className="w-12 h-12 bg-[#36393f] rounded-full flex items-center justify-center text-xl cursor-pointer hover:bg-[#3ba55d] hover:text-white transition-all text-[#3ba55d]"><i className="fa-solid fa-compass"></i></div>
            </div>
            <div className="w-56 bg-[#2f3136] flex flex-col shrink-0">
                <div className="h-12 px-4 flex items-center shadow-md font-bold text-sm">Powder OS Community</div>
                <div className="flex-1 p-2 space-y-1">
                    <div className="text-xs font-bold text-white/40 px-2 py-1 uppercase mt-2 tracking-wider">Text Channels</div>
                    <div className="bg-white/10 px-2 py-1.5 rounded flex items-center space-x-2 text-sm font-medium cursor-pointer"><span className="text-white/40">#</span><span>general</span></div>
                    <div className="px-2 py-1.5 rounded flex items-center space-x-2 text-sm text-white/40 hover:bg-white/5 cursor-pointer font-medium hover:text-white transition-colors"><span className="text-white/40">#</span><span>feedback</span></div>
                </div>
            </div>
            <div className="flex-1 flex flex-col min-w-0">
                <div className="h-12 px-4 flex items-center shadow-md font-bold text-sm border-b border-black/10"># general</div>
                <div className="flex-1 p-4 overflow-y-auto space-y-6">
                    <div className="flex space-x-4">
                        <div className="w-10 h-10 rounded-full bg-blue-500 overflow-hidden shrink-0"><img src="https://picsum.photos/seed/user1/40/40" alt="u" /></div>
                        <div>
                            <div className="flex items-baseline space-x-2"><span className="font-bold text-blue-300">Admin</span><span className="text-[10px] text-white/20">Today at 2:15 PM</span></div>
                            <div className="text-sm text-white/80">Has anyone tried the new Powder Startup Repair yet? It's intense!</div>
                        </div>
                    </div>
                    <div className="flex space-x-4">
                        <div className="w-10 h-10 rounded-full bg-green-500 overflow-hidden shrink-0"><img src="https://picsum.photos/seed/user2/40/40" alt="u" /></div>
                        <div>
                            <div className="flex items-baseline space-x-2"><span className="font-bold text-green-300">Guest_44</span><span className="text-[10px] text-white/20">Today at 2:18 PM</span></div>
                            <div className="text-sm text-white/80">I deleted System32 and now I'm in a loop... help? 😂</div>
                        </div>
                    </div>
                </div>
                <div className="p-4">
                    <div className="bg-[#40444b] px-4 py-2.5 rounded-lg flex items-center">
                        <i className="fa-solid fa-circle-plus mr-4 text-white/40 cursor-pointer hover:text-white transition-colors"></i>
                        <input type="text" placeholder="Message #general" className="bg-transparent outline-none flex-1 text-sm placeholder:text-white/20" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Discord;
