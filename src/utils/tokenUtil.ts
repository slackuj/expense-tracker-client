import { ACCESS_TOKEN } from "../constants/storageConstants";
import * as storage from "./storageUtil";
import {jwtDecode, type JwtPayload} from "jwt-decode";

export function getAccessToken(): string {
    return storage.get(ACCESS_TOKEN);
}

export function setAccessToken(token: string) {
    return storage.set(ACCESS_TOKEN, token);
}

export function clearTokens () {
    storage.remove(ACCESS_TOKEN);
}

export function decodeToken(token: string): JwtPayload | null {
    try {
        const decodedToken = jwtDecode(token);
        console.log("AccessToken", decodedToken);
        return decodedToken;
    } catch (error) {
        //console.error("Error decoding token:", error);
        return null;
    }
}