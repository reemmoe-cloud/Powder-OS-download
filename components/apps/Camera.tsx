
import React, { useRef, useState, useEffect } from 'react';

const Camera: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let stream: MediaStream | null = null;
        async function startCamera() {
            try {
                stream = await navigator.mediaDevices.getUserMedia({ video: true });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            } catch (err) {
                setError("Could not access camera. Please ensure permissions are granted.");
                console.error(err);
            }
        }
        startCamera();
        return () => {
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
        };
    }, []);

    return (
        <div className="h-full bg-black flex flex-col relative group">
            {error ? (
                <div className="flex-1 flex items-center justify-center text-white p-8 text-center">
                    <div className="bg-red-500/20 border border-red-500 p-4 rounded-lg max-w-sm">
                        <i className="fa-solid fa-circle-exclamation text-4xl mb-4 text-red-500"></i>
                        <p>{error}</p>
                    </div>
                </div>
            ) : (
                <>
                    <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
                    <div className="absolute bottom-10 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="w-16 h-16 rounded-full bg-white/20 border-4 border-white flex items-center justify-center text-white hover:bg-white/40 transition-colors shadow-xl">
                            <i className="fa-solid fa-camera text-2xl"></i>
                        </button>
                    </div>
                </>
            )}
            <div className="absolute top-4 left-4 text-white/50 text-xs font-mono uppercase tracking-widest bg-black/40 px-2 py-1 rounded">
                Live Feed
            </div>
        </div>
    );
};

export default Camera;
