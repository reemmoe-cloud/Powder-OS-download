
import React from 'react';

const AppStore: React.FC = () => {
    const apps = [
        { name: '1Password', category: 'Security', icon: 'fa-key', color: 'text-blue-500' },
        { name: '2Do', category: 'Productivity', icon: 'fa-check-double', color: 'text-green-500' },
        { name: 'Acom', category: 'Utility', icon: 'fa-bolt', color: 'text-yellow-600' },
        { name: 'Adium', category: 'Social', icon: 'fa-duck', color: 'text-green-600' },
        { name: 'Airfoil', category: 'Audio', icon: 'fa-music', color: 'text-red-400' },
        { name: 'Bartender', category: 'Utility', icon: 'fa-user-tie', color: 'text-slate-700' },
    ];

    return (
        <div className="h-full bg-slate-50 flex flex-col font-sans">
            <div className="h-12 bg-white border-b border-slate-200 flex items-center px-4 justify-between">
                <span className="font-semibold text-slate-800">Powder App Store</span>
                <div className="flex space-x-4 text-xs text-blue-600 font-medium">
                    <span className="cursor-pointer hover:underline">Featured</span>
                    <span className="cursor-pointer hover:underline">Top Charts</span>
                    <span className="cursor-pointer hover:underline">Categories</span>
                    <span className="cursor-pointer hover:underline">Purchased</span>
                    <span className="cursor-pointer hover:underline">Updates</span>
                </div>
            </div>
            <div className="flex-1 p-6 overflow-y-auto">
                <h1 className="text-xl font-light text-slate-600 mb-6">New & Noteworthy</h1>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                    {apps.map(app => (
                        <div key={app.name} className="bg-white p-4 rounded-lg border border-slate-200 flex items-center space-x-4 shadow-sm hover:shadow-md transition-shadow">
                            <div className={`w-12 h-12 flex items-center justify-center text-3xl ${app.color}`}>
                                <i className={`fa-solid ${app.icon}`}></i>
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="text-sm font-bold text-slate-800 truncate">{app.name}</div>
                                <div className="text-xs text-slate-400 mb-2">{app.category}</div>
                                <button className="px-3 py-1 bg-blue-100 text-blue-700 text-[10px] font-bold rounded-full hover:bg-blue-200 transition-colors">INSTALL</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AppStore;
