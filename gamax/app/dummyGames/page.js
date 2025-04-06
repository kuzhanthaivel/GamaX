"use client";
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

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

export default function Home() {
    const [account, setAccount] = useState(null);
    const [isMetamaskInstalled, setIsMetamaskInstalled] = useState(false);

    // Game assets organized by categories
    const assetCategories = [
        {
            name: "Weapons",
            assets: [
                {
                    id: 1,
                    name: '⚔️ Steel Sword',
                    description: 'Basic sword with +15 attack power',
                    image: SteelSword,
                    unlockTime: 5000,
                    category: 'Common',
                    ethValue: 0.01,
                    rarityColor: 'bg-gray-400'
                },
                {
                    id: 2,
                    name: '🏹 Elven Bow',
                    description: 'Precision bow with +25 attack and ranged capability',
                    image: ElvenBow,
                    unlockTime: 7000,
                    category: 'Rare',
                    ethValue: 0.03,
                    rarityColor: 'bg-blue-400'
                },
                {
                    id: 3,
                    name: '🔥 Flame Staff',
                    description: 'Magical staff that casts fireballs with 50 damage',
                    image: FlameStaff,
                    unlockTime: 10000,
                    category: 'Epic',
                    ethValue: 0.05,
                    rarityColor: 'bg-purple-400'
                },
                {
                    id: 4,
                    name: '❄️ Frost Axe',
                    description: 'Axe that freezes enemies on hit (+35 attack)',
                    image: FrostAxe,
                    unlockTime: 12000,
                    category: 'Epic',
                    ethValue: 0.06,
                    rarityColor: 'bg-purple-400'
                }
            ]
        },
        {
            name: "Armor",
            assets: [
                {
                    id: 5,
                    name: '🛡️ Wooden Shield',
                    description: 'Basic shield blocking 30% of damage',
                    image: WoodenShield,
                    unlockTime: 5000,
                    category: 'Common',
                    ethValue: 0.01,
                    rarityColor: 'bg-gray-400'
                },
                {
                    id: 6,
                    name: '🧥 Leather Armor',
                    description: 'Light armor with +15 defense',
                    image: LeatherArmor,
                    unlockTime: 6000,
                    category: 'Common',
                    ethValue: 0.02,
                    rarityColor: 'bg-gray-400'
                },
                {
                    id: 7,
                    name: '👑 Dragon Helm',
                    description: 'Legendary helmet with +40 defense and fire resistance',
                    image: DragonHelm,
                    unlockTime: 15000,
                    category: 'Legendary',
                    ethValue: 0.1,
                    rarityColor: 'bg-yellow-400'
                }
            ]
        },
        {
            name: "Potions",
            assets: [
                {
                    id: 8,
                    name: '🧪 Health Potion',
                    description: 'Restores 50 HP instantly',
                    image: HealthPotion,
                    unlockTime: 3000,
                    category: 'Common',
                    ethValue: 0.005,
                    rarityColor: 'bg-gray-400'
                },
                {
                    id: 9,
                    name: '🌀 Mana Elixir',
                    description: 'Restores 30 MP instantly',
                    image: ManaElixir,
                    unlockTime: 4000,
                    category: 'Common',
                    ethValue: 0.008,
                    rarityColor: 'bg-gray-400'
                },
                {
                    id: 10,
                    name: '⚡ Speed Draught',
                    description: 'Increases movement speed by 50% for 30s',
                    image: SpeedDraught,
                    unlockTime: 8000,
                    category: 'Rare',
                    ethValue: 0.04,
                    rarityColor: 'bg-blue-400'
                }
            ]
        },
        {
            name: "Special",
            assets: [
                {
                    id: 11,
                    name: '💍 Ring of Power',
                    description: 'Increases all stats by 10% when equipped',
                    image: RingOfPower,
                    unlockTime: 20000,
                    category: 'Legendary',
                    ethValue: 0.15,
                    rarityColor: 'bg-yellow-400'
                },
                {
                    id: 12,
                    name: '📜 Ancient Scroll',
                    description: 'Teaches a powerful forgotten spell',
                    image: AncientScroll,
                    unlockTime: 18000,
                    category: 'Legendary',
                    ethValue: 0.12,
                    rarityColor: 'bg-yellow-400'
                }
            ]
        }
    ];

    // Flatten all assets into one array
    const allAssets = assetCategories.flatMap(category => category.assets);
    const totalAssets = allAssets.length;

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isUnlocking, setIsUnlocking] = useState(false);
    const [timeLeft, setTimeLeft] = useState(0);
    const [showOwnButton, setShowOwnButton] = useState(false);
    const [owned, setOwned] = useState([]);
    const [progress, setProgress] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState('All');

    useEffect(() => {
        if (typeof window !== 'undefined' && window.ethereum) {
            setIsMetamaskInstalled(true);
        }
    }, [allAssets]);

    const connectWallet = async () => {
        try {
            if (!window.ethereum) return alert("Please install MetaMask!");
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            setAccount(accounts[0]);
        } catch (err) {
            console.error(err);
            alert("Failed to connect wallet. Please try again.");
        }
    };

    useEffect(() => {
        let timer;
        if (isUnlocking && timeLeft > 0) {
            timer = setTimeout(() => {
                setTimeLeft(timeLeft - 1);
                setProgress(((allAssets[currentIndex].unlockTime / 1000 - timeLeft + 1) / (allAssets[currentIndex].unlockTime / 1000)) * 100);
            }, 1000);
        } else if (isUnlocking && timeLeft === 0) {
            setIsUnlocking(false);
            setShowOwnButton(true);
            setProgress(0);
        }
        return () => clearTimeout(timer);
    }, [isUnlocking, timeLeft, currentIndex]);

    const unlockAsset = () => {
        if (isUnlocking || showOwnButton) return;
        const time = allAssets[currentIndex].unlockTime;
        setTimeLeft(time / 1000);
        setIsUnlocking(true);
    };

    const ownAsset = () => {
        if (!owned.includes(allAssets[currentIndex].id)) {
            setOwned([...owned, allAssets[currentIndex].id]);
        }
        setShowOwnButton(false);
        setCurrentIndex((prev) => (prev + 1) % allAssets.length);
    };

    const filteredAssets = selectedCategory === 'All'
        ? allAssets
        : assetCategories.find(cat => cat.name === selectedCategory)?.assets || [];

    const current = filteredAssets[currentIndex % (filteredAssets.length || 1)] || allAssets[0];

    // Check if collection is complete
    const isCollectionComplete = owned.length >= totalAssets;

    // 🔐 Show Connect Wallet screen first
    if (!account) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800 text-white flex flex-col items-center justify-center p-6">
                <div className="text-center max-w-md">
                    <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500 mb-4">
                        OnChain Unlock Game
                    </h1>
                    <p className="text-lg mb-8">Connect your wallet to start unlocking rare game assets</p>

                    {isMetamaskInstalled ? (
                        <button
                            onClick={connectWallet}
                            className="bg-indigo-600 hover:bg-indigo-500 text-white py-3 px-8 rounded-lg font-medium transition-all"
                        >
                            Connect Wallet
                        </button>
                    ) : (
                        <div className="bg-red-900/50 border border-red-700 rounded-lg p-4">
                            <p className="text-red-200">MetaMask not detected. Please install it to continue.</p>
                            <a
                                href="https://metamask.io/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-indigo-300 hover:text-indigo-200 inline-block mt-2"
                            >
                                Install MetaMask
                            </a>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800 text-white p-6">
            <div className="max-w-7xl mx-auto">
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500">
                            OnChain Unlock Game
                        </h1>
                        <p className="text-sm text-gray-400">Connected: {account.slice(0, 6)}...{account.slice(-4)}</p>
                    </div>

                    <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                        <div className="bg-gray-800 px-4 py-2 rounded-full">
                            <span className="text-gray-400">Collection:</span> {owned.length}/{totalAssets}
                        </div>

                        <div className="relative">
                            <select
                                value={selectedCategory}
                                onChange={(e) => {
                                    setSelectedCategory(e.target.value);
                                    setCurrentIndex(0);
                                }}
                                className="bg-gray-800 border border-gray-700 text-white rounded-full pl-4 pr-8 py-2 appearance-none focus:outline-none"
                            >
                                <option value="All">All Categories</option>
                                {assetCategories.map(category => (
                                    <option key={category.name} value={category.name}>
                                        {category.name} ({category.assets.length})
                                    </option>
                                ))}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </header>

                <AnimatePresence mode="wait">
                    {isCollectionComplete ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-20"
                        >
                            <div className="inline-block p-8 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-700 shadow-xl max-w-2xl">
                                <div className="text-6xl mb-6">🏆</div>
                                <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500">
                                    Collection Complete!
                                </h2>
                                <p className="text-xl mb-6">You have unlocked all {totalAssets} assets!</p>

                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-8">
                                    {allAssets.map(asset => (
                                        <div key={asset.id} className={`p-2 rounded-lg border ${owned.includes(asset.id) ? 'border-green-500 bg-green-900/20' : 'border-gray-700 bg-gray-800/50'}`}>
                                            <div className="h-12 w-12 mx-auto mb-2 flex items-center justify-center">
                                                <span className="text-2xl">{asset.image.startsWith('/') ? '🖼️' : asset.image}</span>
                                            </div>
                                            <p className="text-xs truncate">{asset.name}</p>
                                        </div>
                                    ))}
                                </div>

                                <button
                                    onClick={() => {
                                        setCurrentIndex(0);
                                        setSelectedCategory('All');
                                        setOwned([]);
                                    }}
                                    className="bg-indigo-600 hover:bg-indigo-500 text-white py-3 px-8 rounded-lg font-medium transition-all w-full max-w-xs"
                                >
                                    Start New Game
                                </button>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key={current?.id || 'empty'}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.3 }}
                            className="w-full bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl overflow-hidden shadow-2xl"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                                <div className="flex flex-col items-center justify-center">
                                    <div className="relative w-64 h-64 bg-gray-900 rounded-lg border border-gray-700 flex items-center justify-center mb-4">
                                        <div className={`absolute inset-0 ${current?.rarityColor || 'bg-gray-400'} opacity-20 rounded-lg`}></div>
                                        {current?.image ? (
                                            <div className="relative z-10 max-h-56 max-w-56 flex items-center justify-center">
                                                <Image
                                                    src={current.image}
                                                    alt={current.name}
                                                    width={200}
                                                    height={200}
                                                    className="object-contain"
                                                />
                                            </div>
                                        ) : (
                                            <div className="relative z-10 max-h-56 max-w-56 flex items-center justify-center">
                                                <span className="text-6xl">❓</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="w-full max-w-xs">
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="text-sm text-gray-400">{current?.category || 'Unknown'}</span>
                                            <span className="text-sm font-medium">{current?.ethValue || 0} ETH</span>
                                        </div>
                                        <div className="w-full bg-gray-700 rounded-full h-2">
                                            <div
                                                className={`h-2 rounded-full ${current?.rarityColor || 'bg-gray-400'}`}
                                                style={{ width: `${progress}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col justify-between">
                                    <div>
                                        <h2 className="text-3xl font-bold mb-2">{current?.name || 'No Asset Found'}</h2>
                                        <p className="text-gray-300 mb-4">{current?.description || 'Please select a different category'}</p>

                                        {current?.category && (
                                            <div className={`inline-block px-3 py-1 rounded-full text-sm mb-6 ${current.rarityColor}`}>
                                                {current.category}
                                            </div>
                                        )}
                                    </div>

                                    <div className="space-y-4">
                                        {isUnlocking ? (
                                            <div className="text-center">
                                                <p className="text-xl mb-2">Unlocking in {timeLeft}s...</p>
                                                <div className="w-full bg-gray-700 rounded-full h-3">
                                                    <div
                                                        className="h-3 rounded-full bg-indigo-500 transition-all duration-1000 ease-linear"
                                                        style={{ width: `${progress}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                        ) : showOwnButton ? (
                                            <button
                                                onClick={ownAsset}
                                                className="w-full bg-green-600 hover:bg-green-500 text-white py-3 px-6 rounded-lg font-medium transition-all"
                                            >
                                                Claim Asset
                                            </button>
                                        ) : (
                                            <button
                                                onClick={unlockAsset}
                                                disabled={!current || owned.includes(current.id)}
                                                className={`w-full py-3 px-6 rounded-lg font-medium transition-all ${!current || owned.includes(current.id)
                                                        ? 'bg-gray-600 cursor-not-allowed'
                                                        : 'bg-indigo-600 hover:bg-indigo-500'
                                                    }`}
                                            >
                                                {!current ? 'No Asset' : owned.includes(current.id) ? 'Already Owned' : 'Unlock Asset'}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}