import { FC, useMemo, useCallback, useEffect, useRef, ReactNode } from "react";
import styles from "./dialog.module.scss";

import clsx from "clsx";

interface DialogModalProps {
  open: boolean;
  locked?: boolean;
  onClose: () => void;
  children?: ReactNode;
}

/* 
    This modal window uses native HTML dialog element. Two params is required = open: boolean flag and onCLose: () => togle the open flag 
    Optional param - locked allows you to forbid user to close the modal until he does required things
*/

export const DialogModal: FC<DialogModalProps> = ({
  open,
  locked,
  onClose,
  children,
}) => {
  const modalRef = useRef<HTMLDialogElement>(null);

  // work out which classes should be applied to the dialog element
  const dialogClasses = useMemo(() => {
    const classes = clsx(styles["modal"], !open && styles["modal--closing"]);

    return classes;
  }, [open]);

  // Eventlistener: trigger onclose when cancel detected
  const onCancel = useCallback(
    (e: any) => {
      e.preventDefault();
      if (!locked) onClose();
    },
    [locked, onClose]
  );

  // Eventlistener: trigger onclose when click outside
  const onClickOutside = useCallback(
    ({ target }: React.MouseEvent<HTMLDialogElement>) => {
      const { current: el } = modalRef;
      if (target === el && !locked) onClose();
    },
    [locked, onClose]
  );

  // Eventlistener: trigger close click on anim end
  const onAnimEnd = useCallback(() => {
    const { current: el } = modalRef;
    if (!open) el && el.close();
  }, [open]);

  // when open changes run open/close command
  useEffect(() => {
    const { current: el } = modalRef;
    if (open) el && el.showModal();
  }, [open]);

  return (
    <dialog
      ref={modalRef}
      className={dialogClasses}
      onClose={onClose}
      onCancel={onCancel}
      onClick={onClickOutside}
      onAnimationEnd={onAnimEnd}
    >
      <div className={styles["modal__container"]}>{children}</div>
    </dialog>
  );
};
