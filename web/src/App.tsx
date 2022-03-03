import React from 'react';

import { BrowserRouter } from 'react-router-dom';
import RoutesStack from './routes';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import GlobalStyle from './styles/global';

const App: React.FC = () => (
  <>
    <SignUp />
    <GlobalStyle />
  </>
)

export default App;
