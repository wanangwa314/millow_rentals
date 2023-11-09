import { faShare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Favourite from "./Favourite";

export default function ViewPropertyActions() {
  return (
    <div className="flex justify-between gap-1 items-center p-2 border-b border-grey-400 shadow w-full md:px-32 lg:px-2">
      <button className="text-white bg-blue-700 hover:bg-blue-800 active:bg-blue-500 px-4 py-2  rounded">
        Request to apply
      </button>
      <button className="border border-blue-700 text-blue-700 px-4 py-2 rounded mr-4 hover:bg-blue-800 hover:text-white active:bg-blue-500 ">
        Request to tour
      </button>
      <span className="mr-4 text-blue-700 hover:text-blue-800">
        <Favourite /> Save
      </span>
      <button className="text-blue-700 hover:text-blue-800 active:text-blue-500">
        <FontAwesomeIcon icon={faShare} size="xl" /> Share
      </button>
    </div>
  );
}
