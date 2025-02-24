interface IProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
}
const Image = ({ src, alt, className, ...rest }: IProps) => {
  return <img className={className}  src={src} alt={alt} {...rest} />;
};

export default Image;
