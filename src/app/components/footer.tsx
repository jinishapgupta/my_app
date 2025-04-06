import { useState } from "react";

interface FilterOption {
  key: string;
  displayName: string;
  restaurantIds: string[];
}

interface FooterProps {
  filterData: any;
  setFilterData: React.Dispatch<React.SetStateAction<any>>;
}

export default function Footer({ filterData, setFilterData }: FooterProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
  // Organize filters into categories
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
        { key: "rating", displayName: "Rating" },
        { key: "deliveryTime", displayName: "Delivery Time" },
      ],
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
          return {
            ...prevFilters,
            sortBy: prevFilters.sortBy === key ? null : key,
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
    <footer className="text-white p-4 bg-gray-800 w-full">
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
              <div className="absolute z-50 bottom-full mb-2 p-2 bg-white rounded-lg shadow-xl min-w-[200px] left-1/2 transform -translate-x-1/2">
                <div className="grid gap-2 max-h-[300px] overflow-y-auto">
                  {options.map((option: FilterOption) => (
                    <button
                      key={option.key}
                      onClick={() => handleFilterClick(category, option.key)}
                      className={`px-3 py-2 text-gray-800 text-sm rounded transition
                        ${filterData[category === 'cuisines' ? 'cuisines' : option.key] 
                          ? 'bg-orange-100 text-orange-600' 
                          : 'hover:bg-gray-100'}`}
                    >
                      {option.displayName}
                      {category === 'cuisines' && ` (${option.restaurantIds.length})`}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Active Filters Display */}
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