import { BrowserRouter, Routes, Route } from 'react-router';
import BaseLayout from '@/layouts/BaseLayout';
import { useTokenRefresher } from '@/hooks';
import { Suspense } from 'react';
import React from 'react';
import Spinner from '@/components/Spinner';

const Login = React.lazy(() => import('@/pages/Login'));
const Signup = React.lazy(() => import('@/pages/Signup'));
const Welcome = React.lazy(() => import('@/pages/Welcome'));
const Favorites = React.lazy(() => import('@/pages/Favorites'));
const MyPage = React.lazy(() => import('@/pages/MyPage'));
const WebtoonMain = React.lazy(() => import('@/pages/WebtoonMain'));
const WebtoonDetail = React.lazy(() => import('@/pages/WebtoonDetail'));
const WebtoonSearch = React.lazy(() => import('@/pages/WebtoonSearch'));
const WebtoonViewer = React.lazy(() => import('@/pages/WebtoonViewer'));

function App() {
  useTokenRefresher();

  return (
    <BrowserRouter>
      <Suspense fallback={<Spinner message="페이지를 불러오는 중입니다..." />}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/welcome" element={<Welcome />} />

          <Route element={<BaseLayout />}>
            <Route path="/" element={<WebtoonMain />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/webtoon/:id" element={<WebtoonDetail />} />
            <Route path="/search" element={<WebtoonSearch />} />
            <Route path="/webtoon/:id/episode/:episodeid" element={<WebtoonViewer />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
