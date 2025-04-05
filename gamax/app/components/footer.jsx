import { FaFacebook, FaInstagram, FaDiscord, FaYoutube, FaTiktok } from "react-icons/fa";

import React from 'react'

const footer = () => {
  return (
    <div>
      <footer className="bg-gradient-to-r from-black via-gray-900 to-black py-12 px-6 lg:px-20">
<div className="flex flex-col lg:flex-row justify-between items-center text-gray-400 space-y-10 lg:space-y-0">
  <div className="text-center lg:text-left space-y-4">
    <div className="text-2xl font-bold text-white flex items-center justify-center lg:justify-start gap-2">
      <span className="text-indigo-500">⚡</span> GamaX
    </div>
    <p>The largest NFT Marketplace. Unique and authentic digital creations. Made possible by blockchain.</p>
    <div className="flex justify-center lg:justify-start space-x-4 text-xl">
      <FaFacebook />
      <FaInstagram />
      <FaDiscord />
      <FaYoutube />
      <FaTiktok />
    </div>
  </div>

  <div className="text-center">
    <button className="bg-indigo-500 px-6 py-2 rounded-lg hover:bg-indigo-600 transition">
      Try Now
    </button>
  </div>

  <ul className="text-sm text-center lg:text-right space-y-1">
    <li><a href="#" className="hover:text-indigo-400">Home</a></li>
    <li><a href="#" className="hover:text-indigo-400">Marketplace</a></li>
    <li><a href="#" className="hover:text-indigo-400">Our Collaborators</a></li>
    <li><a href="#" className="hover:text-indigo-400">Profile</a></li>
    <li><a href="#" className="hover:text-indigo-400">Terms Of Service</a></li>
    <li><a href="#" className="hover:text-indigo-400">Privacy Policy</a></li>
  </ul>
</div>
<p className="text-center text-gray-600 mt-8 text-xs">
  © {new Date().getFullYear()} Copyright GameX. All Rights Reserved
</p>
</footer>
    </div>
  )
}

export default footer
