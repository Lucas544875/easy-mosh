import React from "react";
import { Card, CardContent } from "@common/card";

const SrcCard = ({src, poster, name}) => (
  <Card
    className="p-2"
  >
    <CardContent className = "flex flex-col items-center">
      <video src={src} className="w-full h-auto" controls poster={poster} />
      <p className="text-center mt-2">{name}</p>
    </CardContent>
  </Card>
)

export default SrcCard ;
