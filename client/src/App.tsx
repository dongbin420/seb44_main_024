import './App.css';
import { Outlet } from 'react-router-dom';
import Main from './pages/MainPage/Main';
import Header from './pages/UI/Header';

function App() {
  return (
    <>
      <Outlet />
      <Header />
      <Main />
    </>
  );
}

export default App;
