
import React from 'react';
import { AppID } from '../types';
import { APP_CONFIGS } from '../constants';

interface DesktopProps {
    onOpenApp: (id: AppID) => void;
}

// Fixed missing JSX and added hover effects to DesktopIcon
const DesktopIcon: React.FC<{ id: AppID; config: any; onClick: () => void }> = ({ id, config, onClick }) => (
    <div 
        className="w-24 h-24 flex flex-col items-center justify-center rounded hover:bg-white/10 border border-transparent hover:border-white/20 transition-all cursor-default group"
        onDoubleClick={onClick}
    >
        <div className="text-4xl text-white drop-shadow-lg mb-2 flex items-center justify-center w-12 h-12 transition-transform group-hover:scale-110">
            <i className={`fa-solid ${config.icon}`}></i>
        </div>
        <span className="text-white text-xs text-center drop-shadow-md px-1 line-clamp-2">
            {config.title}
        </span>
    </div>
);

// Implemented Desktop component to render all app shortcuts
const Desktop: React.FC<DesktopProps> = ({ onOpenApp }) => {
    return (
        <div className="p-4 grid grid-flow-col grid-rows-[repeat(auto-fill,6rem)] gap-2 h-[calc(100vh-40px)] w-fit">
            {(Object.keys(APP_CONFIGS) as AppID[]).map((id) => (
                <DesktopIcon 
                    key={id} 
                    id={id} 
                    config={APP_CONFIGS[id]} 
                    onClick={() => onOpenApp(id)} 
                />
            ))}
        </div>
    );
};

export default Desktop;
