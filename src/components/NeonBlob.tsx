
interface NeonBlobProps {
  className?: string;
}

export const NeonBlob = ({ className = '' } : NeonBlobProps) => {
  return (
    <div 
      className={`
        absolute rounded-full 
        blur-[120px] opacity-30 
        animate-blob 
        mix-blend-screen
        ${className}
      `} 
    />
  );
};