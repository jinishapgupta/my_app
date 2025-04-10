import React from "react";
import { LocationOn } from "@mui/icons-material";

interface HeaderProps {
  postcode: string;
  setPostcode: React.Dispatch<React.SetStateAction<string>>;
  metaData: {
    area: string;
    availability: number;
    cuisines: any[];
    deliveryCost: number;
    deliveryTime: number;
    rating: number;
  };
}

export default function Header({ postcode, setPostcode, metaData }: HeaderProps) {
  const postcodes = [
    "CT1 2EH",
    "BS1 4DJ",
    "L4 0TH",
    "NE9 7TY",
    "SW1A 1AA",
    "CF11 8AZ",
    "M16 0RA",
    "EH1 1RE",
    "BN1 1AE",
    "CB7 4DL",
    "LS2 7HY",
    "G3 8AG",
    "PL4 0DW",
    "B26 3QJ",
    "DH4 5QZ",
    "BT7 1NN",
  ];

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedPostcode = e.target.value;
    setPostcode(selectedPostcode);
  };

  return (
    <header className="bg-white px-6 py-3 flex flex-row items-center justify-between w-full  ">
      <div className="flex flex-col">
        <div className="text-orange-500 font-bold text-2xl sm:text-3xl tracking-tight">
          🍴 FoodieExpress
        </div>
        <p className="text-gray-500 text-sm mt-1">
          {metaData.area} • {metaData.availability - 1} restaurants available
        </p>
      </div>

      <div className="flex items-center bg-gray-50 rounded-md px-3 py-1 hover:bg-gray-100 transition-colors">
        <LocationOn className="text-gray-400 mr-2" sx={{ fontSize: 20 }} />
        <select
          value={postcode}
          onChange={handleSelectChange}
          className="bg-transparent text-gray-700 text-sm font-medium focus:outline-none cursor-pointer"
        >
          <option value="" disabled className="text-gray-500">
            Select location
          </option>
          {postcodes.map((code) => (
            <option key={code} value={code} className="text-gray-700 bg-white">
              {code}
            </option>
          ))}
        </select>
      </div>
    </header>
  );
}