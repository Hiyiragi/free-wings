import { useState } from "react";

export default function useDialog(defaultState?: boolean) {
  const [isOpen, setIsOpen] = useState(defaultState ?? false);
  const open = () => {
    setIsOpen(true);
  };
  const close = () => {
    setIsOpen(false);
  };
  const toggle = () => {
    setIsOpen((isOpen) => !isOpen);
  };

  return { isOpen, open, close, toggle };
}
