import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
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
  Star,
  Eye
} from "lucide-react";
import { toast } from "sonner";

const SingleJob = () => {
  const { id } = useParams();
  const [isSaved, setIsSaved] = useState(false);
  const [isApplied, setIsApplied] = useState(false);

  // Mock job data - replace with actual API call
  const jobData = {
    id: id,
    title: "Senior Frontend Developer",
    company: {
      name: "TechCorp Inc.",
      logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=64&h=64&fit=crop&crop=face",
      description: "Leading technology company building the future of web applications."
    },
    description: "We are looking for a skilled Senior Frontend Developer to join our dynamic team. You will be responsible for developing and maintaining high-quality web applications using modern technologies.",
    fullDescription: `
      <h3>About the Role</h3>
      <p>As a Senior Frontend Developer at TechCorp, you'll be working on cutting-edge projects that impact millions of users worldwide. You'll collaborate with cross-functional teams to deliver exceptional user experiences.</p>
      
      <h3>Key Responsibilities</h3>
      <ul>
        <li>Develop and maintain responsive web applications using React.js</li>
        <li>Collaborate with UX/UI designers to implement pixel-perfect designs</li>
        <li>Write clean, maintainable, and efficient code</li>
        <li>Mentor junior developers and conduct code reviews</li>
        <li>Optimize applications for maximum speed and scalability</li>
        <li>Participate in agile development processes</li>
      </ul>
      
      <h3>What We Offer</h3>
      <ul>
        <li>Competitive salary and equity package</li>
        <li>Flexible working hours and remote options</li>
        <li>Comprehensive health benefits</li>
        <li>Professional development budget</li>
        <li>Modern tech stack and tools</li>
      </ul>
    `,
    requirements: [
      "5+ years of experience in frontend development",
      "Strong proficiency in React.js and TypeScript",
      "Experience with state management (Redux, Zustand)",
      "Knowledge of modern CSS frameworks (Tailwind CSS)",
      "Familiarity with testing frameworks (Jest, Cypress)",
      "Experience with version control (Git)",
      "Excellent problem-solving skills"
    ],
    salary: "$90,000 - $120,000",
    location: "San Francisco, CA (Remote Available)",
    jobType: "Full-time",
    experienceLevel: "Senior",
    category: "Engineering",
    postedDate: "2024-01-15",
    applicationDeadline: "2024-02-15",
    applicants: 47,
    views: 234,
    skills: ["React", "TypeScript", "JavaScript", "CSS", "HTML", "Redux", "Tailwind CSS"],
    benefits: ["Health Insurance", "Remote Work", "Flexible Hours", "Stock Options", "Learning Budget"]
  };

  const handleSaveJob = () => {
    setIsSaved(!isSaved);
    toast.success(isSaved ? "Job removed from saved" : "Job saved successfully!");
  };

  const handleApply = () => {
    setIsApplied(true);
    toast.success("Application submitted successfully!");
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Job link copied to clipboard!");
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Navigation */}
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="sm" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Jobs
          </Button>
          <div className="flex-1" />
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
            {/* Job Header Card */}
            <Card className="shadow-lg border-0">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <Avatar className="w-16 h-16 border-2 border-white shadow-lg">
                      <AvatarImage src={jobData.company.logo} alt={jobData.company.name} />
                      <AvatarFallback className="bg-blue-100 text-blue-600 text-lg font-semibold">
                        {getInitials(jobData.company.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h1 className="text-2xl font-bold text-gray-900 mb-2">
                        {jobData.title}
                      </h1>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center gap-1">
                          <Building className="h-4 w-4" />
                          <span className="font-medium">{jobData.company.name}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span>{jobData.location}</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary" className="flex items-center gap-1">
                          <Briefcase className="h-3 w-3" />
                          {jobData.jobType}
                        </Badge>
                        <Badge variant="secondary" className="flex items-center gap-1">
                          <DollarSign className="h-3 w-3" />
                          {jobData.salary}
                        </Badge>
                        <Badge variant="secondary" className="flex items-center gap-1">
                          <GraduationCap className="h-3 w-3" />
                          {jobData.experienceLevel}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 border-t border-gray-200">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-gray-600 mb-1">
                      <Calendar className="h-4 w-4" />
                      <span className="text-sm font-medium">Posted</span>
                    </div>
                    <p className="text-sm text-gray-900">{new Date(jobData.postedDate).toLocaleDateString()}</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-gray-600 mb-1">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm font-medium">Deadline</span>
                    </div>
                    <p className="text-sm text-gray-900">{new Date(jobData.applicationDeadline).toLocaleDateString()}</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-gray-600 mb-1">
                      <Users className="h-4 w-4" />
                      <span className="text-sm font-medium">Applicants</span>
                    </div>
                    <p className="text-sm text-gray-900">{jobData.applicants}</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-gray-600 mb-1">
                      <Eye className="h-4 w-4" />
                      <span className="text-sm font-medium">Views</span>
                    </div>
                    <p className="text-sm text-gray-900">{jobData.views}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Job Details Tabs */}
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="requirements">Requirements</TabsTrigger>
                <TabsTrigger value="company">Company</TabsTrigger>
              </TabsList>
              
              <TabsContent value="description" className="space-y-4 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Job Description</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div 
                      className="prose prose-gray max-w-none"
                      dangerouslySetInnerHTML={{ __html: jobData.fullDescription }}
                    />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="requirements" className="space-y-4 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Requirements & Skills</CardTitle>
                    <CardDescription>
                      What we're looking for in our ideal candidate
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {jobData.requirements.map((requirement, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{requirement}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Separator className="my-6" />
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Required Skills</h4>
                      <div className="flex flex-wrap gap-2">
                        {jobData.skills.map((skill, index) => (
                          <Badge key={index} variant="outline" className="px-3 py-1">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="company" className="space-y-4 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>About {jobData.company.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-6">{jobData.company.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Company Benefits</h4>
                        <div className="space-y-2">
                          {jobData.benefits.map((benefit, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <Star className="h-4 w-4 text-yellow-500" />
                              <span className="text-gray-700">{benefit}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Company Culture</h4>
                        <div className="space-y-2 text-gray-700">
                          <p>• Innovative and collaborative environment</p>
                          <p>• Focus on work-life balance</p>
                          <p>• Continuous learning opportunities</p>
                          <p>• Diverse and inclusive workplace</p>
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
            <Card className="shadow-lg border-0 sticky top-6">
              <CardContent className="p-6">
                {isApplied ? (
                  <div className="text-center">
                    <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                    <h3 className="font-semibold text-gray-900 mb-2">Application Submitted!</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Your application has been successfully submitted. The employer will review your profile.
                    </p>
                    <Button variant="outline" className="w-full">
                      View Application Status
                    </Button>
                  </div>
                ) : (
                  <>
                    <Button 
                      onClick={handleApply}
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 text-base font-semibold shadow-lg"
                    >
                      Apply Now
                    </Button>
                    <p className="text-xs text-gray-500 text-center mt-3">
                      {jobData.applicants} people already applied
                    </p>
                  </>
                )}
                
                <Separator className="my-4" />
                
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Job Type</span>
                    <span className="font-medium">{jobData.jobType}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Experience</span>
                    <span className="font-medium">{jobData.experienceLevel}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Salary</span>
                    <span className="font-medium">{jobData.salary}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Location</span>
                    <span className="font-medium text-right">{jobData.location}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Similar Jobs */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Similar Jobs</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="p-3 border border-gray-200 rounded-lg hover:border-blue-200 transition-colors cursor-pointer">
                    <h4 className="font-semibold text-gray-900 text-sm mb-1">Frontend Developer</h4>
                    <p className="text-xs text-gray-600 mb-2">AnotherTech • $85k - $110k</p>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <MapPin className="h-3 w-3" />
                      <span>Remote</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleJob;