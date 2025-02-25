import "./App.css";
import Card from "./components/Card/Card";
import { Button } from "./components/ui/button";
import Modal from "./components/ui/Modal";
// import { Button } from "./components/ui/button";
import { productList } from "./lib/fakeData";

function App() {
  const renderproductList = productList.map((product) => (
    <Card key={product.id} product={product} />
  ));
  const openModal = () => {
    document.querySelector("dialog")?.showModal();
  };
  const closeModal = () => {
    document.querySelector("dialog")?.close();
  };
  return (
    <main className="container mx-auto">
      {/* <Button>Click me</Button> */}
      <div className="p-2 m-5 grid grid-cols-1 gap-2 rounded-md md:grid-cols-2 md:gap-4 lg:grid-cols-3 xl:grid-cols-4">
        {renderproductList}
      </div>
      <Button
        className=" m-10 mx-auto flex p-[10px]  "
        onClick={() => openModal()}
      >
        Open Modal
      </Button>
      <Modal closeModal={closeModal} />
    </main>
  );
}

export default App;
