import React, { createContext, useContext, useState, ReactNode } from "react";

interface PopupContextProps {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const PopupContext = createContext<PopupContextProps | undefined>(undefined);

export const PopupProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <PopupContext.Provider value={{ isModalOpen, openModal, closeModal }}>
      {children}
    </PopupContext.Provider>
  );
};

export const usePopup = (): PopupContextProps => {
  const context = useContext(PopupContext);
  if (!context) {
    throw new Error("usePopup must be used within a PopupProvider");
  }
  return context;
};
