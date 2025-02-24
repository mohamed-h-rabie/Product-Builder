import { IProduct } from "@/interfaces";
import { Button } from "../ui/button";
import Image from "./Image";
import { textSlicer } from "@/lib/functions";
interface IProps {
  product: IProduct;
}
const Card = ({ product }: IProps) => {
  const { title, description, price, imageURL, colors } = product;
  return (
    <div className="mx-auto flex  max-w-sm flex-col space-y-4 rounded-md border p-[10px] md:mx-0 md:max-w-lg">
      <p>{title}</p>
      <Image
        onClick={() => console.log("clicked")}
        className=" h-[240px] w-[360px] rounded-md"
        src={imageURL as string}
        alt="placeholder"
      />
      <p className="h-[48px]">{textSlicer(description)}</p>
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
      <div className="flex justify-between">
        <span className="ml-2">${price}</span>
        <Image
          className=" h-10 w-10 rounded-full object-bottom"
          src={imageURL as string}
          alt="placeholder"
        />{" "}
        {/* <span>{category}</span> */}
      </div>

      <div className="mt-auto flex justify-between space-x-3">
        <Button className="w-full bg-indigo-600 transition-all hover:bg-indigo-600/85">
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
