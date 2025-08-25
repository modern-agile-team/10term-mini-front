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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
