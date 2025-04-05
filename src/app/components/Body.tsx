import React from "react";
import Cards from "./RestaurantCards/Cards";

interface BodyProps {
  data: any;
}

export default function Body({ data }: BodyProps) {
  const restaurants = data


 return (
    <div className="flex-1 flex items-center justify-center">
      <Cards restaurants={restaurants} />
    </div>
  );
}