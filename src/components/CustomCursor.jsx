import React, { useEffect, useState } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    const updatePosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setHidden(false);
    };

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mouseenter', () => setHidden(false));
    window.addEventListener('mouseleave', () => setHidden(true));

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mouseenter', () => setHidden(false));
      window.removeEventListener('mouseleave', () => setHidden(true));
    };
  }, []);

  return (
    <>
      <div
        className={`fixed pointer-events-none z-50 mix-blend-difference ${
          hidden ? 'opacity-0' : 'opacity-100'
        }`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)'
        }}
      >
        <div className="w-8 h-8 bg-white opacity-40 rounded-full" />
      </div>
      <div
        className={`fixed pointer-events-none z-50 transition-transform duration-300 mix-blend-difference ${
          hidden ? 'opacity-0' : 'opacity-100'
        }`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%) scale(0.35)'
        }}
      >
        <div className="w-8 h-8 bg-white rounded-full" />
      </div>
    </>
  );
};

export default CustomCursor;