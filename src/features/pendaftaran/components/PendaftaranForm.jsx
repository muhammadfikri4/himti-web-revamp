/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { X, AlertTriangle, LoaderCircle, UploadCloud } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion'; 
import { SuccessModal } from '../../../components/ui/SuccessModal'; 

const PendaftaranForm = ({
  event,
  onClose,
  onSubmit,
  isSubmitting,
  formStatus,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    class: '',
    generation: '',
    image: null,
    registrationTypeId: event.id,
    eventId: event.eventId,
  });

  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      const file = files[0];
      setFormData((prev) => ({ ...prev, [name]: file }));

      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = (e) => {
    e.preventDefault();
    setImagePreview(null);
    setFormData((prev) => ({ ...prev, image: null }));
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const isClassRequired =
    event.type === 'BOOTCAMP' || event.type === 'LEARNING_GROUP';
  const isBootcamp = event.type === 'BOOTCAMP';

  const textVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
    exit: { y: 20, opacity: 0 },
  };

  return (
    <>
      <SuccessModal
        show={formStatus.type === 'success'}
        message={formStatus.message}
        onClose={onClose}
      />

      <AnimatePresence>
        {formStatus.type !== 'success' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 animate-fade-in">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full max-w-lg max-h-[90vh] overflow-y-auto bg-white rounded-lg shadow-xl"
            >
              <div className="p-6">
                <div className="flex items-center justify-between border-b pb-4">
                  <h2 className="text-xl font-bold text-gray-900">
                    Form Pendaftaran: {event.title}
                  </h2>
                  <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X />
                  </button>
                </div>

                <form onSubmit={handleFormSubmit} className="mt-6 space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium">
                      Nama Lengkap
                    </label>
                    <Input
                      name="name"
                      id="name"
                      onChange={handleChange}
                      value={formData.name}
                      required
                    />
                  </div>

                  {isClassRequired && (
                    <div>
                      <label
                        htmlFor="class"
                        className="block text-sm font-medium"
                      >
                        Kelas
                      </label>
                      <Input
                        name="class"
                        id="class"
                        placeholder="contoh: TI-01-A1"
                        onChange={handleChange}
                        value={formData.class}
                        required={isClassRequired}
                      />
                    </div>
                  )}

                  <div>
                    <label
                      htmlFor="generation"
                      className="block text-sm font-medium"
                    >
                      Angkatan
                    </label>
                    <Input
                      name="generation"
                      id="generation"
                      type="number"
                      placeholder="contoh: 2024"
                      onChange={handleChange}
                      value={formData.generation}
                      required
                    />
                  </div>

                  {isBootcamp && (
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Upload Bukti Pembayaran
                      </label>

                      {imagePreview ? (
                        <div className="relative w-full p-4 border border-gray-300 rounded-md">
                          <img
                            src={imagePreview}
                            alt="Preview Bukti Pembayaran"
                            className="w-full h-auto max-h-60 object-contain rounded-md"
                          />
                          <button
                            onClick={handleRemoveImage}
                            className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
                            aria-label="Hapus gambar"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ) : (
                        <label
                          htmlFor="image-upload"
                          className="relative flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <UploadCloud
                              size={40}
                              className="text-gray-400 mb-3"
                            />
                            <p className="mb-2 text-sm text-gray-500">
                              <span className="font-semibold">Klik untuk</span>{' '}
                              atau seret file
                            </p>
                            <p className="text-xs text-gray-500">
                              PNG, JPG, atau JPEG
                            </p>
                            <input
                              id="image-upload"
                              name="image"
                              type="file"
                              className="hidden"
                              onChange={handleFileChange}
                              accept="image/png, image/jpeg, image/jpg"
                              required={!imagePreview}
                              ref={fileInputRef}
                            />
                          </div>
                        </label>
                      )}
                    </div>
                  )}

                  {formStatus.type === 'error' && (
                    <div className="flex items-center gap-2 p-3 text-sm text-red-800 bg-red-100 rounded-md">
                      <AlertTriangle size={20} />
                      {formStatus.message}
                    </div>
                  )}

                  <div className="pt-4">
                    <Button
                      type="submit"
                      className="w-full flex items-center justify-center overflow-hidden"
                      disabled={isSubmitting}
                      size="lg"
                    >
                      <AnimatePresence mode="wait" initial={false}>
                        {isSubmitting ? (
                          <motion.span
                            key="loading"
                            variants={textVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            transition={{ duration: 0.2 }}
                            className="flex items-center justify-center"
                          >
                            <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                            Mengirim...
                          </motion.span>
                        ) : (
                          <motion.span
                            key="default"
                            variants={textVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            transition={{ duration: 0.2 }}
                          >
                            Kirim Formulir
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </Button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PendaftaranForm;
