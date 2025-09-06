import React, { useEffect } from "react";
import EventCard from "./EventCard";
import { useSelector } from "react-redux";

const Events = () => {
  const { allEvents = [] } = useSelector((state) => state.event);

  return (
    <div className="w-full my-12">
      <div className="flex items-center justify-between">
        <h1 className="text-[27px] font-[600] font-Roboto pb-[20px]">
          Popular Events
        </h1>
      </div>
      <div className="w-full grid">
        {allEvents.length > 0 ? (
          allEvents.map((event, idx) => (
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