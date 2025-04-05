interface FooterProps {
    data: any; 
  }
  
  export default function Footer({ data }: FooterProps) {
  const filters = [
    "Availability",
    "4+ Rating",
    "Fast Delivery",
    "Vegetarian",
  ];

  return (
    <footer className=" text-white p-4 text-center">
      <div className="flex justify-center gap-2">
        {filters.map((filter, index) => (
          <button
            key={index}
            className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs hover:bg-orange-600"
          >
            {filter}
          </button>
        ))}
      </div>
    </footer>
  );
}