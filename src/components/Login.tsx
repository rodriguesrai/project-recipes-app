import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ContextLogin from '../context/ContextLogin';
import { LoginContainer, Input, Button } from '../style/Login.styled';

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
      <LoginContainer>
        <Input
          name="email"
          type="email"
          data-testid="email-input"
          value={ login.email }
          onChange={ handleChange }
        />
        <Input
          name="password"
          type="password"
          data-testid="password-input"
          value={ login.password }
          onChange={ handleChange }
        />
        <Button
          data-testid="login-submit-btn"
          disabled={ !disable }
        >
          Entrar
        </Button>
      </LoginContainer>
    </form>
  );
}

export default Login;
