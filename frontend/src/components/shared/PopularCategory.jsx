import { ArrowRight, ChartColumn, Code, Cross, Database, Megaphone, Monitor, MonitorPlay, Music, Pen } from "lucide-react";
import React from "react";

const PopularCategory = () => {
  const item = [
    {
      icons: <Pen />,
      title: "Graphics & Design",
      desciption: "357 Open position",
    },
    {
      icons: <Code />,
      title: "Code & Programing",
      desciption: "312 Open position",
    },
    {
      icons: <Megaphone />,
      title: "Digital Marketing",
      desciption: "357 Open position",
    },
    {
      icons: <MonitorPlay />,
      title: "Account & Finance",
      desciption: "357 Open position",
    },
    {
      icons: <Music />,
      title: "Music & Audio",
      desciption: "357 Open position",
    },
    {
      icons:<ChartColumn />,
      title: "Account & Finance",
      desciption: "357 Open position",
    },
    {
      icons:<Cross />,
      title: "Health & Care",
      desciption: "357 Open position",
    },
    {
      icons: <Database />,
      title: "Data & Science",
      desciption: "357 Open position",
    },
   
  ];

  return (
    <div className="w-full px-20 py-[100px]">
      <div className="w-full flex max-sm:flex-col  justify-between items-center">
        <h1 className="text-3xl font-semibold">Popular category</h1>
        <button className="text-blue-600 text-md flex items-center gap-1 cursor-pointer">
          View All <ArrowRight size={16} />
        </button>
      </div>
      <div className="grid md:grid-cols-4 sm:grid-cols-2  mt-[50px]">
        
        {item.map((i) => (
          <div className="w-[270px] h-[116px] py-[24px] px-2 flex gap-4 group  rounded-xl ">
            <div>
              <div className="p-4 bg-blue-100 text-blue-600 rounded-xl group-hover:bg-blue-600 group-hover:text-white">
               {i.icons}
              </div>
            </div>
            <div className="space-y-1 text-start">
              <h2 className="text-md font-semibold"> {i.title} </h2>
              <p className="text-sm text-black/50"> {i.desciption} </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularCategory;
