"use client";
import Header from "../../components/header";
import Footer from "../../components/footer";
import Image from "next/image";
import { Outfit } from 'next/font/google';
import Link from 'next/link';

import BgImage from "../../assets/Bg.jpg";

import DummyGame from "../../assets/colabs/Game Alpha.jpeg";

const outfit = Outfit({
  subsets: ["latin"],
  weight: "400",
});

const collaborators = [
  {
    name: "DummyGame",
    description: "This Game plartform which is prtotype model of this plartform.",
    action: "Action",
    image: DummyGame,
    cover: DummyGame,
  }
];

export default function CollaboratorsPage() {
  return (
    <div className={`${outfit.className} text-white min-h-screen flex flex-col`}>
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

      <div className="flex-grow">
        <Header />

        <section className="px-4 sm:px-8 md:px-12 lg:px-20 py-16 relative z-10">
          <h2 className="text-center text-3xl font-bold mb-12">Our Collaborators</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
            {collaborators.map((game, index) => (
              <div
                key={index}
                className="border rounded-md shadow-lg text-[#6D737A] font-sans space-y-3 px-4 py-5 w-full max-w-xs bg-white/10 backdrop-blur-md border-white/10"
              >
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
                  <Link href="/profile" className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-4 py-1.5 rounded-md font-medium transition-colors duration-200 hover:scale-x-110" >Play</Link>
                </div>
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