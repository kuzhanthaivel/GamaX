import { FaSearch } from "react-icons/fa";
import Header from '../../components/header'
import Footer from '../../components/footer'
import { Outfit } from 'next/font/google';
import Image from 'next/image';
import marketsearchBG from '../../assets/marketsearchBG.png'
import BgImage from '../../assets/Bg.jpg'
import Profile1 from '../../assets/profile1.png'
import { CgGhostCharacter } from "react-icons/cg";
import { GiM3GreaseGun, GiGrenade, GiCapeArmor } from "react-icons/gi";
import { AiOutlineCar, AiOutlineFormatPainter } from "react-icons/ai";
import { LiaMedkitSolid } from "react-icons/lia";
import { SiOpenbadges } from "react-icons/si";
import { FiDatabase } from "react-icons/fi";
import { PiGraphLight } from "react-icons/pi";
import { FaEthereum } from "react-icons/fa";

const outfit = Outfit({
  subsets: ["latin"],
  weight: "400",
});

// Updated categories array with icons
const categories = [
  { name: "Character", icon: <CgGhostCharacter className="mr-2 w-7 h-7" /> },
  { name: "Character Skins", icon: <AiOutlineFormatPainter className="mr-2 w-7 h-7" /> },
  { name: "Weapon Skins", icon: <GiM3GreaseGun className="mr-2 w-7 h-7" /> },
  { name: "Vehicle Skins", icon: <AiOutlineCar className="mr-2 w-7 h-7" /> },
  { name: "Weapon", icon: <GiM3GreaseGun className="mr-2 w-8 h-8" /> },
  { name: "Grenades", icon: <GiGrenade className="mr-2 w-7 h-7" /> },
  { name: "Medkits", icon: <LiaMedkitSolid className="mr-2 w-7 h-7" /> },
  { name: "Armor", icon: <GiCapeArmor className="mr-2 w-7 h-7" /> },
  { name: "Badges", icon: <SiOpenbadges className="mr-2 w-7 h-7" /> },
  { name: "Themes", icon: <PiGraphLight className="mr-2 w-7 h-7" /> },
  { name: "Accounts", icon: <FiDatabase className="mr-2 w-7 h-7" /> },
  { name: "Coins & Tokens", icon: <PiGraphLight className="mr-2 w-7 h-7" /> }
];

// Realistic game assets data
const assets = [
  {
    id: 1,
    name: "Legendary Dragon Skin",
    description: "Rare dragon-themed character skin with fire effects",
    price: "2.5",
    category: "Character Skin",
    game: "Dragon Adventures",
    rarity: "Legendary"
  },
  {
    id: 2,
    name: "Golden AK-47",
    description: "Exclusive gold-plated assault rifle with custom animations",
    price: "1.8",
    category: "Weapon",
    game: "Battle Royale Extreme",
    rarity: "Epic"
  },
  {
    id: 3,
    name: "Cyberpunk Bike",
    description: "Neon-lit futuristic motorcycle with turbo boost",
    price: "3.2",
    category: "Vehicle",
    game: "Neon City Racing",
    rarity: "Legendary"
  },
  {
    id: 4,
    name: "Platinum Account",
    description: "Premium account with all DLCs unlocked",
    price: "5.0",
    category: "Account",
    game: "Galaxy Warriors",
    rarity: "Mythic"
  },
  {
    id: 5,
    name: "Ninja Outfit",
    description: "Stealthy black outfit with smoke bomb effects",
    price: "0.9",
    category: "Character Skin",
    game: "Shadow Strike",
    rarity: "Rare"
  },
  {
    id: 6,
    name: "10,000 Game Tokens",
    description: "In-game currency package",
    price: "0.5",
    category: "Coins & Tokens",
    game: "Crypto Kingdoms",
    rarity: "Common"
  },
  {
    id: 7,
    name: "Phoenix Grenade",
    description: "Explodes into fiery phoenix animation",
    price: "1.2",
    category: "Grenade",
    game: "Tactical Ops",
    rarity: "Epic"
  },
  {
    id: 8,
    name: "Diamond Armor Set",
    description: "Full body armor with damage reflection",
    price: "4.5",
    category: "Armor",
    game: "Medieval Legends",
    rarity: "Legendary"
  }
];

export default function Marketplace() {
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

        {/* Hero Section */}
        <section className="pt-30 px-24 relative z-10">
          <div className="absolute inset-x-0 top-10 flex justify-center">
            <Image src={marketsearchBG} alt="marketsearchBG" className="w-auto" />
          </div>
          <div className="text-center mb-8 relative">
            <div className="bg-[#111] mt-6 px-6 py-3 rounded-lg flex items-center justify-between max-w-lg mx-auto shadow-inner z-20">
              <input
                type="text"
                placeholder="Search for assets..."
                className="bg-transparent outline-none w-full placeholder-[#6D737A]"
              />
              <FaSearch className="text-gray-400 ml-2" />
            </div>
          </div>
        </section>

        {/* Category Filter Section */}
        <section className="px-24 mb-12 relative z-10">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat, idx) => (
              <button
                key={idx}
                className="flex items-center bg-[#111] px-4 py-2 rounded-lg hover:bg-indigo-600 hover:text-white transition text-lg text-[#6D737A]"
              >
                {cat.icon}
                {cat.name}
              </button>
            ))}
          </div>
        </section>

        {/* Asset Cards Section */}
        <section className="px-24 py-10 relative z-10">
          <div className="grid xl:grid-cols-4 grid-cols-3 gap-8">
            {assets.map((asset) => (
              <div 
                key={asset.id}
                className="border rounded-md shadow-lg text-[#6D737A] font-sans space-y-2 px-3 py-4 w-64 bg-white/10 backdrop-blur-md border-white/10 hover:border-indigo-500 transition-colors"
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

                {/* Image placeholder with rarity badge */}
                <div className="relative w-full h-56 bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg">
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

                {/* Price & Buy Button */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-sm text-green-400">
                    <FaEthereum className="text-green-400 w-7 h-7" />
                    <div className="flex flex-col">
                      <span className="text-sm">Price</span>
                      <span className="font-semibold text-white">{asset.price} ETH</span>
                    </div>
                  </div>
                  <button className="bg-blue-900 hover:bg-blue-800 text-white text-sm px-5 py-2 rounded-md font-semibold transition-colors">
                    Buy
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}