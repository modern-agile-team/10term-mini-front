import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BaseLayout from './layouts/BaseLayout';
import TokenRefresher from './components/TokenRefresher';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Welcome from './pages/Welcome';
import WebtoonMain from './pages/WebtoonMain';
import WebtoonDetail from './pages/WebtoonDetail';

function App() {
  return (
    <BrowserRouter>
      <TokenRefresher />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/welcome" element={<Welcome />} />

        <Route element={<BaseLayout />}>
          <Route path="/" element={<WebtoonMain />} />
          <Route path="/webtoon/:id" element={<WebtoonDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
