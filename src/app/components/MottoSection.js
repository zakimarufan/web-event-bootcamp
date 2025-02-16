export default function MottoSection() {
  return (
    <div className="py-32 relative">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="max-w-2xl">
          <h2 className="text-5xl font-bold mb-8 relative">
            <span className="relative inline-block">
              Motto kami
              <div 
                className="absolute bottom-2 left-0 w-full"
                style={{ borderBottom: '10px solid rgba(251, 146, 60, 0.3)' }}
              ></div>
            </span>
          </h2>
          <p className="text-lg text-gray-600">
            Kami percaya bahwa teknologi memiliki kekuatan untuk mengubah dunia, didorong oleh semangat inovasi
          </p>
        </div>
        <div className="hidden md:block">
          <img src="https://raw.githubusercontent.com/bikinkoding/web-event/main/public/icon_shape.png" alt="Icon Shape" className="w-24 h-auto" />
        </div>
      </div>
    </div>
  );
}
