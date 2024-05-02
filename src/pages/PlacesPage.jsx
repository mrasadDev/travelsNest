import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import AccountNav from "../AccountNav";

const PlacesPage = () => {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get("/user-places").then(({ data }) => {
      setPlaces(data);
    });
  }, []);

  const navigate = useNavigate();

  const handleClick = (placeId) => {
    navigate(`/account/places/${placeId}`);
  };

  const handleDeletePost = async (postId) => {
    try {
      await axios.delete(`/place-delete/${postId}`);
      // Perform any further actions or UI updates upon successful deletion
      console.log("Post deleted successfully");
      // Retrieve the updated list of places
      const response = await axios.get("/user-places");
      setPlaces(response.data);
    } catch (error) {
      // Handle error scenarios
      console.error(error);
    }
  };

  const handleDeletePlace = async (event, placeId) => {
    event.stopPropagation();
    try {
      await handleDeletePost(placeId);
      // Retrieve the updated list of places
      const response = await axios.get("/user-places");
      console.log("Updated places after deletion:", response.data);
      setPlaces(response.data);
    } catch (error) {
      // Handle error scenarios
      console.error(error);
    }
  };

  return (
    <>
      <AccountNav />
      <div className="text-center py-2">
        <Link
          className=" inline-flex gap-2 bg-primary text-white py-2 px-6 rounded-full"
          to={"/account/places/new"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Add new place
        </Link>
        <div className="text-xl text-bold flex felx-start items-center">
          List of all added Places
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-6 mt-2 ml-2 text-bold"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </div>
      </div>
      <div className="mt-4 relative">
        {places.length > 0 &&
          places.map((place) => (
            <div
              key={place._id}
              className="flex flex-col sm:flex-row gap-4 bg-gray-100 mb-5 rounded-2xl cursor-pointer"
              onClick={() => handleClick(place._id)}
            >
              <div className="w-full sm:w-32 h-32 bg-gray-300 flex-shrink-0">
                {place.photos.length > 0 && (
                  <img
                    className="object-cover w-full h-full"
                    src={"http://localhost:4000/uploads/" + place.photos[0]}
                    alt=""
                  />
                )}
              </div>
              <div className="flex-grow flex-shrink">
                <h2 className="text-xl">{place.title}</h2>
                <p className="text-sm mt-2 sm:w-full">{place.description}</p>
                <h3 className="text-xl mt-2">${place.price}</h3>
              </div>
              <div>
                <button
                  className="bg-primary p-3 rounded-2xl text-white absolute bottom-7 right-4"
                  onClick={(event) => handleDeletePlace(event, place._id)}
                >
                  Delete Place
                </button>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default PlacesPage;
