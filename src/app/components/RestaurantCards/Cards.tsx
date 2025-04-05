import React from "react";
import Card from "./Card";

interface Restaurant {
  id: string;
  name: string;
  cuisines: { name: string }[];
  rating: { starRating: number };
  address: { firstLine: string; city: string; postalCode: string };
  logoUrl: string;
}

export default function Cards({ restaurants }: { restaurants: Restaurant[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-2">
      {restaurants.map((restaurant) => (
        <Card key={restaurant.id} restaurant={restaurant} />
      ))}
    </div>
  );
}

