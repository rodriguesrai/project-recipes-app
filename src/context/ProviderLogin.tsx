import { useState } from 'react';
import ContextLogin from './ContextLogin';
import { LoginType } from '../types';

type ProviderLoginProps = {
  children: React.ReactNode;
};

const INITIAL_VALUE = {
  email: '',
  password: '',
};

function ProviderLogin({ children }: ProviderLoginProps) {
  const [login, setLogin] = useState<LoginType>(INITIAL_VALUE);
  const [disable, setDisable] = useState(false);

  const verifyLogin = () => {
    const verifyRegexEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/i;
    return (
      verifyRegexEmail.test(login.email)
        && login.password.length >= 6
    );
  };

  const handleChange = (event:
  React
    .ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setLogin({ ...login, [name]: value });
    setDisable(verifyLogin());
  };

  const values = {
    login,
    disable,
    handleChange,
  };

  return (
    <ContextLogin.Provider value={ values }>
      { children }
    </ContextLogin.Provider>
  );
}

export default ProviderLogin;
