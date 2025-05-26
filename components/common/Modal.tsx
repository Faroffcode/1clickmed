
import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 transition-opacity duration-300 ease-in-out" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="bg-slate-800 rounded-lg shadow-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto transform transition-all duration-300 ease-in-out scale-95 opacity-0 animate-modalShow">
        <div className="flex justify-between items-center mb-4">
          <h2 id="modal-title" className="text-xl font-semibold text-slate-100">{title}</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-200 text-2xl transition-colors"
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>
        {children}
      </div>
      {/* Fix: Replaced <style jsx global> with standard <style> tag for animation definitions */}
      <style>
        {`
          @keyframes modalShow {
            to {
              opacity: 1;
              transform: scale(1);
            }
          }
          .animate-modalShow {
            animation: modalShow 0.3s forwards;
          }
        `}
      </style>
    </div>
  );
};

export default Modal;