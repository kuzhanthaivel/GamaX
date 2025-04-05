import Header from '../components/header'
import Footer from '../components/footer'

const collaborators = Array(8).fill({
  gameName: 'Game Name',
  profileImage: '/avatar.jpg',
  thumbnail: '/thumbnail.jpg',
});

export default function Collaborators() {
  return (
    <div className="bg-black text-white min-h-screen">
      <Header />

      {/* Title */}
      <section className="text-center pt-24 px-6">
        <h1 className="text-3xl font-bold mb-8">Our Collaborators</h1>
      </section>

      {/* Collaborator Cards */}
      <section className="px-6 lg:px-20 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {collaborators.map((collab, i) => (
            <div
              key={i}
              className="bg-[#111] rounded-xl shadow-lg overflow-hidden flex flex-col items-center"
            >
              <div className="w-full h-40 bg-gray-800 rounded-t-xl" />
              <div className="flex justify-between items-center w-full px-4 py-3">
                <div className="flex items-center gap-2">
                  <img
                    src={collab.profileImage}
                    alt="avatar"
                    className="w-6 h-6 rounded-full"
                  />
                  <span className="text-sm text-white">{collab.gameName}</span>
                </div>
                <button className="bg-blue-800 hover:bg-blue-700 text-white text-sm px-4 py-1 rounded">
                  Play
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
