
import React, { useState } from 'react';

const Calculator: React.FC = () => {
    const [display, setDisplay] = useState('0');
    
    const append = (val: string) => {
        setDisplay(prev => prev === '0' ? val : prev + val);
    };

    const clear = () => setDisplay('0');

    const calculate = () => {
        try {
            // Safe eval alternative for simple math
            // eslint-disable-next-line no-eval
            setDisplay(String(eval(display)));
        } catch {
            setDisplay('Error');
        }
    };

    const btnClass = "h-10 text-sm font-medium seven-button";

    return (
        <div className="p-4 bg-slate-100 h-full flex flex-col items-center justify-center">
            <div className="w-full max-w-[240px] bg-white border border-slate-300 shadow-inner rounded p-2 mb-4 text-right text-2xl font-mono truncate h-12 flex items-center justify-end">
                {display}
            </div>
            <div className="grid grid-cols-4 gap-1 w-full max-w-[240px]">
                {['7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '0', '.', '=', '+'].map(char => (
                    <button 
                        key={char} 
                        onClick={() => char === '=' ? calculate() : append(char)}
                        className={btnClass}
                    >
                        {char}
                    </button>
                ))}
                <button onClick={clear} className="col-span-4 mt-1 h-8 text-xs seven-button">Clear</button>
            </div>
        </div>
    );
};

export default Calculator;
