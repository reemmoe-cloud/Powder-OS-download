
import React from 'react';

const ControlPanel: React.FC = () => {
    const categories = [
        { name: 'System and Security', icon: 'fa-shield-halved', desc: 'Review your computer status, back up files.' },
        { name: 'Network and Internet', icon: 'fa-globe', desc: 'View network status and tasks.' },
        { name: 'Hardware and Sound', icon: 'fa-headphones', desc: 'View devices and printers, adjust volume.' },
        { name: 'Programs', icon: 'fa-box-archive', desc: 'Uninstall a program.' },
        { name: 'User Accounts', icon: 'fa-user-gear', desc: 'Change account type or password.' },
        { name: 'Appearance and Personalization', icon: 'fa-palette', desc: 'Change theme, desktop background.' },
        { name: 'Clock, Language, and Region', icon: 'fa-earth-americas', desc: 'Change date and time.' },
        { name: 'Ease of Access', icon: 'fa-universal-access', desc: 'Let Powder suggest settings.' },
    ];

    return (
        <div className="h-full bg-white p-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-normal text-[#003399]">Adjust your computer's settings</h1>
                <div className="flex items-center text-xs text-slate-500">
                    <span>View by: </span>
                    <span className="font-bold ml-1 text-slate-800 cursor-pointer hover:underline">Category <i className="fa-solid fa-caret-down"></i></span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                {categories.map(cat => (
                    <div key={cat.name} className="flex space-x-4 group cursor-pointer">
                        <div className="text-4xl text-blue-800 opacity-80 group-hover:opacity-100 transition-opacity w-12 flex justify-center">
                            <i className={`fa-solid ${cat.icon}`}></i>
                        </div>
                        <div>
                            <div className="text-lg text-blue-700 hover:underline font-medium leading-tight mb-1">{cat.name}</div>
                            <div className="text-xs text-slate-600">{cat.desc}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ControlPanel;
