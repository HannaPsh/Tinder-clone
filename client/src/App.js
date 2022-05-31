import Dashboard from './pages/Dashboard';
/* import Nav from './Components/Nav'; */
import Home from './pages/Home';
import Onboarding from './pages/Onboarding';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const App = () => {
  /* changed to functional expression */
  const [cookies, setCookie, removeCookie] = useCookies(['user']);

  const AuthToken = cookies.AuthToken;

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          {AuthToken && <Route path="/dashboard" element={<Dashboard />} />}
          {AuthToken && <Route path="/onboarding" element={<Onboarding />} />}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
