import React from "react";
import { usePendaftaran } from "../hooks/usePendaftaran";
import LoadingStatus from "../../../components/LoadingStatus";
import ErrorStatus from "../../../components/ErrorStatus";
import PendaftaranSection from "../components/PendaftaranSection";

const PendaftaranPage = () => {
  const {
    loading,
    error,
    registrationTypes,
    selectedEvent,
    setSelectedEvent,
    formStatus,
    isSubmitting,
    submitRegistration,
    refetch,
    setFormStatus,
  } = usePendaftaran();

  if (loading) return <LoadingStatus message="Memuat Pendaftaran..." />;
  if (error) return <ErrorStatus message={error} onRetry={refetch} />;

  return (
    <PendaftaranSection
      registrationTypes={registrationTypes}
      selectedEvent={selectedEvent}
      setSelectedEvent={setSelectedEvent}
      submitRegistration={submitRegistration}
      isSubmitting={isSubmitting}
      formStatus={formStatus}
      setFormStatus={setFormStatus}
    />
  );
};

export default PendaftaranPage;
