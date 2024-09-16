import React, { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { useController, useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";

const ratingVariants = {
  default: {
    star: "text-foreground",
    emptyStar: "text-muted-foreground",
  },
  destructive: {
    star: "text-red-500",
    emptyStar: "text-red-200",
  },
  yellow: {
    star: "text-yellow-500",
    emptyStar: "text-yellow-200",
  },
};

interface RatingsProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string; // Add name prop for form control
  totalStars?: number;
  size?: number;
  fill?: boolean;
  Icon?: React.ReactElement;
  variant?: keyof typeof ratingVariants;
  readOnly?: boolean;
}

const Ratings = ({
  name,
  totalStars = 5,
  size = 20,
  fill = true,
  Icon = <Star />,
  variant = "default",
  readOnly = false,
  ...props
}: RatingsProps) => {
  const { control } = useFormContext(); // Access form control from context
  const { field } = useController({ name, control }); // Use useController for dynamic form control

  const [rate, setRate] = useState(field.value);

  useEffect(() => {
    setRate(field.value);
  }, [field.value]);

  const handleStarClick = (index: number) => {
    const newRating = index + 1;
    setRate(newRating);
    field.onChange(newRating); // Use field.onChange to update the form value
  };

  const fullStars = Math.floor(rate);
  const partialStar =
    rate % 1 > 0 ? (
      <PartialStar
        fillPercentage={rate % 1}
        size={size}
        className={cn(ratingVariants[variant].star)}
        Icon={Icon}
      />
    ) : null;

  return (
    <div className={cn("flex items-center gap-2")} {...props}>
      {[...Array(fullStars)].map((_, i) =>
        React.cloneElement(Icon, {
          key: i,
          size,
          className: cn(
            fill ? "fill-current" : "fill-transparent",
            ratingVariants[variant].star
          ),
          onClick: readOnly ? undefined : () => handleStarClick(i), // Disable click if readOnly
        })
      )}
      {partialStar}
      {[...Array(totalStars - fullStars - (partialStar ? 1 : 0))].map((_, i) =>
        React.cloneElement(Icon, {
          key: i + fullStars,
          size,
          className: cn(ratingVariants[variant].emptyStar),
          onClick: readOnly
            ? undefined
            : () => handleStarClick(i + fullStars), // Disable click if readOnly
        })
      )}
    </div>
  );
};

interface PartialStarProps {
  fillPercentage: number;
  size: number;
  className?: string;
  Icon: React.ReactElement;
}

const PartialStar = ({
  fillPercentage,
  size,
  className,
  Icon,
}: PartialStarProps) => {
  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      {React.cloneElement(Icon, {
        size,
        className: cn("fill-transparent", className),
      })}
      <div
        style={{
          position: "absolute",
          top: 0,
          overflow: "hidden",
          width: `${fillPercentage * 100}%`,
        }}
      >
        {React.cloneElement(Icon, {
          size,
          className: cn("fill-current", className),
        })}
      </div>
    </div>
  );
};

export { Ratings };
