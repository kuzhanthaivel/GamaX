"use client";
 import Header from "../../components/header";
 import Footer from "../../components/footer";
 import Profile1 from "../../assets/profile1.png";
 import Image from "next/image";
 import { Outfit } from 'next/font/google';
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
     image: Profile1,
   },
   {
     name: "Mystery Quest",
     description: "Solve ancient mysteries in this puzzle adventure.",
     action: "Adventure",
     image: Profile1,
   },
   {
     name: "Speed Rush",
     description: "Fast-paced racing with real-time multiplayer.",
     action: "Racing",
     image: Profile1,
   },
   {
     name: "Zombie Wars",
     description: "Survive the apocalypse in this horror game.",
     action: "Survival",
     image: Profile1,
   },
   {
     name: "Magic Arena",
     description: "Battle wizards and cast spells in real-time.",
     action: "Fantasy",
     image: Profile1,
   },
   {
     name: "Cyber Blitz",
     description: "Cyberpunk hack-n-slash game in neon city.",
     action: "Sci-Fi",
     image: Profile1,
   },
   {
     name: "Pixel Farm",
     description: "Cute farming sim with pixel graphics.",
     action: "Casual",
     image: Profile1,
   },
   {
     name: "Alien Invasion",
     description: "Protect Earth from alien attack.",
     action: "Shooter",
     image: Profile1,
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
           layout="fill"
           objectFit="cover"
           quality={100}
         />
         <div className="absolute inset-0  bg-opacity-70"></div>
       </div>
 
       {/* Content container */}
       <div className="flex-grow">
         <Header />
         
         <section className="px-20 py-16 relative z-10">
           <h2 className="text-center text-3xl font-bold mb-12">Our Collaborators</h2>
 
           <div className="grid xl:grid-cols-4 grid-cols-3 gap-8 justify-items-center">
             {collaborators.map((game, index) => (
               <div
                 key={index}
                 className="border rounded-md shadow-lg text-[#6D737A] font-sans space-y-2 px-3 py-4 w-72 bg-white/10 backdrop-blur-md border-white/10 hover:border-indigo-500 transition-colors"
               >
                 {/* Image placeholder */}
                 <div className="relative w-full h-56 bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg">
                   <span className="absolute top-2 right-2 bg-zinc-800 text-xs px-3 py-1 rounded-md font-semibold">
                     {game.action}
                   </span>
                 </div>
 
                 {/* Title and button */}
                 <div className="flex items-center justify-between">
                   <div className="flex items-center gap-2">
                     <Image
                       src={game.image}
                       alt="Game Logo"
                       className="w-6 h-6 rounded-full"
                     />
                     <span className="text-lg font-medium text-white">{game.name}</span>
                   </div>
 
                   <button className="bg-blue-900 hover:bg-blue-800 text-white text-sm px-5 py-2 rounded-md font-semibold transition-colors">
                     Play
                   </button>
                 </div>
 
                 {/* Description */}
                 <p className="line-clamp-2 text-gray-400">{game.description}</p>
               </div>
             ))}
           </div>
         </section>
       </div>
 
       <Footer />
     </div>
   );
 }