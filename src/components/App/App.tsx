import { FC, useState } from "react";

import "./App.css";
import { DialogModal, ScrollProgress } from "..";

import { useLocalStorage } from "../../hooks";

export const App: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [storedValue, setValue] = useLocalStorage("key", "");
  return (
    <section>
      <ScrollProgress />
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
      <p>{storedValue}</p>
      <button
        onClick={() => {
          setValue(7);
        }}
      >
        Store value!
      </button>
    </section>
  );
};
