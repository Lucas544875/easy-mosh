import React from "react";

const Button = ({ children, className, ...props }) => (
  <button
    className={`px-4 py-2 rounded-lg border ${className}`}
    {...props}
  >
    {children}
  </button>
)

export default Button;