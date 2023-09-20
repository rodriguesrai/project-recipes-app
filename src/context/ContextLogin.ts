import { createContext } from 'react';
import { LoginType } from '../types';

type ContextLoginType = {
  login: LoginType,
  disable: boolean,
  handleChange : (event:
  React
    .ChangeEvent<HTMLInputElement>) => void,
  handleSubmit: () => void;
};

const ContextLogin = createContext({} as ContextLoginType);

export default ContextLogin;
