import React from "react";
import { Poppins } from "../../../components/ui/Text";
import EventCard from "./EventCard";
import PendaftaranForm from "./PendaftaranForm";

const PendaftaranSection = ({
  registrationTypes,
  selectedEvent,
  setSelectedEvent,
  submitRegistration,
  isSubmitting,
  formStatus,
  setFormStatus,
}) => {
  return (
    <section className="py-20 animate-fade-in-up">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="mb-1 text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-gray-900 md:text-5xl">
            <span>Pendaftaran Acara</span>{" "}
            <span className="py-2 text-transparent bg-clip-text leading-[2.5rem] sm:leading-[3rem] bg-gradient-to-r from-yellow-400 to-blue-800 lg:inline">
              & Kegiatan HIMTI
            </span>
          </h1>
          <Poppins className="mt-4 max-w-3xl mx-auto text-lg text-gray-600">
            Jangan lewatkan kesempatan untuk berkembang. Daftarkan diri Anda
            pada berbagai seminar, lomba, dan kegiatan HIMTI lainnya.
          </Poppins>
        </div>

        {/* Event Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {registrationTypes.length > 0 ? (
            registrationTypes.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onDaftarClick={() => setSelectedEvent(event)}
              />
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500">
              Belum ada event yang dibuka saat ini.
            </div>
          )}
        </div>
      </div>

      {/* Modal Form */}
      {selectedEvent && (
        <PendaftaranForm
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
          onSubmit={submitRegistration}
          isSubmitting={isSubmitting}
          formStatus={formStatus}
          setFormStatus={setFormStatus}
        />
      )}
    </section>
  );
};

export default PendaftaranSection;
