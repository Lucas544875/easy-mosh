import React from "react";

const Card = ({ children, className, ...props }) => (
  <div
    className={`shadow-md bg-white p-4 rounded-lg ${className}`}
    {...props}
  >
    {children}
  </div>
)

const CardContent = ({ children }) => (
  <div className="text-sm">{children}</div>
)

export { Card, CardContent };
