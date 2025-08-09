import React from "react";
// import { useSelector } from "react-redux";
import EventCard from "../components/Events/EventCard";
import Header from "../components/Layout/Header";
// import Loader from "../components/Layout/Loader";
import { productData } from '../static/data';

const EventsPage = () => {
  // const { allEvents, isLoading } = useSelector((state) => state.events);
  return (
    <>
      {/* {isLoading ? (
        <Loader />
      ) : ( */}
        <div>
          <Header activeHeading={4} />
          {productData && productData.length > 0 && (
            <EventCard active={true} data={productData[0]} />
          )}
        </div>
      
    </>
  );
};

export default EventsPage;