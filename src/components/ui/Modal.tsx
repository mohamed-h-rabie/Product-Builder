import React, { useRef } from "react";
import { Button } from "./button";
interface ModalProps {
  children: React.ReactNode;
}
const Modal = ({ children }: ModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeModal = () => {
    dialogRef.current?.classList.add("closing");
  };
  const handleTransitionEnd = () => {
    if (dialogRef.current?.classList.contains("closing")) {
      dialogRef.current?.close();
      dialogRef.current?.classList.remove("closing");
    }
  };
  return (
    <dialog
      ref={dialogRef}
      onClick={(e) => {
        if (e.target === dialogRef.current) {
          closeModal();
        }
      }}
      onTransitionEnd={handleTransitionEnd}
      className=" w-[400px]  rounded-lg bg-white p-[20px] shadow-md"
    >
      <main id="main" className="space-y-5">
        <h3 className=" text-lg font-medium leading-6 text-gray-900">
          ADD A NEW PRODUCT{" "}
        </h3>
        {children}

        <div className="flex items-center justify-center gap-5">
          <Button
            className="w-full rounded-lg bg-indigo-700 p-[10px] hover:bg-indigo-500 focus-visible:ring-indigo-700"
            onClick={() => closeModal()}
          >
            Submit
          </Button>
          <Button
            className="w-full rounded-lg bg-gray-700 p-[10px] hover:bg-gray-500 focus-visible:ring-gray-700"
            onClick={() => closeModal()}
          >
            Cancel
          </Button>
        </div>
      </main>
    </dialog>
  );
};

export default Modal;
