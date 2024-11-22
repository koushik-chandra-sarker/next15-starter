import React from 'react';
import Image from "next/image";
const SplashScreen = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
            <div className="text-center">
                <Image
                    src={"/next.svg"} // Replace with your logo path
                    alt="Logo"
                    className="w-24 h-24 mb-4 animate-bounce"
                    width={100}
                    height={100}
                />
                <p className="text-lg font-semibold">Loading...</p>
            </div>
        </div>
    );
};

export default SplashScreen;
