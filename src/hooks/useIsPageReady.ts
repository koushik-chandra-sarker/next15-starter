"use client";

import { useState, useEffect } from "react";

const useIsPageReady = () => {
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const handleLoad = () => setIsReady(true);

        if (document.readyState === "complete") {
            handleLoad();
        } else {
            window.addEventListener("load", handleLoad);
        }

        return () => {
            window.removeEventListener("load", handleLoad);
        };
    }, []);

    return isReady;
};

export default useIsPageReady;
