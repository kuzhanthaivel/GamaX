"use client";
import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Outfit } from 'next/font/google';
import GameBg from '../../assets/Bg.jpg';
import { FaEthereum, FaSpinner, FaCheck } from "react-icons/fa";
import { FiArrowLeft } from "react-icons/fi";
import { addAsset, viewAllAssets } from '../../utils/contractintegration/Contract';

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

const gameAssets = [
    {
        id: 1,
        name: "Steel Sword",
        description: "A sturdy sword forged from high-quality steel",
        price: "0.25",
        category: "Weapon",
        rarity: "Common",
        image: 'SteelSword',
    },
    {
        id: 2,
        name: "Elven Bow",
        description: "An elegant bow crafted by elven artisans",
        price: "0.45",
        category: "Weapon",
        rarity: "Rare",
        image: 'ElvenBow',
    },
    {
        id: 3,
        name: "Flame Staff",
        description: "Staff imbued with the power of fire",
        price: "0.75",
        category: "Weapon",
        rarity: "Epic",
        image: 'FlameStaff',
    },
    {
        id: 4,
        name: "Frost Axe",
        description: "Axe that freezes enemies on impact",
        price: "0.65",
        category: "Weapon",
        rarity: "Epic",
        image: 'FrostAxe',
    },
    {
        id: 5,
        name: "Wooden Shield",
        description: "Basic shield for beginner warriors",
        price: "0.15",
        category: "Armor",
        rarity: "Common",
        image: 'WoodenShield',
    },
    {
        id: 6,
        name: "Leather Armor",
        description: "Lightweight armor made from tough leather",
        price: "0.35",
        category: "Armor",
        rarity: "Common",
        image: 'LeatherArmor',
    },
    {
        id: 7,
        name: "Dragon Helm",
        description: "Helmet crafted from dragon scales",
        price: "1.25",
        category: "Armor",
        rarity: "Legendary",
        image: 'DragonHelm',
    },
    {
        id: 8,
        name: "Health Potion",
        description: "Restores 50 health points",
        price: "0.05",
        category: "Consumable",
        rarity: "Common",
        image: 'HealthPotion',
    },
    {
        id: 9,
        name: "Mana Elixir",
        description: "Restores 30 mana points",
        price: "0.07",
        category: "Consumable",
        rarity: "Common",
        image: 'ManaElixir',
    },
    {
        id: 10,
        name: "Speed Draught",
        description: "Increases movement speed by 20% for 1 minute",
        price: "0.12",
        category: "Consumable",
        rarity: "Rare",
        image: 'SpeedDraught',
    },
    {
        id: 11,
        name: "Ring of Power",
        description: "Increases all stats by 5%",
        price: "0.95",
        category: "Accessory",
        rarity: "Epic",
        image: 'RingOfPower',
    },
    {
        id: 12,
        name: "Ancient Scroll",
        description: "Teaches a random rare spell",
        price: "0.55",
        category: "Miscellaneous",
        rarity: "Rare",
        image: 'AncientScroll',
    }
];

