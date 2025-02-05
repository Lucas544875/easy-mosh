import React from "react";
import Button from "@common/button";

const HeaderButton = ({ children, className, ...props }) => (
  <Button
    className={className}
    {...props}
  >
    {children}
  </Button>
)

export default HeaderButton;
