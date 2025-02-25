import "./App.css";
import Card from "./components/Card/Card";
import { Button } from "./components/ui/button";
import Input from "./components/ui/Input";
import Modal from "./components/ui/Modal";
// import { Button } from "./components/ui/button";
import { formInputsList, productList } from "./lib/fakeData";

function App() {
  const renderproductList = productList.map((product) => (
    <Card key={product.id} product={product} />
  ));
  const renderInputList = formInputsList.map((input) => {
    return (
      <div key={input.id} className=" flex flex-col">
        <label
          className=" mb-2 text-sm font-medium text-gray-700"
          htmlFor={input.id}
        >
          {input.label}
        </label>
        <Input
          placeholder={input.name}
          id={input.id}
          name={input.name}
          type={input.type}
        />
      </div>
    );
  });
  const openModal = () => {
    document.querySelector("dialog")?.showModal();
  };

  return (
    <main className="container">
      <Button
        className=" m-10 mx-auto flex p-[10px]  "
        onClick={() => openModal()}
      >
        Open Modal
      </Button>
      {/* <Button>Click me</Button> */}
      <div className="p-2 m-5 grid grid-cols-1 gap-2 rounded-md md:grid-cols-2 md:gap-4 lg:grid-cols-3 xl:grid-cols-4">
        {renderproductList}
      </div>

      <Modal>{renderInputList}</Modal>
    </main>
  );
}

export default App;
