import React, { useEffect } from "react";
import Cards from "./RestaurantCards/Cards";

interface BodyProps {
  filters: any;
  data: any;
  metaData: { area: string }; // Added metaData type with area
  setCountsMetaData: (countsMetaData: any) => void;
}
interface filtersProps {
  availability: boolean;
  rating: number;
  deliveryTime: number;
  deliveryCost: number;
  cuisines: string[];
}

export default function Body({ data, filters, metaData, setCountsMetaData }: BodyProps) {
  useEffect(() => {
    const countsMetaData = {
      area: metaData.area, // Include area from metaData
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
  }, [data, metaData, setCountsMetaData]); // Added metaData to dependency array

  const restaurants = data
    .filter((restaurant: any) => {
      if (!filters || Object.keys(filters).length === 0) {
        return true;
      }
      const restaurantFilters = restaurant.filters as filtersProps;
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
    <div className="flex-1 flex items-center justify-center">
      <Cards restaurants={restaurants} />
    </div>
  );
}
