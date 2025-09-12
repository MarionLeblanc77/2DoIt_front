import { createContext, useContext, useState, ReactNode, useMemo } from "react";
import { createPortal } from "react-dom";
import DeleteWarningModal from "../components/DeleteWarningModal/DeleteWarningModal";
import { c } from "vite/dist/node/types.d-aGj9QkWt";

interface ModalData {
  text: string;
  action: () => void;
}

interface ModalContextType {
  openModal: (data: ModalData) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [modalData, setModalData] = useState<ModalData | null>(null);

  const openModal = (data: ModalData) => {
    setModalData(data);
  };

  const closeModal = () => {
    setModalData(null);
  };

  const contextValue = useMemo(
    () => ({
      openModal,
      closeModal,
    }),
    []
  );

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
      {modalData &&
        createPortal(
          <DeleteWarningModal
            text={modalData.text}
            action={modalData.action}
            setter={closeModal}
            state={!!modalData}
          />,
          document.body
        )}
    </ModalContext.Provider>
  );
}

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within ModalProvider");
  }
  return context;
};

