
import React, { useState } from 'react';
import { SYSTEM_FILES } from '../../constants';
import { FileEntry } from '../../types';

interface ExplorerProps {
    onCrash?: () => void;
    onOpenPersonalization?: () => void;
}

const getFileIcon = (fileName: string) => {
    const ext = fileName.split('.').pop()?.toLowerCase();
    switch (ext) {
        case 'txt': return { icon: 'fa-file-lines', color: 'text-slate-500' };
        case 'pdf': return { icon: 'fa-file-pdf', color: 'text-red-600' };
        case 'jpg':
        case 'png':
        case 'gif': return { icon: 'fa-file-image', color: 'text-blue-500' };
        case 'exe': return { icon: 'fa-file-code', color: 'text-slate-700' };
        case 'dll': return { icon: 'fa-gears', color: 'text-slate-400' };
        case 'zip':
        case 'rar': return { icon: 'fa-file-zipper', color: 'text-yellow-600' };
        case 'xlsx':
        case 'csv': return { icon: 'fa-file-excel', color: 'text-green-600' };
        default: return { icon: 'fa-file-lines', color: 'text-slate-400' };
    }
};

const Explorer: React.FC<ExplorerProps> = ({ onCrash, onOpenPersonalization }) => {
    const [path, setPath] = useState<FileEntry[]>([]);
    const [deletedItems, setDeletedItems] = useState<Set<string>>(new Set());
    
    const currentPathString = ['C:', ...path.map(p => p.name)].join('\\');
    const currentFolder = path.length === 0 ? SYSTEM_FILES[0] : path[path.length - 1];
    
    const items = (currentFolder?.children || []).filter(item => {
        const itemFullPath = `${currentPathString}\\${item.name}`;
        return !deletedItems.has(itemFullPath);
    });

    const navigateTo = (item: FileEntry) => {
        if (item.type === 'folder') {
            setPath([...path, item]);
        }
    };

    const goBack = () => {
        if (path.length > 0) {
            setPath(path.slice(0, -1));
        }
    };

    const handleDelete = (item: FileEntry, e: React.MouseEvent | React.PointerEvent) => {
        e.preventDefault();
        e.stopPropagation();
        
        const itemName = item.name;
        
        if (itemName.toLowerCase() === 'system32') {
            if (onCrash) onCrash();
            return;
        }

        if (window.confirm(`Are you sure you want to delete '${itemName}'?`)) {
            const itemFullPath = `${currentPathString}\\${itemName}`;
            setDeletedItems(prev => {
                const newSet = new Set(prev);
                newSet.add(itemFullPath);
                return newSet;
            });
        }
    };

    if (!currentFolder) {
        return <div className="p-4 text-red-500 font-sans">Error: System drive not accessible.</div>;
    }

    return (
        <div className="flex flex-col h-full bg-white select-none font-sans">
            <div className="h-10 flex items-center px-4 space-x-2 border-b border-slate-200 bg-slate-50">
                <button 
                    onClick={goBack}
                    disabled={path.length === 0}
                    className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${path.length === 0 ? 'text-slate-300' : 'text-blue-600 hover:bg-blue-100'}`}
                >
                    <i className="fa-solid fa-arrow-left"></i>
                </button>
                <div className="flex-1 bg-white border border-slate-300 px-2 py-0.5 rounded text-xs flex items-center text-slate-600 overflow-hidden shadow-inner">
                    <i className="fa-solid fa-folder text-yellow-500 mr-2 flex-shrink-0"></i>
                    <span className="truncate">{currentPathString}</span>
                </div>
                
                {/* PHOTO BUTTON TO CUSTOMIZE PC */}
                <button 
                    onClick={onOpenPersonalization}
                    className="flex items-center space-x-2 px-3 py-1 bg-blue-50 border border-blue-200 rounded hover:bg-blue-100 transition-colors group shadow-sm"
                    title="Customize Desktop Wallpaper"
                >
                    <i className="fa-solid fa-image text-blue-500 group-hover:scale-110 transition-transform"></i>
                    <span className="text-[10px] font-bold text-blue-700">PERSONALIZATION</span>
                </button>

                <div className="w-40 bg-white border border-slate-300 px-2 py-0.5 rounded text-xs flex items-center text-slate-400">
                    <i className="fa-solid fa-magnifying-glass mr-2 flex-shrink-0"></i>
                    <span className="truncate">Search {currentFolder.name}</span>
                </div>
            </div>

            <div className="flex-1 flex overflow-hidden">
                <div className="w-48 border-r border-slate-200 bg-slate-50 p-2 space-y-1 hidden sm:block">
                    <div className="text-[10px] font-bold text-blue-800 px-2 mb-1 uppercase opacity-70">Favorites</div>
                    {['Desktop', 'Downloads', 'Recent Places'].map(fav => (
                        <div key={fav} className="flex items-center space-x-2 px-2 py-1 hover:bg-blue-100 rounded text-xs cursor-pointer text-slate-700">
                            <i className="fa-solid fa-star text-yellow-400"></i>
                            <span>{fav}</span>
                        </div>
                    ))}
                    <div className="text-[10px] font-bold text-blue-800 px-2 mt-4 mb-1 uppercase opacity-70">Computer</div>
                    <div 
                        onClick={() => setPath([])}
                        className={`flex items-center space-x-2 px-2 py-1 rounded text-xs cursor-pointer text-slate-700 ${path.length === 0 ? 'bg-blue-200/50 font-semibold' : 'hover:bg-blue-50'}`}
                    >
                        <i className="fa-solid fa-hard-drive text-slate-400"></i>
                        <span>Local Disk (C:)</span>
                    </div>
                </div>

                <div className="flex-1 p-4 grid grid-cols-[repeat(auto-fill,minmax(90px,1fr))] content-start gap-4 overflow-y-auto bg-white">
                    {items.map((item, idx) => {
                        const fileInfo = item.type === 'file' ? getFileIcon(item.name) : { icon: 'fa-folder', color: 'text-yellow-500' };
                        return (
                            <div 
                                key={idx} 
                                onDoubleClick={() => navigateTo(item)}
                                className="flex flex-col items-center group cursor-default p-1 hover:bg-blue-50 border border-transparent hover:border-blue-200 rounded relative text-center"
                            >
                                <button 
                                    onPointerDown={(e) => handleDelete(item, e)}
                                    className="absolute -top-1 -right-1 w-8 h-8 bg-red-600 hover:bg-red-700 text-white text-[16px] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all z-[100] shadow-xl border-2 border-white transform hover:scale-125 active:scale-90"
                                >
                                    <i className="fa-solid fa-xmark pointer-events-none"></i>
                                </button>

                                <div className={`text-4xl mb-1 ${fileInfo.color} transition-transform group-hover:scale-105 pointer-events-none`}>
                                    <i className={`fa-solid ${fileInfo.icon}`}></i>
                                </div>
                                <span className="text-[11px] break-all line-clamp-2 text-slate-800 group-hover:underline w-full leading-tight pointer-events-none">
                                    {item.name}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="h-6 border-t border-slate-200 bg-slate-50 px-4 flex items-center justify-between text-[10px] text-slate-500">
                <span>{items.length} items</span>
                <span className="flex items-center">
                    <i className="fa-solid fa-computer mr-1"></i>
                    My Computer
                </span>
            </div>
        </div>
    );
};

export default Explorer;
