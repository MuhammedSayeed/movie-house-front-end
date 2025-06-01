
interface IProps {
  size?: number;
}

const LoadingSpinner = ({ size = 64 }: IProps) => {
  return (
    <div className="relative inline-block" style={{ width: size, height: size }}>
      <div className="absolute rounded-full bg-white opacity-100 animate-ping"style={{ top: size / 4,  left: size / 4,  width: size / 2,  height: size / 2}}></div>
      <div className="absolute rounded-full bg-white opacity-100 animate-ping" style={{ top: size / 4, left: size / 4, width: size / 2, height: size / 2, animationDelay: "-0.7s",}}></div>
    </div>
  );
};

export default LoadingSpinner;
