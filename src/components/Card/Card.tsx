import { IProduct } from "@/interfaces";
import { Button } from "../ui/button";
import Image from "./Image";
import { textSlicer } from "@/lib/functions";
interface IProps {
  product: IProduct;
  setProductToEdit: (product: IProduct) => void;
  openEditModal: () => void;
  setProductToEditID: React.Dispatch<React.SetStateAction<number>>;
  idx: number;
  setTempColors: React.Dispatch<React.SetStateAction<string[]>>;
}
const Card = ({
  product,
  setProductToEdit,
  openEditModal,
  setProductToEditID,
  idx,
  setTempColors,
}: IProps) => {
  const { title, description, price, imageURL, colors, category } = product;
  const onEditHandler = () => {
    setProductToEditID(Number(idx));
    openEditModal();
    setProductToEdit(product);
    setTempColors(colors);
    
    
  };
  return (
    <div className="mx-auto flex max-w-sm flex-col space-y-3 rounded-md border p-2 md:mx-0 md:max-w-lg">
      <Image
        className=" h-52 w-full rounded-md lg:object-cover"
        src={imageURL as string}
        alt="placeholder"
      />
      <p className="h-[56px] text-lg font-semibold">{textSlicer(title, 25)}</p>
      <p className="break-words text-sm text-gray-500">
        {textSlicer(description)}
      </p>
      <div className="flex h-[20px] space-x-2">
        {colors.map((color) => {
          return (
            <div
              key={color}
              className="h-5 w-5 cursor-pointer rounded-full"
              style={{ backgroundColor: color }}
            ></div>
          );
        })}
      </div>
      <div className="flex items-center justify-between">
        <span className="ml-2 text-2xl font-bold text-indigo-700">
          ${price}
        </span>
        <Image
          className=" h-10 w-10 rounded-full object-bottom"
          src={category.imageURL as string}
          alt="placeholder"
        />{" "}
      </div>

      <div className=" flex justify-between space-x-3">
        <Button
          onClick={() => {
            onEditHandler();
          }}
          className="w-full bg-indigo-600 transition-all hover:bg-indigo-600/85"
        >
          Edit
        </Button>
        <Button className="w-full bg-red-600  transition-all hover:bg-red-600/85">
          Destory
        </Button>
      </div>
    </div>
  );
};

export default Card;
