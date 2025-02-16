// Default WhatsApp number for event registration
const DEFAULT_WHATSAPP_NUMBER = "6285771912060";

import Swal from 'sweetalert2';

/**
 * Redirects to WhatsApp with a pre-filled message
 * @param {string} message - The message to send
 * @param {string} phoneNumber - The phone number to send the message to (without + symbol)
 */
export const redirectToWhatsApp = (message, phoneNumber = DEFAULT_WHATSAPP_NUMBER) => {
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, '_blank');
};

/**
 * Creates a registration message for an event and redirects to WhatsApp
 * @param {object} event - The event object
 */
export const handleEventRegistration = async (event) => {
  try {
    const result = await Swal.fire({
      title: 'Konfirmasi Pendaftaran',
      html: `
        <div class="text-left">
          <p class="mb-2"><strong>Event:</strong> ${event.title}</p>
          <p class="mb-2"><strong>Tanggal:</strong> ${new Date(event.date).toLocaleDateString()}</p>
          <p class="mb-2"><strong>Waktu:</strong> ${event.time}</p>
          <p class="mb-2"><strong>Lokasi:</strong> ${event.location}</p>
          <p><strong>Biaya:</strong> ${event.price === 0 ? 'Gratis' : `Rp ${event.price.toLocaleString()}`}</p>
        </div>
      `,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#f97316', // orange-500
      cancelButtonColor: '#6b7280', // gray-500
      confirmButtonText: 'Ya, Daftar Sekarang',
      cancelButtonText: 'Batal'
    });

    if (result.isConfirmed) {
      // Format the WhatsApp message
      const message = `Halo, saya ingin mendaftar untuk event:
      
*${event.title}*
Tanggal: ${new Date(event.date).toLocaleDateString()}
Waktu: ${event.time}
Lokasi: ${event.location}
Biaya: ${event.price === 0 ? 'Gratis' : `Rp ${event.price.toLocaleString()}`}

Mohon informasi lebih lanjut mengenai cara pendaftaran. Terima kasih!`;

      // WhatsApp API URL
      const waURL = `https://wa.me/6285156465400?text=${encodeURIComponent(message)}`;

      // Show loading state
      Swal.fire({
        title: 'Mengarahkan ke WhatsApp...',
        text: 'Mohon tunggu sebentar',
        icon: 'info',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
          // Open WhatsApp in new tab
          window.open(waURL, '_blank');
        }
      });
    }
  } catch (error) {
    console.error('Error in event registration:', error);
    Swal.fire({
      title: 'Error',
      text: 'Terjadi kesalahan saat memproses pendaftaran. Silakan coba lagi.',
      icon: 'error',
      confirmButtonColor: '#f97316', // orange-500
    });
  }
};
