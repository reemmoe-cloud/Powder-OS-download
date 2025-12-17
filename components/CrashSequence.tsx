
import React, { useState, useEffect } from 'react';

const CrashSequence: React.FC = () => {
    const [stage, setStage] = useState<'error' | 'repair' | 'failure' | 'void'>('error');
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (stage === 'error') {
            const timer = setTimeout(() => setStage('repair'), 5000);
            return () => clearTimeout(timer);
        }

        if (stage === 'repair') {
            const interval = setInterval(() => {
                setProgress(prev => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        setTimeout(() => setStage('failure'), 1000);
                        return 100;
                    }
                    return prev + Math.random() * 5;
                });
            }, 200);
            return () => clearInterval(interval);
        }

        if (stage === 'failure') {
            const timer = setTimeout(() => setStage('void'), 4000);
            return () => clearTimeout(timer);
        }
    }, [stage]);

    if (stage === 'error') {
        return (
          <div className="fixed inset-0 bg-black text-white flex flex-col items-center justify-center p-12 font-mono text-xl z-[9999]">
            <div className="max-w-2xl space-y-4 animate-pulse">
                <p>system 32 has been deleted and unexpected error has been detected</p>
                <p className="text-red-500">system has corrupted</p>
                <p className="text-red-500">system has corrupted</p>
                <p className="text-red-500">system has corrupted</p>
                <p className="mt-12 text-gray-500 text-sm">Attempting to reach Powder OS Recovery Environment...</p>
            </div>
          </div>
        );
    }

    if (stage === 'repair') {
        return (
            <div className="fixed inset-0 bg-slate-200 text-slate-900 flex items-center justify-center z-[9999] font-sans">
                <div className="w-[500px] bg-white border border-slate-400 shadow-2xl p-6 rounded">
                    <h2 className="text-blue-800 text-lg mb-4 flex items-center">
                        <i className="fa-solid fa-wrench mr-2"></i> Powder OS Startup Repair
                    </h2>
                    <p className="text-sm text-slate-600 mb-6">Repairing disk errors. This might take over an hour to complete.</p>
                    <div className="w-full bg-slate-200 h-6 rounded overflow-hidden mb-2 border border-slate-300">
                        <div 
                            className="bg-blue-500 h-full transition-all duration-300" 
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                    <p className="text-[10px] text-slate-400">Attempting repairs: C:\Windows\System32\Drivers...</p>
                </div>
            </div>
        );
    }

    if (stage === 'failure') {
        return (
            <div className="fixed inset-0 bg-slate-200 text-slate-900 flex items-center justify-center z-[9999]">
                <div className="w-[500px] bg-white border border-red-400 shadow-2xl p-6 rounded">
                    <h2 className="text-red-800 text-lg mb-4 flex items-center font-bold">
                        <i className="fa-solid fa-triangle-exclamation mr-2"></i> Repair Failed
                    </h2>
                    <p className="text-sm text-slate-700 mb-6 font-semibold">
                        Powder Startup Repair could not repair your computer.
                    </p>
                    <div className="p-3 bg-slate-50 border border-slate-200 rounded text-xs font-mono text-slate-500 h-24 overflow-auto mb-6">
                        Problem Event Name: SystemFilesDeleted<br/>
                        Problem Signature 01: System32<br/>
                        Problem Signature 02: 6.1.7601.17514<br/>
                        Problem Signature 03: core.exe<br/>
                        OS Version: 6.1.7601.2.1.0.256.1
                    </div>
                    <div className="flex justify-end">
                        <button className="seven-button px-6 py-1 text-sm pointer-events-none opacity-50">Finish</button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 bg-black flex items-center justify-center z-[9999]">
            <div className="powder-logo w-24 h-24 opacity-20 grayscale blur-[2px]"></div>
        </div>
    );
};

export default CrashSequence;
