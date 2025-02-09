import React from "react";
import Button from "@common/button";

const RenderButton = ({className}) => (
  <Button className={`bg-zinc-600 text-white ${className}`}>レンダリング</Button>
)

export default RenderButton;