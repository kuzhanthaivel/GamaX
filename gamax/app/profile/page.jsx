import Header from '../components/header'
import Footer from '../components/footer'

const assets = [
  { name: "AssetName", description: "Description", price: "19.2 ETH", user: "Game Name", category: "Category", sold: false },
  { name: "AssetName", description: "Description", price: "19.2 ETH", user: "Game Name", category: "Category", sold: true },
  { name: "AssetName", description: "Description", price: "19.2 ETH", user: "Game Name", category: "Category", sold: false },
  { name: "AssetName", description: "Description", price: "19.2 ETH", user: "Game Name", category: "Category", sold: true },
];

const transactions = new Array(7).fill({
  asset: "Bold text column",
  game: "Regular text column",
  amount: "Regular text column",
  fromTo: "Regular text column",
  type: "Regular text column",
});

export default function Profile() {
  return (
    <div className="bg-black text-white min-h-screen">
      <Header />

      {/* Profile Section */}
      <section className="text-center pt-24 px-6">
        <h1 className="text-3xl font-bold mb-2">Profile</h1>
        <img
          src="/avatar.jpg"
          alt="Profile"
          className="w-24 h-24 rounded-full mx-auto mb-2 border-4 border-gray-700 object-cover"
        />
        <h2 className="text-2xl font-semibold">Hi, I am John,</h2>
        <p className="text-sm text-gray-400 mt-1">0x1ab8c614a8a856dcc3234E3fba42E7a827F4f0f1</p>
      </section>

      {/* My Assets Section */}
      <section className="px-6 lg:px-20 mt-12">
        <h3 className="text-xl font-bold mb-6 text-center">My Assets</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {assets.map((asset, idx) => (
            <div
              key={idx}
              className="bg-[#111] rounded-xl shadow-lg overflow-hidden"
            >
              <div className="h-40 bg-gray-800 rounded-t-xl mb-4" />
              <div className="px-4 pb-4">
                <div className="flex justify-between items-center mb-1 text-sm text-gray-400">
                  <span>{asset.user}</span>
                  <span className="bg-gray-700 px-2 py-0.5 rounded text-xs">{asset.category}</span>
                </div>
                <h4 className="text-white font-semibold text-lg">{asset.name}</h4>
                <p className="text-gray-500 text-sm mb-2">{asset.description}</p>
                <p className="text-green-400 text-sm mb-4">Price: {asset.price}</p>
                <button
                  className={`w-full px-4 py-2 rounded-md text-sm font-semibold ${
                    asset.sold
                      ? "bg-gray-700 cursor-not-allowed"
                      : "bg-blue-800 hover:bg-blue-700 transition"
                  }`}
                  disabled={asset.sold}
                >
                  {asset.sold ? "Sold Out" : "Sell"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Transactions Section */}
      <section className="px-6 lg:px-20 mt-20 mb-20">
        <h3 className="text-xl font-bold mb-6 text-center">My Transaction</h3>
        <div className="overflow-auto">
          <table className="min-w-full bg-[#111] rounded-xl overflow-hidden text-sm text-left text-gray-400">
            <thead className="bg-gray-800 text-white text-xs uppercase">
              <tr>
                <th className="px-4 py-3">S.No</th>
                <th className="px-4 py-3">Asset Name</th>
                <th className="px-4 py-3">Game</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">From / To</th>
                <th className="px-4 py-3">Type</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t, i) => (
                <tr key={i} className="border-b border-gray-700 hover:bg-gray-900">
                  <td className="px-4 py-3 font-bold">{i + 1}</td>
                  <td className="px-4 py-3 font-bold">{t.asset}</td>
                  <td className="px-4 py-3">{t.game}</td>
                  <td className="px-4 py-3">{t.amount}</td>
                  <td className="px-4 py-3">{t.fromTo}</td>
                  <td className="px-4 py-3">{t.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <Footer />
    </div>
  );
}
