'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

export default function EventCard({ event }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setLoading(true);
    
    const user = Cookies.get('user');
    if (!user) {
      setLoading(false);
      Swal.fire({
        title: 'Login Required',
        text: 'Please login to register for this event',
        icon: 'warning',
        confirmButtonColor: '#f97316'
      }).then(() => {
        sessionStorage.setItem('redirectAfterLogin', `/checkout/${event.id}`);
        router.push('/login');
      });
      return;
    }

    router.push(`/checkout/${event.id}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48">
        <Image
          src={event.image_url || "https://placehold.co/600x400"}
          alt={event.title}
          layout="fill"
          objectFit="cover"
          className="w-full"
        />
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            event.price === 0 
              ? 'bg-green-100 text-green-800'
              : 'bg-orange-100 text-orange-800'
          }`}>
            {event.price === 0 ? 'Free' : `Rp ${Math.floor(event.price).toLocaleString('id-ID')}`}
          </span>
        </div>

        <div className="space-y-2 mb-4">
          <p className="text-gray-600">
            <i className="fas fa-calendar-alt mr-2"></i>
            {new Date(event.date).toLocaleDateString()}
          </p>
          <p className="text-gray-600">
            <i className="fas fa-clock mr-2"></i>
            {event.time}
          </p>
          <p className="text-gray-600">
            <i className="fas fa-map-marker-alt mr-2"></i>
            {event.location}
          </p>
        </div>

        <button
          onClick={handleRegister}
          disabled={loading}
          className="w-full bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors disabled:bg-gray-400"
        >
          {loading ? 'Loading...' : 'Daftar Sekarang'}
        </button>
      </div>
    </div>
  );
}
