import React from "react";
import Card from "@common/card";
import { Button, Tooltip } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import MyButton from "@common/button";

const SrcCard = ({src, name, onDelete}) => (
  <Card
    className="bg-zinc-700"
  >
    <div className="flex flex-row-reverse gap-2">
      <Tooltip title="Delete">
        <Button 
          type="text" 
          icon={<DeleteOutlined style={{ fontSize: "28px", color: "#fb2c36" }} />}
          onClick={() => onDelete()}
        />
      </Tooltip>
    </div>
    <video src={src} className="w-full mt-2" controls controlsList="nofullscreen" />
    <p className="text-center p-1" style={{margin:0}}>{name}</p>
    <div className="flex justify-center">
      <MyButton className="bg-zinc-500">
        タイムラインに追加
      </MyButton>
    </div>
  </Card>
)

export default SrcCard;
