
import React from 'react';

interface ButtonPrimaryProps {
  label: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  className?: string;
  disabled?: boolean;
}

const ButtonPrimary: React.FC<ButtonPrimaryProps> = ({ 
  label, 
  onClick, 
  type = 'button', 
  variant = 'primary',
  className = '',
  disabled = false
}) => {
  const baseStyles = "w-full py-4 px-6 rounded-2xl font-semibold transition-all duration-200 active:scale-[0.98] flex items-center justify-center text-center";
  
  const variants = {
    primary: "bg-teal-600 text-white shadow-lg shadow-teal-200 hover:bg-teal-700",
    secondary: "bg-white text-teal-800 border-2 border-teal-100 hover:bg-teal-50",
    outline: "bg-transparent text-slate-600 border border-slate-200 hover:bg-slate-50",
    danger: "bg-red-50 text-red-600 hover:bg-red-100"
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {label}
    </button>
  );
};

export default ButtonPrimary;
