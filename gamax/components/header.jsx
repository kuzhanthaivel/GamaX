"use client"

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../assets/logo.png';

export default function Header() {
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState(null);
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(false);

  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      setIsMetaMaskInstalled(true);
      checkConnection();
      
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', () => window.location.reload());
      
      return () => {
        if (window.ethereum.removeListener) {
          window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
          window.ethereum.removeListener('chainChanged', () => window.location.reload());
        }
      };
    }
  }, []);

  const checkConnection = async () => {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      if (accounts.length > 0) {
        setIsConnected(true);
        setAccount(accounts[0]);
      }
    } catch (error) {
      console.error('Error checking connection:', error);
    }
  };

  const handleAccountsChanged = (accounts) => {
    if (accounts.length === 0) {
      setIsConnected(false);
      setAccount(null);
    } else {
      setIsConnected(true);
      setAccount(accounts[0]);
    }
  };

  const connectWallet = async () => {
    if (!isMetaMaskInstalled) {
      alert('Please install MetaMask to connect your wallet!');
      window.open('https://metamask.io/download.html', '_blank');
      return;
    }

    try {
      const accounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts' 
      });
      setIsConnected(true);
      setAccount(accounts[0]);
    } catch (error) {
      console.error('Error connecting wallet:', error);
      if (error.code === 4001) {
        // User rejected the request
        alert('Please connect to MetaMask to continue.');
      }
    }
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    setAccount(null);
  };

  const shortenAddress = (addr) => {
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  };

  return (
    <header className="w-full px-20 py-8 flex items-center justify-between bg-black border-b border-gray-800 bg-transparent">
      <div className="">
        <Image src={logo} alt="Logo" className='w-40' />
      </div>
      <nav className="space-x-6 text-lg text-gray-300">
        <Link href="/" className="hover:text-indigo-400">Home</Link>
        <Link href="/marketplace" className="hover:text-indigo-400">Marketplace</Link>
        <Link href="/collaborators" className="hover:text-indigo-400">Collaborators</Link>
        <Link href="/profile" className="hover:text-indigo-400">Profile</Link>
      </nav>
      {isConnected ? (
        <div className="flex items-center space-x-4">
          <span className="text-indigo-400">{shortenAddress(account)}</span>
          <button 
            onClick={disconnectWallet}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm transition"
          >
            Disconnect
          </button>
        </div>
      ) : (
        <button 
          onClick={connectWallet}
          className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm transition"
        >
          Connect Wallet
        </button>
      )}
    </header>
  );
}