import React, { useState } from "react";
import { clsx, ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Skeleton } from "../ui/skeleton";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// const Skeleton: React.FC<{ className?: string }> = ({ className }) => (
//   <div className={cn("bg-gray-200 animate-pulse", className)} />
// );

interface CustomImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  skeletonClassName?: string; // Optional skeleton-specific class
}

const Image: React.FC<CustomImageProps> = ({
  src,
  alt,
  className,
  skeletonClassName,
  ...props
}) => {
  const [loading, setLoading] = useState(true);

  const handleImageLoad = () => {
    // Delay hiding the skeleton for a smooth effect
    setTimeout(() => {
      setLoading(false);
    }, 100);
  };

  return (
    <div className={cn("relative", className)}>
      {/* Skeleton */}
      {loading && (
        <Skeleton
          className={cn(
            "absolute inset-0 w-full h-full",
            skeletonClassName // Apply specific styles for the skeleton if provided
          )}
        />
      )}

      {/* Image */}
      <img
        src={src}
        alt={alt}
        className={cn(
          "object-cover",
          loading ? "opacity-0" : "opacity-100 transition-opacity duration-300",
          className
        )}
        onLoad={handleImageLoad} // Trigger skeleton hiding on load
        {...props}
      />
    </div>
  );
};

export default Image;
