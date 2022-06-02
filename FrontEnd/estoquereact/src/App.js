import './App.css';


import Routs from './routes/Routs';
import { useContext, useEffect } from 'react';

import { AutContext } from './context/AutContext';
import Home from './pages/home/Home';
import Navbar from './components/navbar/Navbar';
import Sidebar from './components/sidebar/Sidebar';
import Login from './pages/users/login/Login';
import Register from './pages/users/register/Register';

function App() {
  const { authentication } = useContext(AutContext);

  return (

    <>
      <Home>
        {authentication ? <> <Navbar /> <Sidebar /> </> :  <> <Login /> </>}
      </Home>
    </>

  );

}

export default App;
