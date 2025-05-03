"use client";
import Header from "../../components/header";
import Footer from "../../components/footer";
import Profile1 from "../../assets/profile1.png";
import Image from "next/image";
import { Outfit } from 'next/font/google';
import BgImage from "../../assets/Bg.jpg";
import { FaEthereum } from "react-icons/fa";
import { FiFilter, FiSearch, FiChevronDown, FiX } from "react-icons/fi";
import { useState, useEffect } from "react";

// Import game assets
import SteelSword from '../../assets/Gameassets/SteelSword.png';
import ElvenBow from '../../assets/Gameassets/Elven_Bow.png';
import FlameStaff from '../../assets/Gameassets/Flame_Staff.png';
import FrostAxe from '../../assets/Gameassets/Frost_Axe.png';
import WoodenShield from '../../assets/Gameassets/Wooden_Shield.png';
import LeatherArmor from '../../assets/Gameassets/Leather_Armor.png';
import DragonHelm from '../../assets/Gameassets/Dragon_Helm.png';
import HealthPotion from '../../assets/Gameassets/Health_Potion.png';
import ManaElixir from '../../assets/Gameassets/Mana_Elixir.png';
import SpeedDraught from '../../assets/Gameassets/Speed_Draught.png';
import RingOfPower from '../../assets/Gameassets/Ring_of_Power.png';
import AncientScroll from '../../assets/Gameassets/Ancient_Scroll.png';

const outfit = Outfit({
  subsets: ["latin"],
  weight: "400",
});

const allAssets = [
  {
    id: 1,
    name: "Steel Sword",
    description: "A sturdy sword forged from high-quality steel",
    price: "0.25",
    category: "Weapon",
    game: "Medieval Legends",
    rarity: "Common",
    image: SteelSword,
    ownedSince: "2023-05-12"
  },
  {
    id: 2,
    name: "Elven Bow",
    description: "An elegant bow crafted by elven artisans",
    price: "0.45",
    category: "Weapon",
    game: "Forest Guardians",
    rarity: "Rare",
    image: ElvenBow,
    ownedSince: "2023-06-22"
  },
  {
    id: 3,
    name: "Flame Staff",
    description: "Staff imbued with the power of fire",
    price: "0.75",
    category: "Weapon",
    game: "Mage Wars",
    rarity: "Epic",
    image: FlameStaff,
    ownedSince: "2023-07-15"
  },
  {
    id: 4,
    name: "Frost Axe",
    description: "Axe that freezes enemies on impact",
    price: "0.65",
    category: "Weapon",
    game: "Northern Realms",
    rarity: "Epic",
    image: FrostAxe,
    ownedSince: "2023-08-03"
  },
  {
    id: 5,
    name: "Wooden Shield",
    description: "Basic shield for beginner warriors",
    price: "0.15",
    category: "Armor",
    game: "Medieval Legends",
    rarity: "Common",
    image: WoodenShield,
    ownedSince: "2023-09-18"
  },
  {
    id: 6,
    name: "Leather Armor",
    description: "Lightweight armor made from tough leather",
    price: "0.35",
    category: "Armor",
    game: "Rogue Adventures",
    rarity: "Common",
    image: LeatherArmor,
    ownedSince: "2023-10-05"
  },
  {
    id: 7,
    name: "Dragon Helm",
    description: "Helmet crafted from dragon scales",
    price: "1.25",
    category: "Armor",
    game: "Dragon Slayers",
    rarity: "Legendary",
    image: DragonHelm,
    ownedSince: "2023-11-11"
  },
  {
    id: 8,
    name: "Health Potion",
    description: "Restores 50 health points",
    price: "0.05",
    category: "Consumable",
    game: "Various Games",
    rarity: "Common",
    image: HealthPotion,
    ownedSince: "2023-12-24"
  },
  {
    id: 9,
    name: "Mana Elixir",
    description: "Restores 30 mana points",
    price: "0.07",
    category: "Consumable",
    game: "Mage Wars",
    rarity: "Common",
    image: ManaElixir,
    ownedSince: "2024-01-09"
  },
  {
    id: 10,
    name: "Speed Draught",
    description: "Increases movement speed by 20% for 1 minute",
    price: "0.12",
    category: "Consumable",
    game: "Alchemy Arena",
    rarity: "Rare",
    image: SpeedDraught,
    ownedSince: "2024-02-14"
  },
  {
    id: 11,
    name: "Ring of Power",
    description: "Increases all stats by 5%",
    price: "0.95",
    category: "Accessory",
    game: "Various Games",
    rarity: "Epic",
    image: RingOfPower,
    ownedSince: "2024-03-21"
  },
  {
    id: 12,
    name: "Ancient Scroll",
    description: "Teaches a random rare spell",
    price: "0.55",
    category: "Miscellaneous",
    game: "Mage Wars",
    rarity: "Rare",
    image: AncientScroll,
    ownedSince: "2024-04-30"
  }
];

