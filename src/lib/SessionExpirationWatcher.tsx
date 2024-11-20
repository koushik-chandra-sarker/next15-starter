"use client";
import { useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";
import { isTokenExpired } from "@/lib/tokenUtils";
import { logout } from "@/app/services/auth/auth.service";

const SessionExpirationWatcher = () => {
    const { data: session, status } = useSession();
    console.log("session: ", session);
    console.log("status: ", status);
    const hasAlerted = useRef(false); // Prevent multiple alerts
    let intervalId: NodeJS.Timeout;
    useEffect(() => {
        const checkSessionExpiration = async () => {
            if (status === "authenticated" && session?.refreshToken) {
                const expired = isTokenExpired(session.refreshToken)
                console.log("Expired: ", expired);
                if (expired && !hasAlerted.current) {
                    hasAlerted.current = true; // Prevent duplicate alerts
                    clearInterval(intervalId); // Stop further checks
                    console.log("Calling alert");
                    await Swal.fire({
                        icon: "error",
                        title: "Session Expired",
                        text: "Your session has expired. Please log in again.",
                    });
                    console.log("Calling logout");
                    logout();
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
