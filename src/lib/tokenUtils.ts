import {jwtDecode} from 'jwt-decode';
import dayjs from 'dayjs';
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(utc);
dayjs.extend(timezone);
/**
 * Extracts and checks if the JWT token is expired.
 * @param token - The JWT token string.
 * @returns boolean - Returns true if the token is expired, false otherwise.
 */
export const isTokenExpired = (token: string): boolean => {
    try {
        const decodedToken = jwtDecode(token);
        const expirationTime = decodedToken?.exp ? decodedToken.exp * 1000 : null;

        console.log("Expiration Time: ", expirationTime);

        if (!expirationTime) return true; // If no expiration, treat as expired

        const expirationTimeLocal = dayjs(expirationTime).tz(dayjs.tz.guess());
        console.log("Expiration Time Local: ", expirationTimeLocal);

        // Return true if the current time is after the expiration time
        return dayjs().isAfter(expirationTimeLocal);
    } catch (error) {
        console.error("Error decoding JWT token:", error);
        return true; // Treat as expired if decoding fails
    }
};
