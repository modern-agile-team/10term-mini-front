import { BrowserRouter, Routes, Route } from 'react-router';
import BaseLayout from './layouts/BaseLayout';
import useTokenRefresher from './hooks/useTokenRefresher';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Welcome from './pages/Welcome';
import WebtoonMain from './pages/WebtoonMain';

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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
