import { FaFacebookF, FaPinterestP, FaDiscord, FaYoutube, FaTiktok } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#0d0d0d] text-white py-12 px-6 border-t border-transparent">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        
        {/* Left Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-3xl text-indigo-500">⚡</span>
            <h2 className="text-2xl font-bold">GamaX</h2>
          </div>
          <p className="text-gray-400 text-sm max-w-xs">
            The largest NFT Marketplace. Unique and authentic digital creations. Made possible by blockchain technology.
          </p>
          <div className="flex space-x-3 text-lg">
            <a href="#" className="hover:text-indigo-500"><FaFacebookF /></a>
            <a href="#" className="hover:text-indigo-500"><FaPinterestP /></a>
            <a href="#" className="hover:text-indigo-500"><FaDiscord /></a>
            <a href="#" className="hover:text-indigo-500"><FaYoutube /></a>
            <a href="#" className="hover:text-indigo-500"><FaTiktok /></a>
          </div>
        </div>

        {/* Center CTA */}
        <div className="flex justify-center">
          <button className="bg-indigo-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-indigo-600 transition">
            Try Now
          </button>
        </div>

        {/* Right Section */}
        <div className="text-sm text-right space-y-3">
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-indigo-400">Home</a></li>
            <li><a href="#" className="hover:text-indigo-400">Marketplace</a></li>
            <li><a href="#" className="hover:text-indigo-400">Our Collaboraters</a></li>
            <li><a href="#" className="hover:text-indigo-400">Profile</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="mt-12 flex flex-col md:flex-row items-center justify-between text-xs text-gray-400 border-t border-gray-800 pt-6">
        <p>2025 © Copyright GamaX. All Rights Reserved</p>
        <div className="space-x-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-white">Terms Of Service</a>
          <a href="#" className="hover:text-white">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
}
