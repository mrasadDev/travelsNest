import { useContext, useState } from "react";
import { UserContext } from "../UserContext.jsx";
import axios from "axios";
import AccountNav from "../AccountNav.jsx";
import { Navigate, useParams } from "react-router-dom";
import PlacesPage from "./PlacesPage.jsx";

const ProfilePage = () => {
  const [redirect, setRedirect] = useState(null);
  const { ready, user, setUser } = useContext(UserContext);
  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = "profile";
  }

  async function logOut() {
    await axios.post("/logout");
    setRedirect("/");
    setUser(null);
  }

  if (!ready) {
    return "Loading...";
  }

  if (ready && !user && !redirect) {
    return <Navigate to={"/login"} />;
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div>
      <AccountNav />
      {subpage === "profile" && (
        <div className="text-start py-4">
          <h2 className="text-2xl text-bold mb-4">User Profile:</h2>
          <h3 className="italic text-2xl ">
            Hello Dear {user.name} , Hope You are Doing
          </h3>
          TravelNest provide a convenient and personalized experience for
          travelers. With TravelNest, you can easily manage your travel
          preferences, bookings, and personal information all in one place. It
          simplifies the booking process and offers tailored recommendations
          based on your preferences.
          <br />
          <div className="text-center mt-6">
            <p>
              You are Currently Logged in as
              <span className="italic text-bold text-xl">
                {" "}
                {user.name}
              </span>{" "}
              with email:{" "}
              <span className="italic text-bold text-xl">({user.email})</span>
            </p>
            <p className="mt-2">
              If You want to log out from TravelNest , Click on
            </p>
            <button
              onClick={logOut}
              className="bg-primary p-2 px-4 mt-4 w-40 h-30 rounded-full text-white"
            >
              Log Out
            </button>
          </div>
          <div className="text-3xl text-bold mt-5 mb-4 text-primary text-center">
            About US
          </div>
          <h2 className="text-2xl text-bold mt-5 mb-4">
            Benefits Having TravelNest Profile
          </h2>
          One of the key advantages of having TravelNest user profile is the
          ability to Create and manage your favorite accommodations. By saving
          properties that caught your interest, you can easily compare them,
          track their availability, and access them later for future bookings.
          This feature is especially beneficial for frequent travelers or those
          planning multiple trips.
          <br />
          Moreover, TravelNest utilizes the data from your user profile to
          provide personalized recommendations that align with your travel
          style. By analyzing your past bookings, saved properties, and browsing
          history, the platform suggests accommodations, destinations, and
          activities that suit your preferences. This customization enhances
          your overall travel planning experience by presenting options that are
          more relevant to your needs and interests.
          <h2 className="text-2xl text-bold mt-5 mb-4">
            Privacy Feature of TravelNest
          </h2>
          <br />
          It's important to note that TravelNest takes user privacy and data
          protection seriously. Your personal information is securely stored and
          used for the purpose of facilitating your travel bookings and
          improving your experience on the platform. TravelNest adheres to
          strict privacy standards and regulations to ensure the confidentiality
          and security of your data.
        </div>
      )}
      {subpage === "places" && <PlacesPage />}
    </div>
  );
};

export default ProfilePage;
