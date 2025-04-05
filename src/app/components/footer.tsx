export default function Footer() {
  return (
    <footer className="bg-orange-300 text-white p-4 text-center">
      <div className="flex justify-center gap-2">
        {/* Filter: Availability */}
        <button className="bg-white text-orange-800 px-2 py-1 rounded-full text-xs hover:bg-orange-100">
          Availability
        </button>

        {/* Filter: 4+ Rating */}
        <button className="bg-white text-orange-800 px-2 py-1 rounded-full text-xs hover:bg-orange-100">
          4+ Rating
        </button>

        {/* Filter: Fast Delivery */}
        <button className="bg-white text-orange-800 px-2 py-1 rounded-full text-xs hover:bg-orange-100">
          Fast Delivery
        </button>

        {/* Filter: Vegetarian */}
        <button className="bg-white text-orange-800 px-2 py-1 rounded-full text-xs hover:bg-orange-100">
          Vegetarian
        </button>
      </div>
    </footer>
  );
}