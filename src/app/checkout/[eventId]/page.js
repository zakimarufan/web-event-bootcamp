'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { eventService, paymentService } from '@/app/utils/api';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';

export default function CheckoutPage() {
  const { eventId } = useParams();
  const router = useRouter();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paymentProof, setPaymentProof] = useState(null);

  useEffect(() => {
    loadEvent();
  }, [eventId]);

  const loadEvent = async () => {
    try {
      setLoading(true);
      const response = await eventService.getById(eventId);
      setEvent(response.data);
    } catch (error) {
      console.error("Error loading event:", error);
      setError(
        error.response?.data?.message || "Failed to load event details"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        Swal.fire({
          title: "Error",
          text: "File size should not exceed 2MB",
          icon: "error",
          confirmButtonColor: "#f97316",
        });
        e.target.value = "";
        return;
      }
      setPaymentProof(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Show loading alert
      Swal.fire({
        title: "Processing",
        text: "Please wait while we process your registration...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      // Register for event
      const registerResponse = await eventService.register(eventId);
      console.log('Registration response:', registerResponse); // Debug log

      if (!registerResponse.data?.id) {
        throw new Error('Registration ID not received from server');
      }

      const registrationId = registerResponse.data.id;

      // For paid events, submit payment proof
      if (event.price > 0) {
        // Prepare form data for payment proof
        const formData = new FormData();
        formData.append("proof", paymentProof);

        // Submit payment proof
        await paymentService.submitProof(registrationId, formData);
      }

      // Show success message and redirect
      Swal.fire({
        title: "Success!",
        text: event.price > 0 
          ? "Registration successful! We will review your payment and notify you soon."
          : "Registration successful! You're all set for the event.",
        icon: "success",
        confirmButtonColor: "#f97316",
      }).then(() => {
        router.push("/dashboard/events");
      });
    } catch (error) {
      console.error("Error during registration:", error);
      let errorMessage = "Failed to process registration";
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      setError(errorMessage);
      Swal.fire({
        title: "Error",
        text: errorMessage,
        icon: "error",
        confirmButtonColor: "#f97316",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-32">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
              <div className="space-y-4">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                <div className="h-4 bg-gray-200 rounded w-4/6"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-32">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
            <p className="text-gray-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen pt-32">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Event Not Found
            </h2>
            <p className="text-gray-600">
              The event you are looking for does not exist.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            Checkout {event.title}
          </h2>

          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h3 className="text-xl font-semibold mb-4">Event Details</h3>
            <div className="space-y-4">
              <div>
                <p className="text-gray-600">Date</p>
                <p className="font-medium">
                  {new Date(event.date).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-gray-600">Time</p>
                <p className="font-medium">{event.time}</p>
              </div>
              <div>
                <p className="text-gray-600">Location</p>
                <p className="font-medium">{event.location}</p>
              </div>
              <div>
                <p className="text-gray-600">Price</p>
                <p className="font-medium">
                  {event.price === 0
                    ? "Free"
                    : `Rp ${event.price.toLocaleString()}`}
                </p>
              </div>
            </div>
          </div>

          {event.price > 0 && (
            <>
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h3 className="text-xl font-semibold mb-4">Payment Information</h3>
                <div className="space-y-2 mb-4">
                  <p className="font-medium">Bank Transfer Details:</p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="flex justify-between">
                      <span className="text-gray-600">Bank Name:</span>
                      <span className="font-medium">BCA</span>
                    </p>
                    <p className="flex justify-between">
                      <span className="text-gray-600">Account Number:</span>
                      <span className="font-medium">1234567890</span>
                    </p>
                    <p className="flex justify-between">
                      <span className="text-gray-600">Account Name:</span>
                      <span className="font-medium">HMSE UNIPI</span>
                    </p>
                    <p className="flex justify-between">
                      <span className="text-gray-600">Amount:</span>
                      <span className="font-medium">Rp {event.price.toLocaleString()}</span>
                    </p>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    Please transfer the exact amount to avoid payment verification issues.
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Upload Payment Proof
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Maximum file size: 2MB. Please make sure the transfer amount and account details are clearly visible.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={!paymentProof}
                  className="w-full bg-orange-500 text-white py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors disabled:bg-gray-400"
                >
                  Submit Registration & Payment
                </button>
              </form>
            </>
          )}

          {event.price === 0 && (
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
              <button
                type="submit"
                className="w-full bg-orange-500 text-white py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors"
              >
                Register Now
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
