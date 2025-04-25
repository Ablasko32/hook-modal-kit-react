import React, { useEffect, useRef, useState } from "react";
import { ModalContext } from "./ModalContext";
import { createPortal } from "react-dom";
import ConfirmModal, { IConfirmModal } from "../components/ConfirmModal";
import InfoModal, { IInfoModal } from "../components/InfoModal";
import styles from "../styles/modal.module.css";

export interface ModalOptions {
  theme?: "light" | "dark";
  defaultPadding?: boolean;
  bgClassName?: string;
  modalClassName?: string;
  closeClassName?: string;
  actionClassName?: string;
  customCloseIcon?: React.ReactNode;
}

const DEFAULT_OPTIONS = {
  defaultPadding: "20px",
};

/**
 *
 * @description Needs to be used at the top level of the app. Provides modal context to all children
 * and enables usage of the `useModal` hook.
 * @example
 * <ModalProvider>
 * <App/>
 * <ModalProvider>
 */
export const ModalProvider = ({
  children,
  options = {
    defaultPadding: true,
  },
}: {
  children: React.ReactNode;
  options?: ModalOptions;
}) => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [content, setContent] = useState<React.ReactNode | null>(null);
  const [isClosing, setClosing] = useState<boolean>(false);

  const backgroundRef = useRef<HTMLDivElement>(null);

  const mergedOptions = {
    ...DEFAULT_OPTIONS,
    ...options,
  };

  const {
    bgClassName,
    closeClassName,
    modalClassName,
    theme,
    customCloseIcon,
    defaultPadding,
  } = mergedOptions;

  /**
   * @description Displays a generic modal. Accepts a React node that will be rendered inside.
   *
   * @param {React.ReactNode} content - The content to render inside the modal.
   * @returns {void}
   *
   * @example
   * openModal(<p>This is a modal</p>);
   */

  const openModal = (content: React.ReactNode): void => {
    setContent(content);
    setOpen(true);
  };

  /**
   * @description Closes the currently open modal and resets content to null.
   * @returns {void}
   */
  const closeModal = (): void => {
    setClosing(true);
    setTimeout(() => {
      setOpen(false);
      setContent(null);
      setClosing(false);
    }, 100);
  };

  /**
   * @description Displays a confirmation modal with a message and confirm/close buttons.
   *
   * @param {string} message - The message to display in the confirmation modal.
   * @param {() => void} onConfirm - Callback to trigger when the confirm button is clicked.
   * @param {IConfirmModal} [options] - Optional configuration for customizing modal appearance.
   * @returns {void}
   *
   * @example
   * showConfirm("Are you sure?", () => console.log("Confirmed"));
   */

  const showConfirm = (
    message: string,
    onConfirm: () => void,
    options?: IConfirmModal
  ): void => {
    const ConfirmComponent = (
      <ConfirmModal
        {...options}
        onClose={closeModal}
        message={message}
        onConfirm={onConfirm}
      />
    );

    openModal(ConfirmComponent);
  };

  /**
   * @description Displays an informational modal with a message and a dismiss button.
   *
   * @param {string} message - The message to display in the info modal.
   * @param {IInfoModal} [options] - Optional configuration for customizing modal appearance.
   * @returns {void}
   *
   * @example
   * showInfo("Changes saved successfully.");
   */
  const showInfo = (message: string, options?: IInfoModal): void => {
    const InfoComponent = (
      <InfoModal onClose={closeModal} message={message} {...options} />
    );
    openModal(InfoComponent);
  };

  // Used to handle closing modal on outside click event
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (e.target === backgroundRef.current) {
        closeModal();
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  return (
    <ModalContext
      value={{ openModal, closeModal, showConfirm, showInfo, options }}
    >
      {children}
      <>
        {isOpen &&
          createPortal(
            <div
              className={`${styles.modalContainer} ${
                isClosing ? styles.closeModalContainer : ""
              } ${bgClassName ? bgClassName : ""} ${
                theme === "dark" ? styles.darkModalContainer : ""
              }`}
              ref={backgroundRef}
            >
              <div
                style={{ padding: defaultPadding ? "20px" : "0px" }}
                className={`${styles.modal} ${
                  isClosing ? styles.closeModal : ""
                } ${modalClassName ? modalClassName : ""} ${
                  theme === "dark" ? styles.darkModal : ""
                } `}
              >
                {content}
                <button
                  className={`${styles.closeButton} ${
                    closeClassName ? closeClassName : ""
                  } ${theme === "dark" ? styles.darkCloseButton : ""}`}
                  onClick={closeModal}
                >
                  {customCloseIcon ?? (
                    <svg
                      width="20px"
                      height="20px"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="style=stroke">
                        <g id="close">
                          <path
                            id="vector (Stroke)"
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M6.21991 6.21479C6.51281 5.92189 6.98768 5.92189 7.28057 6.21479L17.7854 16.7196C18.0783 17.0125 18.0783 17.4874 17.7854 17.7803C17.4925 18.0732 17.0177 18.0732 16.7248 17.7803L6.21991 7.27545C5.92702 6.98255 5.92702 6.50768 6.21991 6.21479Z"
                            fill={theme === "dark" ? "#f9fafb" : "#1a1a1a"}
                          />
                          <path
                            id="vector (Stroke)_2"
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M17.7853 6.21479C18.0782 6.50769 18.0782 6.98256 17.7853 7.27545L7.28038 17.7802C6.98749 18.0731 6.51261 18.0731 6.21972 17.7802C5.92683 17.4873 5.92683 17.0124 6.21973 16.7195L16.7247 6.21478C17.0176 5.92189 17.4924 5.9219 17.7853 6.21479Z"
                            fill={theme === "dark" ? "#f9fafb" : "#1a1a1a"}
                          />
                        </g>
                      </g>
                    </svg>
                  )}
                </button>
              </div>
            </div>,
            document.body
          )}
      </>
    </ModalContext>
  );
};
