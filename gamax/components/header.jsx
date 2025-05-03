"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../assets/logo.png";

export default function Header() {
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState(null);
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      setIsMetaMaskInstalled(true);
      checkConnection();

      window.ethereum.on("accountsChanged", handleAccountsChanged);
      window.ethereum.on("chainChanged", () => window.location.reload());

      return () => {
        if (window.ethereum.removeListener) {
          window.ethereum.removeListener(
            "accountsChanged",
            handleAccountsChanged
          );
          window.ethereum.removeListener("chainChanged", () =>
            window.location.reload()
          );
        }
      };
    }
  }, []);

  const checkConnection = async () => {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (accounts.length > 0) {
        setIsConnected(true);
        setAccount(accounts[0]);
      }
    } catch (error) {
      console.error("Error checking connection:", error);
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
      alert("Please install MetaMask to connect your wallet!");
      window.open("https://metamask.io/download.html", "_blank");
      return;
    }

    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setIsConnected(true);
      setAccount(accounts[0]);
    } catch (error) {
      console.error("Error connecting wallet:", error);
      if (error.code === 4001) {
        alert("Please connect to MetaMask to continue.");
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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="w-full px-4 sm:px-6 lg:px-20 py-4 sm:py-6 lg:py-8 flex flex-wrap items-center justify-between bg-black border-b border-gray-800 bg-transparent">
      <div className="flex items-center justify-between w-full md:w-auto">
        <div className="mr-4">
          <Image src={logo} alt="Logo" className="w-32 lg:w-40" />
        </div>

        <button
          onClick={toggleMenu}
          className="md:hidden text-gray-300 hover:text-indigo-400 focus:outline-none"
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      <nav
        className={`${
          isMenuOpen ? "block" : "hidden"
        } md:block w-full md:w-auto mt-4 md:mt-0`}
      >
        <ul className="flex flex-col md:flex-row md:space-x-6 space-y-2 md:space-y-0 text-lg text-gray-300">
          <li>
            <Link
              href="/"
              className="hover:text-indigo-400 block py-2 md:py-0"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/marketplace"
              className="hover:text-indigo-400 block py-2 md:py-0"
              onClick={() => setIsMenuOpen(false)}
            >
              Marketplace
            </Link>
          </li>
          <li>
            <Link
              href="/collaborators"
              className="hover:text-indigo-400 block py-2 md:py-0"
              onClick={() => setIsMenuOpen(false)}
            >
              Collaborators
            </Link>
          </li>
          <li>
            <Link
              href="/profile"
              className="hover:text-indigo-400 block py-2 md:py-0"
              onClick={() => setIsMenuOpen(false)}
            >
              Profile
            </Link>
          </li>
        </ul>
      </nav>

      <div
        className={`${
          isMenuOpen ? "block mt-4 w-full" : "hidden"
        } md:block md:mt-0 md:w-auto`}
      >
        {isConnected ? (
          <div className="flex justify-center md:justify-end">
            <button
              onClick={disconnectWallet}
              className="bg-indigo-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm transition w-full md:w-36"
            >
              <span>{shortenAddress(account)}</span>
            </button>
          </div>
        ) : (
          <button
            onClick={connectWallet}
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm transition w-full md:w-36"
          >
            Connect Wallet
          </button>
        )}
      </div>
    </header>
  );
}
