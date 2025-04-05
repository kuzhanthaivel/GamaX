import { FaSearch } from "react-icons/fa";
import Header from "../components/header";
import Footer from "../components/footer";

const categories = [
  "Character", "Character Skins", "Weapon Skins", "Vehicle Skins",
  "Weapon", "Grenades", "Medkits", "Armor", "Badges", "Themes",
  "Accounts", "Coins & Tokens"
];

const assets = new Array(8).fill({
  name: "AssetName",
  description: "Description",
  price: "19.2 ETH",
  category: "Category",
  user: "Game Name",
});

export default function Marketplace() {
  return (
    <div className="bg-black text-white min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="pt-20 px-6 lg:px-20">
        <div className="text-center mb-8">
          <img src="/metamask.png" alt="MetaMask" className="mx-auto w-52 rounded-xl shadow-lg" />
          <div className="bg-[#111] mt-6 px-6 py-3 rounded-full flex items-center justify-between max-w-lg mx-auto shadow-inner">
            <input
              type="text"
              placeholder="What do you want to learn?"
              className="bg-transparent outline-none w-full placeholder-gray-400 text-sm"
            />
            <FaSearch className="text-gray-400 ml-2" />
          </div>
        </div>
      </section>

      {/* Category Filter Section */}
      <section className="px-6 lg:px-20 mb-12">
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              className="border border-gray-600 px-4 py-1 rounded-full hover:bg-indigo-600 hover:text-white transition text-sm text-gray-300"
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Asset Cards Section */}
      <section className="px-6 lg:px-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-20">
          {assets.map((asset, idx) => (
            <div
              key={idx}
              className="bg-[#111] rounded-xl shadow-lg overflow-hidden transform hover:scale-[1.02] transition duration-300"
            >
              <div className="h-44 bg-gray-800 mb-4 rounded-t-xl" />
              <div className="px-4 pb-4">
                <div className="flex justify-between items-center mb-1 text-sm text-gray-400">
                  <span>{asset.user}</span>
                  <span className="bg-gray-700 px-2 py-0.5 rounded text-xs">{asset.category}</span>
                </div>
                <h2 className="text-lg font-semibold text-white mb-1">{asset.name}</h2>
                <p className="text-gray-500 text-sm mb-3">{asset.description}</p>
                <div className="text-green-400 text-sm font-medium mb-4">
                  Price: {asset.price}
                </div>
                <button className="w-full bg-blue-800 hover:bg-blue-700 transition py-2 rounded-md text-sm font-semibold">
                  Buy
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
