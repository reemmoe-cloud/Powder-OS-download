
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { AppID, WindowState } from '../types';
import Calculator from './apps/Calculator';
import Explorer from './apps/Explorer';
import Search from './apps/Search';
import Camera from './apps/Camera';
import Games from './apps/Games';
import ControlPanel from './apps/ControlPanel';
import AppStore from './apps/AppStore';
import CreativeCloud from './apps/CreativeCloud';
import Discord from './apps/Discord';
import Dropbox from './apps/Dropbox';
import Dictionary from './apps/Dictionary';
import CotEditor from './apps/CotEditor';
import Adium from './apps/Adium';
import Personalization from './apps/Personalization';

interface WindowProps {
    window: WindowState;
    onClose: () => void;
    onMinimize: () => void;
    onMaximize: () => void;
    onFocus: () => void;
    onCrash: () => void;
    onOpenApp?: (id: AppID) => void;
    onSetBg?: (url: string) => void;
}

const Window: React.FC<WindowProps> = ({ window, onClose, onMinimize, onMaximize, onFocus, onCrash, onOpenApp, onSetBg }) => {
    const initialPos = useMemo(() => ({
        x: 100 + (window.zIndex % 20 * 15),
        y: 50 + (window.zIndex % 20 * 10)
    }), [window.id]);

    const [position, setPosition] = useState(initialPos);
    const [isDragging, setIsDragging] = useState(false);
    
    const windowRef = useRef<HTMLDivElement>(null);
    const dragData = useRef({
        startX: 0,
        startY: 0,
        initialX: 0,
        initialY: 0,
        rafId: 0
    });

    const handleMouseDown = (e: React.MouseEvent) => {
        if (e.button !== 0 || window.isMaximized) return;
        onFocus();
        setIsDragging(true);
        dragData.current.startX = e.clientX;
        dragData.current.startY = e.clientY;
        dragData.current.initialX = position.x;
        dragData.current.initialY = position.y;
    };

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!isDragging) return;
            if (dragData.current.rafId) cancelAnimationFrame(dragData.current.rafId);
            dragData.current.rafId = requestAnimationFrame(() => {
                const deltaX = e.clientX - dragData.current.startX;
                const deltaY = e.clientY - dragData.current.startY;
                const newX = dragData.current.initialX + deltaX;
                const newY = dragData.current.initialY + deltaY;
                if (windowRef.current) windowRef.current.style.transform = `translate3d(${newX}px, ${newY}px, 0)`;
            });
        };

        const handleMouseUp = (e: MouseEvent) => {
            if (isDragging) {
                const deltaX = e.clientX - dragData.current.startX;
                const deltaY = e.clientY - dragData.current.startY;
                setPosition({ x: dragData.current.initialX + deltaX, y: dragData.current.initialY + deltaY });
                setIsDragging(false);
                if (dragData.current.rafId) cancelAnimationFrame(dragData.current.rafId);
            }
        };

        if (isDragging) {
            document.addEventListener('mousemove', handleMouseMove, { passive: true });
            document.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging]);

    if (window.isMinimized) return null;

    const renderContent = () => {
        switch (window.id) {
            case 'calc': return <Calculator />;
            case 'explorer': return <Explorer onCrash={onCrash} onOpenPersonalization={() => onOpenApp?.('personalization')} />;
            case 'search': return <Search />;
            case 'camera': return <Camera />;
            case 'games': return <Games />;
            case 'control': return <ControlPanel />;
            case 'appstore': return <AppStore />;
            case 'creativecloud': return <CreativeCloud />;
            case 'discord': return <Discord />;
            case 'dropbox': return <Dropbox />;
            case 'dictionary': return <Dictionary />;
            case 'coteditor': return <CotEditor />;
            case 'adium': return <Adium />;
            case 'personalization': return <Personalization onSetBg={onSetBg || (() => {})} />;
            default: return <div className="p-8 text-center text-slate-500 font-sans">Coming soon...</div>;
        }
    };

    const style: React.CSSProperties = window.isMaximized 
        ? { top: 0, left: 0, width: '100%', height: 'calc(100% - 40px)', zIndex: window.zIndex, transform: 'none' }
        : { 
            top: 0, 
            left: 0, 
            width: 800, 
            height: 550, 
            zIndex: window.zIndex, 
            transform: `translate3d(${position.x}px, ${position.y}px, 0)`, 
            transition: isDragging ? 'none' : 'transform 0.2s cubic-bezier(0.2, 0, 0, 1), opacity 0.2s ease-in-out' 
          };

    return (
        <div 
            ref={windowRef} 
            className={`fixed rounded-t-lg window-shadow flex flex-col overflow-hidden ${window.isMaximized ? '' : 'aero-glass aero-border'} ${isDragging ? 'select-none pointer-events-none' : ''}`} 
            style={style} 
            onMouseDown={onFocus}
        >
            <div 
                className={`h-8 flex items-center px-2 select-none cursor-default active:cursor-grabbing ${window.isMaximized ? 'bg-[#005a9e]' : 'bg-transparent'}`} 
                onMouseDown={handleMouseDown} 
                onDoubleClick={onMaximize}
            >
                <div className="flex-1 flex items-center space-x-2 pointer-events-none">
                    <i className={`fa-solid ${window.icon} text-white/80 text-sm`}></i>
                    <span className="text-white text-xs font-semibold tracking-wide truncate drop-shadow-sm">{window.title}</span>
                </div>
                
                <div className="flex items-center space-x-0.5 relative z-[100]">
                    <button 
                        onMouseDown={(e) => e.stopPropagation()}
                        onClick={(e) => { e.stopPropagation(); onMinimize(); }}
                        className="w-7 h-5 flex items-center justify-center hover:bg-white/20 text-white rounded-sm text-[10px] transition-colors pointer-events-auto"
                    >
                        <i className="fa-solid fa-minus"></i>
                    </button>
                    <button 
                        onMouseDown={(e) => e.stopPropagation()}
                        onClick={(e) => { e.stopPropagation(); onMaximize(); }}
                        className="w-7 h-5 flex items-center justify-center hover:bg-white/20 text-white rounded-sm text-[10px] transition-colors pointer-events-auto"
                    >
                        <i className={window.isMaximized ? "fa-solid fa-clone" : "fa-regular fa-square"}></i>
                    </button>
                    <button 
                        onMouseDown={(e) => e.stopPropagation()}
                        onClick={(e) => { e.stopPropagation(); onClose(); }}
                        className="w-10 h-5 flex items-center justify-center bg-transparent hover:bg-red-600 text-white rounded-sm text-[10px] transition-colors pointer-events-auto"
                    >
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </div>
            </div>
            
            <div className={`flex-1 bg-white overflow-auto ${isDragging ? 'pointer-events-none' : ''}`}>
                {renderContent()}
            </div>
        </div>
    );
};

export default Window;
