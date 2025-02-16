"use client";
import { useState, useEffect } from "react";
import PageHeader from "../components/PageHeader";
import EventCard from "../components/EventCard";
import { eventService } from "../utils/api";
import Swal from 'sweetalert2';

export default function Events() {
  const [searchQuery, setSearchQuery] = useState("");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      setLoading(true);
      const response = await eventService.getAll();
      setEvents(response.data);
    } catch (error) {
      console.error('Error loading events:', error);
      setError('Failed to load events');
      Swal.fire({
        title: 'Error',
        text: 'Failed to load events',
        icon: 'error',
        confirmButtonColor: '#f97316'
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredEvents = events.filter(event => 
    event.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.categories?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.location?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get unique categories from events
  const categories = ['All', ...new Set(events.map(event => event.categories))].filter(Boolean);

  return (
    <div className="min-h-screen bg-white">
      <PageHeader 
        title="Event HMSE"
        description="Temukan berbagai event menarik dari HMSE UNIPI"
      />

      <div className="container mx-auto px-4 py-12 md:py-32">
        {/* Search Section */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="flex flex-col sm:flex-row gap-4 bg-white p-2 rounded-2xl shadow-lg">
            <input
              type="text"
              placeholder="Cari event berdasarkan nama, kategori, atau lokasi"
              className="flex-1 px-4 py-3 text-gray-600 text-base sm:text-lg focus:outline-none placeholder:text-gray-300 rounded-xl"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="px-6 sm:px-12 py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors uppercase text-base sm:text-lg font-medium tracking-wide w-full sm:w-auto">
              Cari
            </button>
          </div>
        </div>

        {/* Filter Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSearchQuery(category === "All" ? "" : category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                (category === "All" && searchQuery === "") || 
                searchQuery === category
                ? "bg-orange-500 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {loading ? (
          // Loading skeleton
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : error ? (
          // Error state
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-red-600">
              {error}
            </h3>
            <p className="text-gray-500 mt-2">
              Silakan coba refresh halaman
            </p>
          </div>
        ) : (
          <>
            {/* Events Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>

            {/* No Results Message */}
            {filteredEvents.length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium text-gray-600">
                  Tidak ada event yang ditemukan
                </h3>
                <p className="text-gray-500 mt-2">
                  Coba cari dengan kata kunci lain
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
