
import React from 'react';

const Dropbox: React.FC = () => {
    return (
        <div className="h-full bg-white flex flex-col font-sans">
            <div className="h-14 border-b border-slate-100 flex items-center px-6">
                <i className="fa-solid fa-box-archive text-blue-500 text-2xl mr-4"></i>
                <span className="font-semibold text-slate-800">Dropbox</span>
                <div className="ml-auto flex items-center space-x-4">
                    <div className="bg-slate-100 px-3 py-1.5 rounded-full flex items-center">
                        <i className="fa-solid fa-magnifying-glass text-slate-400 mr-2 text-xs"></i>
                        <input type="text" placeholder="Search" className="bg-transparent outline-none text-xs w-32" />
                    </div>
                    <div className="w-8 h-8 rounded-full bg-blue-100 overflow-hidden border border-blue-200">
                        <img src="https://picsum.photos/seed/drop/32/32" alt="u" />
                    </div>
                </div>
            </div>
            <div className="flex-1 flex overflow-hidden">
                <div className="w-48 bg-slate-50 border-r border-slate-100 p-4 space-y-4">
                    <div className="space-y-1">
                        <div className="text-blue-600 font-bold text-xs px-2 py-1 bg-blue-50 rounded cursor-pointer">All files</div>
                        <div className="text-slate-500 font-medium text-xs px-2 py-1 hover:bg-slate-200 rounded cursor-pointer transition-colors">Recents</div>
                        <div className="text-slate-500 font-medium text-xs px-2 py-1 hover:bg-slate-200 rounded cursor-pointer transition-colors">Starred</div>
                    </div>
                </div>
                <div className="flex-1 p-6 overflow-y-auto">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg font-bold text-slate-800">All files</h2>
                        <button className="bg-blue-600 text-white text-xs px-4 py-2 rounded font-bold hover:bg-blue-700 transition-colors shadow-sm">Upload</button>
                    </div>
                    <table className="w-full text-left text-xs">
                        <thead>
                            <tr className="border-b border-slate-100 text-slate-400">
                                <th className="pb-2 font-medium">Name</th>
                                <th className="pb-2 font-medium">Modified</th>
                                <th className="pb-2 font-medium">Size</th>
                            </tr>
                        </thead>
                        <tbody className="text-slate-700">
                            {[
                                { name: 'OS_Wallpaper.png', date: '2 days ago', size: '2.4 MB', icon: 'fa-file-image', color: 'text-blue-500' },
                                { name: 'Powder_Specs.docx', date: 'Yesterday', size: '45 KB', icon: 'fa-file-word', color: 'text-blue-700' },
                                { name: 'Project_Alpha', date: '1 week ago', size: '-', icon: 'fa-folder', color: 'text-yellow-500' },
                            ].map(file => (
                                <tr key={file.name} className="hover:bg-slate-50 cursor-pointer group">
                                    <td className="py-3 flex items-center space-x-3">
                                        <i className={`fa-solid ${file.icon} ${file.color} text-lg`}></i>
                                        <span className="font-medium group-hover:text-blue-600 underline-offset-4 decoration-blue-600">{file.name}</span>
                                    </td>
                                    <td className="py-3 text-slate-400">{file.date}</td>
                                    <td className="py-3 text-slate-400">{file.size}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Dropbox;
