"use client";
import { useWallet } from "@/context/WalletContext";
import Header from "../../components/header";
import Footer from "../../components/footer";
import Profile1 from "../../assets/colabs/Game Alpha.jpeg";
import Image from "next/image";
import { Outfit } from 'next/font/google';
import BgImage from "../../assets/Bg.jpg";
import { FaEthereum, FaSpinner } from "react-icons/fa";
import { FiFilter, FiSearch, FiChevronDown, FiX } from "react-icons/fi";
import { useState, useEffect } from "react";
import { 
  getAllProfiles, 
  updateProfileStatus 
} from "../../utils/contractintegration/Profile";
import {
  getAllAssets,
  addAsset,
  updateAssetStatus,
} from "../../utils/contractintegration/MarketPlace";

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

const imageMap = {
  "SteelSword": SteelSword,
  "ElvenBow": ElvenBow,
  "FlameStaff": FlameStaff,
  "FrostAxe": FrostAxe,
  "WoodenShield": WoodenShield,
  "LeatherArmor": LeatherArmor,
  "DragonHelm": DragonHelm,
  "HealthPotion": HealthPotion,
  "ManaElixir": ManaElixir,
  "SpeedDraught": SpeedDraught,
  "RingOfPower": RingOfPower,
  "AncientScroll": AncientScroll
};

const getAssetImage = (imageName) => {
  return imageMap[imageName] || null;
};

const outfit = Outfit({
  subsets: ["latin"],
  weight: "400",
});

