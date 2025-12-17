
import React from 'react';
import { AppID } from '../types';
import { APP_CONFIGS } from '../constants';

interface StartMenuProps {
    onOpenApp: (id: AppID) => void;
    onShutdown: () => void;
}

const StartMenu: React.FC<StartMenuProps> = ({ onOpenApp, onShutdown }) => {
    const apps = Object.keys(APP_CONFIGS) as AppID[];

    return (
        <div className="fixed bottom-11 left-0 w-[420px] h-[550px] aero-glass aero-border rounded-tr-lg z-[1001] flex flex-col overflow-hidden shadow-2xl animate-slideUp">
            {/* User Profile Header */}
            <div className="h-16 flex items-center px-4 space-x-3 border-b border-white/10">
                <div className="w-10 h-10 rounded border border-white/40 shadow-sm overflow-hidden bg-white/20">
                    <img src="https://picsum.photos/seed/user/40/40" alt="User" />
                </div>
                <span className="text-white font-semibold text-shadow">Admin</span>
            </div>

            <div className="flex flex-1 overflow-hidden">
                {/* Left Pane: Apps */}
                <div className="flex-1 bg-white/90 p-2 overflow-y-auto">
                    {apps.map(id => (
                        <button
                            key={id}
                            onClick={() => onOpenApp(id)}
                            className="w-full flex items-center space-x-3 p-2 rounded hover:bg-blue-100/50 transition-colors text-left group"
                        >
                            <div className="w-8 h-8 flex items-center justify-center text-blue-600 text-lg group-hover:scale-110 transition-transform">
                                <i className={`fa-solid ${APP_CONFIGS[id].icon}`}></i>
                            </div>
                            <span className="text-sm font-medium text-slate-700">{APP_CONFIGS[id].title}</span>
                        </button>
                    ))}
                    <div className="mt-auto border-t border-slate-200 pt-2">
                        <button className="w-full flex items-center space-x-3 p-2 rounded hover:bg-blue-100/50 text-sm text-slate-700">
                             <i className="fa-solid fa-chevron-right text-[10px] w-8 text-center"></i>
                             <span>All Programs</span>
                        </button>
                    </div>
                </div>

                {/* Right Pane: System Links */}
                <div className="w-[160px] bg-transparent p-2 space-y-1">
                    {['Documents', 'Pictures', 'Music', 'Games', 'Computer', 'Control Panel', 'Devices', 'Default Programs', 'Help'].map(item => (
                        <button key={item} className="w-full text-left p-1.5 px-3 rounded hover:bg-white/20 text-white text-xs font-medium transition-colors">
                            {item}
                        </button>
                    ))}
                </div>
            </div>

            {/* Bottom Bar: Shutdown */}
            <div className="h-12 flex items-center justify-end px-4 space-x-2 bg-gradient-to-b from-transparent to-black/20">
                <div className="flex items-center rounded overflow-hidden shadow-sm">
                    <button 
                        onClick={onShutdown}
                        className="bg-[#245edb] hover:bg-[#3271f5] text-white px-4 py-1 text-xs border border-[#1e48a8] flex items-center space-x-2"
                    >
                        <i className="fa-solid fa-power-off"></i>
                        <span>Shut down</span>
                    </button>
                    <button className="bg-[#245edb] hover:bg-[#3271f5] text-white px-2 py-1 text-xs border-y border-r border-[#1e48a8]">
                        <i className="fa-solid fa-caret-right"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StartMenu;
