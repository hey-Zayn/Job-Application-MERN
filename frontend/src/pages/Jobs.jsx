import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Bookmark,
  MapPin,
  Clock,
  Search,
  Building,
  Filter,
  X,
  ChevronDown,
  Briefcase,
  DollarSign,
  User
} from "lucide-react";
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom";
import { authInstance } from "../axios/authInstance";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  // Filter states
  const [filters, setFilters] = useState({
    keyword: '',
    location: '',
    type: '',
    experience: '',
    salary: ''
  });

  // Active filters count
  const activeFiltersCount = Object.values(filters).filter(value => value !== '').length;

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const response = await authInstance.get('/job/get-alljob');
        if (response.data.success) {
          setJobs(response.data.jobs);
        } else {
          setError('Failed to fetch jobs');
        }
      } catch (err) {
        setError('Error fetching jobs: ' + err.message);
        console.error('Error fetching jobs:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  // Handle filter changes
  const handleFilterChange = (name, value) => {
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Apply filters
  const applyFilters = (e) => {
    e?.preventDefault();
    console.log('Applying filters:', filters);
    setShowFilters(false);
  };

  // Clear filters
  const clearFilters = () => {
    setFilters({
      keyword: '',
      location: '',
      type: '',
      experience: '',
      salary: ''
    });
  };

  // Clear single filter
  const clearSingleFilter = (filterName) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: ''
    }));
  };

  // Format salary display
  const formatSalary = (salary) => {
    if (!salary || salary === 'NaN') return 'Not specified';
    return `$${salary}`;
  };

  // Calculate days ago from createdAt
  const getDaysAgo = (createdAt) => {
    const created = new Date(createdAt);
    const now = new Date();
    const diffTime = Math.abs(now - created);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return `${Math.ceil(diffDays / 30)} months ago`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading jobs...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center text-red-600">
          <p>{error}</p>
          <Button
            onClick={() => window.location.reload()}
            className="mt-4"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="mb-4 lg:mb-0">
              <h1 className="text-3xl font-bold text-gray-900">Find Your Dream Job</h1>
              <p className="text-gray-600 mt-2">Discover {jobs.length} opportunities that match your skills</p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-4 w-4" />
                Filters
                {activeFiltersCount > 0 && (
                  <Badge variant="secondary" className="ml-1 h-5 w-5 p-0 flex items-center justify-center">
                    {activeFiltersCount}
                  </Badge>
                )}
              </Button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search for jobs, companies, or keywords..."
                className="pl-10 pr-4 py-3 text-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                value={filters.keyword}
                onChange={(e) => handleFilterChange('keyword', e.target.value)}
              />
            </div>
          </div>

          {/* Active Filters */}
          {activeFiltersCount > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {filters.location && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {filters.location}
                  <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => clearSingleFilter('location')} />
                </Badge>
              )}
              {filters.type && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Briefcase className="h-3 w-3" />
                  {filters.type}
                  <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => clearSingleFilter('type')} />
                </Badge>
              )}
              {filters.experience && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  <User className="h-3 w-3" />
                  {filters.experience}
                  <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => clearSingleFilter('experience')} />
                </Badge>
              )}
              {filters.salary && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  <DollarSign className="h-3 w-3" />
                  {filters.salary}
                  <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => clearSingleFilter('salary')} />
                </Badge>
              )}
              <Button variant="ghost" size="sm" onClick={clearFilters} className="text-gray-500 hover:text-gray-700">
                Clear all
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Expanded Filters */}
      {showFilters && (
        <div className="bg-white border-b border-gray-200 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="h-4 w-4 inline mr-1" />
                  Location
                </label>
                <Input
                  type="text"
                  placeholder="City or remote"
                  value={filters.location}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                />
              </div>

              {/* Job Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Briefcase className="h-4 w-4 inline mr-1" />
                  Job Type
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                  value={filters.type}
                  onChange={(e) => handleFilterChange('type', e.target.value)}
                >
                  <option value="">All Types</option>
                  <option value="full-time">Full-time</option>
                  <option value="part-time">Part-time</option>
                  <option value="contract">Contract</option>
                  <option value="internship">Internship</option>
                  <option value="remote">Remote</option>
                </select>
              </div>

              {/* Experience Level */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="h-4 w-4 inline mr-1" />
                  Experience
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                  value={filters.experience}
                  onChange={(e) => handleFilterChange('experience', e.target.value)}
                >
                  <option value="">All Levels</option>
                  <option value="internship">Internship</option>
                  <option value="entry">Entry Level</option>
                  <option value="mid">Mid Level</option>
                  <option value="senior">Senior Level</option>
                  <option value="director">Director</option>
                </select>
              </div>

              {/* Salary Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <DollarSign className="h-4 w-4 inline mr-1" />
                  Salary Range
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                  value={filters.salary}
                  onChange={(e) => handleFilterChange('salary', e.target.value)}
                >
                  <option value="">Any Salary</option>
                  <option value="0-50">$0 - $50K</option>
                  <option value="50-100">$50K - $100K</option>
                  <option value="100-150">$100K - $150K</option>
                  <option value="150+">$150K+</option>
                </select>
              </div>
            </div>

            {/* Filter Actions */}
            <div className="flex justify-end gap-3 mt-6">
              <Button variant="outline" onClick={clearFilters}>
                Clear All
              </Button>
              <Button onClick={applyFilters}>
                Apply Filters
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Results Count */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">
            Showing <span className="font-semibold">{jobs.length}</span> jobs
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>Sort by:</span>
            <select className="border-0 bg-transparent focus:ring-0">
              <option>Most Relevant</option>
              <option>Newest</option>
              <option>Salary: High to Low</option>
            </select>
          </div>
        </div>

        {/* Jobs Grid */}
        {jobs && jobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <Link
                key={job._id}

                className="block"
              >
                <Card className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-full group">
                  {/* Header with time and bookmark */}
                  <div className="px-6 pt-6 pb-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 group-hover:from-blue-600 group-hover:to-blue-700 transition-colors">
                          <Building className="h-6 w-6 text-white" />
                        </div>
                        <div className="ml-4">
                          <h3 className="font-semibold text-gray-900">
                            {job.company?.name || "Company Name"}
                          </h3>
                          <div className="flex items-center mt-1">
                            <MapPin className="h-4 w-4 text-gray-400 mr-1" />
                            <span className="text-sm text-gray-500">
                              {job.location || "Location not specified"}
                            </span>
                          </div>
                        </div>
                      </div>
                      <button
                        className="h-9 w-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-blue-50 text-gray-500 hover:text-blue-600 transition-colors"
                        onClick={(e) => {
                          e.preventDefault();
                          console.log('Bookmark job:', job._id);
                        }}
                      >
                        <Bookmark className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Posted time */}
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-medium">
                      <Clock className="h-3.5 w-3.5 mr-1.5" />
                      {getDaysAgo(job.createdAt)}
                    </div>
                  </div>

                  {/* Content */}
                  <CardContent className="px-6 pb-4">
                    <h2 className="font-bold text-xl text-gray-900 mb-3 line-clamp-2">
                      {job.title}
                    </h2>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                      {job.description}
                    </p>

                    {/* Salary and type */}
                    <div className="flex items-center justify-between mb-4 p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="text-xs text-gray-500">Salary</p>
                        <p className="font-semibold text-gray-900">
                          {formatSalary(job.salary)}
                        </p>
                      </div>
                      <div className="h-8 w-px bg-gray-300"></div>
                      <div>
                        <p className="text-xs text-gray-500">Type</p>
                        <p className="font-semibold text-gray-900">
                          {job.jobType || "Not specified"}
                        </p>
                      </div>
                    </div>

                    {/* Skills tags */}
                    <div className="flex flex-wrap gap-2">
                      {job.requirements && job.requirements.map((skill, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                        >
                          {skill}
                        </span>
                      ))}
                      {(!job.requirements || job.requirements.length === 0) && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          No skills specified
                        </span>
                      )}
                    </div>
                  </CardContent>

                  {/* Footer with buttons */}
                  <CardFooter className="px-6 pb-6 pt-0 flex gap-3">
                    {/* <Button
                      variant="outline"
                      className="w-full h-10 flex-1 border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                      onClick={(e) => {
                        e.preventDefault();
                        console.log('Save job:', job._id);
                      }}
                    >
                      Save
                    </Button> */}
                    <Link to={`/singlejob/${job._id}`}>
                      <Button
                        className="w-full h-10 flex-1 bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-sm transition-all"
                       
                      >
                        Apply Now
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="bg-gray-100 p-6 rounded-full mb-5">
              <Search className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">No jobs found</h3>
            <p className="text-gray-600 max-w-md text-lg">
              {jobs && jobs.length === 0
                ? "There are currently no job listings available. Check back later!"
                : "Try adjusting your filters to find more opportunities that match your criteria."
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Jobs;