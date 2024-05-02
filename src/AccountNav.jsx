import { Link, useLocation } from "react-router-dom";

export default function AccountNav() {
  const { pathname } = useLocation();
  let subpage = pathname.split("/")?.[2];
  if (subpage === undefined) {
    subpage = "profile";
  }

  function linkClasses(type = null) {
    let classes =
      "inline-flex gap-1 py-2 px-6 rounded-full text-white font-bold flex items-center justify-center mb-4 lg:mr-3"; // Add text-white and font-bold for white text and bold font
    if (type === null) {
      // Check if it's the "My Profile" link (type === null)
      if (subpage === "profile") {
        classes += " bg-primary";
      } else {
        classes += " bg-gray-200";
      }
    } else if (type === subpage) {
      classes += " bg-primary";
    } else {
      classes += " bg-gray-200";
    }
    return classes;
  }

  return (
    <nav className="w-full flex flex-wrap justify-center mt-8 mb-8">
      <Link className={`${linkClasses()} md:w-auto w-full`} to={"/account"}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 md:mr-2"
        >
          {/* ...profile SVG path */}
        </svg>
        My profile
      </Link>
      <Link
        className={`${linkClasses("bookings")} md:w-auto w-full`} // Pass "bookings" to linkClasses for bookings link
        to={"/account/bookings"}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 md:mr-2"
        >
          {/* ...bookings SVG path */}
        </svg>
        My bookings
      </Link>
      <Link
        className={`${linkClasses("places")} md:w-auto w-full`} // Pass "places" to linkClasses for places link
        to={"/account/places"}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 md:mr-2"
        >
          {/* ...places SVG path */}
        </svg>
        My accommodations
      </Link>
    </nav>
  );
}
