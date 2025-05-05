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
import { useWallet } from "@/context/WalletContext";
import {
  viewAllAssets,
  sellAsset,
  unlistAsset,
  reSellAsset,
  listenForAssetAdded,
  listenForAssetSold,
  listenForStatusUpdates
} from "../../utils/contractintegration/Contract";

const outfit = Outfit({
  subsets: ["latin"],
  weight: "400",
});

export default function Collection() {
  const {
    isConnected,
    account,
    connectWallet,
    shortenAddress,
  } = useWallet();

  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    rarity: [],
    category: [],
    game: [],
    status: []
  });
  const [assets, setAssets] = useState([]);
  const [filteredAssets, setFilteredAssets] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [resellPrice, setResellPrice] = useState("");
  const [resellAssetId, setResellAssetId] = useState(null);
  const [showResellModal, setShowResellModal] = useState(false);

  const allRarities = [...new Set(assets.map(item => item.rarities))];
  const allCategories = [...new Set(assets.map(item => item.category))];
  const allGames = [...new Set(assets.map(item => item.gameName))];
  const allStatuses = ["Active", "Market", "Sold"];

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const allAssets = await viewAllAssets();
        const formattedAssets = allAssets.map((asset, index) => ({
          id: index,
          seller: asset.seller,
          buyer: asset.buyer,
          name: asset.assetName,
          description: asset.description,
          price: asset.price,
          category: asset.category,
          game: asset.gameName,
          rarity: asset.rarities,
          image: asset.assetImage,
          profileStatus: asset.ProfileStatus,
          marketStatus: asset.MarketStatus,
          transactionStatus: asset.TransactionStatus
        }));

        setAssets(formattedAssets);
        setFilteredAssets(formattedAssets);

        const userTransactions = formattedAssets
          .filter(asset =>
            (asset.seller.toLowerCase() === account?.toLowerCase() ||
              asset.buyer.toLowerCase() === account?.toLowerCase()) &&
            asset.transactionStatus === "Completed"
          )
          .map(asset => ({
            id: asset.id,
            assetName: asset.name,
            game: asset.game,
            amount: `${asset.price} ETH`,
            counterparty: asset.seller.toLowerCase() === account?.toLowerCase() ? asset.buyer : asset.seller,
            type: asset.seller.toLowerCase() === account?.toLowerCase() ? "Sell" : "Buy",
            date: new Date().toISOString().split('T')[0]
          }));

        setTransactions(userTransactions);
        setFilteredTransactions(userTransactions);
      } catch (error) {
        console.error("Error fetching assets:", error);
      } finally {
        setLoading(false);
      }
    };

    if (isConnected && account) {
      fetchAssets();

      const cleanupAdded = listenForAssetAdded(() => fetchAssets());
      const cleanupSold = listenForAssetSold(() => fetchAssets());
      const cleanupStatus = listenForStatusUpdates(() => fetchAssets());

      return () => {
        cleanupAdded();
        cleanupSold();
        cleanupStatus();
      };
    }
  }, [isConnected, account]);

  useEffect(() => {
    let result = assets.filter(asset =>
      asset.seller.toLowerCase() === account?.toLowerCase() ||
      asset.buyer.toLowerCase() === account?.toLowerCase()
    );

    if (searchTerm) {
      result = result.filter(asset =>
        asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
      result = result.filter(asset => filters.game.includes(asset.game));
    }

    if (filters.status.length > 0) {
      result = result.filter(asset => filters.status.includes(asset.profileStatus));
    }

    setFilteredAssets(result);
  }, [searchTerm, filters, assets, account]);

  useEffect(() => {
    if (searchTerm) {
      const filtered = transactions.filter(tx =>
        tx.assetName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredTransactions(filtered);
    } else {
      setFilteredTransactions(transactions);
    }
  }, [searchTerm, transactions]);

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

  const handleSell = async (assetId) => {
    if (!isConnected) {
      alert("Please connect your wallet first");
      return;
    }

    try {
      await sellAsset(assetId);
      alert("Asset listed for sale successfully");
    } catch (error) {
      console.error("Error selling asset:", error);
      alert("Failed to list asset for sale");
    }
  };

  const handleUnlist = async (assetId) => {
    if (!isConnected) {
      alert("Please connect your wallet first");
      return;
    }

    try {
      await unlistAsset(assetId);
      alert("Asset unlisted successfully");
    } catch (error) {
      console.error("Error unlisting asset:", error);
      alert("Failed to unlist asset");
    }
  };

  const openResellModal = (assetId) => {
    setResellAssetId(assetId);
    setShowResellModal(true);
  };

  const handleResell = async () => {
    if (!isConnected) {
      alert("Please connect your wallet first");
      return;
    }

    if (!resellPrice || isNaN(resellPrice) || parseFloat(resellPrice) <= 0) {
      alert("Please enter a valid price");
      return;
    }

    try {
      await reSellAsset(resellAssetId, resellPrice);
      alert("Asset listed for resale successfully");
      setShowResellModal(false);
      setResellPrice("");
    } catch (error) {
      console.error("Error reselling asset:", error);
      alert(`Failed to list asset for resale: ${error.message}`);
    }
  };

  if (!isConnected) {
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
          <div className="absolute inset-0 bg-opacity-70"></div>
        </div>
        <div className="flex-grow">
          <Header />
          <div className="min-h-screen px-4 sm:px-8 lg:px-20 py-12 relative z-10 flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold mb-6">My Collection</h1>
            <p className="text-xl mb-8">Please connect your wallet to view your collection</p>
            <button
              onClick={connectWallet}
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
        <div className="flex-grow">
          <Header />
          <div className="min-h-screen px-4 sm:px-8 lg:px-20 py-12 relative z-10 flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold mb-6">Loading your collection...</h1>
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
        <div className="absolute inset-0 bg-opacity-70"></div>
      </div>
      <div className="flex-grow">
        <Header />

        <div className="min-h-screen px-4 sm:px-8 lg:px-20 py-12 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
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

                    <div className="mb-4">
                      <h4 className="text-sm font-medium mb-2">Status</h4>
                      <div className="flex flex-wrap gap-2">
                        {allStatuses.map(status => (
                          <button
                            key={status}
                            className={`text-xs px-3 py-1 rounded-md ${filters.status.includes(status)
                              ? status === "Active" ? "bg-green-900 text-green-200" :
                                status === "Market" ? "bg-blue-900 text-blue-200" :
                                  "bg-purple-900 text-purple-200"
                              : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                              }`}
                            onClick={() => toggleFilter('status', status)}
                          >
                            {status}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="text-sm font-medium mb-2">Rarity</h4>
                      <div className="flex flex-wrap gap-2">
                        {allRarities.map(rarity => (
                          <button
                            key={rarity}
                            className={`text-xs px-3 py-1 rounded-md ${filters.rarity.includes(rarity)
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

                    <div className="mb-4">
                      <h4 className="text-sm font-medium mb-2">Category</h4>
                      <div className="flex flex-wrap gap-2">
                        {allCategories.map(category => (
                          <button
                            key={category}
                            className={`text-xs px-3 py-1 rounded-md ${filters.category.includes(category)
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

                    <div className="mb-2">
                      <h4 className="text-sm font-medium mb-2">Game</h4>
                      <div className="flex flex-wrap gap-2">
                        {allGames.map(game => (
                          <button
                            key={game}
                            className={`text-xs px-3 py-1 rounded-md ${filters.game.includes(game)
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center mb-16">
            {filteredAssets.map((asset) => (
              <div
                key={asset.id}
                className="border rounded-lg shadow-lg text-[#6D737A] font-sans space-y-3 px-3 py-4 w-full max-w-xs bg-white/10 backdrop-blur-md border-white/10 hover:border-indigo-500 transition-colors relative"
              >
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

                <div className="relative w-full h-48 bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg flex items-center justify-center">
                  <img
                    src={asset.image}
                    alt={asset.name}
                    className="object-contain h-32 w-32"
                  />
                  <span className={`absolute top-2 right-2 text-xs px-2 py-1 rounded-md font-semibold ${asset.rarity === "Legendary" ? "bg-purple-900/80 text-purple-200" :
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
                  <div className={`text-xs px-2 py-1 rounded flex items-center ${asset.profileStatus === "Active" ? "bg-green-900/90 text-white" :
                      asset.profileStatus === "Market" ? "bg-blue-900/90 text-white" :
                        "bg-purple-900/90 text-white"
                    }`}>
                    {asset.profileStatus}
                  </div>
                </div>

                {asset.seller.toLowerCase() === account.toLowerCase() && asset.profileStatus === "Active" && (
                  <button
                    onClick={() => handleSell(asset.id)}
                    className="w-full mt-3 bg-red-600 hover:bg-red-700 text-white py-2 rounded-md font-medium transition-colors"
                  >
                    Sell
                  </button>
                )}
                {asset.seller.toLowerCase() === account.toLowerCase() && asset.profileStatus === "Market" && (
                  <button
                    onClick={() => handleUnlist(asset.id)}
                    className="w-full mt-3 bg-yellow-600 hover:bg-yellow-700 text-white py-2 rounded-md font-medium transition-colors"
                  >
                    Unlist
                  </button>
                )}
                {asset.buyer.toLowerCase() === account.toLowerCase() && asset.profileStatus === "Sold" && (
                  <button
                    onClick={() => openResellModal(asset.id)}
                    className="w-full mt-3 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md font-medium transition-colors"
                  >
                    Resell
                  </button>
                )}
                {asset.profileStatus === "Sold" && asset.buyer.toLowerCase() !== account.toLowerCase() && (
                  <button
                    disabled
                    className="w-full mt-3 bg-gray-600 text-white py-2 rounded-md font-medium cursor-not-allowed"
                  >
                    Sold
                  </button>
                )}
              </div>
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

          <h2 className="text-2xl font-bold text-center mb-6">My Transactions</h2>
          <div className="overflow-x-auto rounded-lg mb-12">
            <table className="min-w-full text-left text-sm text-white">
              <thead className="bg-white/10">
                <tr>
                  <th className="px-4 py-3">S.No</th>
                  <th className="px-4 py-3">Asset Name</th>
                  <th className="px-4 py-3">Game</th>
                  <th className="px-4 py-3">Amount</th>
                  <th className="px-4 py-3">Role</th>
                  <th className="px-4 py-3">Counterparty</th>
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
                    <td className="px-4 py-3 text-gray-400">
                      {tx.type === "Buy" ? "Buyer" : "Seller"}
                    </td>
                    <td className="px-4 py-3 text-gray-400">
                      {shortenAddress(tx.counterparty)}
                    </td>
                    <td className={`px-4 py-3 ${tx.type === "Buy" ? "text-green-400" : "text-red-400"}`}>
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

      {showResellModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Resell Asset</h3>
            <div className="mb-4">
              <label className="block text-gray-400 mb-2">New Price (ETH)</label>
              <input
                type="number"
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={resellPrice}
                onChange={(e) => setResellPrice(e.target.value)}
                min="0"
                step="0.01"
                placeholder="Enter new price"
              />
            </div>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowResellModal(false);
                  setResellPrice("");
                }}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleResell}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg"
              >
                Confirm Resell
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}