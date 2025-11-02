import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar, 
  MapPin, 
  Building, 
  DollarSign, 
  Clock, 
  Users, 
  Bookmark, 
  Share2, 
  ArrowLeft,
  CheckCircle,
  Briefcase,
  GraduationCap,
  FileText,
  Loader2
} from "lucide-react";
import { toast } from "sonner";
import { authInstance } from '../../axios/authInstance';

const SingleJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [jobData, setJobData] = useState(null);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true);
        const response = await authInstance.get(`/job/get-jobbyid/${id}`);
        
        if (response.data.success) {
          setJobData(response.data.job);
        } else {
          setError('Failed to fetch job details');
        }
      } catch (err) {
        setError('Error fetching job: ' + (err.response?.data?.message || err.message));
        console.error('Error fetching job:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchJob();
    }
  }, [id]);

  const handleSaveJob = () => {
    setIsSaved(!isSaved);
    toast.success(isSaved ? "Job removed from saved" : "Job saved successfully!");
  };

  const handleApply = () => {
    toast.success("Application submitted successfully!");
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Job link copied to clipboard!");
  };

  const getInitials = (name) => {
    if (!name) return 'CN';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const formatSalary = (salary) => {
    if (!salary || salary === 'NaN') return 'Not specified';
    return `$${salary}`;
  };

  const formatExperience = (level) => {
    const levels = {
      1: 'Entry Level',
      2: 'Mid Level',
      3: 'Senior Level',
      4: 'Director'
    };
    return levels[level] || 'Not specified';
  };

  const getDaysAgo = (createdAt) => {
    if (!createdAt) return 'Recently';
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
      <div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading job details...</p>
        </div>
      </div>
    );
  }

  if (error || !jobData) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <Building className="h-8 w-8 text-red-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Job Not Found</h3>
          <p className="text-gray-600 mb-4">{error || 'The job you are looking for does not exist.'}</p>
          <Button onClick={() => navigate('/jobs')}>
            Back to Jobs
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Navigation */}
        <div className="flex items-center justify-between mb-8">
          <Button 
            variant="ghost" 
            className="flex items-center gap-2"
            onClick={() => navigate('/jobs')}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Jobs
          </Button>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleShare}
              className="flex items-center gap-2"
            >
              <Share2 className="h-4 w-4" />
              Share
            </Button>
            <Button 
              variant={isSaved ? "default" : "outline"} 
              size="sm"
              onClick={handleSaveJob}
              className="flex items-center gap-2"
            >
              <Bookmark className={`h-4 w-4 ${isSaved ? 'fill-current' : ''}`} />
              {isSaved ? 'Saved' : 'Save'}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Header */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-6">
                  <Avatar className="w-16 h-16 border-2 border-gray-100">
                    <AvatarImage src={jobData.company?.logo} alt={jobData.company?.name} />
                    <AvatarFallback className="bg-blue-100 text-blue-600 text-lg font-semibold">
                      {getInitials(jobData.company?.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                      {jobData.title}
                    </h1>
                    <div className="flex items-center gap-4 text-gray-600 mb-4">
                      <div className="flex items-center gap-1">
                        <Building className="h-4 w-4" />
                        <span className="font-medium">{jobData.company?.name || 'Company Name'}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{jobData.location || 'Location not specified'}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <Briefcase className="h-3 w-3" />
                        {jobData.jobType || 'Full-time'}
                      </Badge>
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <DollarSign className="h-3 w-3" />
                        {formatSalary(jobData.salary)}
                      </Badge>
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <GraduationCap className="h-3 w-3" />
                        {formatExperience(jobData.experienceLevel)}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Job Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-gray-200">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-gray-600 mb-1">
                      <Calendar className="h-4 w-4" />
                      <span className="text-sm font-medium">Posted</span>
                    </div>
                    <p className="text-sm font-semibold text-gray-900">{getDaysAgo(jobData.createdAt)}</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-gray-600 mb-1">
                      <Users className="h-4 w-4" />
                      <span className="text-sm font-medium">Applicants</span>
                    </div>
                    <p className="text-sm font-semibold text-gray-900">{jobData.applications?.length || 0}</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-gray-600 mb-1">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm font-medium">Experience</span>
                    </div>
                    <p className="text-sm font-semibold text-gray-900">{formatExperience(jobData.experienceLevel)}</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-gray-600 mb-1">
                      <Briefcase className="h-4 w-4" />
                      <span className="text-sm font-medium">Positions</span>
                    </div>
                    <p className="text-sm font-semibold text-gray-900">{jobData.position || 1}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Job Details Tabs */}
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="description" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Description
                </TabsTrigger>
                <TabsTrigger value="requirements" className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  Requirements
                </TabsTrigger>
                <TabsTrigger value="company" className="flex items-center gap-2">
                  <Building className="h-4 w-4" />
                  Company
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="description" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Job Description</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose prose-gray max-w-none">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">About the Role</h3>
                      <p className="text-gray-700 leading-relaxed mb-6">{jobData.description}</p>
                      
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Responsibilities</h3>
                      <ul className="space-y-2 text-gray-700">
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                          <span>Develop and maintain high-quality web applications</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                          <span>Collaborate with cross-functional teams</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                          <span>Write clean, maintainable, and efficient code</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                          <span>Participate in code reviews and team meetings</span>
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="requirements" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Requirements & Skills</CardTitle>
                    <CardDescription>
                      What we're looking for in our ideal candidate
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {jobData.requirements && jobData.requirements.length > 0 ? (
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">Requirements</h4>
                          <ul className="space-y-3">
                            {jobData.requirements.map((requirement, index) => (
                              <li key={index} className="flex items-start gap-3">
                                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-700">{requirement}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <Separator />
                        
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">Required Skills</h4>
                          <div className="flex flex-wrap gap-2">
                            {jobData.requirements.flatMap(req => 
                              req.split(',').map(skill => skill.trim())
                            ).map((skill, index) => (
                              <Badge key={index} variant="outline" className="px-3 py-1">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <p className="text-gray-600">No specific requirements listed for this position.</p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="company" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>About {jobData.company?.name || 'the Company'}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Company Information</h4>
                        <p className="text-gray-700">
                          {jobData.company?.description || 'Information about the company is not available.'}
                        </p>
                      </div>
                      
                      <Separator />
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">Job Details</h4>
                          <div className="space-y-3 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Job Type</span>
                              <span className="font-medium text-gray-900">{jobData.jobType || 'Not specified'}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Experience Level</span>
                              <span className="font-medium text-gray-900">{formatExperience(jobData.experienceLevel)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Location</span>
                              <span className="font-medium text-gray-900">{jobData.location || 'Not specified'}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">Application Info</h4>
                          <div className="space-y-3 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Total Applicants</span>
                              <span className="font-medium text-gray-900">{jobData.applications?.length || 0}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Available Positions</span>
                              <span className="font-medium text-gray-900">{jobData.position || 1}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Posted Date</span>
                              <span className="font-medium text-gray-900">{getDaysAgo(jobData.createdAt)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Apply Card */}
            <Card className="sticky top-6">
              <CardContent className="p-6">
                <Button 
                  onClick={handleApply}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-base font-semibold"
                  size="lg"
                >
                  Apply Now
                </Button>
                <p className="text-xs text-gray-500 text-center mt-3">
                  {jobData.applications?.length || 0} people already applied
                </p>
                
                <Separator className="my-4" />
                
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Job Type</span>
                    <span className="font-medium text-gray-900">{jobData.jobType || 'Not specified'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Experience</span>
                    <span className="font-medium text-gray-900">{formatExperience(jobData.experienceLevel)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Salary</span>
                    <span className="font-medium text-gray-900">{formatSalary(jobData.salary)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Location</span>
                    <span className="font-medium text-gray-900 text-right">{jobData.location || 'Not specified'}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleJob;