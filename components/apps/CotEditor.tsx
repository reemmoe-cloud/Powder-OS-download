
import React, { useState } from 'react';

const CotEditor: React.FC = () => {
    const [content, setContent] = useState('// Welcome to CotEditor for Powder OS\n\nfunction initializeOS() {\n  console.log("Powder OS is starting...");\n  boot();\n}\n\ninitializeOS();');

    return (
        <div className="h-full flex flex-col bg-[#f8f9fa] font-mono">
            <div className="h-8 flex items-center px-4 bg-white border-b border-slate-200 text-[10px] space-x-6 text-slate-600">
                <span className="cursor-pointer hover:text-blue-600">File</span>
                <span className="cursor-pointer hover:text-blue-600">Edit</span>
                <span className="cursor-pointer hover:text-blue-600">Format</span>
                <span className="cursor-pointer hover:text-blue-600">View</span>
                <span className="cursor-pointer hover:text-blue-600">Script</span>
                <span className="cursor-pointer hover:text-blue-600">Window</span>
            </div>
            <div className="flex-1 flex">
                <div className="w-12 bg-slate-100 border-r border-slate-200 text-[10px] text-slate-400 text-right pr-2 py-4 select-none">
                    {Array.from({length: 20}).map((_, i) => <div key={i}>{i + 1}</div>)}
                </div>
                <textarea 
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="flex-1 p-4 bg-transparent outline-none resize-none text-sm text-slate-800 leading-relaxed"
                    spellCheck={false}
                />
            </div>
            <div className="h-6 bg-slate-50 border-t border-slate-200 px-4 flex items-center justify-between text-[10px] text-slate-400">
                <span>JavaScript</span>
                <span>UTF-8</span>
                <span>Line: 1, Col: 1</span>
            </div>
        </div>
    );
};

export default CotEditor;
