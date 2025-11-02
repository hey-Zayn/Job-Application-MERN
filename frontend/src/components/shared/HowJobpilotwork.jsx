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
      icon: <UserRoundPlus  className="w-8 h-8 max-sm:w-10 max-sm:h-10 font-light " />,
      title: "Create account",
      description:
        "Aliquam facilisis egestas sapien, nec tempor leo tristique at.",
    },
    {
      icon: <CloudUpload className="w-8 h-8 max-sm:w-10 max-sm:h-10 font-light " />,
      title: "Upload CV/Resume",
      description:
        "Curabitur sit amet maximus ligula. Nam a nulla ante. Nam sodales",
    },
    {
      icon: <SearchX className="w-8 h-8 max-sm:w-10 max-sm:h-10 font-light " />,
      title: "Create account",
      description:
        "Aliquam facilisis egestas sapien, nec tempor leo tristique at.",
    },
    {
      icon: <BadgeCheck className="w-8 h-8 max-sm:w-10 max-sm:h-10 font-light " />,
      title: "Create account",
      description:
        "Aliquam facilisis egestas sapien, nec tempor leo tristique at.",
    },
  ];

  return (
    <div className="w-full px-20 max-sm:px-6 py-[100px] bg-[#f1f2f4]">
      <div className="relative w-full flex flex-wrap justify-between items-center gap-2 max-sm:gap-6">
        {items.map((i) => (
          <div className="w-[270px] max-sm:w-full h-[224px] max-sm:h-full p-[24px] rounded-xl  group hover:bg-white transition duration-200  max-sm:shadow-md max-sm:bg-white/50 ">
            <div className="flex justify-center items-center mb-[24px] max-sm:mb-6">
              <div
                className="w-[72px] h-[72px] flex justify-center items-center rounded-full bg-white text-blue-600 group-hover:bg-blue-600 group-hover:text-white max-sm:w-[100px] max-sm:h-[100px]  max-sm:bg-blue-600/80 max-sm:text-white
              "
              >
                {i.icon}
              </div>
            </div>
            <div className="max-sm:space-y-2">
              <h1 className="text-md max-sm:text-2xl text-center font-semibold">{i.title}</h1>
              <p className="text-sm max-sm:text-lg text-black/50 text-center ">
                {i.description}
              </p>
            </div>
          </div>
        ))}
        <img src={Arrows1} alt="Arrows" className="absolute left-[15%] -top-2  max-sm:hidden" />
        <img src={Arrows2} alt="Arrows" className="absolute left-[40%] top-20  max-sm:hidden" />
        <img src={Arrows1} alt="Arrows" className="absolute left-[65%] -top-2  max-sm:hidden" />
      </div>
    </div>
  );
};

export default HowJobpilotwork;
