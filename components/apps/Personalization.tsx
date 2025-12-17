
import React from 'react';

interface PersonalizationProps {
    onSetBg: (url: string) => void;
}

const Personalization: React.FC<PersonalizationProps> = ({ onSetBg }) => {
    const wallpapers = [
        { name: 'Windows 7 Default', url: 'https://images.hdqwalls.com/download/windows-7-standard-wallpaper-2k-1920x1080.jpg' },
        { name: 'Bliss', url: 'https://wallpapercave.com/wp/wp2514339.jpg' },
        { name: 'Powder Blue', url: 'https://images.unsplash.com/photo-1519750783826-e2420f4d687f?q=80&w=1974&auto=format&fit=crop' },
        { name: 'Abstract Powder', url: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=2070&auto=format&fit=crop' },
        { name: 'Nature Mist', url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop' },
        { name: 'Modern OS', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop' },
    ];

    return (
        <div className="h-full bg-[#f0f0f0] font-sans flex flex-col">
            <div className="p-6 bg-white border-b border-slate-200 shadow-sm">
                <h1 className="text-2xl font-light text-[#003399] mb-1">Personalization</h1>
                <p className="text-xs text-slate-500">Change the visuals of your Powder OS desktop, including the wallpaper and theme colors.</p>
            </div>
            
            <div className="flex-1 p-8 overflow-y-auto">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-sm font-bold text-slate-700 mb-4 border-b border-slate-300 pb-2">Desktop Background</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
                        {wallpapers.map(wp => (
                            <div 
                                key={wp.name}
                                onClick={() => onSetBg(wp.url)}
                                className="group cursor-pointer"
                            >
                                <div className="aspect-video rounded-lg overflow-hidden border-2 border-transparent group-hover:border-blue-500 shadow-md group-active:scale-95 transition-all">
                                    <img src={wp.url} alt={wp.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                </div>
                                <p className="text-[11px] text-center mt-2 font-medium text-slate-600 group-hover:text-blue-700">{wp.name}</p>
                            </div>
                        ))}
                    </div>

                    <h2 className="text-sm font-bold text-slate-700 mb-4 border-b border-slate-300 pb-2">Custom Wallpaper URL</h2>
                    <div className="flex space-x-2">
                        <input 
                            type="text" 
                            placeholder="Enter image URL..." 
                            className="flex-1 px-4 py-2 border border-slate-300 rounded text-sm focus:border-blue-500 outline-none shadow-inner"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    onSetBg((e.target as HTMLInputElement).value);
                                }
                            }}
                        />
                        <button 
                            onClick={(e) => {
                                const input = (e.currentTarget.previousSibling as HTMLInputElement);
                                if (input.value) onSetBg(input.value);
                            }}
                            className="seven-button px-6 text-sm"
                        >
                            Apply
                        </button>
                    </div>

                    <div className="mt-12 p-4 bg-yellow-50 border border-yellow-200 rounded flex items-start space-x-3">
                        <i className="fa-solid fa-circle-info text-yellow-600 mt-1"></i>
                        <p className="text-[11px] text-yellow-800">Note: Changing the background will take effect immediately. Ensure you use high-quality images for the best visual experience in Powder OS.</p>
                    </div>
                </div>
            </div>
            
            <div className="h-12 bg-white border-t border-slate-200 px-6 flex items-center justify-end space-x-4">
                <button className="seven-button px-6 py-1 text-sm opacity-50 cursor-not-allowed">Reset to Default</button>
                <div className="h-4 w-[1px] bg-slate-200"></div>
                <button className="seven-button px-6 py-1 text-sm">Window Color</button>
                <button className="seven-button px-6 py-1 text-sm">Sounds</button>
            </div>
        </div>
    );
};

export default Personalization;
