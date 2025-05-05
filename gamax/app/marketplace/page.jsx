"use client";
import { FaSearch } from "react-icons/fa";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { Outfit } from "next/font/google";
import Image from "next/image";
import marketsearchBG from "../../assets/marketsearchBG.png";
import BgImage from "../../assets/Bg.jpg";
import Profile1 from "../../assets/profile1.png";
import { CgGhostCharacter } from "react-icons/cg";
import { GiM3GreaseGun, GiGrenade, GiCapeArmor } from "react-icons/gi";
import { AiOutlineCar, AiOutlineFormatPainter } from "react-icons/ai";
import { LiaMedkitSolid } from "react-icons/lia";
import { SiOpenbadges } from "react-icons/si";
import { FiDatabase } from "react-icons/fi";
import { PiGraphLight } from "react-icons/pi";
import { FaEthereum } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useWallet } from "@/context/WalletContext";
import { ethers } from "ethers";
import {
  viewAllAssets,
  buyAsset,
  listenForAssetSold,
  listenForAssetAdded,
} from "../../utils/contractintegration/Contract";

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

const categories = [
  { name: "Character", icon: <CgGhostCharacter className="mr-2 w-7 h-7" /> },
  {
    name: "Character Skins",
    icon: <AiOutlineFormatPainter className="mr-2 w-7 h-7" />,
  },
  { name: "Weapon Skins", icon: <GiM3GreaseGun className="mr-2 w-7 h-7" /> },
  { name: "Vehicle Skins", icon: <AiOutlineCar className="mr-2 w-7 h-7" /> },
  { name: "Weapon", icon: <GiM3GreaseGun className="mr-2 w-8 h-8" /> },
  { name: "Grenades", icon: <GiGrenade className="mr-2 w-7 h-7" /> },
  { name: "Medkits", icon: <LiaMedkitSolid className="mr-2 w-7 h-7" /> },
  { name: "Armor", icon: <GiCapeArmor className="mr-2 w-7 h-7" /> },
  { name: "Badges", icon: <SiOpenbadges className="mr-2 w-7 h-7" /> },
  { name: "Themes", icon: <PiGraphLight className="mr-2 w-7 h-7" /> },
  { name: "Accounts", icon: <FiDatabase className="mr-2 w-7 h-7" /> },
  { name: "Coins & Tokens", icon: <PiGraphLight className="mr-2 w-7 h-7" /> },
];