const dummyTransactions = [
  {
    id: 1,
    assetName: "Steel Sword",
    game: "Medieval Legends",
    amount: "0.25 ETH",
    fromTo: "0x8a3f...2d4c",
    type: "Buy",
    date: "2023-05-12"
  },
  {
    id: 2,
    assetName: "Elven Bow",
    game: "Forest Guardians",
    amount: "0.45 ETH",
    fromTo: "0x5b2e...7f9a",
    type: "Buy",
    date: "2023-06-22"
  },
  {
    id: 3,
    assetName: "Flame Staff",
    game: "Mage Wars",
    amount: "0.75 ETH",
    fromTo: "0x3c1d...6e8b",
    type: "Buy",
    date: "2023-07-15"
  },
  {
    id: 4,
    assetName: "Wooden Shield",
    game: "Medieval Legends",
    amount: "0.15 ETH",
    fromTo: "0x9f4a...1c2d",
    type: "Sell",
    date: "2023-08-03"
  },
  {
    id: 5,
    assetName: "Dragon Helm",
    game: "Dragon Slayers",
    amount: "1.25 ETH",
    fromTo: "0x7e5b...3d4e",
    type: "Buy",
    date: "2023-09-18"
  },
  {
    id: 6,
    assetName: "Health Potion",
    game: "Various Games",
    amount: "0.05 ETH",
    fromTo: "0x2a6c...9f1b",
    type: "Sell",
    date: "2023-10-05"
  },
  {
    id: 7,
    assetName: "Ring of Power",
    game: "Various Games",
    amount: "0.95 ETH",
    fromTo: "0x4d3e...8c2a",
    type: "Buy",
    date: "2023-11-11"
  }
];

