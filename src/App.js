import './App.css';
import Navbar from './components/Navbar.js';
import Marketplace from './components/Marketplace';
import Profile from './components/Profile';
import SellNFT from './components/SellNFT';
import NFTPage from './components/NFTpage';
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <div className="container">
        <Routes>
          <Route path="/" element={<Marketplace />}/>
          <Route path="/descripcion-nft" element={<NFTPage />}/>        
          <Route path="/perfil" element={<Profile />}/>
          <Route path="/adquirir-nft" element={<SellNFT />}/>             
        </Routes>
    </div>
  );
}

export default App;
