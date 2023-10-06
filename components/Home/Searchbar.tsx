"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { ChangeEvent, useState } from "react";

export default function Searchbar() {
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleGetSuggestions = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    try {
      const res: any = await fetch(`/api/maps/places?input=${e.target.value}`);
      const data = await res.json();
      setSuggestions(data.descriptions);
    } catch (error) {}
  };

  //TODO: Add open post locations page
  const handleOpenLocation = () => {};

  return (
    <div className="bg-white rounded w-128">
      <div className="flex items-center px-2 h-20">
        <input
          type="text"
          onChange={(e) => handleGetSuggestions(e)}
          className="outline-none flex-1 mx-4 text-slate-800 bg-white text-base"
          placeholder="Enter address, neighbour or city"
        />
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className="flex-none text-gray-400 mr-4"
        />
      </div>

      <div className="text-base">
        <ul className="border-t border-grey-400">
          {suggestions.map((suggestion: string, index) => (
            <li
              key={index}
              className="py-3.5 px-2 flex items-center cursor-pointer hover:bg-slate-200 active:bg-slate-400"
              onClick={() => handleOpenLocation()}
            >
              <FontAwesomeIcon
                icon={faLocationDot}
                className="flex-none mr-2"
              />
              <span className="flex-1">{suggestion}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
