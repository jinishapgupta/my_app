export default function Header() {
  return (
    <header className="bg-orange-800 text-white p-4 flex justify-between items-center">
      {/* Left Section: App Name and Open Restaurants */}
      <div className="w-7/10 text-left">
        <h1 className="text-2xl font-bold mb-2">FoodieExpress</h1>
        <p className="text-sm">10 Restaurants Open</p>
      </div>

      {/* Right Section: Dropdown for Postcode */}
      <div className="w-3/10">
        
        <select
          id="postcode"
          className="p-2 rounded text-black"
        >
          <option value="">Select Postcode</option>
          <option value="12345">12345</option>
          <option value="67890">67890</option>
          <option value="54321">54321</option>
        </select>
      </div>
    </header>
  );
}