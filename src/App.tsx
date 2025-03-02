import { useRef, useState } from "react";
import "./App.css";
import Card from "./components/Card/Card";
import { Button } from "./components/ui/button";
import Input from "./components/ui/Input";
import Modal from "./components/ui/Modal";
// import { Button } from "./components/ui/button";
import {
  categories,
  colors,
  formInputsList,
  productList,
} from "./lib/fakeData";
import { IProduct } from "./interfaces";
import { productValidations } from "./validations/productValidations";
import CircleColor from "./components/Card/CircleColor";
import { v4 as uuid } from "uuid";
import Select from "./components/ui/Select";

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
  const [products, setProducts] = useState<IProduct[]>(productList);
  const [product, setProduct] = useState<IProduct>(defaultProductValue);
  const [productToEdit, setProductToEdit] =
    useState<IProduct>(defaultProductValue);
  const [productToEditID, setProductToEditID] = useState<number>(0);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [tempColors, setTempColors] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  const dialogRef = useRef<HTMLDialogElement>(null);
  const dialogEditRef = useRef<HTMLDialogElement>(null);
  const dialogDeleteRef = useRef<HTMLDialogElement>(null);

  //  HANDLERS

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const errors = productValidations(product);
    const hasErrorMessage =
      Object.values(errors).some((value) => value.length > 0) ||
      Object.values(errors).every((value) => value.length > 0);
    if (hasErrorMessage) {
      setErrors(errors);
      return;
    }
    setProducts((prev) => [
      ...prev,
      {
        id: uuid(),

        ...product,
        colors: tempColors,
        category: selectedCategory,
      },
    ]);
    closeModal();
    setProduct(defaultProductValue);
    setTempColors([]);
  };
  const onEditChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProductToEdit({
      ...productToEdit,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  };
  const onEditSubmitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const errors = productValidations(productToEdit);
    const hasErrorMessage =
      Object.values(errors).some((value) => value.length > 0) ||
      Object.values(errors).every((value) => value.length > 0);
    if (hasErrorMessage) {
      setErrors(errors);
      return;
    }
    const updatedProducts = [...products];
    updatedProducts[productToEditID] = {
      ...productToEdit,
      colors: tempColors,
      category: selectedCategory,
    };
    setProducts(updatedProducts);
    setTempColors([]);
    closeEditModal();
  };
  const onDeleteSubmitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const updatedProducts = products.filter(
      (_, index) => index !== productToEditID,
    );

    setProducts(updatedProducts);
    closeDeleteModal();
  };
  console.log(productToEditID);
  // OPENEDITDIALOG
  const openEditModal = () => {
    dialogEditRef.current?.showModal();
  };
  const closeEditModal = () => {
    dialogEditRef.current?.classList.add("closing");
  };
  const openDeleteModal = () => {
    dialogDeleteRef.current?.showModal();
  };
  const closeDeleteModal = () => {
    dialogDeleteRef.current?.classList.add("closing");
  };

  const openModal = () => {
    dialogRef.current?.showModal();
  };

  const closeModal = () => {
    dialogRef.current?.classList.add("closing");
  };

  // RENDER
  const renderproductList = products.map((product, id) => (
    <Card
      key={product.id}
      product={product}
      setProductToEdit={setProductToEdit}
      openEditModal={openEditModal}
      openDeleteModal={openDeleteModal}
      setProductToEditID={setProductToEditID}
      idx={id}
      setTempColors={setTempColors}
    />
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
  const renderEditInputList = formInputsList.map((input) => {
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
          value={productToEdit[input.name]}
          onChange={onEditChangeHandler}
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
          title="ADD A NEW PRODUCT
"
          dialogRef={dialogRef}
          closeModal={closeModal}
          setProduct={setProduct}
          defaultProductValue={defaultProductValue}
          renderColorsList={renderColorsList}
          tempColors={tempColors}
          colorErrorMessage={colorErrorMessage}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        >
          {" "}
          {renderInputList}
          <div className="flex flex-row gap-1">{renderColorsList}</div>
          {tempColors.length > 0 ? null : colorErrorMessage}
          <div className="flex flex-row flex-wrap gap-1">
            {tempColors.map((color) => (
              <div
                key={color}
                className=" flex h-5 w-14  items-center justify-center rounded-sm px-8 text-sm uppercase text-white"
                style={{ background: color }}
              >
                {color}
              </div>
            ))}
          </div>
          <Select
            selected={selectedCategory}
            setSelected={setSelectedCategory}
          />
        </Modal>
      </form>
      {/* //EDIT */}
      <form onSubmit={onEditSubmitHandler}>
        <Modal
          title="Edit Product"
          dialogRef={dialogEditRef}
          closeModal={closeEditModal}
          setProduct={setProductToEdit}
          defaultProductValue={defaultProductValue}
          renderColorsList={renderColorsList}
          tempColors={tempColors}
          colorErrorMessage={colorErrorMessage}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        >
          {" "}
          {renderEditInputList}
          <div className="flex flex-row gap-1">{renderColorsList}</div>
          {tempColors.length > 0 ? null : colorErrorMessage}
          <div className="flex flex-row flex-wrap gap-1">
            {tempColors.map((color) => (
              <div
                key={color}
                className=" flex h-5 w-14  items-center justify-center rounded-sm px-8 text-sm uppercase text-white"
                style={{ background: color }}
              >
                {color}
              </div>
            ))}
          </div>
          <Select
            selected={selectedCategory}
            setSelected={setSelectedCategory}
          />
        </Modal>
      </form>
      <form onSubmit={onDeleteSubmitHandler}>
        <Modal
          title="Delete Product"
          dialogRef={dialogDeleteRef}
          closeModal={closeDeleteModal}
          setProduct={setProductToEdit}
          defaultProductValue={defaultProductValue}
          renderColorsList={renderColorsList}
          tempColors={tempColors}
          colorErrorMessage={colorErrorMessage}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        >
          <h1>Delete this product</h1>
        </Modal>
      </form>
    </main>
  );
}

export default App;
