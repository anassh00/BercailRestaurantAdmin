import logo from './logo.svg';
import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './Components/Login/Login';
import Home from './Components/Home/Home';
import Reservation from './Components/Reservation/Reservation';
import Message from './Components/Message/Message';
import Carte from './Components/Carte/Carte';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Reservation />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Carte" element={<Carte />} />
        <Route path="/Message" element={<Message />} />
        <Route path="*" exact={true} element={<Navigate replace to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
