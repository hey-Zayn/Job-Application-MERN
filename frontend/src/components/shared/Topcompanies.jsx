import React from "react";
import { ArrowRight, Bookmark, BookMarked, Locate, MapPin } from "lucide-react";
import EmployersLogo from "../../assets/EmployersLogo.png";

const Topcompanies = () => {
  const jobslist = [
    {
      Featured: "Featured",

      companyName: "Dribbble",
      location: "San Francisco, USA",
      openPositions: 4,
      active: false,
    },
    {
      Featured: "Featured",
      companyName: "Google",
      location: "Mountain View, USA",
      openPositions: 12,
      active: true,
    },
    {
      Featured: "Hot",
      companyName: "Microsoft",
      location: "Redmond, USA",
      openPositions: 8,
      active: false,
    },
    {
      Featured: "Urgent",
      companyName: "Shopify",
      location: "Ottawa, Canada",
      openPositions: 3,
      active: false,
    },
    {
      Featured: "Featured",
      companyName: "Spotify",
      location: "Stockholm, Sweden",
      openPositions: 6,
      active: true,
    },
    {
      Featured: "New",
      companyName: "Airbnb",
      location: "San Francisco, USA",
      openPositions: 5,
      active: false,
    },
  ];
  return (
    <div className="w-full px-20 max-sm:px-6 py-[100px]">
      <div className="w-full flex   justify-between items-center">
        <h1 className="text-3xl font-semibold">Top companies</h1>
        <button className="text-blue-600 text-md flex items-center gap-1 cursor-pointer">
          View All <ArrowRight size={16} />
        </button>
      </div>
      <div className="grid lg:grid-cols-3 max-md:grid-cols-1  gap-4 mt-[50px]">
        {jobslist?.map((i) => (
          <div
            key={i}
            className="w-[424]  max-sm:h-full p-[24px] max-sm:w-full  flex flex-col gap-4  group rounded-xl border border-gray-200 "
            style={{
              background: i.active
                ? "linear-gradient(to right, #fff6e7, #fff)"
                : "#fff",
            }}
          >
            
            <div className="space-y-2 text-start">
              <div className="flex items-center justify-between gap-2">
                <div className="flex gap-3">
                  <img
                    src={EmployersLogo}
                    alt="company Logo"
                    className="cursor-pointer max-sm:w-12 max-sm:h-12 "
                  />
                  <div className="text-left ">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm max-sm:text-[16px] text-black/80 font-semibold">
                        {i.companyName}
                      </h3>
                      <h4 className="bg-red-600/20 text-xs text-red-700 font-semibold px-2 py-1 rounded-full">
                        <span className="text-[11px] max-sm:text-[12px] max-sm:font-bold uppercase">{i.Featured}</span>
                      </h4>
                    </div>
                    <h5 className="flex items-center gap-1 text-sm max-sm:text-[16px] text-black/50">
                      <MapPin className="w-4 h-4 max-sm:w-5 max-sm:h-5" />
                      {i.location}
                    </h5>
                  </div>
                </div>
                
              </div>
            </div>
            <div>
              <button className="w-full py-2 text-center bg-blue-400/20 text-blue-600 font-bold rounded cursor-pointer">
                Open Positions <span>({i.openPositions})</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Topcompanies;
