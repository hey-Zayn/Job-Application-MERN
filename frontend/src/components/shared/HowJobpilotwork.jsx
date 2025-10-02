import {
  BadgeCheck,
  CloudUpload,
  SearchX,
  UserPlus,
  UserRoundPlus,
} from "lucide-react";
import React from "react";
import Arrows1 from "../../assets/Arrows1.png";
import Arrows2 from "../../assets/Arrows2.png";
const HowJobpilotwork = () => {
  const items = [
    {
      icon: <UserRoundPlus size={32} className="font-light " />,
      title: "Create account",
      description:
        "Aliquam facilisis egestas sapien, nec tempor leo tristique at.",
    },
    {
      icon: <CloudUpload size={32} className="font-light " />,
      title: "Upload CV/Resume",
      description:
        "Curabitur sit amet maximus ligula. Nam a nulla ante. Nam sodales",
    },
    {
      icon: <SearchX size={32} className="font-light " />,
      title: "Create account",
      description:
        "Aliquam facilisis egestas sapien, nec tempor leo tristique at.",
    },
    {
      icon: <BadgeCheck size={32} className="font-light " />,
      title: "Create account",
      description:
        "Aliquam facilisis egestas sapien, nec tempor leo tristique at.",
    },
  ];

  return (
    <div className="w-full px-20 py-[100px] bg-[#f1f2f4]">
      <div className="relative w-full flex flex-wrap justify-between items-center gap-2">
        {items.map((i) => (
          <div className="w-[270px] h-[224px] p-[24px] rounded-xl  group hover:bg-white transition duration-200  ">
            <div className="flex justify-center items-center mb-[24px] ">
              <div
                className="w-[72px] h-[72px] flex justify-center items-center rounded-full bg-white text-blue-600 group-hover:bg-blue-600 group-hover:text-white 
              "
              >
                {i.icon}
              </div>
            </div>
            <div>
              <h1 className="text-md text-center font-semibold">{i.title}</h1>
              <p className="text-sm text-black/50 text-center ">
                {i.description}
              </p>
            </div>
          </div>
        ))}
        <img src={Arrows1} alt="Arrows" className="absolute left-[15%] -top-2  " />
        <img src={Arrows2} alt="Arrows" className="absolute left-[40%] top-20  " />
        <img src={Arrows1} alt="Arrows" className="absolute left-[65%] -top-2  " />
      </div>
    </div>
  );
};

export default HowJobpilotwork;
