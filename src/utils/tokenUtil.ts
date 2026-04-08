import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants/storageConstants";
import * as storage from "./storageUtil";
import { jwtDecode } from "jwt-decode";
import type {AccessToken} from "../types/token.ts";

export function getRefreshToken(): string {
    return storage.get(REFRESH_TOKEN);
}

export function getAccessToken(): string {
    return storage.get(ACCESS_TOKEN);
}

export function setAccessToken(token: string) {
    return storage.set(ACCESS_TOKEN, token);
}

export function setRefreshToken(token: string) {
    return storage.set(REFRESH_TOKEN, token);
}

export function clearTokens () {
    storage.remove(REFRESH_TOKEN);
    storage.remove(ACCESS_TOKEN);
}

export function decodeToken(token: string): AccessToken | null {
    try {
        return jwtDecode(token);
    } catch (error) {
        console.log("Error decoding token:", error);
        return null;
    }
}