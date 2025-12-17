
import React from 'react';

interface LoginScreenProps {
    onLogin: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
    return (
        <div className="w-full h-screen bg-[#005a9e] flex flex-col items-center justify-center text-white relative">
            <div className="absolute inset-0 bg-gradient-to-b from-[#3b82f6]/30 to-transparent"></div>
            
            <div className="z-10 flex flex-col items-center animate-fadeIn">
                <div className="w-32 h-32 mb-8 powder-logo flex items-center justify-center">
                    <div className="w-20 h-20 bg-blue-500/20 rounded-full blur-md animate-pulse"></div>
                    <span className="absolute text-blue-900 font-bold text-xl">POWDER</span>
                </div>
                
                <h1 className="text-4xl font-light mb-12">Welcome</h1>
                
                <div 
                    onClick={onLogin}
                    className="cursor-pointer group flex flex-col items-center transition-transform hover:scale-110"
                >
                    <div className="w-24 h-24 rounded-lg bg-white/20 border border-white/40 overflow-hidden mb-4 shadow-xl">
                        <img 
                            src="https://picsum.photos/seed/user/100/100" 
                            alt="Admin" 
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all"
                        />
                    </div>
                    <span className="text-xl font-semibold">Admin</span>
                    <span className="text-sm opacity-70">Click to enter Powder OS</span>
                </div>
            </div>
            
            <div className="absolute bottom-10 flex space-x-4 opacity-70">
                <i className="fa-solid fa-power-off cursor-pointer hover:text-red-400 transition-colors"></i>
                <i className="fa-solid fa-universal-access cursor-pointer hover:text-blue-200 transition-colors"></i>
            </div>
        </div>
    );
};

export default LoginScreen;
