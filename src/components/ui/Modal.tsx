import { Button } from "./button";
interface ModalProps {
  closeModal: () => void;
}
const Modal = ({ closeModal }: ModalProps) => {
  return (
    <dialog className="flex w-[400px] flex-col gap-5 rounded-2xl bg-white p-[20px] shadow-lg">
      <header className="text-xl font-bold">Add New Product</header>
      <main></main>
      <footer className="flex items-center justify-center gap-5">
        <Button
          className="w-full bg-indigo-700 p-[10px] hover:bg-indigo-500 focus-visible:ring-indigo-700"
          onClick={() => closeModal()}
        >
          Submit
        </Button>
        <Button
          className="w-full bg-gray-700 p-[10px] hover:bg-gray-500 focus-visible:ring-gray-700"
          onClick={() => closeModal()}
        >
          Cancel
        </Button>
      </footer>
    </dialog>
  );
};

export default Modal;
