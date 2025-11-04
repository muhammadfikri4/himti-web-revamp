import { useState } from 'react';
import { getRegistrationTypes, createEventRegistration } from '../api/pendaftaranService';

export const usePendaftaran = () => {
  const [registrationTypes, setRegistrationTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [formStatus, setFormStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fungsi manual untuk mengambil data pendaftaran
  const fetchEvents = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await getRegistrationTypes();
      const formattedData = result.data.map(item => ({
        id: item.id,
        title: item.name,
        category: item.type,
        image: item.image || `/images/himti-logo.png`,
        description: item.description || `Pendaftaran untuk ${item.name} periode ${item.year}.`,
        status: item.isActive ? "Dibuka" : "Ditutup",
        type: item.type,
      }));
      setRegistrationTypes(formattedData);
    } catch (err) {
      setError("Gagal memuat daftar pendaftaran.");
    } finally {
      setLoading(false);
    }
  };

  // Fungsi manual untuk submit form
  const submitRegistration = async (formData) => {
    setIsSubmitting(true);
    setFormStatus({ type: '', message: '' });

    const payload = {
      ...formData,
      generation: formData.generation ? Number(formData.generation) : undefined,
    };

    try {
      await createEventRegistration(payload);
      setFormStatus({ type: 'success', message: 'Anda berhasil terdaftar!' });
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Gagal mendaftar. Silakan coba lagi.';
      setFormStatus({ type: 'error', message: errorMessage });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    registrationTypes,
    loading,
    error,
    selectedEvent,
    setSelectedEvent,
    formStatus,
    isSubmitting,
    submitRegistration,
    fetchEvents, 
  };
};
