import { Constant } from '@/lib/constant';
import React from 'react';

interface ImageProps {
  src: string;
  alt: string;
  sizes?: string;
  width: number;
  height: number;
  className?: string;
}

export const Image: React.FC<ImageProps> = ({ src, alt, sizes, width, height, className }) => {
  return (
    <img
      src={Constant.imageUrl + src}
      alt={alt}
      sizes={sizes}
      width={width}
      height={height}
      className={className}
    />
  );
};
