import { CLIENT_ID, SCOPE } from "../configs/authConfig";
import { REDIRECT_URI } from "../configs/commonConfig";
import { AuthUrlParams } from "../models/auth";
import { base64encode, generateRandomString, sha256 } from "./crypto";

export const getSpotifyAuthUrl = async () => {
    const existingToken = localStorage.getItem('access_token');
    if (existingToken) {
        console.log("🔁 기존 access_token 삭제 후 재인증 시작");
        localStorage.removeItem('access_token');
    }

    localStorage.removeItem('code_verifier');

    const codeVerifier = generateRandomString(64);
    const hashed = await sha256(codeVerifier);
    const codeChallenge = base64encode(hashed);

    const clientId = CLIENT_ID;
    const redirectUri = REDIRECT_URI;
    const scope = SCOPE;

    const authUrl = new URL("https://accounts.spotify.com/authorize");
    window.localStorage.setItem('code_verifier', codeVerifier);

    if (clientId && redirectUri) {
        const params: AuthUrlParams = {
            response_type: 'code',
            client_id: clientId,
            scope,
            code_challenge_method: 'S256',
            code_challenge: codeChallenge,
            redirect_uri: redirectUri,
        };

        authUrl.search = new URLSearchParams(Object.entries(params)).toString();
        window.location.href = authUrl.toString();
    }
};
