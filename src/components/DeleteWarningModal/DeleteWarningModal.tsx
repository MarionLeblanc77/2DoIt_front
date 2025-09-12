import { useEffect, useRef } from "react";
import "./DeleteWarningModal.scss";

interface DeleteWarningModalProps {
  text: string;
  action: () => void;
  setter: (value: boolean) => void;
  state: boolean;
}

export default function DeleteWarningModal({
  text,
  action,
  setter,
  state,
}: DeleteWarningModalProps) {
  const confirmButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const modal = document.querySelector(".delete-warning-modal");
      if (modal && !modal.contains(e.target as Node)) {
        setter(false);
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setter(false);
      }
    };
    const timer = setTimeout(() => {
      if (confirmButtonRef.current) {
        confirmButtonRef.current.focus();
      }
    }, 10);
    const clickTimer = setTimeout(() => {
      if (state) {
        document.addEventListener("click", handleClick);
      }
    }, 10);
    document.addEventListener("keydown", handleEscape);
    document.querySelector(".app")?.classList.add("modal-open");

    return () => {
      clearTimeout(timer);
      clearTimeout(clickTimer);
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("click", handleClick);
      document.querySelector(".app")?.classList.remove("modal-open");
    };
  }, [setter, state]);

  return (
    <div
      className="delete-warning-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <h2 className="delete-warning-modal-title">{text}</h2>
      <div className="delete-warning-modal-buttons">
        <button
          ref={confirmButtonRef}
          type="button"
          className="delete-warning-modal-button button-volume delete-warning-modal-button--confirm"
          onClick={() => {
            action();
            setter(false);
          }}
        >
          Yes
        </button>
        <button
          type="button"
          className="delete-warning-modal-button button-volume delete-warning-modal-button--cancel"
          onClick={() => {
            setter(false);
          }}
        >
          No
        </button>
      </div>
    </div>
  );
}

