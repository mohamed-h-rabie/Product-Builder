import { Button } from "./button";
interface ModalProps {
  closeModal: () => void;
}
const Modal = ({ closeModal }: ModalProps) => {
  return (
    <dialog className=" w-[400px]  rounded-2xl bg-white p-[20px] shadow-lg">
      <div className="flex flex-col gap-5">
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
      </div>
    </dialog>
  );
};

export default Modal;
