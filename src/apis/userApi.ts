import axios from "axios";
import { SPOTIFY_BASE_URL } from "../configs/commonConfig";
import { User } from "../models/user";
import api from "../utils/api";

export const getCurrentUserProfile = async (): Promise<User> => {
    const token = localStorage.getItem("access_token");

    if (!token) {
        // 🔴 로그인 안 한 상태에서는 API 요청 자체를 하지 않음
        throw new Error("No access token");
    }

    try {
        const response = await api.get(`/me`);
        return response.data;
    } catch (error: any) {
        // 🔴 실제 401이나 네트워크 에러 메시지를 확인하려면 여기서 로그 출력
        console.error("❌ Failed to fetch user profile:", error.response?.data || error.message);
        throw new Error("Fail to fetch user profile");
    }
};