export default function DummyGame() {
    const router = useRouter();
    const [isCollecting, setIsCollecting] = useState(false);
    const [collectionProgress, setCollectionProgress] = useState(0);
    const [currentCollectingAsset, setCurrentCollectingAsset] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const [account, setAccount] = useState(null);
    const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(false);
    const [ownedAssets, setOwnedAssets] = useState([]);
    const [notification, setNotification] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

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

    useEffect(() => {
        if (account) {
            checkOwnership();
        }
    }, [account]);

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
            setOwnedAssets([]);
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
            showNotification('Wallet connected successfully!');
        } catch (error) {
            console.error('Error connecting wallet:', error);
            if (error.code === 4001) {
                showNotification('Please connect to MetaMask to continue.', true);
            }
        }
    };

    const disconnectWallet = () => {
        setIsConnected(false);
        setAccount(null);
        setOwnedAssets([]);
        showNotification('Wallet disconnected');
    };

    const showNotification = (message, isError = false) => {
        setNotification({ message, isError });
        setTimeout(() => setNotification(null), 5000);
    };

    const checkOwnership = async () => {
        try {
            setIsLoading(true);
            const assets = await viewAllAssets();
            const myAssets = assets.filter(
                asset =>
                    asset.seller.toLowerCase() === account.toLowerCase() &&
                    asset.ProfileStatus === "Active"
            );
            setOwnedAssets(myAssets);
        } catch (error) {
            console.error("Error checking ownership:", error);
            showNotification('Failed to check asset ownership', true);
        } finally {
            setIsLoading(false);
        }
    };

    const collectAsset = async (asset) => {
        if (!isConnected) {
            showNotification("Please connect your wallet first!", true);
            return;
        }

        const isOwned = ownedAssets.some(
            owned =>
                owned.assetName === asset.name &&
                owned.ProfileStatus === "Active"
        );

        if (isOwned) {
            showNotification("You already own this asset!", true);
            return;
        }

        setCurrentCollectingAsset(asset);
        setIsCollecting(true);
        setCollectionProgress(0);

        const interval = setInterval(() => {
            setCollectionProgress(prev => {
                if (prev >= 90) {
                    clearInterval(interval);
                    return 90;
                }
                return prev + 10;
            });
        }, 300);

        try {
            const assetData = {
                assetName: asset.name,
                category: asset.category,
                assetImage: asset,
                price: asset.price,
                gameName: "Dummy Game",
                description: asset.description,
                rarities: asset.rarity,
            };

            setIsLoading(true);
            const tx = await addAsset(assetData);
            showNotification(`Transaction sent: ${tx.hash}`);

            await tx.wait();
            showNotification(`${asset.name} collected successfully!`);

            await checkOwnership();

            setCollectionProgress(100);
        } catch (error) {
            console.error("Error collecting asset:", error);
            showNotification(`Failed to collect asset: ${error.message}`, true);
        } finally {
            setTimeout(() => {
                setIsCollecting(false);
                setIsLoading(false);
                setCurrentCollectingAsset(null);
            }, 1000);
        }
    };

    const shortenAddress = (addr) => {
        return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
    };

    return (
        <div className={`${outfit.className} text-white min-h-screen flex flex-col`}>
            <div className="fixed inset-0 -z-10">
                <Image
                    src={GameBg}
                    alt="Game Background"
                    layout="fill"
                    objectFit="cover"
                    quality={100}
                    className="opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-blue-900/80 to-purple-900/80"></div>
            </div>

            {notification && (
                <div className={`fixed bottom-4 right-4 px-4 py-2 rounded-md shadow-lg z-50 ${notification.isError ? 'bg-red-500' : 'bg-green-500'
                    } text-white flex items-center gap-2 animate-fade-in`}>
                    {notification.isError ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                    ) : (
                        <FaCheck className="h-5 w-5" />
                    )}
                    <span>{notification.message}</span>
                </div>
            )}

            <div className="flex-grow">
                <div className="min-h-screen px-4 sm:px-8 lg:px-20 py-12 relative z-10">
                    <div className="flex justify-between items-center mb-8">
                        <button
                            onClick={() => router.back()}
                            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg px-4 py-2 transition-colors"
                        >
                            <FiArrowLeft />
                            <span>Back</span>
                        </button>

                        <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                            Dummy Game
                        </h1>

                        {isConnected ? (
                            <div className="flex items-center space-x-4">
                                <button
                                    onClick={disconnectWallet}
                                    className="bg-indigo-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm transition w-36"
                                >
                                    <span className="">{shortenAddress(account)}</span>
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={connectWallet}
                                className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm transition w-36"
                            >
                                Connect Wallet
                            </button>
                        )}
                    </div>
                    <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 mb-8 border border-blue-400/30">
                        <h2 className="text-2xl font-bold mb-4 text-blue-300">Welcome to Dummy Game!</h2>
                        <p className="mb-4">
                            Defeat enemies, complete quests, and collect rare items that you can own as NFTs.
                            The items you collect here will appear in your profile collection.
                        </p>
                        {isConnected && (
                            <p className="text-sm text-blue-200">
                                You own {ownedAssets.length} assets in this game
                            </p>
                        )}
                    </div>
                    <h2 className="text-2xl font-bold mb-6 text-center">Available Loot</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
                        {gameAssets.map((asset) => {
                            const isCurrentAssetCollecting = isCollecting && currentCollectingAsset?.id === asset.id;
                            const isOwned = ownedAssets.some(
                                owned =>
                                    owned.assetName === asset.name &&
                                    owned.ProfileStatus === "Active"
                            );

                            return (
                                <div
                                    key={asset.id}
                                    className={`border rounded-lg shadow-lg space-y-3 px-3 py-4 w-full max-w-xs bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-md ${isOwned ? 'border-green-500/50' : 'border-white/10 hover:border-blue-500'
                                        } transition-colors relative`}
                                >
                                    {isOwned && (
                                        <div className="absolute top-2 z-40 left-2 bg-green-500/90 text-white text-xs px-2 py-1 rounded-md flex items-center gap-1">
                                            <FaCheck className="text-xs" />
                                            <span>OWNED</span>
                                        </div>
                                    )}
                                    <div className="relative w-full h-48 bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg flex items-center justify-center">
                                        <Image
                                            src={getAssetImage(asset.image)}
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
                                                <span className="text-xs text-gray-400">Price</span>
                                                <span className="font-semibold text-white">{asset.price} ETH</span>
                                            </div>
                                        </div>
                                        <span className="text-xs text-gray-400 bg-black/30 px-2 py-1 rounded">
                                            {asset.category}
                                        </span>
                                    </div>

                                    <button
                                        onClick={() => collectAsset(asset)}
                                        disabled={isCollecting || isLoading || isOwned}
                                        className={`w-full mt-3 py-2 rounded-md font-medium transition-colors flex items-center justify-center gap-2 ${isOwned
                                                ? 'bg-green-600 cursor-default'
                                                : isCurrentAssetCollecting
                                                    ? 'bg-blue-700 cursor-not-allowed'
                                                    : 'bg-blue-600 hover:bg-blue-700'
                                            } ${(isCollecting && !isCurrentAssetCollecting) || isLoading ? 'opacity-50 cursor-not-allowed' : ''
                                            }`}
                                    >
                                        {isOwned ? (
                                            <>
                                                <FaCheck />
                                                <span>Owned</span>
                                            </>
                                        ) : isCurrentAssetCollecting ? (
                                            <>
                                                <FaSpinner className="animate-spin" />
                                                <span>Collecting ({collectionProgress}%)</span>
                                            </>
                                        ) : isLoading ? (
                                            <>
                                                <FaSpinner className="animate-spin" />
                                                <span>Processing...</span>
                                            </>
                                        ) : (
                                            'Collect Now'
                                        )}
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}