const AssetCard = ({ asset, onSell, onUnlist }) => {
  const getStatusBadge = () => {
    switch(asset.status) {
      case "Active":
        return (
          <div className="bg-green-900/90 text-white text-xs px-2 py-1 rounded flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Owned
          </div>
        );
      case "Market":
        return (
          <div className="bg-yellow-900/90 text-white text-xs px-2 py-1 rounded flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            On Market
          </div>
        );
      case "Sold":
        return (
          <div className="bg-red-900/90 text-white text-xs px-2 py-1 rounded flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
            Sold
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="border rounded-lg shadow-lg text-[#6D737A] font-sans space-y-3 px-3 py-4 w-full max-w-xs bg-white/10 backdrop-blur-md border-white/10 hover:border-indigo-500 transition-colors relative">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image
            src={Profile1}
            alt="Game Logo"
            className="w-6 h-6 rounded-full"
          />
          <span className="font-medium text-sm">{asset.gameName}</span>
        </div>
        <span className="text-xs text-gray-400 bg-black/30 px-2 py-1 rounded">
          {asset.category}
        </span>
      </div>

      <div className="relative w-full h-48 bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg flex items-center justify-center">
        <Image
          src={getAssetImage(asset.image)}
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

      <div>
        <h3 className="font-semibold text-white text-lg">{asset.name}</h3>
        <p className="text-sm text-gray-400 line-clamp-2">{asset.description}</p>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 text-sm text-green-400">
          <FaEthereum className="text-green-400 w-5 h-5" />
          <div className="flex flex-col">
            <span className="text-xs text-gray-400">Value</span>
            <span className="font-semibold text-white">{asset.price} ETH</span>
          </div>
        </div>
        {getStatusBadge()}
      </div>

      {asset.status === "Active" && (
        <button
          onClick={() => onSell(asset)}
          className="w-full mt-3 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md font-medium transition-colors"
        >
          Sell
        </button>
      )}
      
      {asset.status === "Market" && (
        <button
          onClick={() => onUnlist(asset)}
          className="w-full mt-3 bg-yellow-600 hover:bg-yellow-700 text-white py-2 rounded-md font-medium transition-colors"
        >
          Unlist
        </button>
      )}
      
      {asset.status === "Sold" && (
        <button
          disabled
          className="w-full mt-3 bg-gray-600 cursor-not-allowed text-white py-2 rounded-md font-medium"
        >
          Sold
        </button>
      )}
    </div>
  );
};

export default function Collection() {
  const { isConnected, account, shortenAddress } = useWallet();
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    rarity: [],
    category: [],
    game: [],
    status: []
  });
  const [userAssets, setUserAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [transactions, setTransactions] = useState([]);

  const allRarities = [...new Set(userAssets.map(item => item.rarity))];
  const allCategories = [...new Set(userAssets.map(item => item.category))];
  const allGames = [...new Set(userAssets.map(item => item.gameName))];
  const allStatuses = ["Active", "Market", "Sold"];

  useEffect(() => {
    if (isConnected && account) {
      fetchUserAssets();
      fetchTransactions();
    }
  }, [isConnected, account]);

  const fetchUserAssets = async () => {
    try {
      setLoading(true);
      const profiles = await getAllProfiles();
      const assets = profiles
        .filter(profile => profile.user.toLowerCase() === account.toLowerCase())
        .map((profile, index) => ({
          ...profile,
          id: index,
          contractIndex: index,
          image: profile.assetImage,
          rarity: profile.rarities,
          description: profile.description
        }));
      setUserAssets(assets);
    } catch (error) {
      console.error("Error fetching user assets:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTransactions = async () => {
    try {
      const allMarketAssets = await getAllAssets();
      const userTx = allMarketAssets
        .filter(asset => 
          (asset.buyer.toLowerCase() === account.toLowerCase() || 
           asset.seller.toLowerCase() === account.toLowerCase()) &&
          asset.status === "Completed"
        )
        .map((asset, index) => ({
          id: index,
          assetName: asset.assetName,
          game: asset.gameName,
          amount: `${asset.price} ETH`,
          fromTo: asset.seller.toLowerCase() === account.toLowerCase() ? 
            `To: ${shortenAddress(asset.buyer)}` : 
            `From: ${shortenAddress(asset.seller)}`,
          type: asset.buyer.toLowerCase() === account.toLowerCase() ? "Buy" : "Sell",
          date: new Date().toISOString().split('T')[0] // Placeholder - use actual date from contract if available
        }));
      
      setTransactions(userTx);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  useEffect(() => {
    let result = userAssets;

    if (searchTerm) {
      result = result.filter(asset =>
        asset.assetName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        asset.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filters.rarity.length > 0) {
      result = result.filter(asset => filters.rarity.includes(asset.rarity));
    }

    if (filters.category.length > 0) {
      result = result.filter(asset => filters.category.includes(asset.category));
    }

    if (filters.game.length > 0) {
      result = result.filter(asset => filters.game.includes(asset.gameName));
    }

    if (filters.status.length > 0) {
      result = result.filter(asset => filters.status.includes(asset.status));
    }

    setFilteredAssets(result);
  }, [searchTerm, filters, userAssets]);

  const [filteredAssets, setFilteredAssets] = useState([]);

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
      game: [],
      status: []
    });
    setSearchTerm("");
  };

  const handleSell = async (asset) => {
    try {
      setProcessing(true);
      
      // 1. Update profile status to "Market"
      await updateProfileStatus(asset.contractIndex, "Market");
      
      // 2. Add asset to marketplace with status "Available"
      const assetData = {
        assetName: asset.assetName,
        category: asset.category,
        price: asset.price,
        gameName: asset.gameName,
        assetImage: asset.image,
        description: asset.description,
        rarities: asset.rarity,
        status: "Available"
      };
      await addAsset(assetData);
      
      // Refresh data
      await Promise.all([fetchUserAssets(), fetchTransactions()]);
      alert(`${asset.assetName} listed on market successfully!`);
    } catch (error) {
      console.error("Error selling asset:", error);
      alert(`Failed to list ${asset.assetName}. Please try again.`);
    } finally {
      setProcessing(false);
    }
  };
  
  const handleUnlist = async (asset) => {
    try {
      setProcessing(true);
      
      // 1. Update profile status back to "Active"
      await updateProfileStatus(asset.contractIndex, "Active");
      
      // 2. Update asset status to "UnAvailable" in marketplace
      const allMarketAssets = await getAllAssets();
      const marketplaceAssetIndex = allMarketAssets.findIndex(
        a => a.assetName === asset.assetName && 
             a.seller.toLowerCase() === account.toLowerCase() &&
             a.status === "Available"
      );
      
      if (marketplaceAssetIndex !== -1) {
        await updateAssetStatus(marketplaceAssetIndex, "UnAvailable");
      }
      
      // Refresh data
      await Promise.all([fetchUserAssets(), fetchTransactions()]);
      alert(`${asset.assetName} unlisted from market successfully!`);
    } catch (error) {
      console.error("Error unlisting asset:", error);
      alert(`Failed to unlist ${asset.assetName}. Please try again.`);
    } finally {
      setProcessing(false);
    }
  };

  if (!isConnected) {
    return (
      <div className={`${outfit.className} text-white min-h-screen flex flex-col`}>
        <Header />
        <div className="flex-grow flex flex-col items-center justify-center px-4 pt-5">
          <div className="text-center max-w-md">
            <h2 className="text-2xl font-bold mb-4">Wallet Not Connected</h2>
            <p className="mb-6 text-gray-400">
              Please connect your wallet to view your gaming assets collection
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold"
            >
              Connect Wallet
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (loading) {
    return (
      <div className={`${outfit.className} text-white min-h-screen flex flex-col`}>
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <div className="flex flex-col items-center">
            <FaSpinner className="animate-spin text-4xl mb-4" />
            <p>Loading your collection...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className={`${outfit.className} text-white min-h-screen flex flex-col`}>
      <div className="fixed inset-0 -z-10">
        <Image
          src={BgImage}
          alt="Background"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
        <div className="absolute inset-0 bg-black/70"></div>
      </div>
      
      <div className="flex-grow">
        <Header />

        <div className="min-h-screen px-4 sm:px-8 lg:px-20 py-12 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div className="gap-2">
              <h1 className="text-3xl font-bold">My Collection</h1>
              <p className="text-gray-400">{shortenAddress(account)}</p>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full md:w-auto">
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
              <div className="relative">
                <button
                  className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg px-4 py-2 transition-colors"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <FiFilter />
                  <span>Filters</span>
                  <FiChevronDown className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                </button>

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

                    {/* Status Filter */}
                    <div className="mb-4">
                      <h4 className="text-sm font-medium mb-2">Status</h4>
                      <div className="flex flex-wrap gap-2">
                        {allStatuses.map(status => (
                          <button
                            key={status}
                            className={`text-xs px-3 py-1 rounded-md ${
                              filters.status.includes(status)
                                ? status === "Active" ? "bg-green-900 text-green-200" :
                                  status === "Market" ? "bg-yellow-900 text-yellow-200" :
                                  "bg-red-900 text-red-200"
                                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                            }`}
                            onClick={() => toggleFilter('status', status)}
                          >
                            {status}
                          </button>
                        ))}
                      </div>
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

          {(filters.rarity.length > 0 || filters.category.length > 0 || filters.game.length > 0 || filters.status.length > 0) && (
            <div className="flex flex-wrap gap-2 mb-6">
              {filters.status.map(status => (
                <div key={status} className="flex items-center bg-gray-700 rounded-full px-3 py-1 text-sm">
                  {status}
                  <button
                    onClick={() => toggleFilter('status', status)}
                    className="ml-2 text-gray-300 hover:text-white"
                  >
                    <FiX size={14} />
                  </button>
                </div>
              ))}
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

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-white/10 p-4 rounded-lg">
              <p className="text-gray-400 text-sm">Total Items</p>
              <p className="text-2xl font-bold">{userAssets.length}</p>
            </div>
            <div className="bg-white/10 p-4 rounded-lg">
              <p className="text-gray-400 text-sm">Active Items</p>
              <p className="text-2xl font-bold">
                {userAssets.filter(a => a.status === "Active").length}
              </p>
            </div>
            <div className="bg-white/10 p-4 rounded-lg">
              <p className="text-gray-400 text-sm">On Market</p>
              <p className="text-2xl font-bold">
                {userAssets.filter(a => a.status === "Market").length}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center mb-16">
            {processing && (
              <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
                <div className="bg-gray-800 p-6 rounded-lg flex flex-col items-center">
                  <FaSpinner className="animate-spin text-4xl mb-4" />
                  <p>Processing transaction...</p>
                </div>
              </div>
            )}

            {filteredAssets.map((asset) => (
              <AssetCard 
                key={asset.id} 
                asset={asset} 
                onSell={handleSell}
                onUnlist={handleUnlist}
              />
            ))}
          </div>

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
        </div>
      </div>
      
      <div className="px-4 sm:px-8 lg:px-20">
        <h2 className="text-3xl pb-5 font-bold text-center mb-6 text-left">My Transactions</h2>
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
              {transactions.length > 0 ? (
                transactions.map((tx, i) => (
                  <tr key={i} className="border-b border-white/10 hover:bg-white/10 transition-colors">
                    <td className="px-4 py-3 font-bold">{i + 1}</td>
                    <td className="px-4 py-3 font-bold">{tx.assetName}</td>
                    <td className="px-4 py-3">{tx.game}</td>
                    <td className="px-4 py-3 text-green-400 flex items-center">
                      <FaEthereum className="mr-1" /> {tx.amount}
                    </td>
                    <td className="px-4 py-3 text-gray-400">{tx.fromTo}</td>
                    <td className={`px-4 py-3 ${tx.type === "Buy" ? "text-green-400" : "text-red-400"}`}>
                      {tx.type}
                    </td>
                    <td className="px-4 py-3 text-gray-400">{tx.date}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-4 py-3 text-center text-gray-400">
                    No transactions found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}