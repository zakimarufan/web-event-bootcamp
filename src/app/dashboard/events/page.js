'use client';

import { useState, useEffect } from 'react';
import { userService } from '@/app/utils/api';
import Link from 'next/link';

export default function UserEventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const response = await userService.getMyEvents();
      setEvents(response.data);
    } catch (error) {
      setError('Failed to load events');
    } finally {
      setLoading(false);
    }
  };

  // Determine badge color based on status
  const getStatusBadgeColor = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
      case 'paid':
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'rejected':
      case 'cancelled':
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Utility function to format status
  const formatStatus = (status) => {
    if (!status) return '';
    return status
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">My Events</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <div key={event.id} className="bg-white rounded-lg shadow overflow-hidden">
            {event.image_url && (
              <div className="aspect-video relative">
                <img
                  src={event.image_url}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{event.title}</h3>
              
              <div className="space-y-2 text-sm text-gray-600">
                <div>
                  <span className="font-medium">Date:</span>{' '}
                  {new Date(event.date).toLocaleDateString()}
                </div>
                <div>
                  <span className="font-medium">Time:</span> {event.time}
                </div>
                <div>
                  <span className="font-medium">Location:</span> {event.location}
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadgeColor(formatStatus(event.registration_status))}`}>
                  {formatStatus(event.registration_status)}
                </span>

                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadgeColor(formatStatus(event.payment_status))}`}>
                  {formatStatus(event.payment_status)}
                </span>
              </div>

              {event.payment_status === 'pending' && (
                <div className="mt-4">
                  <Link
                    href={`/checkout/${event.id}`}
                    className="block w-full text-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  >
                    Complete Payment
                  </Link>
                </div>
              )}
            </div>
          </div>
        ))}

        {events.length === 0 && (
          <div className="col-span-full text-center py-8 text-gray-500">
            You haven&apos;t registered for any events yet.{' '}
            <Link href="/events" className="text-blue-600 hover:text-blue-800">
              Browse Events
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
