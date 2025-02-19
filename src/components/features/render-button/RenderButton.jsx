import React from "react";
import Button from "@common/button";
import { Tooltip } from "antd";

const RenderButton = ({className}) => (
  <Tooltip title="整列してレンダリング">
    <Button className={`bg-zinc-600 text-white ${className}`}>
      レンダリング
    </Button>
  </Tooltip>
)

export default RenderButton;