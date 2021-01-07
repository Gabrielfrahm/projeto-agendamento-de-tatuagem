import React from 'react';
import Global from './styles/global';
import Landpage from './pages/Landpage';
// import Page from './components/Page';

const App: React.FC = () => {
  return (
    <>
      <Landpage />
      <Global />
    </>
  );
};

export default App;
