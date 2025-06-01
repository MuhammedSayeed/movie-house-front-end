import { ReactNode } from 'react';
import { NeonBlob } from './NeonBlob';
import { gridStyle } from '@/constants';

interface BackgroundWrapperProps {
  children: ReactNode;
}

export const BackgroundWrapper = ({ children }: BackgroundWrapperProps) => {
  return (
    <main className="bg-[#080110] backdrop-blur-3xl ">
      {/* Content container with higher z-index */}
      <div className="relative z-[2]">
        {children}
      </div>

      {/* Background grid */}
      <div className="absolute w-full h-full inset-0 z-[-1] animate-pulse" style={gridStyle} />

      {/* Neon blob elements */}
      <div className="absolute w-full h-full inset-0 z-[-2] overflow-hidden">
        <NeonBlob className="bg-[#6366F1] w-[400px] h-[400px] md:w-[600px] md:h-[600px] top-[-150px] left-[-200px]" />
        <NeonBlob className="bg-[#8B5CF6] w-[400px] h-[400px] md:w-[700px] md:h-[700px] top-1/3 -right-64 delay-200" />
        <NeonBlob className="bg-[#4F46E5] w-[350px] h-[350px] -bottom-64 left-64 delay-500" />
      </div>
    </main>
  );
};