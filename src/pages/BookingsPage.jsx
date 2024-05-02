import AccountNav from "../AccountNav";
import { useEffect, useState } from "react";
import axios from "axios";
import PlaceImg from "../PlaceImg";
import { differenceInCalendarDays, format } from "date-fns";
import { Link } from "react-router-dom";
import BookingDates from "../BookingDates";

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios.get("/bookings").then((response) => {
      setBookings(response.data);
    });
  }, []);

  const handleCancelBooking = async (bookingId) => {
    try {
      await axios.delete(`/bookings/${bookingId}`);
      // After successful deletion, update the state to remove the deleted booking from the list.
      setBookings((prevBookings) =>
        prevBookings.filter((booking) => booking._id !== bookingId)
      );
    } catch (error) {
      console.error("Error canceling booking:", error);
      // Handle any errors that occurred during deletion if needed.
    }
  };

  return (
    <div>
      <AccountNav />
      <div className="container">
        {bookings?.length > 0 &&
          bookings.map((booking) => (
            <div
              key={booking._id}
              className="flex flex-col sm:flex-row gap-4 bg-gray-200 rounded-2xl overflow-hidden mb-5"
            >
              <div className="w-full sm:w-48">
                <div className="aspect-w-3 aspect-h-2">
                  <PlaceImg place={booking.place} className="object-cover" />
                </div>
              </div>
              <div className="py-3 pr-3 flex-grow relative">
                <h2 className="text-xl">{booking.place.title}</h2>
                <div className="text-xl">
                  <BookingDates
                    booking={booking}
                    className="mb-2 mt-4 text-gray-500"
                  />
                  <div className="flex gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-8 h-8"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                      />
                    </svg>
                    <span className="text-2xl">
                      Total price: ${booking.price}
                    </span>
                  </div>
                </div>
                <button
                  className="bg-primary p-3 rounded-2xl text-white absolute bottom-7 right-4"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent the click from bubbling up to the parent link
                    handleCancelBooking(booking._id);
                  }}
                >
                  Cancel Booking
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
