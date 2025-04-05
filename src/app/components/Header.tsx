import React from "react";

interface HeaderProps {
  postcode: string;
  setPostcode: React.Dispatch<React.SetStateAction<string>>;
}

export default function Header({ postcode, setPostcode }: HeaderProps) {
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
    <header className="text-orange-300 p-4 flex justify-between items-center">
      <div className="w-7/10 text-left">
        <h1 className="text-2xl font-bold mb-2">FoodieExpress</h1>
        <p className="text-sm">Find restaurants near you!</p>
      </div>

      <div className="w-3/10 flex items-center gap-2">
        <select
          value={postcode}
          onChange={handleSelectChange}
          className="p-2 border border-orange-300 rounded text-black w-full"
        >
          <option value="" disabled>
            Select a postcode
          </option>
          {postcodes.map((code) => (
            <option key={code} value={code}>
              {code}
            </option>
          ))}
        </select>
      </div>
    </header>
  );
}