import { useRef, useState } from "react";
import "./App.css";
import Card from "./components/Card/Card";
import { Button } from "./components/ui/button";
import Input from "./components/ui/Input";
import Modal from "./components/ui/Modal";
// import { Button } from "./components/ui/button";
import { colors, formInputsList, productList } from "./lib/fakeData";
import { IProduct } from "./interfaces";
import { productValidations } from "./validations/productValidations";
import CircleColor from "./components/Card/CircleColor";
const defaultProductValue: IProduct = {
  title: "",
  description: "",
  imageURL: "",
  price: "",
  colors: [],
  category: {
    name: "",
    imageURL: "",
  },
};
function App() {
  //  STATES

  const [product, setProduct] = useState<IProduct>(defaultProductValue);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [tempColors, setTempColors] = useState<string[]>([]);
  const dialogRef = useRef<HTMLDialogElement>(null);

  //  HANDLERS
  console.log(errors);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
      colors: tempColors,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  };
  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const errors = productValidations(product);
    console.log(product);
    const hasErrorMessage =
      Object.values(errors).some((value) => value.length > 0) ||
      Object.values(errors).every((value) => value.length > 0);
    if (hasErrorMessage) {
      setErrors(errors);
      return;
    }
    closeModal();
    setProduct(defaultProductValue);
    setTempColors([]);
  };
  console.log(product, "after submit");
  console.log(tempColors, "after submit");
  // RENDER
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
          autoComplete="on"
          value={product[input.name]}
          onChange={onChangeHandler}
          placeholder={input.name}
          id={input.id}
          name={input.name}
          type={input.type}
        />
        {errors[input.name] && (
          <span className="text-sm text-red-500">{errors[input.name]}</span>
        )}
      </div>
    );
  });
  const renderColorsList = colors.map((color) => {
    return (
      <div key={color}>
        <CircleColor onClick={() => addOrRemoveColor(color)} color={color} />
      </div>
    );
  });
  const colorErrorMessage = errors["colors"] && (
    <span className="text-sm text-red-500">{errors["colors"]}</span>
  );
  const addOrRemoveColor = (color: string) => {
    if (tempColors.includes(color)) {
      setTempColors(tempColors.filter((c) => c !== color));
    } else {
      setTempColors((prev) => [...prev, color]);
    }
  };
  console.log(tempColors);

  /// OPEN MODAL
  const openModal = () => {
    dialogRef.current?.showModal();
  };
  const closeModal = () => {
    dialogRef.current?.classList.add("closing");
  };
  return (
    <main className="container">
      <Button
        className="m-10 mx-auto flex p-[10px]"
        onClick={() => openModal()}
      >
        Open Modal
      </Button>
      {/* <Button>Click me</Button> */}
      <div className="m-5 grid grid-cols-1 gap-2 rounded-md p-2 md:grid-cols-2 md:gap-4 lg:grid-cols-3 xl:grid-cols-4">
        {renderproductList}
      </div>
      <form onSubmit={onSubmitHandler}>
        <Modal
          dialogRef={dialogRef}
          closeModal={closeModal}
          setProduct={setProduct}
          defaultProductValue={defaultProductValue}
          renderColorsList={renderColorsList}
          tempColors={tempColors}
          colorErrorMessage={colorErrorMessage}
        >
          {" "}
          {renderInputList}
        </Modal>
      </form>
    </main>
  );
}

export default App;
