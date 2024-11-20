import React from 'react';
import logo from "../../../public/next.svg"
const SplashScreen = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
            <div className="text-center">
                <img
                    src={"/next.svg"} // Replace with your logo path
                    alt="Logo"
                    className="w-24 h-24 mb-4 animate-bounce"
                />
                <p className="text-lg font-semibold">Loading...</p>
            </div>
        </div>
    );
};

export default SplashScreen;
