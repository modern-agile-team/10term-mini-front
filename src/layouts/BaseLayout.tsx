import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router';
import { useState, useEffect } from 'react';

type User = {
  username: string;
  nickname: string;
};

function BaseLayout() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('유저 정보 파싱 실패:', e);
      }
    }
  }, []);

  return (
    <div className="mx-auto">
      <Header user={user} />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default BaseLayout;
