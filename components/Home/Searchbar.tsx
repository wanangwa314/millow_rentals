"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { ChangeEvent, useState } from "react";
import { useRouter } from 'next/navigation'

type SearchBarProps = {
  className: string
}

type Suggestion = {
  place_id: string,
  description: string,
}

export default function Searchbar(props: SearchBarProps) {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const router = useRouter();

  const handleGetSuggestions = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    try {
      const res: any = await fetch(`/api/maps/places?input=${e.target.value}`);
      const data = await res.json();
      setSuggestions(data.descriptions);
    } catch (error) {}
  };

  //TODO: Add open post locations page
  const handleOpenLocation = (placeId: string) => {
    router.push(`/view/${placeId}`);
  };

  return (
    <div className={`bg-white rounded w-[500px] ${props.className}`}>
      <div className="flex items-center px-2 h-20">
        <input
          type="text"
          onChange={(e) => handleGetSuggestions(e)}
          className="outline-none flex-1 mx-4 text-slate-800 bg-white text-base"
          placeholder="Enter address, neighbourhood or city"
        />
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className="flex-none text-gray-400 mr-4"
        />
      </div>

      <div className="text-base shadow-md">
        <ul className="border-t border-grey-400">
          {suggestions.map((suggestion: Suggestion , index) => (
            <li
              key={index}
              className="py-3.5 px-2 flex items-center cursor-pointer hover:bg-slate-200 active:bg-slate-400"
              onClick={() => handleOpenLocation(suggestion.place_id)}
            >
              <FontAwesomeIcon
                icon={faLocationDot}
                className="flex-none mr-2"
              />
              <span className="flex-1">{suggestion.description}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
