import UpcomingEventSection from "./UpcomingEventSection";
import MottoSection from "./MottoSection";

export default function HeroSection() {
  return (
    <div className="min-h-screen relative bg-[#E8FAF3]" 
         style={{
           backgroundImage: 'url("https://raw.githubusercontent.com/bikinkoding/web-event/main/public/background.png")',
           backgroundSize: 'cover',
           backgroundPosition: 'center'
         }}>
      <div className="container mx-auto px-4 py-12 pt-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h1 className="text-5xl font-bold leading-tight relative">
              <span className="relative inline-block">
                Bergabung
                <div 
                  className="absolute bottom-2 left-0 w-full"
                  style={{ borderBottom: '10px solid rgba(251, 146, 60, 0.3)' }}
                ></div>
              </span>
              <br />bersama kami.
            </h1>
            <p className="text-lg text-gray-600 font-light">
              Cari semua event yang akan datang jadi mudah, hanya di website HMSE
            </p>
            <div className="space-y-4 w-full max-w-2xl">
              <div className="flex flex-col sm:flex-row gap-4 bg-white p-2 rounded-2xl shadow-lg">
                <input
                  type="text"
                  placeholder="Cari event"
                  className="flex-1 px-4 py-3 text-gray-400 text-base sm:text-xl focus:outline-none placeholder:text-gray-300 rounded-xl"
                />
                <button className="px-6 sm:px-12 py-3 bg-orange-400 text-white rounded-xl hover:bg-orange-500 transition-colors uppercase text-base sm:text-xl font-medium tracking-wide w-full sm:w-auto">
                  Cari
                </button>
              </div>
              <p className="text-base sm:text-xl">
                <span className="text-orange-500 font-bold text-2xl sm:text-3xl">150,000+</span> <span className="text-base sm:text-xl">sudah bergabung</span>
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="flex justify-end">
              <img
                className="object-cover ml-8"
                src="https://raw.githubusercontent.com/bikinkoding/web-event/main/public/hero.png"
                alt="HMSE Team"
              />
            </div>
            <div className="absolute bottom-[-8px] right-4 bg-white px-4 py-2 rounded-full shadow-lg flex items-center">
              <img src="https://raw.githubusercontent.com/bikinkoding/web-event/main/public/Icon_check.png" alt="Check" className="w-6 h-6 mr-2" />
              <p className="text-sm">
                Bergabung dalam<br />
                komunitas aktif
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
