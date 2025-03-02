interface CircleColorProps extends React.HTMLAttributes<HTMLSpanElement> {
  color: string;
}

const CircleColor = ({ color, ...rest }: CircleColorProps) => {
  return (
    <span
      {...rest}
      className={`block h-5 w-5 cursor-pointer rounded-full bg-[#a855f7]`}
        style={{ background: `${color}` }}
    ></span>
  );
};

export default CircleColor;
