
import React, { useState, useEffect } from 'react';
import { AppID, WindowState } from '../types';
import { APP_CONFIGS } from '../constants';

interface TaskbarProps {
    windows: Record<AppID, WindowState>;
    onToggleStart: () => void;
    onAppClick: (id: AppID) => void;
}

const Taskbar: React.FC<TaskbarProps> = ({ windows, onToggleStart, onAppClick }) => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const activeApps = (Object.keys(windows) as AppID[]).filter(id => windows[id].isOpen);

    return (
        <div className="fixed bottom-0 left-0 right-0 h-10 taskbar-glass z-[2000] flex items-center px-1">
            <button 
                onClick={onToggleStart}
                className="start-button w-10 h-10 rounded-full flex items-center justify-center mr-2 relative -top-1 border border-white/20 overflow-hidden"
            >
                <div className="text-white text-xl drop-shadow-md">
                    <i className="fa-solid fa-snowflake"></i>
                </div>
            </button>

            <div className="flex-1 flex items-center h-full space-x-1 overflow-hidden">
                {activeApps.map(id => (
                    <button
                        key={id}
                        onClick={() => onAppClick(id)}
                        className={`h-8 px-3 rounded flex items-center space-x-2 transition-all border ${
                            windows[id].isMinimized 
                                ? 'bg-transparent border-transparent hover:bg-white/10' 
                                : 'bg-white/20 border-white/30 shadow-inner'
                        } max-w-[160px] min-w-[40px] overflow-hidden`}
                    >
                        <i className={`fa-solid ${APP_CONFIGS[id].icon} text-white text-sm`}></i>
                        <span className="text-white text-xs truncate hidden sm:inline">
                            {APP_CONFIGS[id].title}
                        </span>
                    </button>
                ))}
            </div>

            <div className="flex items-center space-x-3 px-3 h-full border-l border-white/10 text-white text-xs font-light">
                <div className="flex flex-col items-center">
                    <span>{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    <span>{time.toLocaleDateString([], { month: 'numeric', day: 'numeric', year: 'numeric' })}</span>
                </div>
                <div className="w-1.5 h-full border-l border-white/20 hover:bg-white/10 cursor-pointer" title="Show Desktop"></div>
            </div>
        </div>
    );
};

export default Taskbar;
