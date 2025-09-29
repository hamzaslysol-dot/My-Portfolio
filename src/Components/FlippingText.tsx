interface Props {
  id: number;
  option: string;
}

const FlippingText = (optn: Props) => {
  return (
    <a href="#" key={optn.id} className="group relative w-40 inline-block">
      <span
        className="absolute inset-0 flex items-center justify-center text-xl font-bold 
                text-white [transform:rotateX(0deg)] group-hover:[transform:rotateX(180deg)] transition-transform duration-700 backface-hidden"
      >
        {optn.option}
      </span>
      <span
        className="absolute inset-0 flex items-center justify-center text-xl font-bold 
             text-white [transform:rotateX(-180deg)] group-hover:[transform:rotateX(0deg)] transition-transform duration-700 backface-hidden"
      >
        {optn.option}
      </span>
    </a>
  );
};

export default FlippingText;
