import UpcomingEvent from "./UpcomingEvent";
import Link from "next/link";

export default function UpcomingEventSection() {
  return (
    <div className="relative py-24 bg-[#E8FAF3]">
      {/* Top Shape */}
      <div className="absolute top-[-30px] right-[-30px] hidden lg:block">
        <div className="w-16 h-16 bg-green-500 rounded-lg transform rotate-12"></div>
      </div>

      {/* Bottom Shape */}
      <div className="absolute bottom-[-30px] left-[-30px] hidden lg:block">
        <div className="w-16 h-16 bg-orange-500 rounded-lg transform -rotate-12"></div>
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 space-y-6 md:space-y-0">
          <h2 className="text-5xl font-bold relative">
            <span className="relative inline-block">
              Event yang akan 
              <div 
                className="absolute bottom-2 left-0 w-full"
                style={{ borderBottom: '10px solid rgba(251, 146, 60, 0.3)' }}
              ></div>
            </span>
            <span>
            <br /> datang.
            </span>
          </h2>
          <div className="w-full md:w-auto flex justify-start">
            <Link href="/events" className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
              Semua Event
            </Link>
          </div>
        </div>
        <UpcomingEvent />
      </div>
      <img
        src="https://raw.githubusercontent.com/bikinkoding/web-event/main/public/icon_shape.png"
        alt="Icon Shape"
        className="absolute bottom-[20px] right-[200px] w-24 h-auto md:left-auto md:right-[200px] left-[20px]"
      />
    </div>
  );
}
