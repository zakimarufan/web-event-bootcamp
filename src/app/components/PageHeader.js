export default function PageHeader({ title, description }) {
  return (
    <div className="relative py-24 bg-[#E8FAF3]">
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: 'url("/background.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      ></div>
      <div className="container mx-auto px-4 relative md:py-32">
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-4 relative">
            <span className="relative inline-block">
              {title}
              <div 
                className="absolute bottom-2 left-0 w-full"
                style={{ borderBottom: '10px solid rgba(251, 146, 60, 0.3)' }}
              ></div>
            </span>
          </h1>
          <p className="text-xl text-gray-600 px-4 sm:px-16">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
