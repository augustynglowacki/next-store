import { useState } from "react";
import Image, { ImageProps } from "next/image";

interface ImageWithPlaceholderProps extends Omit<ImageProps, "onLoadingComplete"> {
  aspectRatio?: number;
}

export default function ImageWithPlaceholder({ aspectRatio = 1, ...props }: ImageWithPlaceholderProps) {
  const [imageLoading, setImageLoading] = useState(true);

  return (
    <div className="relative w-full" style={{ paddingBottom: `${100 / aspectRatio}%` }}>
      {imageLoading && <div className="absolute inset-0 bg-gray-200 animate-pulse rounded" />}
      <Image
        {...props}
        fill
        className={`object-contain transition-opacity duration-300 ${imageLoading ? "opacity-0" : "opacity-100"} ${props.className || ""}`}
        onLoadingComplete={() => setImageLoading(false)}
      />
    </div>
  );
}