export default function Marketplace() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);

  const {
    isConnected,
    account,
    connectWallet,
    disconnectWallet,
    shortenAddress,
  } = useWallet();

  const fetchAssets = async () => {
    try {
      setLoading(true);
      const allAssets = await viewAllAssets();
      const availableAssets = allAssets.filter(
        (asset) => asset.MarketStatus === "Available"
      );

      const formattedAssets = availableAssets.map((asset, index) => ({
        id: index,
        assetId: index,
        name: asset.assetName,
        description: asset.description,
        price: asset.price,
        category: asset.category,
        game: asset.gameName,
        rarity: asset.rarities,
        image: asset.assetImage,
        contractData: asset,
      }));

      setAssets(formattedAssets);
    } catch (error) {
      console.error("Error fetching assets:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssets();

    const cleanupSoldListener = listenForAssetSold(() => {
      fetchAssets();
    });

    const cleanupAddedListener = listenForAssetAdded(() => {
      fetchAssets();
    });

    return () => {
      cleanupSoldListener();
      cleanupAddedListener();
    };
  }, []);

  const filteredAssets = assets.filter((asset) => {
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      if (
        !asset.name.toLowerCase().includes(searchLower) &&
        !asset.description.toLowerCase().includes(searchLower) &&
        !asset.game.toLowerCase().includes(searchLower)
      ) {
        return false;
      }
    }

    if (selectedCategory && asset.category !== selectedCategory) {
      return false;
    }

    return true;
  });

  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(
      selectedCategory === categoryName ? null : categoryName
    );
  };

  const handleBuyAsset = async (asset) => {
    if (!isConnected) {
      alert("Please connect your wallet first");
      return;
    }

    try {
      console.log("Attempting to buy asset:", asset);
      const tx = await buyAsset(asset.id);

      console.log("Transaction sent:", tx.hash);
      await tx.wait();

      alert("Asset purchased successfully!");
      fetchAssets();
    } catch (error) {
      console.error("Full error object:", error);

      let errorMessage = "Purchase failed";
      if (error.code === 4001) {
        errorMessage = "Transaction was rejected";
      } else if (error.message) {
        errorMessage = error.message;
      }

      alert(errorMessage);
    }
  };
  if (loading) {
    return (
      <div
        className={`${outfit.className} text-white min-h-screen flex flex-col`}
      >
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
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <p>Loading assets...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div
      className={`${outfit.className} text-white min-h-screen flex flex-col`}
    >
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

        <section className="pt-30 px-4 sm:px-8 lg:px-24 relative z-10">
          <div className="absolute inset-x-0 top-10 flex justify-center">
            <Image
              src={marketsearchBG}
              alt="marketsearchBG"
              className="w-auto"
            />
          </div>
          <div className="text-center mb-8 relative">
            <div className="bg-[#111] mt-6 px-6 py-3 rounded-lg flex items-center justify-between max-w-lg mx-auto shadow-inner z-20">
              <input
                type="text"
                placeholder="Search for assets..."
                className="bg-transparent outline-none w-full placeholder-[#6D737A]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FaSearch className="text-gray-400 ml-2" />
            </div>
          </div>
        </section>

        <section className="px-4 sm:px-8 lg:px-24 mb-12 relative z-10">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat, idx) => (
              <button
                key={idx}
                className={`flex items-center px-4 py-2 rounded-lg hover:bg-indigo-600 hover:text-white transition text-lg ${
                  selectedCategory === cat.name
                    ? "bg-indigo-600 text-white"
                    : "bg-[#111] text-[#6D737A]"
                }`}
                onClick={() => handleCategoryClick(cat.name)}
              >
                {cat.icon}
                {cat.name}
              </button>
            ))}
          </div>
        </section>

        <section className="px-4 sm:px-8 lg:px-24 py-10 relative z-10">
          {filteredAssets.length === 0 ? (
            <div className="text-center py-20">
              <h3 className="text-2xl font-bold mb-4">No assets found</h3>
              <p className="text-[#6D737A]">
                Try adjusting your search or category filter
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center mb-16">
              {filteredAssets.map((asset) => (
                <div
                  key={asset.id}
                  className="border rounded-md shadow-lg text-[#6D737A] font-sans space-y-2 px-3 py-4 w-64 bg-white/10 backdrop-blur-md border-white/10 hover:border-indigo-500 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Image
                        src={Profile1}
                        alt="Game Logo"
                        className="w-6 h-6 rounded-full"
                      />
                      <span className="font-medium">{asset.game}</span>
                    </div>
                    <span className="text-xs text-gray-400 bg-black/30 px-2 py-1 rounded">
                      {asset.category}
                    </span>
                  </div>

                  <div className="relative w-full h-56 bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg flex items-center justify-center">
                    <Image
                      src={getAssetImage(asset.image)}
                      alt={asset.name}
                      className="object-contain h-40 w-40"
                    />
                    <span
                      className={`absolute top-2 right-2 text-xs px-3 py-1 rounded-md font-semibold ${
                        asset.rarity === "Legendary"
                          ? "bg-purple-900 text-purple-200"
                          : asset.rarity === "Epic"
                          ? "bg-blue-900 text-blue-200"
                          : asset.rarity === "Rare"
                          ? "bg-green-900 text-green-200"
                          : "bg-gray-800 text-gray-300"
                      }`}
                    >
                      {asset.rarity}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-semibold text-white">{asset.name}</h3>
                    <p className="text-sm text-gray-400 line-clamp-2">
                      {asset.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-sm text-green-400">
                      <FaEthereum className="text-green-400 w-7 h-7" />
                      <div className="flex flex-col">
                        <span className="text-sm">Price</span>
                        <span className="font-semibold text-white">
                          {asset.price} ETH
                        </span>
                      </div>
                    </div>
                    <button
                      className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-5 py-2 rounded-md font-semibold transition-colors"
                      onClick={() => handleBuyAsset(asset)}
                    >
                      Buy
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      <Footer />
    </div>
  );
}
