import React from "react";
import { Button } from "./button";
import { ICategory, IProduct } from "@/interfaces";
interface ModalProps {
  children: React.ReactNode;
  setProduct: React.Dispatch<React.SetStateAction<IProduct>>;
  defaultProductValue: IProduct;
  closeModal: () => void;
  dialogRef: React.RefObject<HTMLDialogElement>;
  renderColorsList: JSX.Element[];
  tempColors: string[];
  colorErrorMessage: "" | JSX.Element;
  selectedCategory: { name: string; imageURL: string };
  setSelectedCategory: (category: ICategory) => void;
  title: string;
  
}
const Modal = ({
  children,
  setProduct,
  defaultProductValue,
  closeModal,
  dialogRef,

  title,
}: ModalProps) => {
  const handleTransitionEnd = () => {
    if (dialogRef.current?.classList.contains("closing")) {
      dialogRef.current?.close();
      dialogRef.current?.classList.remove("closing");
    }
  };
  const onCancel = () => {
    setProduct(defaultProductValue);
    closeModal();
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
      className=" w-[400px]  rounded-lg bg-white   shadow-md"
    >
      <main id="main" className="space-y-5 p-[30px]">
        <h3 className=" text-lg font-medium uppercase leading-6 text-gray-900">
          {title}
        </h3>
        {children}

        <div className="flex items-center justify-center gap-5">
          <Button
            type="submit"
            className="w-full rounded-lg bg-indigo-700 p-[10px] hover:bg-indigo-500 focus-visible:ring-indigo-700"
            // onClick={() => closeModal()}
          >
            Submit
          </Button>
          <Button
            type="button"
            className="w-full rounded-lg bg-gray-700 p-[10px] hover:bg-gray-500 focus-visible:ring-gray-700"
            onClick={() => onCancel()}
          >
            Cancel
          </Button>
        </div>
      </main>
    </dialog>
  );
};

export default Modal;
