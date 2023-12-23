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
      ref={bannerRef}
      className="relative h-80 bg-cover bg-center flex items-center justify-center text-white overflow-hidden"
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <div className="bg-black bg-opacity-50 p-8 text-center relative z-10">
        <h1 className="text-4xl font-bold">{title}</h1>
        <p className="mt-4 text-lg">{subtitle}</p>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-16 bg-white transform skew-y-6"></div>
    </div>
  );
};

export default Banner;