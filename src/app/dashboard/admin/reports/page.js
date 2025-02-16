'use client';

import { useState, useEffect } from 'react';
import { adminService } from '@/app/utils/api';

export default function AdminReportsPage() {
  const [salesData, setSalesData] = useState(null);
  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    try {
      setLoading(true);
      const [salesResponse, eventResponse] = await Promise.all([
        adminService.getSalesReport(),
        adminService.getEventReport()
      ]);

      setSalesData(salesResponse.data);
      setEventData(eventResponse.data);
    } catch (error) {
      setError('Failed to load reports');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-600">{error}</div>;

  return (
    <div className="p-4 space-y-8">
      {/* Sales Report */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-6">Reports</h2>

        {salesData && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              <div className="bg-orange-50 p-4 rounded-lg">
                <div className="text-sm text-orange-600">Total Sales</div>
                <div className="text-2xl font-bold">
                  Rp {salesData.total.toLocaleString()}
                </div>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-sm text-blue-600">Total Transactions</div>
                <div className="text-2xl font-bold">{salesData.count}</div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="text-sm text-purple-600">Average Transaction</div>
                <div className="text-2xl font-bold">
                  Rp {(salesData.total / salesData.count || 0).toLocaleString()}
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Event
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      User
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Amount
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {salesData.sales.map((sale, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-4">
                        <div className="max-w-[200px] truncate">{sale.event_title}</div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="max-w-[150px] truncate">{sale.user_name}</div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        Rp {sale.amount_paid.toLocaleString()}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        {new Date(sale.payment_date).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>

      {/* Event Report */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-6">Event Statistics</h2>

        {eventData && (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Event
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Date
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Capacity
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Registered
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Revenue
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {eventData.map((event) => (
                  <tr key={event.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4">
                      <div className="max-w-[200px] truncate">{event.title}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      {new Date(event.date).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">{event.capacity || 'Unlimited'}</td>
                    <td className="px-4 py-4 whitespace-nowrap">{event.registered_users}</td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      Rp {event.total_revenue.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
