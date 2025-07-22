import { BrowserRouter, Routes, Route } from "react-router-dom"
import WebtoonMain from "./pages/WebtoonMain";
import Login from "./pages/Login"
import Signup from "./pages/Signup"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WebtoonMain />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
