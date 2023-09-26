import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ContextLogin from '../context/ContextLogin';

function Login() {
  const { login, disable, handleChange, handleSubmit } = useContext(ContextLogin);
  const navigate = useNavigate();
  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSubmit();
    navigate('/meals');
  };

  return (
    <form onSubmit={ submit }>
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
