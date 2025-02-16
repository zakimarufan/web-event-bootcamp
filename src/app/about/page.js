import PageHeader from "../components/PageHeader";

export default function About() {
  const years = ["2024", "2025"];
  const members = [
    {
      name: "Vian",
      role: "Ketua HMSE",
      image: "/member1.jpg"
    },
    {
      name: "Ani Rahmawati",
      role: "Wakil Ketua",
      image: "/member2.jpg"
    },
    {
      name: "Budi Setiawan",
      role: "Sekretaris",
      image: "/member3.jpg"
    },
    {
      name: "Siti Nurhayati",
      role: "Bendahara",
      image: "/member4.jpg"
    },
    {
      name: "Ahmad Maulana",
      role: "Koordinator Acara",
      image: "/member5.jpg"
    },
    {
      name: "Dwi Lestari",
      role: "Koordinator Media",
      image: "/member6.jpg"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <PageHeader 
        title="About us"
        description="Kami adalah Himpunan Mahasiswa Software Engineering (HMSE),
        sekelompok individu bersemangat yang bersatu dalam
        kecintaan terhadap dunia pengembangan perangkat lunak."
      />

      <div className="container mx-auto px-4 py-12 md:py-32">
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Kepengurusan Tahun</h2>
          <div className="flex gap-4">
            {years.map((year) => (
              <button
                key={year}
                className={`px-6 py-2 rounded-lg ${
                  year === "2025"
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {year}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {members.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-8 text-center shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="w-24 h-24 mx-auto mb-4 bg-gray-500 rounded-full flex items-center justify-center overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105">
                <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg mb-1">{member.name}</h3>
              <p className="text-gray-600">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}