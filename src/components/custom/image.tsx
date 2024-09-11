import { Constant } from '@/lib/constant';
import defaultImage from '@/assets/image/default.png'

interface ImageProps {
  src: string;
  alt: string;
  sizes?: string;
  width: number;
  height: number;
  className?: string;
}

export const Image = ({ src, alt, sizes, width, height, className }: ImageProps) => {
  const srcStr = src ? Constant.imageUrl + src : defaultImage
  return (
    <img
      src={srcStr}
      alt={alt}
      sizes={sizes}
      width={width}
      height={height}
      className={className}
      onError={(e) => {
        (e.target as any).src = defaultImage;
      }}
    />
  );
};
