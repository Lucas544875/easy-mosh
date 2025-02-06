import React from "react";

const Card = ({ children, className, ...props }) => (
  <div
    className={`rounded-lg p-2 ${className}`}
    {...props}
  >
    {children}
  </div>
)

export default Card;
