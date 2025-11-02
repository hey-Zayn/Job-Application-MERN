import { ArrowRight, Bookmark, BookMarked, Locate, MapPin } from "lucide-react";
import React from "react";
import EmployersLogo from "../../assets/EmployersLogo.png";
const Featuredjob = () => {
  const jobslist = [
    {
      title: "Frontend Engineer",
      type: "Full Time",
      Salary: "$80,000 - $110,000",
      companyName: "Meta Platforms",
      location: "San Francisco, USA",
      active: true,
    },
    {
      title: "UI/UX Designer",
      type: "Part Time",
      Salary: "$40,000 - $60,000",
      companyName: "Spotify",
      location: "Stockholm, Sweden",
      active: true,
    },
    {
      title: "Data Scientist",
      type: "Remote",
      Salary: "$90,000 - $120,000",
      companyName: "Netflix",
      location: "Los Gatos, USA",
      active: false,
    },
    {
      title: "Backend Developer",
      type: "Contract",
      Salary: "$70,000 - $100,000",
      companyName: "Amazon",
      location: "Berlin, Germany",
      active: false,
    },
    {
      title: "Mobile App Developer",
      type: "Full Time",
      Salary: "$75,000 - $105,000",
      companyName: "Airbnb",
      location: "London, UK",
      active: false,
    },
    {
      title: "DevOps Engineer",
      type: "Full Time",
      Salary: "$85,000 - $115,000",
      companyName: "Shopify",
      location: "Toronto, Canada",
      active: false,
    },
    {
      title: "Machine Learning Engineer",
      type: "Remote",
      Salary: "$95,000 - $130,000",
      companyName: "DeepMind",
      location: "London, UK",
      active: false,
    },
    {
      title: "Cloud Solutions Architect",
      type: "Full Time",
      Salary: "$120,000 - $150,000",
      companyName: "Google Cloud",
      location: "Zurich, Switzerland",
      active: true,
    },
    {
      title: "Game Developer",
      type: "Contract",
      Salary: "$60,000 - $90,000",
      companyName: "Epic Games",
      location: "Cary, USA",
      active: false,
    },
    {
      title: "Cybersecurity Analyst",
      type: "Part Time",
      Salary: "$50,000 - $75,000",
      companyName: "CrowdStrike",
      location: "Austin, USA",
      active: false,
    },
    {
      title: "Product Manager",
      type: "Full Time",
      Salary: "$110,000 - $140,000",
      companyName: "Slack",
      location: "Dublin, Ireland",
      active: false,
    },
    {
      title: "Blockchain Developer",
      type: "Remote",
      Salary: "$100,000 - $135,000",
      companyName: "Binance",
      location: "Singapore",
      active: true,
    },
  ];

  return (
    <div className="w-full px-20 max-sm:px-6 py-[100px]">
      <div className="w-full flex   justify-between items-center">
        <h1 className="text-3xl font-semibold">Popular category</h1>
        <button className="text-blue-600 text-md flex items-center gap-1 cursor-pointer">
          View All <ArrowRight size={16} />
        </button>
      </div>
      <div className="grid lg:grid-cols-3 max-md:grid-cols-1 gap-4 mt-[50px]">
        {jobslist?.map((i) => (
          <div
            key={i}
            className="w-[424] h-[170px]  max-sm:h-full p-[24px] max-sm:w-full  flex flex-col gap-2  group rounded-xl border border-gray-200 max-sm:shadow-md"
            style={{
              background: i.active
                ? "linear-gradient(to right, #fff6e7, #fff)"
                : "#fff",
            }}
          >
            <div className="space-y-2">
              <h1 className="text-xl max-sm:text-2xl cursor-pointer">{i.title}</h1>
              <div className="flex gap-3 space-y-2">
                <h4 className="bg-green-600/20 text-xs text-green-700 px-2 py-1 rounded-full">
                  <span className="text-[11px] max-sm:text-[13px] font-bold uppercase">{i.type}</span>
                </h4>
                <h3 className="text-[12px] max-sm:text-[15px] font-bold text-black/50">
                  Salary: <span>{i.Salary}</span>
                </h3>
              </div>
            </div>
            <div className="space-y-2 text-start">
              <div className="flex items-center justify-between gap-2">
                <div className="flex gap-2">
                  <img src={EmployersLogo} alt="company Logo" className="cursor-pointer max-sm:w-12 max-sm:h-12 "/>
                  <div className="text-left ">
                    <h3 className="text-sm max-sm:text-[16px] text-black/80 font-semibold">
                      {i.companyName}
                    </h3>
                    <h5 className="flex items-center gap-1 text-sm max-sm:text-[16px] text-black/50">
                      <MapPin className="w-4 h-4 max-sm:w-5 max-sm:h-5" />
                      {i.location}
                    </h5>
                  </div>
                </div>
                <div className="text-black/50 ">
                  <button className="cursor-pointer">
                  <Bookmark  className="w-5 h-5 max-sm:w-6 max-sm:h-6" />

                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Featuredjob;
