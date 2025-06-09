import { useMutation, useQueryClient } from "@tanstack/react-query";
import { exchangeToken } from "../apis/authApi";
import { ExchangeTokenResponse } from "../models/auth";
import { useEffect, useState } from "react";

const useExchangeToken = () => {
    const [token, setToken] = useState(() => localStorage.getItem("access_token"));

    useEffect(() => {
        const interval = setInterval(() => {
            const current = localStorage.getItem("access_token");
            setToken((prev) => (prev !== current ? current : prev));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const queryClient = useQueryClient();

    return useMutation<
        ExchangeTokenResponse,
        Error,
        { code: string; codeVerifier: string }
    >({
        mutationFn: ({ code, codeVerifier }) => exchangeToken(code, codeVerifier),
        onSuccess: (data) => {
            localStorage.setItem("access_token", data.access_token);
            queryClient.invalidateQueries({ queryKey: ["current-user-profile"] });
            queryClient.invalidateQueries({ queryKey: ["current-user-playlists"] });
        },
    });
};

export default useExchangeToken;
