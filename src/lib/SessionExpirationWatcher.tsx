"use client";
import { useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";
import { isTokenExpired } from "@/lib/tokenUtils";
import { logout } from "@/app/services/auth/auth.service";

const SessionExpirationWatcher = () => {
    const { data: session, status } = useSession();
    const hasAlerted = useRef(false); // Prevent multiple alerts
    let intervalId: NodeJS.Timeout;
    useEffect(() => {
        const checkSessionExpiration = async () => {
            if (status === "authenticated" && session?.refreshToken) {
                const expired = isTokenExpired(session.refreshToken)
                if (expired && !hasAlerted.current) {
                    hasAlerted.current = true; // Prevent duplicate alerts
                    clearInterval(intervalId); // Stop further checks
                    await Swal.fire({
                        icon: "error",
                        title: "Session Expired",
                        text: "Your session has expired. Please log in again.",
                    });
                    await logout();
                }
            }
        };

        // Initial check
        checkSessionExpiration();

        // Periodic check every 5 seconds
        intervalId = setInterval(checkSessionExpiration, 5000);

        // Cleanup on unmount
        return () => clearInterval(intervalId);
    }, [status, session]);

    return null;
};

export default SessionExpirationWatcher;
