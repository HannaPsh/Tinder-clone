import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const AuthModal = ({ setShowModal, isSignUp }) => {
  const [password, setPassword] = useState(null);
  const [email, setEmail] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [error, setError] = useState('');
  const [cookies, setCookie, removeCookie] = useCookies(['user']);

  let navigate = useNavigate();

  const handleClick = () => {
    setShowModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isSignUp && password !== confirmPassword) {
        setError('Passwords need to match!');
        return;
      }

      const response = await axios.post(
        `http://localhost:8000/${isSignUp ? 'signup' : 'login'}`,
        { email, password }
      );
      setCookie('AuthToken', response.data.token);
      setCookie('UserId', response.data.userId);

      const success = response.status === 201;
      if (success && isSignUp) navigate('/onboarding');
      if (success && !isSignUp) navigate('/dashboard');
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="auth-modal">
      <div className="close-icon" onClick={handleClick}>
        X
      </div>
      <h2>{isSignUp ? 'Create an account' : 'Log In'}</h2>
      <p>
        By clicking the button you are accepting the terms of the Service
        Agreement.
      </p>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="email"
          required={true}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          id="password"
          name="password"
          placeholder="password"
          required={true}
          onChange={(e) => setPassword(e.target.value)}
        />
        {isSignUp && (
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="confirmPassword"
            required={true}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        )}
        <input type="submit" className="secondary-button" />
        <p>{error}</p>
      </form>
    </div>
  );
};
export default AuthModal;
