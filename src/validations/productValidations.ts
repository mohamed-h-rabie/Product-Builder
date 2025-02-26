export const productValidations = (product: {
  title: string;
  description: string;
  imageURL: string;
  price: string;
}) => {
  const errors = {
    title: "",
    description: "",
    imageURL: "",
    price: "",
  };
  const validURL =
    /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp|bmp|svg)(\?.*)?)$/.test(
      product.imageURL,
    );
  if (
    !product.title.trim() ||
    product.title.length < 10 ||
    product.title.length > 50
  ) {
    errors.title = "Title must be between 10 and 50 characters";
  }
  if (
    !product.description.trim() ||
    product.description.length < 20 ||
    product.description.length > 500
  ) {
    errors.description = "Title must be between 10 and 50 characters";
  }
  if (!validURL) {
    errors.imageURL = "Invalid Image URL";
  }
  if (!product.price.trim() || isNaN(Number(product.price))) {
    errors.price = "Price must be a number";
  }
  return errors
};
