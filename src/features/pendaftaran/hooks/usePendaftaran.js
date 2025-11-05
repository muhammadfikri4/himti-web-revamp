import { useState, useEffect, useCallback } from 'react';
import {
  getRegistrationTypes,
  createEventRegistration,
} from '../api/pendaftaranService';

export const usePendaftaran = () => {
  const [registrationTypes, setRegistrationTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [formStatus, setFormStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    try {
      const result = await getRegistrationTypes();
      const formattedData = result.data.map((item) => ({
        id: item.id,
        title: item.name,
        category: item.type,
        image: item.image || `/images/himti-logo.png`,
        description:
          item.description ||
          `Pendaftaran untuk ${item.name} periode ${item.year}.`,
        status: item.isActive ? 'Dibuka' : 'Ditutup',
        type: item.type,
        eventId: item.eventId,
      }));
      setRegistrationTypes(formattedData);
    } catch (err) {
      setError('Gagal memuat daftar pendaftaran.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const submitRegistration = async (formData) => {
    setIsSubmitting(true);
    setFormStatus({ type: '', message: '' });

    const payload = new FormData();

    // data Field yang dibutuhin API
    payload.append('name', formData.name);
    payload.append('class', formData.class);
    payload.append('registrationTypeId', formData.registrationTypeId);

    if (formData.image) {
      payload.append('image', formData.image);
    }

    if (formData.generation && !isNaN(Number(formData.generation))) {
      payload.append('generation', Number(formData.generation));
    }

    if (formData.eventId) {
      payload.append('eventId', formData.eventId);
    } else {
      setFormStatus({
        type: 'error',
        message: 'Gagal memuat eventId. Coba refresh halaman.',
      });
      setIsSubmitting(false);
      return; // Hentikan submit jika eventId tidak ada
    }

    console.log('Payload API KELAR');
    for (let [key, value] of payload.entries()) {
      console.log(`  ${key}:`, value);
    }

    try {
      await createEventRegistration(payload);
      setFormStatus({ type: 'success', message: 'Anda berhasil terdaftar!' });
    } catch (err) {
      console.error('Error response:', err.response?.data);
      const errorMessage =
        err.response?.data?.message || 'Gagal mendaftar. Silakan coba lagi.';
      setFormStatus({ type: 'error', message: errorMessage });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    loading,
    error,
    registrationTypes,
    selectedEvent,
    setSelectedEvent,
    formStatus,
    isSubmitting,
    submitRegistration,
    refetch: fetchEvents,
  };
};