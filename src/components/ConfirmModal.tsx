import { useModal } from "../hooks/useModal";
import styles from "./confirmmodal.module.css";

export interface IConfirmModal {
  confirmText?: string;
  closeText?: string;
  message: string;
  onConfirm: () => void;
  onClose: () => void;
  modalClassName?: string;
  messageClassName?: string;
  buttonsClassName?: string;
  primaryBtnClassName?: string;
  closeBtnClassName?: string;
}

const ConfirmModal = ({
  confirmText,
  closeText,
  message,
  onConfirm,
  onClose,
  modalClassName,
  messageClassName,
  buttonsClassName,
  primaryBtnClassName,
  closeBtnClassName,
}: IConfirmModal) => {
  const { options } = useModal();
  const { actionClassName, theme } = options;

  return (
    <div
      className={`${styles.confirmContainer} ${
        modalClassName ? modalClassName : ""
      }`}
    >
      <p
        className={`${styles.message} ${
          messageClassName ? messageClassName : ""
        }`}
      >
        {message}
      </p>
      <div
        className={`${styles.buttonContainer} ${
          buttonsClassName ? buttonsClassName : ""
        }`}
      >
        <button
          className={`${styles.confirmButton} ${
            theme === "dark" ? styles.darkConfirmButton : ""
          } ${actionClassName ? actionClassName : ""} ${
            primaryBtnClassName ? primaryBtnClassName : ""
          }`}
          onClick={onConfirm}
        >
          {confirmText ? confirmText : "Confirm"}
        </button>
        <button
          className={`${styles.cancelButton} ${
            theme === "dark" ? styles.darkCancelButton : ""
          } ${closeBtnClassName ? closeBtnClassName : ""}`}
          onClick={onClose}
        >
          {closeText ? closeText : "Cancel"}
        </button>
      </div>
    </div>
  );
};

export default ConfirmModal;
