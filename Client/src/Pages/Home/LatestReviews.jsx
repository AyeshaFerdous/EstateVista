import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Marquee from "react-fast-marquee";

const LatestReviews = () => {
  // Fetch latest 3 user reviews
  const { data: latestReviews = [], isLoading } = useQuery({
    queryKey: ["latestReviews"],
    queryFn: async () => {
      const { data } = await axios.get(`${import.meta.env.VITE_URL}/latest-reviews`);
      return data; // Ensure only 3 reviews are displayed
    },
  });

  if (isLoading) {
    return <p className="text-center text-xl">Loading...</p>;
  }

  return (
    <section className="container mx-auto p-6 my-10">
      <h2 className="text-4xl font-bold text-center my-8">Latest User Reviews</h2>

      <Marquee pauseOnHover speed={50}>
        {latestReviews.map((review) => (
          <div key={review._id} className="bg-white shadow-lg rounded-lg p-6 h-[250px] mx-4 w-[350px]">
            <div className="flex items-center gap-4">
              <img
                src={review.image}
                alt={review.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h3 className="text-lg font-bold">{review.name}</h3>
                <p className="text-sm text-gray-500">{review.propertyTitle}</p>
              </div>
            </div>
            <p className="text-gray-700 mt-4">{review.comment}</p>
          </div>
        ))}
      </Marquee>
    </section>
  );
};

export default LatestReviews;
