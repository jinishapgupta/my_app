import React from "react";
import Cards from "./RestaurantCards/Cards";

interface BodyProps {
  filters: any,
  data: any;
}
interface filtersProps {
  availability: boolean;
  rating: number;
  deliveryTime: number;
  deliveryCost: number;
  cuisines: string[];
}

export default function Body({ data, filters }: BodyProps) {
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