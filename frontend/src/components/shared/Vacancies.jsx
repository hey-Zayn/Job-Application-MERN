import React from "react";

const Vacancies = () => {
  const dmeo = [
    {
      title: "Anesthesiologists",
      description: "45,904 Open Positions",
    },
    {
      title: "Surgeons",
      description: "50,364 Open Positions",
    },
    {
      title: "Obstetricians-Gynecologists",
      description: "45,904 Open Positions",
    },
    {
      title: "Orthodontists",
      description: "45,904 Open Positions",
    },
    {
      title: "Maxillofacial Surgeons",
      description: "45,904 Open Positions",
    },
    {
      title: "Software Developerh",
      description: "45,904 Open Positions",
    },
    {
      title: "Psychiatrists",
      description: "45,904 Open Positions",
    },
    {
      title: "Data Scientist",
      description: "45,904 Open Positions",
    },
    {
      title: "Financial Manager",
      description: "45,904 Open Positions",
    },
    {
      title: "Management Analysis",
      description: "45,904 Open Positions",
    },
    {
      title: "IT Manager",
      description: "45,904 Open Positions",
    },
    {
      title: "Operations Research Analysis",
      description: "45,904 Open Positions",
    },
  ];
  return (
    <div className="w-full px-20 max-sm:px-6 py-[100px] ">
      <div className="space-y-6 max-sm:space-y-2 ">
        <h1 className="text-3xl text-black/90 font-semibold px-4 ">Most Popular Vacancies</h1>
       
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
          {dmeo.map((item) => (
            <div className="flex flex-col bg-white rounded-lg  shadow-md p-5 group transition duration-200 cursor-pointer ">
              <h3 className="text-md max-sm:text-xl text-black/80 font-semibold mb-1 group-hover:text-blue-600 ">{item.title}</h3>
              <p className="text-gray-500 text-xs max-sm:text-lg">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Vacancies;
