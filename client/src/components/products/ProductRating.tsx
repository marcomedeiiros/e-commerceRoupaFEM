import React from 'react';
import { Star } from 'lucide-react';

interface ProductRatingProps {
  rating: number;
  reviews?: number;
  showCount?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const ProductRating: React.FC<ProductRatingProps> = ({
  rating,
  reviews,
  showCount = true,
  size = 'sm',
}) => {
  const iconSize = size === 'sm' ? 'w-3.5 h-3.5' : size === 'md' ? 'w-4 h-4' : 'w-5 h-5';

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center text-[#C2A278]">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${iconSize} ${
              star <= Math.round(rating)
                ? 'fill-[#C2A278] text-[#C2A278]'
                : 'fill-none text-[#D4C6B3]'
            }`}
          />
        ))}
      </div>
      {showCount && (
        <span className="text-xs text-[#767676] font-medium">
          {rating.toFixed(1)} {reviews !== undefined && `(${reviews})`}
        </span>
      )}
    </div>
  );
};
