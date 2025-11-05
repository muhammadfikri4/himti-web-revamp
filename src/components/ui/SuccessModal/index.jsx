/* eslint-disable react/prop-types */
import React from "react";
import Lottie from "lottie-react";
import { NavLink } from "react-router";
import { CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../Button";
import { Poppins } from "../Text";
import successAnimation from "../../../core/assets/animation/succes.json";

export const SuccessModal = ({
  message,
  onClose,
  show,
  title = "Pendaftaran Berhasil!",
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
            <Poppins className="mb-8 text-gray-600">
              {message || "Anda berhasil terdaftar!"}
            </Poppins>

            <div className="flex justify-center">
              <NavLink to="/" >
              <Button
                onClick={onClose}
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold"
                size="lg"
              >
                Yeay! Selesai, Kembali ke Beranda
              </Button>
              </NavLink>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SuccessModal;
