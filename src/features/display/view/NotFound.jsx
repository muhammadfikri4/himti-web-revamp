import React from "react";
import { StatusDisplay } from "../../../components/StatusNotFound";
import notFoundAnimation from "../../../core/assets/animation/not-found.json";

export default function NotFound() {
  return (
    <StatusDisplay
      animationData={notFoundAnimation}
      title="404 Not Found"
      message="Halaman ini tidak ditemukan sepertinya anda tersesat!."
    />
  );
}