export default function Collection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    rarity: [],
    category: [],
    game: []
  });
  const [filteredAssets, setFilteredAssets] = useState(allAssets);
  const [filteredTransactions, setFilteredTransactions] = useState(dummyTransactions);

  const allRarities = [...new Set(allAssets.map(item => item.rarity))];
  const allCategories = [...new Set(allAssets.map(item => item.category))];
  const allGames = [...new Set(allAssets.map(item => item.game))];

  useEffect(() => {
    let result = allAssets;
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(asset => 
        asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        asset.description.toLowerCase().includes(searchTerm.toLowerCase())
      )}
    
    // Apply rarity filter
    if (filters.rarity.length > 0) {
      result = result.filter(asset => filters.rarity.includes(asset.rarity));
    }
    
    // Apply category filter
    if (filters.category.length > 0) {
      result = result.filter(asset => filters.category.includes(asset.category));
    }
    
    // Apply game filter
    if (filters.game.length > 0) {
      result = result.filter(asset => filters.game.includes(asset.game));
    }
    
    setFilteredAssets(result);
  }, [searchTerm, filters]);

  const toggleFilter = (type, value) => {
    setFilters(prev => {
      const currentFilters = [...prev[type]];
      const index = currentFilters.indexOf(value);
      
      if (index === -1) {
        return { ...prev, [type]: [...currentFilters, value] };
      } else {
        return { ...prev, [type]: currentFilters.filter(item => item !== value) };
      }
    });
  };

  const clearFilters = () => {
    setFilters({
      rarity: [],
      category: [],
      game: []
    });
    setSearchTerm("");
  };

  const handleSell = (assetId) => {
    // In a real app, this would trigger a sell transaction
    console.log(`Selling asset with ID: ${assetId}`);
    alert(`Initiated sale for asset ID: ${assetId}`);
  };

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
        
        <div className="min-h-screen px-4 sm:px-8 lg:px-20 py-12 relative z-10">
          {/* Collection Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <h1 className="text-3xl font-bold">My Collection</h1>
            
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full md:w-auto">
              {/* Search Bar */}
              <div className="relative flex-grow max-w-md">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search collection..." 
                  className="w-full bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              {/* Filter Button */}
              <div className="relative">
                <button 
                  className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg px-4 py-2 transition-colors"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <FiFilter />
                  <span>Filters</span>
                  <FiChevronDown className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                </button>
                
                {/* Filter Dropdown */}
                {showFilters && (
                  <div className="absolute right-0 mt-2 w-72 bg-gray-800 rounded-lg shadow-lg z-10 p-4">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-semibold">Filters</h3>
                      <button 
                        className="text-sm text-indigo-400 hover:text-indigo-300"
                        onClick={clearFilters}
                      >
                        Clear all
                      </button>
                    </div>
                    
                    {/* Rarity Filter */}
                    <div className="mb-4">
                      <h4 className="text-sm font-medium mb-2">Rarity</h4>
                      <div className="flex flex-wrap gap-2">
                        {allRarities.map(rarity => (
                          <button
                            key={rarity}
                            className={`text-xs px-3 py-1 rounded-md ${
                              filters.rarity.includes(rarity) 
                                ? rarity === "Legendary" ? "bg-purple-900 text-purple-200" :
                                  rarity === "Epic" ? "bg-blue-900 text-blue-200" :
                                  rarity === "Rare" ? "bg-green-900 text-green-200" :
                                  "bg-gray-700 text-gray-300"
                                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                            }`}
                            onClick={() => toggleFilter('rarity', rarity)}
                          >
                            {rarity}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    {/* Category Filter */}
                    <div className="mb-4">
                      <h4 className="text-sm font-medium mb-2">Category</h4>
                      <div className="flex flex-wrap gap-2">
                        {allCategories.map(category => (
                          <button
                            key={category}
                            className={`text-xs px-3 py-1 rounded-md ${
                              filters.category.includes(category)
                                ? "bg-indigo-900 text-indigo-200"
                                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                            }`}
                            onClick={() => toggleFilter('category', category)}
                          >
                            {category}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    {/* Game Filter */}
                    <div className="mb-2">
                      <h4 className="text-sm font-medium mb-2">Game</h4>
                      <div className="flex flex-wrap gap-2">
                        {allGames.map(game => (
                          <button
                            key={game}
                            className={`text-xs px-3 py-1 rounded-md ${
                              filters.game.includes(game)
                                ? "bg-amber-900 text-amber-200"
                                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                            }`}
                            onClick={() => toggleFilter('game', game)}
                          >
                            {game}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Active Filters */}
          {(filters.rarity.length > 0 || filters.category.length > 0 || filters.game.length > 0) && (
            <div className="flex flex-wrap gap-2 mb-6">
              {filters.rarity.map(rarity => (
                <div key={rarity} className="flex items-center bg-gray-700 rounded-full px-3 py-1 text-sm">
                  {rarity}
                  <button 
                    onClick={() => toggleFilter('rarity', rarity)}
                    className="ml-2 text-gray-300 hover:text-white"
                  >
                    <FiX size={14} />
                  </button>
                </div>
              ))}
              {filters.category.map(category => (
                <div key={category} className="flex items-center bg-gray-700 rounded-full px-3 py-1 text-sm">
                  {category}
                  <button 
                    onClick={() => toggleFilter('category', category)}
                    className="ml-2 text-gray-300 hover:text-white"
                  >
                    <FiX size={14} />
                  </button>
                </div>
              ))}
              {filters.game.map(game => (
                <div key={game} className="flex items-center bg-gray-700 rounded-full px-3 py-1 text-sm">
                  {game}
                  <button 
                    onClick={() => toggleFilter('game', game)}
                    className="ml-2 text-gray-300 hover:text-white"
                  >
                    <FiX size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-white/10 p-4 rounded-lg">
              <p className="text-gray-400 text-sm">Total Items</p>
              <p className="text-2xl font-bold">{filteredAssets.length}</p>
            </div>
            <div className="bg-white/10 p-4 rounded-lg">
              <p className="text-gray-400 text-sm">Total Value</p>
              <p className="text-2xl font-bold flex items-center">
                <FaEthereum className="mr-1" />
                {filteredAssets.reduce((sum, item) => sum + parseFloat(item.price), 0).toFixed(2)} ETH
              </p>
            </div>
            <div className="bg-white/10 p-4 rounded-lg">
              <p className="text-gray-400 text-sm">Most Valuable</p>
              <p className="text-2xl font-bold">
                {filteredAssets.length > 0 
                  ? filteredAssets.reduce((max, item) => parseFloat(item.price) > parseFloat(max.price) ? item : max).name
                  : "N/A"}
              </p>
            </div>
          </div>

          {/* Collection Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center mb-16">
            {filteredAssets.map((asset) => (
              <div 
                key={asset.id}
                className="border rounded-lg shadow-lg text-[#6D737A] font-sans space-y-3 px-3 py-4 w-full max-w-xs bg-white/10 backdrop-blur-md border-white/10 hover:border-indigo-500 transition-colors relative"
              >
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Image
                      src={Profile1}
                      alt="Game Logo"
                      className="w-6 h-6 rounded-full"
                    />
                    <span className="font-medium text-sm">{asset.game}</span>
                  </div>
                  <span className="text-xs text-gray-400 bg-black/30 px-2 py-1 rounded">
                    {asset.category}
                  </span>
                </div>

                {/* Image with rarity badge */}
                <div className="relative w-full h-48 bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg flex items-center justify-center">
                  <Image 
                    src={asset.image} 
                    alt={asset.name}
                    className="object-contain h-32 w-32"
                  />
                  <span className={`absolute top-2 right-2 text-xs px-2 py-1 rounded-md font-semibold ${
                    asset.rarity === "Legendary" ? "bg-purple-900/80 text-purple-200" :
                    asset.rarity === "Epic" ? "bg-blue-900/80 text-blue-200" :
                    asset.rarity === "Rare" ? "bg-green-900/80 text-green-200" :
                    "bg-gray-800/80 text-gray-300"
                  }`}>
                    {asset.rarity}
                  </span>
                </div>

                {/* Info */}
                <div>
                  <h3 className="font-semibold text-white text-lg">{asset.name}</h3>
                  <p className="text-sm text-gray-400 line-clamp-2">{asset.description}</p>
                </div>

                {/* Price & Ownership */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-sm text-green-400">
                    <FaEthereum className="text-green-400 w-5 h-5" />
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-400">Value</span>
                      <span className="font-semibold text-white">{asset.price} ETH</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-xs text-gray-400">Owned since</span>
                    <span className="text-xs font-medium">{asset.ownedSince}</span>
                  </div>
                </div>

                {/* Owned Badge */}
                <div className="absolute top-4 left-4 bg-green-900/90 text-white text-xs px-2 py-1 rounded flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Owned
                </div>

                {/* Sell Button */}
                <button 
                  onClick={() => handleSell(asset.id)}
                  className="w-full mt-3 bg-red-600 hover:bg-red-700 text-white py-2 rounded-md font-medium transition-colors"
                >
                  Sell
                </button>
              </div>
            ))}
          </div>

          {/* Empty State (if collection is empty) */}
          {filteredAssets.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="text-5xl mb-4">🛍️</div>
              <h3 className="text-xl font-bold mb-2">No assets found</h3>
              <p className="text-gray-400 mb-6">Try adjusting your search or filters</p>
              <button 
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold"
                onClick={clearFilters}
              >
                Clear Filters
              </button>
            </div>
          )}

          {/* Transactions Section */}
          <h2 className="text-2xl font-bold text-center mb-6">My Transactions</h2>
          <div className="overflow-x-auto rounded-lg mb-12">
            <table className="min-w-full text-left text-sm text-white">
              <thead className="bg-white/10">
                <tr>
                  <th className="px-4 py-3">S.No</th>
                  <th className="px-4 py-3">Asset Name</th>
                  <th className="px-4 py-3">Game</th>
                  <th className="px-4 py-3">Amount</th>
                  <th className="px-4 py-3">From / To</th>
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3">Date</th>
                </tr>
              </thead>
              <tbody className="bg-white/5">
                {filteredTransactions.map((tx, i) => (
                  <tr key={i} className="border-b border-white/10 hover:bg-white/10 transition-colors">
                    <td className="px-4 py-3 font-bold">{i + 1}</td>
                    <td className="px-4 py-3 font-bold">{tx.assetName}</td>
                    <td className="px-4 py-3">{tx.game}</td>
                    <td className="px-4 py-3 text-green-400 flex items-center">
                      <FaEthereum className="mr-1" /> {tx.amount}
                    </td>
                    <td className="px-4 py-3 text-gray-400">{tx.fromTo}</td>
                    <td className={`px-4 py-3 ${
                      tx.type === "Buy" ? "text-green-400" : "text-red-400"
                    }`}>
                      {tx.type}
                    </td>
                    <td className="px-4 py-3 text-gray-400">{tx.date}</td>
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