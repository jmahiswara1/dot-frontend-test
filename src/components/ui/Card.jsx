export default function Card({
  children,
  gradient = false,
  className = '',
  ...props
}) {
  return (
    <div
      className={`
        bg-white rounded-xl shadow-card
        p-4 sm:p-6
        border border-gray-200
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
}
