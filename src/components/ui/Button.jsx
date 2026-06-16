const variants = {
  primary: 'bg-primary hover:bg-[#0a6b32] text-white',
  secondary: 'bg-secondary hover:bg-[#0a6b32] text-white',
  success: 'bg-success hover:bg-emerald-600 text-white',
  error: 'bg-error hover:bg-red-600 text-white',
  outline: 'bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-300',
};

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
  ...props
}) {
  return (
    <button
      className={`
        font-body font-semibold rounded-lg
        transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
