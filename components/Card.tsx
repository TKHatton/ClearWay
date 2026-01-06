
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-white p-5 rounded-3xl shadow-sm border border-slate-100 mb-4 ${className}`}>
      {children}
    </div>
  );
};

export default Card;
