import React from "react";
import Card from "@common/card";
import DeleteIcon from "@assets/delete.svg";
import MovieEditIcon from "@assets/movie-edit.png";

const SrcCard = ({src, name, onDelete}) => (
  <Card
    className="bg-zinc-600"
  >
    <div className="flex flex-row-reverse gap-2 space-y-2">
      <img
        src={DeleteIcon}
        alt="delete"
        className="cursor-pointer h-7"
        onClick={() => onDelete()}
      />
      <img 
        src={MovieEditIcon}
        alt="connect to timeline"
        className="cursor-pointer h-7"
        color="white"
      />
    </div>
    <video src={src} className="w-full" controls controlsList="nofullscreen" />
    <p className="text-center mt-1">{name}</p>
  </Card>
)

export default SrcCard ;
