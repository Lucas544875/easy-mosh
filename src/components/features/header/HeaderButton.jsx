import React from "react";
import Button from "@common/button";
import { Link } from 'react-router-dom';

const HeaderButton = ({ children, className, to, ...props }) => (
  <Link to={to}>
    <Button
      className={className}
      {...props}
      >
      {children}
    </Button>
  </Link>
)

export default HeaderButton;
