import logo from '../logo_3.png';
import fullLogo from '../full_logo.png';
import logofisei from '../logo_fisei.png';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

function Navbar() {

const [connected, toggleConnect] = useState(false);
const location = useLocation();
const [currAddress, updateAddress] = useState('0x');

async function getAddress() {
  const ethers = require("ethers");
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const addr = await signer.getAddress();
  updateAddress(addr);
}

function updateButton() {
  const ethereumButton = document.querySelector('.enableEthereumButton');
  ethereumButton.textContent = "Connected";
  ethereumButton.classList.remove("hover:bg-blue-70");
  ethereumButton.classList.remove("bg-blue-500");
  ethereumButton.classList.add("hover:bg-green-70");
  ethereumButton.classList.add("bg-green-500");
}

async function connectWebsite() {

    const chainId = await window.ethereum.request({ method: 'eth_chainId' });
    if(chainId !== '0x5')
    {
      //alert('Incorrect network! Switch your metamask network to Rinkeby');
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x5' }],
     })
    }  
    await window.ethereum.request({ method: 'eth_requestAccounts' })
      .then(() => {
        updateButton();
        console.log("here");
        getAddress();
        window.location.replace(location.pathname)
      });
}

  useEffect(() => {
    let val = window.ethereum.isConnected();
    if(val)
    {
      console.log("here");
      getAddress();
      toggleConnect(val);
      updateButton();
    }

    window.ethereum.on('accountsChanged', function(accounts){
      window.location.replace(location.pathname)
    })
  });

    return (
      <div className="">
        <nav className="flex  p-2 bg-white">
          <ul className='flex items-center flex-shrink-6 text-white mr-12'>
          <li className='flex items-center ml-5 pb-2 pt-2 px-4'>
            <Link to="/">
            <img src={fullLogo} alt="" width={80} height={100} className="inline-block -mt-2 "/>

            </Link>
          </li>
          <li className='flex items-center ml-5 pb-2 pt-2 pl-2 pr-80'>
            <img src={logofisei} alt="" width={250} height={200} className="inline-block -mt-2"/>
          </li>
          <li className='flex items-center ml-8 pb-2 pt-2 px-auto'>
            <ul className='lg:flex justify-between font-bold mr-10 text-lg'>
              {location.pathname === "/" ? 
              <li className='border-none hover:pb-0 p-2 text-red-800 px-4'>
                <Link to="/">Marketplace</Link>
              </li>
              :
              <li className='hover:border-none hover:pb-0 p-2 text-red-800 px-4'>
                <Link to="/">Marketplace</Link>
              </li>              
              }
              {location.pathname === "/sellNFT" ? 
              <li className='border-none hover:pb-0 p-2 text-red-800 px-4'>
                <Link to="/sellNFT">Certificado NFT</Link>
              </li>
              :
              <li className='hover:border-none hover:pb-0 p-2 text-red-800 px-4'>
                <Link to="/sellNFT">Certificado NFT</Link>
              </li>              
              }              
              {location.pathname === "/profile" ? 
              <li className='border-none hover:pb-0 p-2 text-red-800 px-4'>
                <Link to="/profile">Perfil</Link>
              </li>
              :
              <li className='hover:border-none hover:pb-0 p-2 text-red-800 px-4'>
                <Link to="/profile">Perfil</Link>
              </li>              
              }  
              <li className='px-4'>
                <button className="enableEthereumButton items-end inline-block t-4 lg:mt-0 bg-red-800 hover:bg-red-900 text-white font-bold py-2 px-4 rounded text-sm" onClick={connectWebsite}>{connected? "Conectado":"Conectar Wallet"}</button>
            
              </li>
            </ul>
          </li>
          </ul>
        </nav>
        <br />
        <div className='text-white text-bold text-right text-lg mr-10 text-sm'>
          {currAddress !== "0x" ? "Cuenta conectada a":"No conectado. Ingresa para ver tus certificados NFTs"} {currAddress !== "0x" ? (currAddress.substring(0,15)+'...'):""}
        </div>
      </div>
    );
  }

  export default Navbar;