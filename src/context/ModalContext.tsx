import React, { createContext } from "react";
import { ModalOptions } from "./ModalProvider";
import { IConfirmModal } from "../components/ConfirmModal";
import { IInfoModal } from "../components/InfoModal";

export interface IModalContext {
  openModal: (content: React.ReactNode) => void;
  closeModal: () => void;
  showConfirm: (
    message: string,
    onConfirm: () => void,
    options?: Partial<Omit<IConfirmModal, "message" | "onClose" | "onConfirm">>
  ) => void;
  showInfo: (
    message: string,
    options?: Partial<Omit<IInfoModal, "message" | "onClose">>
  ) => void;
  options: ModalOptions;
}

export const ModalContext = createContext<IModalContext | null>(null);
