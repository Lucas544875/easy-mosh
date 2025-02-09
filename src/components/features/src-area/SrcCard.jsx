import React from "react";
import Card from "@common/card";
import { Button, Tooltip } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import MovieEditIcon from "@assets/movie-edit.png";

const SrcCard = ({src, name, onDelete}) => (
  <Card
    className="bg-zinc-600"
  >
    <div className="flex flex-row-reverse gap-2">
      <Tooltip title="Delete">
        <Button 
          type="text" 
          icon={<DeleteOutlined style={{ fontSize: "28px", color: "#fb2c36" }} />}
          onClick={() => onDelete()}
        />
      </Tooltip>
      <Tooltip title="Connect to Timeline">
        <Button 
          type="text"
          icon={
            <img 
              src={MovieEditIcon} 
              alt="connect to timeline" 
              style={{ height: "28px" }} 
            />
          }
        />
      </Tooltip>
    </div>
    <video src={src} className="w-full mt-2" controls controlsList="nofullscreen" />
    <p className="text-center mt-1">{name}</p>
  </Card>
)

export default SrcCard;
