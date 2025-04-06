"use client";
import Header from "../../components/header";
import Footer from "../../components/footer";
import Image from "next/image";
import { Outfit } from 'next/font/google';

// Import all images
import Profile1 from "../../assets/profile1.png";
import GameAlpha from "../../assets/colabs/Game Alpha.jpeg";
import MysteryQuest from "../../assets/colabs/Mystery Quest.jpeg";
import SpeedRush from "../../assets/colabs/Speed Rush.jpeg";
import ZombieWars from "../../assets/colabs/Zombie Wars.jpeg";
import MagicArena from "../../assets/colabs/Magic Arena.png";
import CyberBlitz from "../../assets/colabs/Cyber Blitz.jpeg";
import PixelFarm from "../../assets/colabs/Pixel Farm.jpeg";
import AlienInvasion from "../../assets/colabs/Alien Invasion.jpg";
import BgImage from "../../assets/Bg.jpg";

const outfit = Outfit({
  subsets: ["latin"],
  weight: "400",
});

const collaborators = [
  {
    name: "Game Alpha",
    description: "First-person shooter with stunning graphics.",
    action: "Action",
    image: GameAlpha,
    cover: GameAlpha,
  },
  {
    name: "Mystery Quest",
    description: "Solve ancient mysteries in this puzzle adventure.",
    action: "Adventure",
    image: MysteryQuest,
    cover: MysteryQuest,
  },
  {
    name: "Speed Rush",
    description: "Fast-paced racing with real-time multiplayer.",
    action: "Racing",
    image: SpeedRush,
    cover: SpeedRush,
  },
  {
    name: "Zombie Wars",
    description: "Survive the apocalypse in this horror game.",
    action: "Survival",
    image: ZombieWars,
    cover: ZombieWars,
  },
  {
    name: "Magic Arena",
    description: "Battle wizards and cast spells in real-time.",
    action: "Fantasy",
    image: MagicArena,
    cover: MagicArena,
  },
  {
    name: "Cyber Blitz",
    description: "Cyberpunk hack-n-slash game in neon city.",
    action: "Sci-Fi",
    image: CyberBlitz,
    cover: CyberBlitz,
  },
  {
    name: "Pixel Farm",
    description: "Cute farming sim with pixel graphics.",
    action: "Casual",
    image: PixelFarm,
    cover: PixelFarm,
  },
  {
    name: "Alien Invasion",
    description: "Protect Earth from alien attack.",
    action: "Shooter",
    image: AlienInvasion,
    cover: AlienInvasion,
  },
];

export default function CollaboratorsPage() {
  return (
    <div className={`${outfit.className} text-white min-h-screen flex flex-col`}>
      {/* Full-page background */}
      <div className="fixed inset-0 -z-10">
        <Image
          src={BgImage}
          alt="Background"
          fill
          className="object-cover"
          quality={100}
          priority
        />
        <div className="absolute inset-0  bg-opacity-70"></div>
      </div>

      {/* Content container */}
      <div className="flex-grow">
        <Header />
        
        <section className="px-4 sm:px-8 md:px-12 lg:px-20 py-16 relative z-10">
          <h2 className="text-center text-3xl font-bold mb-12">Our Collaborators</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
            {collaborators.map((game, index) => (
              <div
                key={index}
                className="border rounded-md shadow-lg text-[#6D737A] font-sans space-y-3 px-4 py-5 w-full max-w-xs bg-white/10 backdrop-blur-md border-white/10 hover:border-indigo-500 transition-colors duration-300"
              >
                {/* Game cover image */}
                <div className="relative w-full h-48 rounded-lg overflow-hidden">
                  <Image
                    src={game.cover}
                    alt={`${game.name} Cover`}
                    fill
                    className="object-cover"
                    quality={90}
                  />
                  <span className="absolute top-2 right-2 bg-zinc-800/90 text-white text-xs px-3 py-1 rounded-md font-semibold">
                    {game.action}
                  </span>
                </div>

                {/* Title and button */}
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-3">
                    <div className="relative w-8 h-8 rounded-full overflow-hidden">
                      <Image
                        src={game.image}
                        alt={`${game.name} Logo`}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="text-lg font-medium text-white">{game.name}</span>
                  </div>

                  <button className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-4 py-1.5 rounded-md font-medium transition-colors duration-200">
                    Play
                  </button>
                </div>

                {/* Description */}
                <p className="text-gray-400 text-sm line-clamp-2">{game.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}