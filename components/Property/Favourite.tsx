"use client";

import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

type FavouriteProps = {
  className?: string;
};
export default function Favourite(props: FavouriteProps) {
  const [favourited, setFavourited] = useState(false);
  const handleFavouriteBtn = () => {
    setFavourited((prevFavourited) => !prevFavourited);
  };
  return (
    <button
      onClick={handleFavouriteBtn}
      className={`${props.className} drop-shadow-md`}
    >
      {favourited ? (
        <FontAwesomeIcon icon={faHeartSolid} size="xl" />
      ) : (
        <FontAwesomeIcon icon={faHeart} size="xl" />
      )}
    </button>
  );
}
