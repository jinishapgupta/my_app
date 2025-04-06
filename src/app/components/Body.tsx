import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import Cards from "./RestaurantCards/Cards";

// Dynamically import MapView with SSR disabled
const MapView = dynamic(() => import("./MapView"), { ssr: false });

interface BodyProps {
  filters: any;
  data: any;
  metaData: { area: string };
  setCountsMetaData: (countsMetaData: any) => void;
}

export default function Body({ data, filters, metaData, setCountsMetaData }: BodyProps) {
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    const countsMetaData = {
      area: metaData.area,
      availability: data.filter(
        (restaurant: any) => restaurant.availability?.delivery?.isOpen
      ).length,
      rating: data.reduce(
        (acc: number, restaurant: any) => acc + (restaurant.rating?.starRating || 0),
        0
      ) / data.length,
      deliveryTime: Math.min(
        ...data.map(
          (restaurant: any) =>
            restaurant.availability?.delivery?.etaMinutes?.rangeUpper || Infinity
        )
      ),
      deliveryCost: Math.min(
        ...data.map((restaurant: any) => restaurant.filters?.deliveryCost || Infinity)
      ),
      cuisines: Array.from(
        new Set(
          data.flatMap((restaurant: any) => restaurant.filters?.cuisines || [])
        )
      ),
    };

    setCountsMetaData(countsMetaData);
  }, [data, metaData, setCountsMetaData]);

  const restaurants = data
    .filter((restaurant: any) => {
      if (!filters || Object.keys(filters).length === 0) {
        return true;
      }
      const restaurantFilters = restaurant.filters;
      const availability = restaurant.availability?.delivery?.isOpen || false;
      const starRating = restaurantFilters.rating || 0;

      return (
        (filters.availability ? availability : true) &&
        (filters.rating ? starRating >= filters.rating : true) &&
        (filters.deliveryTime
          ? restaurant.availability?.delivery?.etaMinutes?.rangeUpper <= filters.deliveryTime
          : true) &&
        (filters.deliveryCost
          ? restaurantFilters.deliveryCost <= filters.deliveryCost
          : true) &&
        (filters.cuisines.length > 0
          ? restaurantFilters.cuisines.some((cuisine: string) =>
              filters.cuisines.includes(cuisine)
            )
          : true)
      );
    })
    .sort((a: any, b: any) => {
      const aAvailability = a.availability?.delivery?.isOpen || false;
      const bAvailability = b.availability?.delivery?.isOpen || false;
      const aStarRating = a.rating?.starRating || 0;
      const bStarRating = b.rating?.starRating || 0;

      if (bAvailability === aAvailability) {
        return bStarRating - aStarRating;
      }
      return bAvailability ? 1 : -1;
    })
    .slice(0, 10);

  return (
    <div className="flex-1 flex flex-col items-center justify-center">
      <button
        onClick={() => setShowMap(!showMap)}
        className="mb-4 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition"
      >
        {showMap ? "Show Cards" : "Show Map"}
      </button>
      {showMap ? (
        <MapView restaurants={restaurants} />
      ) : (
        <Cards restaurants={restaurants} />
      )}
    </div>
  );
}
