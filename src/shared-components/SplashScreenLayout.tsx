"use client";

import React from "react";
import SplashScreen from "@/shared-components/SplashScreen";
import useIsPageReady from "@/hooks/useIsPageReady";

const SplashScreenLayout = ({ children }: { children: React.ReactNode }) => {
    const isPageReady = useIsPageReady();

    return (
        <div>
            {isPageReady ? children : <SplashScreen />}
        </div>
    );
};

export default SplashScreenLayout;
