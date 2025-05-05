"use client";
import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Outfit } from 'next/font/google';
import GameBg from '../../assets/Bg.jpg';
import { FaEthereum, FaSpinner } from "react-icons/fa";
import { FiArrowLeft } from "react-icons/fi";

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

const gameAssets = [
    {
        id: 1,
        name: "Steel Sword",
        description: "A sturdy sword forged from high-quality steel",
        price: "0.25",
        category: "Weapon",
        rarity: "Common",
        image: SteelSword,
    },
    {
        id: 2,
        name: "Elven Bow",
        description: "An elegant bow crafted by elven artisans",
        price: "0.45",
        category: "Weapon",
        rarity: "Rare",
        image: ElvenBow,
    },
    {
        id: 3,
        name: "Flame Staff",
        description: "Staff imbued with the power of fire",
        price: "0.75",
        category: "Weapon",
        rarity: "Epic",
        image: FlameStaff,
    },
    {
        id: 4,
        name: "Frost Axe",
        description: "Axe that freezes enemies on impact",
        price: "0.65",
        category: "Weapon",
        rarity: "Epic",
        image: FrostAxe,
    },
    {
        id: 5,
        name: "Wooden Shield",
        description: "Basic shield for beginner warriors",
        price: "0.15",
        category: "Armor",
        rarity: "Common",
        image: WoodenShield,
    },
    {
        id: 6,
        name: "Leather Armor",
        description: "Lightweight armor made from tough leather",
        price: "0.35",
        category: "Armor",
        rarity: "Common",
        image: LeatherArmor,
    },
    {
        id: 7,
        name: "Dragon Helm",
        description: "Helmet crafted from dragon scales",
        price: "1.25",
        category: "Armor",
        rarity: "Legendary",
        image: DragonHelm,
    },
    {
        id: 8,
        name: "Health Potion",
        description: "Restores 50 health points",
        price: "0.05",
        category: "Consumable",
        rarity: "Common",
        image: HealthPotion,
    },
    {
        id: 9,
        name: "Mana Elixir",
        description: "Restores 30 mana points",
        price: "0.07",
        category: "Consumable",
        rarity: "Common",
        image: ManaElixir,
    },
    {
        id: 10,
        name: "Speed Draught",
        description: "Increases movement speed by 20% for 1 minute",
        price: "0.12",
        category: "Consumable",
        rarity: "Rare",
        image: SpeedDraught,
    },
    {
        id: 11,
        name: "Ring of Power",
        description: "Increases all stats by 5%",
        price: "0.95",
        category: "Accessory",
        rarity: "Epic",
        image: RingOfPower,
    },
    {
        id: 12,
        name: "Ancient Scroll",
        description: "Teaches a random rare spell",
        price: "0.55",
        category: "Miscellaneous",
        rarity: "Rare",
        image: AncientScroll,
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

    const collectAsset = (asset) => {
        if (!isConnected) {
            alert("Please connect your wallet first!");
            return;
        }

        setCurrentCollectingAsset(asset);
        setIsCollecting(true);
        setCollectionProgress(0);

        const interval = setInterval(() => {
            setCollectionProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prev + 10;
            });
        }, 1000);

        setTimeout(() => {
            clearInterval(interval);
            setIsCollecting(false);
            addProfileAsset(asset);
            setCurrentCollectingAsset(null);
        }, 10000);
    };

    const addProfileAsset = (asset) => {

        console.log("Adding asset to profile:", asset);
        alert(`${asset.name} collected successfully!`);
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

                    </div>
                    <h2 className="text-2xl font-bold mb-6 text-center">Available Loot</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
                        {gameAssets.map((asset) => {
                            const isCurrentAssetCollecting = isCollecting && currentCollectingAsset?.id === asset.id;

                            return (
                                <div
                                    key={asset.id}
                                    className="border rounded-lg shadow-lg space-y-3 px-3 py-4 w-full max-w-xs bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-md border-white/10 hover:border-blue-500 transition-colors relative"
                                >
                                    <div className="relative w-full h-48 bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg flex items-center justify-center">
                                        <Image
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
                                        disabled={isCollecting}
                                        className={`w-full mt-3 py-2 rounded-md font-medium transition-colors flex items-center justify-center gap-2 ${isCurrentAssetCollecting
                                                ? "bg-blue-700 cursor-not-allowed"
                                                : "bg-blue-600 hover:bg-blue-700"
                                            } ${isCollecting && !isCurrentAssetCollecting ? "opacity-50 cursor-not-allowed" : ""}`}
                                    >
                                        {isCurrentAssetCollecting ? (
                                            <>
                                                <FaSpinner className="animate-spin" />
                                                <span>Collecting ({collectionProgress}%)</span>
                                            </>
                                        ) : (
                                            "Collect Now"
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