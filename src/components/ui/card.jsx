export function Card({ children, className, ...props }) {
  return (
    <div
      className={`shadow-md bg-white p-4 rounded-lg ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardContent({ children }) {
  return <div className="text-sm">{children}</div>;
}
