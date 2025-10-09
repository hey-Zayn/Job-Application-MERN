import React from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Apple,
  Bookmark,
  LucideSave,
  MapPin,
  Save,
  SaveAllIcon,
  SaveOff,
  Clock
} from "lucide-react";
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom";
const Jobs = () => {
  const jobsArr = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <div className="w-full min-h-screen flex bg-gray-50">
      {/* Sidebar Filters */}
      <div className="w-72 sticky top-0 h-screen border-r border-gray-200 bg-white overflow-y-auto">
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Filter Jobs</h2>
          <form className="flex flex-col gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="keyword">
                Keywords
              </label>
              <input
                id="keyword"
                name="keyword"
                type="text"
                placeholder="e.g. Frontend, Designer, Marketing"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="location">
                Location
              </label>
              <input
                id="location"
                name="location"
                type="text"
                placeholder="e.g. Remote, New York, London"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="type">
                Job Type
              </label>
              <select
                id="type"
                name="type"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                <option value="">All Job Types</option>
                <option value="full-time">Full-time</option>
                <option value="part-time">Part-time</option>
                <option value="contract">Contract</option>
                <option value="internship">Internship</option>
                <option value="remote">Remote</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="experience">
                Experience Level
              </label>
              <select
                id="experience"
                name="experience"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                <option value="">All Levels</option>
                <option value="internship">Internship</option>
                <option value="entry">Entry Level</option>
                <option value="mid">Mid Level</option>
                <option value="senior">Senior Level</option>
                <option value="director">Director</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="salary">
                Salary Range
              </label>
              <select
                id="salary"
                name="salary"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                <option value="">Any Salary</option>
                <option value="0-50">$0 - $50K</option>
                <option value="50-100">$50K - $100K</option>
                <option value="100-150">$100K - $150K</option>
                <option value="150+">$150K+</option>
              </select>
            </div>

            <button
              type="submit"
              className="mt-2 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-medium shadow-md"
            >
              Apply Filters
            </button>

            <button
              type="button"
              className="w-full border border-gray-300 text-gray-700 py-2.5 rounded-lg hover:bg-gray-50 transition font-medium"
            >
              Clear Filters
            </button>
          </form>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Available Jobs</h1>
          <p className="text-gray-600">Showing {jobsArr?.length || 0} results</p>
        </div>

        {jobsArr && jobsArr.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {jobsArr.map((data, index) => (

              <Link to="/singlejob">
                <Card key={index} className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
                  {/* Header with time and bookmark */}
                  <div className="px-5 pt-5 pb-3">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600">
                          <Apple className="h-5 w-5 text-white" />
                        </div>
                        <div className="ml-3">
                          <h3 className="font-semibold text-gray-900 text-sm">{data.company || "Apple Inc."}</h3>
                          <div className="flex items-center mt-0.5">
                            <MapPin className="h-3.5 w-3.5 text-gray-400 mr-1" />
                            <span className="text-xs text-gray-500">{data.location || "Cupertino, CA • Remote"}</span>
                          </div>
                        </div>
                      </div>
                      <button className="h-8 w-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-blue-50 text-gray-500 hover:text-blue-600 transition-colors">
                        <Bookmark className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Posted time */}
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-medium">
                      <Clock className="h-3.5 w-3.5 mr-1.5" />
                      {data.posted || "Posted 2 days ago"}
                    </div>
                  </div>

                  {/* Content */}
                  <CardContent className="px-5 pb-4">
                    <h2 className="font-bold text-lg text-gray-900 mb-2">{data.title || "Senior Frontend Engineer"}</h2>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                      {data.description || "Join our team to build innovative user experiences using React, TypeScript, and modern web technologies."}
                    </p>

                    {/* Salary and type */}
                    <div className="flex items-center justify-between mb-4 p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="text-xs text-gray-500">Salary</p>
                        <p className="font-semibold text-gray-900 text-sm">{data.salary || "$120K - $150K"}</p>
                      </div>
                      <div className="h-4 w-px bg-gray-300"></div>
                      <div>
                        <p className="text-xs text-gray-500">Type</p>
                        <p className="font-semibold text-gray-900 text-sm">{data.type || "Full-time"}</p>
                      </div>
                    </div>

                    {/* Skills tags */}
                    <div className="flex flex-wrap gap-2">
                      {(data.skills || ["React", "TypeScript", "Next.js", "Tailwind"]).map((skill, i) => (
                        <span key={i} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </CardContent>

                  {/* Footer with buttons */}
                  <CardFooter className="px-5 pb-5 pt-0 flex gap-3">
                    <Button
                      variant="outline"
                      className="h-9 flex-1 border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors text-sm"
                    >
                      Save
                    </Button>
                    <Button className="h-9 flex-1 bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-sm transition-all text-sm">
                      Apply Now
                    </Button>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="bg-gray-100 p-6 rounded-full mb-5">
              <Search className="h-10 w-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No jobs found</h3>
            <p className="text-gray-600 max-w-md">
              Try adjusting your filters to find more opportunities that match your criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Jobs;
