import Head from 'next/head'
import { FaFacebook, FaInstagram, FaDiscord, FaYoutube, FaTiktok,FaBolt, FaGift, FaDollarSign, FaPlusSquare  } from "react-icons/fa";
import Header from './components/header'
import Footer from './components/footer'


export default function Home() {
  return (
    <>
      <Head>
        <title>GamaX - NFT Gaming Marketplace</title>
      </Head>

      <main className="bg-black text-white font-sans">
        {/* Navbar */}
        <Header />

        {/* Hero Section */}
        <section className="flex flex-col-reverse lg:flex-row flex-wrap items-center justify-evenly min-h-screen px-6 lg:px-20 py-16 bg-gradient-to-br from-black via-gray-900 to-black">
          <div className="lg:w-1/2 space-y-6 text-center lg:text-left">
            <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
              Remove Borders With <span className="text-indigo-400">NFTs</span><br />
              Share Art Freely.
            </h1>
            <p className="text-gray-300 max-w-xl mx-auto lg:mx-0">
              GameX Market is a digital platform designed for gamers to buy, sell, and trade virtual assets including game IDs, skins, guns, characters, and more.
            </p>
            <div className="flex justify-center lg:justify-start space-x-4">
              <button className="bg-indigo-500 hover:bg-indigo-600 px-6 py-2 rounded-lg transition">Explore</button>
              <button className="border border-indigo-500 hover:bg-indigo-700 px-6 py-2 rounded-lg transition">Create</button>
            </div>
          </div>
          <div className="lg:w-1/2 flex justify-center relative mb-12 lg:mb-0">
            <div className="flex space-x-4">
              <img src="/nft1.jpg" alt="NFT 1" className="rounded-xl w-28 sm:w-36 md:w-44 lg:w-52 shadow-xl" />
              <img src="/nft2.jpg" alt="NFT 2" className="rounded-xl w-28 sm:w-36 md:w-44 lg:w-52 shadow-xl" />
              <img src="/nft3.jpg" alt="NFT 3" className="rounded-xl w-28 sm:w-36 md:w-44 lg:w-52 shadow-xl" />
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="relative bg-gradient-to-b from-[#0a0a23] via-black to-black text-white min-h-screen flex flex-col items-center justify-center px-6 py-20 overflow-hidden">
        <h4 className="uppercase tracking-widest text-sm text-gray-400 mb-3">How GamaX Works</h4>
        <h2 className="text-3xl md:text-5xl font-bold mb-4 text-center">List, Mint, Trade, Play</h2>
        <p className="max-w-3xl text-center text-gray-300 mb-20">
          Explore how you can tokenize your in-game assets, sell or buy them as NFTs, and seamlessly use them across supported games with full ownership and control.
        </p>

        {/* Arched Flow Section */}
        <div className="relative flex flex-col md:flex-row items-center justify-between w-full max-w-6xl gap-16 md:gap-8 px-4 md:px-0 z-10">
          {/* Step 1 */}
          <div className="flex flex-col items-center text-center">
            <span className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-500 mb-4">1</span>
            <h3 className="text-xl font-semibold mb-2">List Your Asset</h3>
            <p className="text-gray-400 max-w-xs">
              Showcase your in-game items like skins, guns, tools, or full game accounts. Connect your wallet and list your digital assets directly from your games.
            </p>
          </div>

          {/* Arrow */}
          <div className="hidden md:block text-white text-4xl -mt-6">
            <span>➝</span>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center text-center">
            <span className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-400 mb-4">2</span>
            <h3 className="text-xl font-semibold mb-2">Mint As NFT</h3>
            <p className="text-gray-400 max-w-xs">
              Secure your gaming asset on the blockchain by minting it as an NFT. Ensure authenticity, rarity, and traceable ownership with just a few clicks.
            </p>
          </div>

          {/* Arrow */}
          <div className="hidden md:block text-white text-4xl -mt-6">
            <span>➝</span>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center text-center">
            <span className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 mb-4">3</span>
            <h3 className="text-xl font-semibold mb-2">Trade and Play</h3>
            <p className="text-gray-400 max-w-xs">
              Buy, sell, or trade gaming NFTs in our marketplace. Instantly use purchased assets in supported games through wallet-linked accounts.
            </p>
          </div>
        </div>

        {/* Icons Row */}
        <div className="flex items-center justify-center gap-6 mt-12 text-white text-sm md:text-base">
          <div className="flex items-center gap-2"><FaPlusSquare /> Create</div>
          <div className="flex items-center gap-2"><FaBolt /> Mint</div>
          <div className="flex items-center gap-2"><FaGift /> Trade and earn</div>
          <div className="flex items-center gap-2"><FaDollarSign /></div>
        </div>

        {/* CTA Button */}
        <button className="mt-8 bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-gray-200 transition flex items-center gap-2">
          Get Started <span className="text-xl">→</span>
        </button>
      </section>
        {/* Footer */}
           <Footer/>
      </main>
    </>
  )
}
