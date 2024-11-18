import React from 'react';
import { SpotlightItem } from '~/utils/types';

export default function Carousel({
  currentVideoIndex,
  videoList,
  onVideoChange,
}: {
  currentVideoIndex: number;
  videoList: SpotlightItem[];
  onVideoChange: (index: number) => void;
}) {
  return (
    <div className="carousel">
      <div className="carousel__interface">
        <div className="carousel__controls">
          <button
            onClick={() =>
              onVideoChange(
                (currentVideoIndex - 1 + videoList.length) % videoList.length
              )
            }
          >
            Previous
          </button>
          <div className="carousel__pagination">
            {videoList.map((_, index) => (
              <input
                key={index}
                type="radio"
                name="carousel-pagination"
                checked={index === currentVideoIndex}
                onChange={() => onVideoChange(index)}
              />
            ))}
          </div>
          <button
            onClick={() =>
              onVideoChange((currentVideoIndex + 1) % videoList.length)
            }
          >
            Next
          </button>
        </div>
        {videoList[currentVideoIndex] && (
          <div className="carousel__title">{videoList[currentVideoIndex].title}</div>
        )}
      </div>
    </div>
  );
}
