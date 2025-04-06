interface FooterProps {
  filterData: any;
  setFilterData: React.Dispatch<React.SetStateAction<any>>;
}

export default function Footer({ filterData, setFilterData }: FooterProps) {
  const filterOptions = Object.entries(filterData).map(([key, value]: [string, any]) => ({
    ...value,
    key,
  }));

  const handleFilterClick = (key: string, value: any) => {
    setFilterData((prevFilters: any) => {
      const isAlreadySelected = prevFilters.cuisines.includes(key);
      const cuisines = isAlreadySelected ? [] : [key]; // Allow only one cuisine

      return {
        ...prevFilters,
        cuisines,
      };
    });
  };

  return (
    <footer className="text-white p-4 text-center bg-gray-800">
      <div className="flex flex-wrap justify-center gap-2">
        {Object.entries(filterData).map(([key, value]: [string, any]) => (
          <button
            key={key}
            onClick={() => handleFilterClick(key, value)}
            className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs hover:bg-orange-600 transition"
          >
            {value.displayName} ({value.restaurantIds.length})
          </button>
        ))}
      </div>
    </footer>
  );
}
