import React from "react";
import EventCard from "./EventCard";
import { productData } from '../../static/data'; // adjust path if needed

const Events = () => {
  // Use static event data or fallback to a simple placeholder
  const events = productData && productData.length > 0 ? productData : [];

  return (
    <div className="w-full my-12">
      <div className="flex items-center justify-between">
        <h1 className="text-[27px] font-[600] font-Roboto pb-[20px]">
          Popular Events
        </h1>
      </div>
      <div className="w-full grid">
        {events.length > 0 ? (
          events.map((event, idx) => (
            <div key={event._id || idx}>
              <EventCard data={event} />
            </div>
          ))
        ) : (
          <h4>No Events have!</h4>
        )}
      </div>
    </div>
  );
};

export default Events