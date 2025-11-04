import Lottie from "lottie-react";
import { Poppins } from "../ui/Text";
import PropTypes from "prop-types";

export const StatusDisplay = ({
  animationData,
  title,
  message,
  showCta = false,
}) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-4">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mt-16">
        {title}
      </h1>
      <Poppins className="mt-2 max-w-md text-gray-500">{message}</Poppins>

      <div className="w-full max-w-md mt-2">
        <Lottie animationData={animationData} loop={true} />
      </div>
    </div>
  );
};
