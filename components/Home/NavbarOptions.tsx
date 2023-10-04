"use client";
import { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

export default function NavbarOptions() {
  const [showDialog, setShowDialog] = useState(false);
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const handleOpen = () => {
    setShowDialog(true);
  };

  const handleClose = () => {
    setShowDialog(false);
  };

  return (
    <div className="md:hidden">
      <button className="text-black" onClick={() => handleOpen()}>
        <FontAwesomeIcon icon={faBars} size="lg" />
      </button>

      {showDialog && (
        <div className="fixed inset-0 bg-white">
          <button
            className="mt-2 pl-2 text-black"
            onClick={() => handleClose()}
          >
            <FontAwesomeIcon icon={faXmark} size="lg" />
          </button>
        </div>
      )}
    </div>
  );
}
