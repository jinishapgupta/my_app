import { useState } from "react";

interface FilterOption {
  key: string;
  displayName: string;
  restaurantIds: string[];
}

interface SortOption {
  key: string;
  displayName: string;
  sortFunction: (a: any, b: any) => number;
}

interface FooterProps {
  filterData: any;
  setFilterData: React.Dispatch<React.SetStateAction<any>>;
}

export default function Footer({ filterData, setFilterData }: FooterProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
  const filterCategories = {
    cuisines: {
      title: "Cuisines",
      options: Object.entries(filterData).map(([key, value]: [string, any]) => ({
        ...value,
        key,
      })),
    },
    sort: {
      title: "Sort By",
      options: [
        { 
          key: "rating", 
          displayName: "Rating ↓",
          sortFunction: (a: any, b: any) => {
            const aRating = a.rating?.starRating || 0;
            const bRating = b.rating?.starRating || 0;
            return bRating - aRating;
          }
        },
        { 
          key: "deliveryTime", 
          displayName: "Delivery Time ↑",
          sortFunction: (a: any, b: any) => {
            const aTime = a.availability?.delivery?.etaMinutes?.rangeUpper || Infinity;
            const bTime = b.availability?.delivery?.etaMinutes?.rangeUpper || Infinity;
            return aTime - bTime;
          }
        },
      ] as SortOption[],
    },
    filters: {
      title: "Filters",
      options: [
        { key: "availability", displayName: "Open Now" },
        { key: "deliveryCost", displayName: "Free Delivery" },
      ],
    },
  };

  const handleFilterClick = (category: string, key: string) => {
    setFilterData((prevFilters: any) => {
      switch (category) {
        case "cuisines":
          const isSelected = prevFilters.cuisines.includes(key);
          return {
            ...prevFilters,
            cuisines: isSelected ? [] : [key],
          };
        case "sort":
          const sortOption = filterCategories.sort.options.find(opt => opt.key === key);
          return {
            ...prevFilters,
            sortBy: prevFilters.sortBy === key ? null : key,
            sortFunction: sortOption?.sortFunction || null,
          };
        case "filters":
          return {
            ...prevFilters,
            [key]: !prevFilters[key],
          };
        default:
          return prevFilters;
      }
    });
  };

  return (
    <footer className="text-white p-4 w-full">
      <div className="flex items-center gap-4 justify-between flex-wrap">
        {Object.entries(filterCategories).map(([category, { title, options }]) => (
          <div key={category} className="relative">
            <button
              onClick={() => setActiveCategory(activeCategory === category ? null : category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition
                ${activeCategory === category 
                  ? 'bg-orange-500 text-white' 
                  : 'bg-gray-700 hover:bg-gray-600'}`}
            >
              {title}
            </button>

            {activeCategory === category && (
              <div className="absolute z-50 bottom-full mb-2 bg-white rounded-lg shadow-xl min-w-[250px] left-0 transform translate-x-0">
                <div className="p-3 max-h-[300px] overflow-y-auto"> {/* Added max height and scroll */}
                  <div className="flex flex-col space-y-1">
                    {options.map((option: FilterOption | SortOption) => (
                      <button
                        key={option.key}
                        onClick={() => handleFilterClick(category, option.key)}
                        className={`w-full text-left px-4 py-2 text-gray-800 text-sm rounded-md transition
                          ${category === 'sort' && filterData.sortBy === option.key
                            ? 'bg-orange-100 text-orange-600' 
                            : 'hover:bg-gray-100'}
                          ${filterData[category === 'cuisines' ? 'cuisines' : option.key] 
                            ? 'bg-orange-100 text-orange-600' 
                            : 'hover:bg-gray-100'}`}
                      >
                        <div className="flex justify-between items-center">
                          <span className="truncate">{option.displayName}</span>
                          {category === 'cuisines' && (
                            <span className="ml-2 text-xs text-gray-500">
                              ({option.restaurantIds.length})
                            </span>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}

        <div className="flex gap-2">
          {Object.entries(filterData).map(([key, value]: [string, any]) => {
            if (Array.isArray(value) && value.length > 0) {
              return value.map((item: string) => (
                <span key={item} className="bg-orange-500 px-3 py-1 rounded-full text-xs">
                  {filterData[item]?.displayName}
                  <button
                    onClick={() => handleFilterClick('cuisines', item)}
                    className="ml-2 hover:text-gray-300"
                  >
                    ×
                  </button>
                </span>
              ));
            }
            return null;
          })}
        </div>
      </div>
    </footer>
  );
}