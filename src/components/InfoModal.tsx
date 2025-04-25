import { useModal } from "../hooks/useModal";
import styles from "./infomodal.module.css";

export interface IInfoModal {
  message: string;
  actionText?: string;
  onClose: () => void;
  messageClassName?: string;
  dismissClassName?: string;
  modalClassName?: string;
}

const InfoModal = ({
  message,
  onClose,
  messageClassName,
  dismissClassName,
  modalClassName,
  actionText,
}: IInfoModal) => {
  const { options } = useModal();

  const { actionClassName, theme } = options;

  return (
    <div
      className={`${styles.infoModal} ${modalClassName ? modalClassName : ""}`}
    >
      <p className={`${messageClassName ? messageClassName : ""}`}>{message}</p>
      <button
        className={` ${styles.dismissButton} ${
          actionClassName ? actionClassName : ""
        } ${theme === "dark" ? styles.darkDismissButton : ""} ${
          dismissClassName ? dismissClassName : ""
        }`}
        onClick={onClose}
      >
        {actionText ? actionText : "Ok"}
      </button>
    </div>
  );
};

export default InfoModal;
