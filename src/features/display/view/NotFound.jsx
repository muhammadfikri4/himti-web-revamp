import { StatusDisplay } from "../../global/components/StatusDisplay";
import notFoundAnimation from "../../../core/assets/lottie-.json";

export default function NotFound() {
  return (
    <StatusDisplay
      animationData={notFoundAnimation}
      title="404 Not Found"
      message="Halaman ini tidak ditemukan sepertinya anda tersesat!."
    />
  );
}
