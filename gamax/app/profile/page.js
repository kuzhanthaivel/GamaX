"use client";
import Header from "../../components/header";
import Footer from "../../components/footer";
import Profile1 from "../../assets/profile1.png";
import Image from "next/image";
import { Outfit } from 'next/font/google';
import BgImage from "../../assets/Bg.jpg";
import { FaEthereum } from "react-icons/fa";

// Import game assets
import SteelSword from '../../assets/Gameassets/SteelSword.png';
import ElvenBow from '../../assets/Gameassets/Elven_Bow.png';
import FlameStaff from '../../assets/Gameassets/Flame_Staff.png';
import FrostAxe from '../../assets/Gameassets/Frost_Axe.png';

const outfit = Outfit({
  subsets: ["latin"],
  weight: "400",
});

const rareCollections = [
  {
    id: 1,
    name: "Steel Sword",
    description: "A sturdy sword forged from high-quality steel",
    price: "0.45",
    game: "Medieval Legends",
    rarity: "Rare",
    image: SteelSword
  },
  {
    id: 2,
    name: "Elven Bow",
    description: "An elegant bow crafted by elven artisans",
    price: "0.75",
    game: "Forest Guardians",
    rarity: "Rare",
    image: ElvenBow
  },
  {
    id: 3,
    name: "Flame Staff",
    description: "Staff imbued with the power of fire",
    price: "0.85",
    game: "Mage Wars",
    rarity: "Rare",
    image: FlameStaff
  },
  {
    id: 4,
    name: "Frost Axe",
    description: "Axe that freezes enemies on impact",
    price: "0.95",
    game: "Northern Realms",
    rarity: "Rare",
    image: FrostAxe
  }
];

const dummyTransactions = Array(7).fill(0).map((_, i) => ({
  assetName: `Asset ${i+1}`,
  game: `Game ${i+1}`,
  amount: `${(Math.random() * 5).toFixed(2)} ETH`,
  fromTo: `0x${Math.random().toString(16).substr(2, 8)}`,
  type: ["Buy", "Sell"][Math.floor(Math.random() * 2)],
}));

export default function Profile() {
  return (
    <div className={`${outfit.className} text-white min-h-screen flex flex-col`}>
      {/* Full-page background */}
      <div className="fixed inset-0 -z-10">
        <Image
          src={BgImage}
          alt="Background"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
        <div className="absolute inset-0 bg-opacity-70"></div>
      </div>

      {/* Content container */}
      <div className="flex-grow">
        <Header />
        
        <div className="min-h-screen px-20 py-12 relative z-10">
          {/* Profile Section */}
          <h2 className="text-2xl font-bold text-center mb-6">Profile Overview</h2>
          <div className="text-center mb-16">
            <div className="flex flex-col items-center mt-4">
              <div className="w-20 h-20 rounded-full border-4 border-white bg-gray-700 flex items-center justify-center">
                <Image
                  src={Profile1}
                  alt="Profile1"
                  className="rounded-full w-full h-full"
                />
              </div>
              <h1 className="text-3xl font-bold mt-4 mb-2">Hi, I am Your Name,</h1>
              <p className="text-gray-400 text-sm mt-1">0x1ab66c14a8e85ddc3234835fbaf42e78a72f4f01</p>
            </div>
          </div>

          {/* My Rare Collections */}
          <h2 className="text-2xl font-bold text-center mb-6">My Assets</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 justify-items-center">
            {rareCollections.map((asset) => (
              <div 
                key={asset.id}
                className="border rounded-md shadow-lg text-[#6D737A] font-sans space-y-2 px-3 py-4 w-full max-w-xs bg-white/10 backdrop-blur-md border-white/10 hover:border-indigo-500 transition-colors"
              >
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Image
                      src={Profile1}
                      alt="Game Logo"
                      className="w-6 h-6 rounded-full"
                    />
                    <span className="font-medium">{asset.game}</span>
                  </div>
                </div>

                {/* Image with rarity badge */}
                <div className="relative w-full h-56 bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg flex items-center justify-center">
                  <Image 
                    src={asset.image} 
                    alt={asset.name}
                    className="object-contain h-40 w-40"
                  />
                  <span className={`absolute top-2 right-2 text-xs px-3 py-1 rounded-md font-semibold ${
                    asset.rarity === "Legendary" ? "bg-purple-900 text-purple-200" :
                    asset.rarity === "Epic" ? "bg-blue-900 text-blue-200" :
                    asset.rarity === "Rare" ? "bg-green-900 text-green-200" :
                    "bg-gray-800 text-gray-300"
                  }`}>
                    {asset.rarity}
                  </span>
                </div>

                {/* Info */}
                <div>
                  <h3 className="font-semibold text-white">{asset.name}</h3>
                  <p className="text-sm text-gray-400 line-clamp-2">{asset.description}</p>
                </div>

                {/* Price & Action Button */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-sm text-green-400">
                    <FaEthereum className="text-green-400 w-7 h-7" />
                    <div className="flex flex-col">
                      <span className="text-sm">Value</span>
                      <span className="font-semibold text-white">{asset.price} ETH</span>
                    </div>
                  </div>
                  <button className="bg-blue-900 hover:bg-blue-800 text-white text-sm px-5 py-2 rounded-md font-semibold transition-colors">
                    Sell
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* My Transaction */}
          <h2 className="text-2xl font-bold text-center mb-6">My Transactions</h2>
          <div className="overflow-x-auto rounded-lg">
            <table className="min-w-full text-left text-sm text-white">
              <thead className="bg-white/10">
                <tr>
                  <th className="px-4 py-3">S.No</th>
                  <th className="px-4 py-3">Asset Name</th>
                  <th className="px-4 py-3">Game</th>
                  <th className="px-4 py-3">Amount</th>
                  <th className="px-4 py-3">From / To</th>
                  <th className="px-4 py-3">Type</th>
                </tr>
              </thead>
              <tbody className="bg-white/5">
                {dummyTransactions.map((tx, i) => (
                  <tr key={i} className="border-b border-white/10 hover:bg-white/10 transition-colors">
                    <td className="px-4 py-3 font-bold">{i + 1}</td>
                    <td className="px-4 py-3 font-bold">{tx.assetName}</td>
                    <td className="px-4 py-3">{tx.game}</td>
                    <td className="px-4 py-3 text-green-400">{tx.amount}</td>
                    <td className="px-4 py-3 text-gray-400">{tx.fromTo}</td>
                    <td className={`px-4 py-3 ${
                      tx.type === "Buy" ? "text-green-400" : "text-red-400"
                    }`}>
                      {tx.type}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}