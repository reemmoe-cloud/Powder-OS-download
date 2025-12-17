
import React, { useState, useEffect, useCallback } from 'react';
import Desktop from './components/Desktop';
import Taskbar from './components/Taskbar';
import StartMenu from './components/StartMenu';
import LoginScreen from './components/LoginScreen';
import Window from './components/Window';
import CrashSequence from './components/CrashSequence';
import { AppID, WindowState } from './types';
import { APP_CONFIGS } from './constants';

const App: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isCorrupted, setIsCorrupted] = useState(false);
    const [bgUrl, setBgUrl] = useState('https://images.hdqwalls.com/download/windows-7-standard-wallpaper-2k-1920x1080.jpg');
    
    const initialWindows = (Object.keys(APP_CONFIGS) as AppID[]).reduce((acc, id) => {
        acc[id] = { 
            ...APP_CONFIGS[id], 
            id, 
            isOpen: false, 
            isMinimized: false, 
            isMaximized: false, 
            zIndex: 10 
        };
        return acc;
    }, {} as Record<AppID, WindowState>);

    const [windows, setWindows] = useState<Record<AppID, WindowState>>(initialWindows);
    const [isStartOpen, setIsStartOpen] = useState(false);
    const [highestZ, setHighestZ] = useState(10);

    const openApp = useCallback((id: AppID) => {
        setHighestZ(prev => prev + 1);
        setWindows(prev => ({
            ...prev,
            [id]: { ...prev[id], isOpen: true, isMinimized: false, zIndex: highestZ + 1 }
        }));
        setIsStartOpen(false);
    }, [highestZ]);

    const closeApp = useCallback((id: AppID) => {
        setWindows(prev => ({
            ...prev,
            [id]: { ...prev[id], isOpen: false }
        }));
    }, []);

    const toggleMinimize = useCallback((id: AppID) => {
        setWindows(prev => {
            const isMin = !prev[id].isMinimized;
            const newZ = isMin ? prev[id].zIndex : highestZ + 1;
            if (!isMin) setHighestZ(prev => prev + 1);
            return {
                ...prev,
                [id]: { ...prev[id], isMinimized: isMin, zIndex: newZ }
            };
        });
    }, [highestZ]);

    const toggleMaximize = useCallback((id: AppID) => {
        setWindows(prev => ({
            ...prev,
            [id]: { ...prev[id], isMaximized: !prev[id].isMaximized }
        }));
    }, []);

    const focusApp = useCallback((id: AppID) => {
        setHighestZ(prev => prev + 1);
        setWindows(prev => ({
            ...prev,
            [id]: { ...prev[id], zIndex: highestZ + 1, isMinimized: false }
        }));
    }, [highestZ]);

    const handleSystemCrash = () => {
        setIsCorrupted(true);
    };

    if (isCorrupted) {
        return <CrashSequence />;
    }

    if (!isLoggedIn) {
        return <LoginScreen onLogin={() => setIsLoggedIn(true)} />;
    }

    return (
        <div 
            className="relative w-full h-screen overflow-hidden bg-cover bg-center transition-all duration-700"
            style={{ backgroundImage: `url('${bgUrl}')` }}
        >
            {/* Desktop Icons */}
            <Desktop onOpenApp={openApp} />

            {/* Application Windows */}
            {(Object.values(windows) as WindowState[]).map((win) => (
                win.isOpen && (
                    <Window 
                        key={win.id} 
                        window={win} 
                        onClose={() => closeApp(win.id)}
                        onMinimize={() => toggleMinimize(win.id)}
                        onMaximize={() => toggleMaximize(win.id)}
                        onFocus={() => focusApp(win.id)}
                        onCrash={handleSystemCrash}
                        onOpenApp={openApp}
                        onSetBg={setBgUrl}
                    />
                )
            ))}

            {/* Start Menu Overlay */}
            {isStartOpen && (
                <div 
                    className="fixed inset-0 z-[1000]" 
                    onClick={() => setIsStartOpen(false)}
                >
                    <div onClick={e => e.stopPropagation()}>
                        <StartMenu onOpenApp={openApp} onShutdown={() => setIsLoggedIn(false)} />
                    </div>
                </div>
            )}

            {/* Taskbar */}
            <Taskbar 
                windows={windows} 
                onToggleStart={() => setIsStartOpen(!isStartOpen)}
                onAppClick={(id) => {
                    if (!windows[id].isOpen) {
                        openApp(id);
                    } else {
                        toggleMinimize(id);
                    }
                }}
            />
        </div>
    );
};

export default App;
