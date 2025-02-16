'use client';

import { useState, useEffect } from 'react';
import { paymentService } from '@/app/utils/api';

export default function AdminPaymentsPage() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [confirmationNotes, setConfirmationNotes] = useState('');
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    loadPayments();
  }, []);

  const loadPayments = async () => {
    try {
      const response = await paymentService.getPendingPayments();
      setPayments(response.data);
    } catch (error) {
      setError('Failed to load payments');
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmation = async (registrationId, status) => {
    try {
      setProcessing(true);
      await paymentService.confirmPayment(registrationId, {
        status,
        notes: confirmationNotes
      });
      
      // Refresh the payments list
      await loadPayments();
      
      // Reset form
      setSelectedPayment(null);
      setConfirmationNotes('');
    } catch (error) {
      setError('Failed to process payment confirmation');
    } finally {
      setProcessing(false);
    }
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-600">{error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Payment Confirmations</h1>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Event
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Proof
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Notes
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {payments.map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 text-sm">
                    <div className="max-w-[200px] truncate">{payment.event_title}</div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm truncate max-w-[150px]">{payment.user_name}</div>
                    <div className="text-xs text-gray-500 truncate max-w-[150px]">{payment.user_email}</div>
                  </td>
                  <td className="px-4 py-4 text-sm whitespace-nowrap">
                    Rp {payment.amount_paid.toLocaleString()}
                  </td>
                  <td className="px-4 py-4 text-sm whitespace-nowrap">
                    {payment.payment_proof_url && (
                      <a
                        href={payment.payment_proof_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-orange-500 hover:text-orange-600"
                      >
                        View
                      </a>
                    )}
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm text-gray-900 max-w-[200px] truncate">
                      {payment.payment_notes}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    {selectedPayment?.id === payment.id ? (
                      <div className="space-y-2">
                        <textarea
                          value={confirmationNotes}
                          onChange={(e) => setConfirmationNotes(e.target.value)}
                          placeholder="Add confirmation notes..."
                          className="w-full px-3 py-2 border rounded-lg text-sm"
                          rows="2"
                        />
                        <div className="flex flex-wrap gap-2">
                          <button
                            onClick={() => handleConfirmation(payment.id, 'approve')}
                            disabled={processing}
                            className="bg-green-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-green-700 disabled:bg-gray-400"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleConfirmation(payment.id, 'reject')}
                            disabled={processing}
                            className="bg-red-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-700 disabled:bg-gray-400"
                          >
                            Reject
                          </button>
                          <button
                            onClick={() => setSelectedPayment(null)}
                            disabled={processing}
                            className="bg-gray-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-gray-600 disabled:bg-gray-400"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => setSelectedPayment(payment)}
                        className="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-orange-600"
                      >
                        Review
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {payments.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No pending payments to review
          </div>
        )}
      </div>
    </div>
  );
}
