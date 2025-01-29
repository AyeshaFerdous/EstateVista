import React from "react";

const GridLayout = () => {
  return (
    <div className="container mx-auto py-10 px-4">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
      <img
        src="https://i.ibb.co.com/5R2XZsS/pexels-binyaminmellish-1396132.jpg"
        alt=""
        className="md:col-span-2 w-full h-40 sm:h-60 md:h-full object-cover"
      />
      <img
        src="https://i.ibb.co.com/3Sxgmgw/pexels-frans-van-heerden-201846-1438832.jpg"
        alt=""
        className="w-full h-40 sm:h-60 md:h-full object-cover"
      />
      <img
        src="https://i.ibb.co.com/8NGLp1N/pexels-manishjangid-30195533.jpg"
        alt=""
        className="w-full h-40 sm:h-60 md:h-full md:row-span-2"
      />
      <img
        src="https://i.ibb.co.com/4YNdLSF/pexels-alex-staudinger-829197-1732414.jpg"
        alt=""
        className="w-full h-40 sm:h-60 md:h-full object-cover"
      />
      <img
        src="https://i.ibb.co.com/WnP3YDG/pexels-expect-best-79873-323780.jpg"
        alt=""
        className="md:col-span-2 w-full h-40 sm:h-60 md:h-full object-cover"
      />
    </div>
  </div>
  );
};

export default GridLayout;
