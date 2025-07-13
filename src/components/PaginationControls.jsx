// components/PaginationControls.jsx
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function PaginationControls({ offset, dataLength, onPrevious, onNext }) {
  const currentPage = Math.floor(offset / 20) + 1;
  const isPreviousDisabled = offset === 0;
  const isNextDisabled = !dataLength || dataLength < 20;

  return (
    <div className="flex justify-center gap-4 mt-4 sm:mt-6">
      <span className="text-[#F97316] font-medium self-center mr-4 text-sm sm:text-base">
        Página {currentPage}
      </span>
      <button
        onClick={onPrevious}
        disabled={isPreviousDisabled}
        className="bg-[#F97316] text-white py-1 sm:py-2 px-3 sm:px-4 rounded hover:bg-opacity-80 hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
        title={isPreviousDisabled ? "No hay más emisoras anteriores" : "Página anterior"}
      >
        <FaArrowLeft className="inline mr-1" />
        Anterior
      </button>
      <button
        onClick={onNext}
        disabled={isNextDisabled}
        className="bg-[#F97316] text-white py-1 sm:py-2 px-3 sm:px-4 rounded hover:bg-opacity-80 hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
        title={isNextDisabled ? "No hay más emisoras siguientes" : "Página siguiente"}
      >
        Siguiente
        <FaArrowRight className="inline ml-1" />
      </button>
    </div>
  );
}
