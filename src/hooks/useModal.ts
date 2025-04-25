import { useContext } from "react";
import { ModalContext } from "../context/ModalContext";

/**
 *
 * @description Needs to be used inside ModalProvider, gives acces to openModal, closeModal, showConfirm and showInfo functions
 * @example const { openModal, closeModal, showConfirm, showInfo } = useModal();
 */
export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal hook used outside of context provider");
  }

  return context;
};
