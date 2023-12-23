import React, { useRef, useEffect } from 'react';
import { useScrollPosition } from 'react-use-scroll-position';

const Banner = ({ imageUrl, title, subtitle }) => {
  const bannerRef = useRef();

  const { y: scrollPosition } = useScrollPosition();

  useEffect(() => {
    const parallaxValue = scrollPosition * 0.5;
    bannerRef.current.style.transform = `translateY(${parallaxValue}px)`;
  }, [scrollPosition]);

  return (
    <div
      className="relative h-96 bg-cover bg-center flex items-center justify-center text-white overflow-hidden"
      style={{ clipPath: 'polygon(0 0, 100% 0, 100% 60%, 0 100%)' }}
    >
      <div className="relative w-full h-full overflow-hidden">
        <img
          ref={bannerRef}
          src={imageUrl}
          alt="Banner Image"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <h1 className="text-4xl font-bold z-10">{title}</h1>
          <p className="mt-4 text-lg z-10">{subtitle}</p>
        </div>
      </div>
    </div>
  );
};

export default Banner;