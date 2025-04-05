// components/Header.js
import Link from 'next/link'

export default function Header() {
  return (
    <header className="w-full px-6 py-8 flex items-center justify-between bg-black border-b border-gray-800 sticky top-0 z-50">
      <div className="text-white text-2xl font-bold">
        <span className="text-indigo-500">⚡</span> GamaX
      </div>
      <nav className="space-x-6 text-md text-gray-300 hidden md:flex">
        <Link href="/" className="hover:text-indigo-400">Home</Link>
        <Link href="/marketplace" className="hover:text-indigo-400">Marketplace</Link>
        <Link href="/collaborators" className="hover:text-indigo-400">Collaborators</Link>
        <Link href="/profile" className="hover:text-indigo-400">Profile</Link>
      </nav>
      <button className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-1.5 rounded-lg text-sm transition">
        Connect Wallet
      </button>
    </header>
  )
}
