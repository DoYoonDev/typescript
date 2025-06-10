import React, { Suspense, useEffect } from 'react';
import './App.css';
import { Route, Routes } from 'react-router';
import LoadingSpinner from './common/components/LoadingSpinner';
import useExchangeToken from './hooks/useExchangeToken';

const AppLayout = React.lazy(() => import('./layout/AppLayout'));
const HomePage = React.lazy(() => import('./pages/HomePage/HomePage'));
const SearchPage = React.lazy(() => import('./pages/SearchPage/SearchPage'));
const SearchWithKeywordPage = React.lazy(() => import('./pages/SearchWithKeywordPage/SearchWithKeywordPage'));
const PlaylistDetailPage = React.lazy(() => import('./pages/PlaylistDetailPage/PlaylistDetailPage'));
const PlaylistPage = React.lazy(() => import('./pages/PlaylistPage/PlaylistPage'));

function App() {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get('code');
  const codeVerifier = localStorage.getItem('code_verifier');
  const token = localStorage.getItem('access_token');

  const { mutate: exchangeToken } = useExchangeToken();

  const needsTokenExchange = code && codeVerifier && !token;

  useEffect(() => {
    // 로그인 안 된 상태 → access_token 정리
    if (!token) {
      console.warn("⛔ access_token 없음 → 로그인 필요");
      localStorage.removeItem("access_token");
    }

    // 로그인 코드가 있는 경우 → 토큰 교환
    if (needsTokenExchange) {
      exchangeToken({ code, codeVerifier }, {
        onSuccess: () => {
          window.location.replace("/");
        },
        onError: (err) => {
          console.error("❌ Token exchange 실패:", err);
        }
      });
    }
  }, [needsTokenExchange, code, codeVerifier, exchangeToken, token]);

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path='/' element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path='search' element={<SearchPage />} />
          <Route path='search/:keyword' element={<SearchWithKeywordPage />} />
          <Route path='playlist/:id' element={<PlaylistDetailPage />} />
          <Route path='playlist' element={<PlaylistPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
