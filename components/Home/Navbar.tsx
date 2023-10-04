import NavbarAuthState from "./NavbarAuthState";
import NavbarOptions from "./NavbarOptions";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-screen flex justify-between px-2 py-2 items-center md:shadow-lg">
      <NavbarOptions />
      <Link className="text-xl text-blue-700 font-kanit" href="/">
        Millow
      </Link>
      <NavbarAuthState />
    </nav>
  );
}
