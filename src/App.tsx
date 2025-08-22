import { BrowserRouter, Routes, Route } from 'react-router';
import BaseLayout from '@/layouts/BaseLayout';
import useTokenRefresher from '@/hooks/useTokenRefresher';
import Login from '@/pages/Login';
import Signup from '@/pages/Signup';
import Welcome from '@/pages/Welcome';
import WebtoonMain from '@/pages/WebtoonMain';
import Favorites from '@/pages/Favorites';
import MyPage from '@/pages/MyPage';
import WebtoonDetail from '@/pages/WebtoonDetail';
<<<<<<< HEAD
import WebtoonSearch from '@/pages/WebtoonSearch';
=======
import WebtoonViewer from '@/pages/WebtoonViewer';
>>>>>>> bb7a050 (feat: (#25) 웹툰 보기 페이지 라우트 설정)

function App() {
  useTokenRefresher();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/welcome" element={<Welcome />} />

        <Route element={<BaseLayout />}>
          <Route path="/" element={<WebtoonMain />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/webtoon/:id" element={<WebtoonDetail />} />
<<<<<<< HEAD
          <Route path="/search" element={<WebtoonSearch />} />
=======
          <Route path="/webtoon/:id/episode/:episodeid" element={<WebtoonViewer />} />
>>>>>>> bb7a050 (feat: (#25) 웹툰 보기 페이지 라우트 설정)
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
