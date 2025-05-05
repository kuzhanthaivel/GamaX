import {
  FaFacebookF,
  FaPinterestP, 
  FaDiscord,
  FaYoutube,
  FaTiktok,
} from "react-icons/fa";
import Image from "next/image";
import logo from "../assets/logo.png";
import Link from "next/link";
export default function Footer() {
  return (
    <div className=" text-white px-24 py-8 bg-transparent">
      <div className="border p-4 rounded-2xl pt-24  px-16  border-dashed border-gray-700 hover:border-indigo-400 transition-all duration-300 ">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="space-y-4">
            <div className="flex items-center ">
              <Image src={logo} alt={logo} className="w-40" />
            </div>
            <p className="text-gray-400 text-sm max-w-xs">
              The largest NFT Marketplace. Unique and authentic digital
              creations. Made possible by blockchain technology.
            </p>
            <div className="flex space-x-3 text-lg">
              <Link href="#" className="hover:text-indigo-500">
                <FaFacebookF />
              </Link>
              <Link href="#" className="hover:text-indigo-500">
                <FaPinterestP />
              </Link>
              <Link href="#" className="hover:text-indigo-500">
                <FaDiscord />
              </Link>
              <Link href="#" className="hover:text-indigo-500">
                <FaYoutube />
              </Link>
              <Link href="#" className="hover:text-indigo-500">
                <FaTiktok />
              </Link>
            </div>
          </div>

          <div className="flex justify-center">
            <button className="bg-indigo-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-indigo-600 transition">
              Try Now
            </button>
          </div>

          <div className="text-sm text-left ">
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-indigo-400">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/marketplace" className="hover:text-indigo-400">
                  Marketplace
                </Link>
              </li>
              <li>
                <Link href="/collaborators" className="hover:text-indigo-400">
                  Our Collaboraters
                </Link>
              </li>
              <li>
                <Link href="/profile" className="hover:text-indigo-400">
                  Profile
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col md:flex-row items-center justify-between text-xs text-gray-400 border-t border-gray-800 pt-6">
          <p>2025 © Copyright GamaX. All Rights Reserved</p>
          <div className="space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white">
              Terms Of Service
            </a>
            <a href="#" className="hover:text-white">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
