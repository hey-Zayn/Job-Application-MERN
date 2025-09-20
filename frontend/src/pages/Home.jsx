import React from "react";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/Hero-img.png";
import { Card } from "@/components/ui/card";
import { BaggageClaim } from "lucide-react";
const Home = () => {
  const cardData = [
    {
      title: "175,324",
      description: "Live Jobs",
      icon: <BaggageClaim />,
    },
    {
      title: "175,324",
      description: "Live Jobs",
      icon: <BaggageClaim className="h-7 w-7" />,
    },
    {
      title: "175,324",
      description: "Live Jobs",
      icon: <BaggageClaim className="h-7 w-7" />,
    },
    {
      title: "175,324",
      description: "Live Jobs",
      icon: <BaggageClaim className="h-7 w-7" />,
    },
  ];
  return (
    <div className="w-full h-full flex flex-col justify-center items-center bg-gradient-to-br from-blue-50 to-indigo-100 px-20">
      <div className="w-full min-h-[60vh] flex flex-col lg:flex-row justify-center items-center px-4  sm:px-6 lg:px-8 py-12 lg:pt-20">
        <div className="w-full lg:w-1/2 space-y-6 lg:space-y-8 max-w-2xl lg:pr-10">
          <h1 className="text-4xl sm:text-5xl lg:text-5xl font-bold text-gray-900 leading-tight">
            Find a job that suits <br className="hidden sm:block" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-700">
              your interest & skills
            </span>
            .
          </h1>

          <p className="text-lg text-gray-600 font-normal max-w-lg">
            Aliquam vitae turpis in diam convallis finibus in at risus. Nullam
            in scelerisque leo, eget sollicitudin velit bestibulum.
          </p>

          <div className="flex items-center gap-2 bg-white p-2 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
            <div className="pl-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-400"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </div>

            <input
              type="text"
              className="bg-transparent w-full py-3 px-2 outline-none text-gray-700 placeholder-gray-400"
              placeholder="Job title, keywords, or company"
            />

            <Button className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg transition-colors duration-200 whitespace-nowrap">
              Find Job
            </Button>
          </div>

          <div className="flex flex-wrap gap-3 pt-4">
            <span className="text-sm text-gray-500">Popular Searches:</span>
            {["Developer", "Designer", "Remote"].map(
              (tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-white text-gray-700 rounded-full text-sm font-medium shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-gray-200"
                >
                  {tag}
                </span>
              )
            )}
          </div>
        </div>

        <div className="w-full lg:w-1/2 mt-12 lg:mt-0 flex justify-center items-center">
          <div className="relative w-full max-w-lg">
            <img
              src={heroImg}
              alt="Professionals networking and job searching"
              className="w-full object-contain "
            />

            {/* Floating elements for visual interest */}
            <div className="absolute -top-4 -right-4 bg-white p-3 rounded-lg shadow-md hidden lg:block">
              <div className="flex items-center">
                <div className="bg-green-100 p-2 rounded-full mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-green-600"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="text-sm font-medium">10K+ Jobs Found</span>
              </div>
            </div>

            <div className="absolute -bottom-4 -left-4 bg-white p-3 rounded-lg shadow-md hidden lg:block">
              <div className="flex items-center">
                <div className="bg-blue-100 p-2 rounded-full mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-blue-600"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                  </svg>
                </div>
                <span className="text-sm font-medium">5K+ Companies</span>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className="flex flex-wrap  min-h-[40vh] justify-center items-center gap-3 mt-6">
        {cardData?.map((data, index) => (
          <Card className="w-62 shadow-lg rounded-xl border-0" key={index}>
            <div className="flex items-center gap-4 px-2">
              <div className="flex items-center justify-center h-16 w-16 rounded-lg bg-blue-600/20 text-blue-700 shadow-inner">
                {data.icon}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-blue-900 tracking-tight">
                  {" "}
                  {data.title}
                </h2>
                <p className="text-sm text-blue-700 font-medium">
                  {" "}
                  {data.description}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Home;






