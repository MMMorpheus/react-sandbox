import { FC, useState } from "react";

import "./App.css";
import { DialogModal } from "..";

export const App: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <>
      <button
        onClick={() => {
          setIsOpen(true);
        }}
      >
        Show modal
      </button>
      <DialogModal
        open={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
      >
        Hello, modal!
      </DialogModal>
    </>
  );
};
