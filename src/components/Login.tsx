import { useContext } from 'react';
import ContextLogin from '../context/ContextLogin';

function Login() {
  const { login, disable, handleChange } = useContext(ContextLogin);

  return (
    <form>
      <input
        name="email"
        type="email"
        data-testid="email-input"
        value={ login.email }
        onChange={ handleChange }
      />
      <input
        name="password"
        type="password"
        data-testid="password-input"
        value={ login.password }
        onChange={ handleChange }
      />
      <button
        data-testid="login-submit-btn"
        disabled={ !disable }
      >
        Entrar

      </button>
    </form>
  );
}

export default Login;
