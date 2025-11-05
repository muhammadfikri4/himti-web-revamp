/* eslint-disable react/prop-types */
import React from "react";
import Lottie from "lottie-react";
import { motion, AnimatePresence } from "framer-motion";
import { Poppins } from "../../../components/ui/Text";
import successAnimation from "../../../core/assets/animation/succes.json";
import { ExternalLink } from "lucide-react";

export const SuccessModal = ({
  onClose,
  show,
  title = "Pendaftaran Berhasil!",
  link, 
}) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="flex flex-col items-center rounded-2xl bg-white p-8 text-center shadow-2xl max-w-md w-full"
          >
            <Lottie
              animationData={successAnimation}
              loop={true}
              className="w-48 h-48 -mt-6"
            />

            <h3 className="mb-2 text-2xl font-bold text-gray-900 -mt-4">
              {title}
            </h3>

            <Poppins className="mb-6 text-gray-600 ">
              <p>Selamat! Pendaftaran Anda berhasil.</p>
              <p>
                <i>Dapatkan informasi penting dan update terbaru dengan bergabung ke grup WhatsApp resmi di bawah ini.</i>
              </p>
            </Poppins>

          {link && (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                onClose(); 
                setTimeout(() => 100); 
              }}
              className="mb-4 inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-5 py-3 rounded-lg transition-all duration-200 shadow-sm"
            >
              <ExternalLink size={18} />
              Gabung Grup WhatsApp
            </a>
          )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SuccessModal;
