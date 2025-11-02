import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Briefcase,
  Users,
  FileText,
  TrendingUp,
  Calendar,
  Eye,
  Download,
  Plus,
  Mail,
  Filter,
  MoreHorizontal
} from "lucide-react"
import Sidebar from '../../components/dashboard/Sidebar' // Adjust the import path as needed
import { Link } from 'react-router-dom'

const Dashboard = () => {
  // Mock data
  const stats = [
    {
      title: "Active Jobs",
      value: "24",
      change: "+12%",
      description: "From last month",
      icon: Briefcase,
      color: "text-blue-600"
    },
    {
      title: "Total Applicants",
      value: "1,234",
      change: "+8%",
      description: "From last month",
      icon: Users,
      color: "text-green-600"
    },
    {
      title: "Interviews",
      value: "48",
      change: "+15%",
      description: "Scheduled this week",
      icon: Calendar,
      color: "text-purple-600"
    },
    {
      title: "Hired",
      value: "12",
      change: "+20%",
      description: "This month",
      icon: FileText,
      color: "text-orange-600"
    }
  ]

  const recentJobs = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      department: "Engineering",
      applicants: 45,
      status: "active",
      date: "2024-06-15",
      views: 234
    },
    {
      id: 2,
      title: "Product Manager",
      department: "Product",
      applicants: 23,
      status: "active",
      date: "2024-06-10",
      views: 156
    },
    {
      id: 3,
      title: "UX Designer",
      department: "Design",
      applicants: 67,
      status: "paused",
      date: "2024-06-05",
      views: 189
    },
    {
      id: 4,
      title: "DevOps Engineer",
      department: "Engineering",
      applicants: 34,
      status: "active",
      date: "2024-06-01",
      views: 278
    }
  ]

  const recentApplicants = [
    {
      id: 1,
      name: "Sarah Johnson",
      position: "Senior Frontend Developer",
      status: "interview",
      date: "2 hours ago",
      avatar: "/avatars/sarah.jpg"
    },
    {
      id: 2,
      name: "Michael Chen",
      position: "Product Manager",
      status: "new",
      date: "5 hours ago",
      avatar: "/avatars/michael.jpg"
    },
    {
      id: 3,
      name: "Emily Davis",
      position: "UX Designer",
      status: "reviewed",
      date: "1 day ago",
      avatar: "/avatars/emily.jpg"
    },
    {
      id: 4,
      name: "Alex Rodriguez",
      position: "DevOps Engineer",
      status: "rejected",
      date: "2 days ago",
      avatar: "/avatars/alex.jpg"
    }
  ]

  const getStatusVariant = (status) => {
    switch (status) {
      case 'active': return 'default'
      case 'paused': return 'secondary'
      case 'draft': return 'outline'
      default: return 'outline'
    }
  }

  const getApplicantStatusVariant = (status) => {
    switch (status) {
      case 'new': return 'default'
      case 'reviewed': return 'secondary'
      case 'interview': return 'success'
      case 'rejected': return 'destructive'
      default: return 'outline'
    }
  }

  const getApplicantStatusText = (status) => {
    switch (status) {
      case 'new': return 'New'
      case 'reviewed': return 'Reviewed'
      case 'interview': return 'Interview'
      case 'rejected': return 'Rejected'
      default: return 'Pending'
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Recruiter Dashboard</h1>
              <p className="text-gray-600 mt-2">Welcome back! Here's what's happening with your jobs today.</p>
            </div>
            <div className="flex gap-3 mt-4 sm:mt-0">
              <Link to={`/register-company`}>
                <Button variant="outline" className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Register company
                </Button>
              </Link>
              <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4" />
                Post New Job
              </Button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <Card key={index} className="relative overflow-hidden border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="flex items-center text-xs text-green-600 mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    {stat.change}
                  </div>
                  <p className="text-xs text-gray-500 mt-2">{stat.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Recent Jobs & Analytics */}
            <div className="lg:col-span-2 space-y-8">
              {/* Recent Jobs */}
              <Card className="border-0 shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-4">
                  <div>
                    <CardTitle className="text-xl">Recent Job Postings</CardTitle>
                    <CardDescription>Your active and draft job positions</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    Filter
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentJobs.map((job) => (
                      <div key={job.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-gray-900">{job.title}</h3>
                            <Badge variant={getStatusVariant(job.status)}>
                              {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span className="font-medium">{job.department}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              {job.applicants} applicants
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Eye className="h-3 w-3" />
                              {job.views} views
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 flex justify-center">
                    <Button variant="outline" className="border-gray-300">
                      View All Jobs
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Analytics Chart Placeholder */}
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl">Application Analytics</CardTitle>
                  <CardDescription>Job performance over the last 30 days</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg flex items-center justify-center border border-gray-200">
                    <div className="text-center text-gray-500">
                      <TrendingUp className="h-16 w-16 mx-auto mb-4 text-blue-400" />
                      <p className="font-medium text-gray-700">Analytics Dashboard</p>
                      <p className="text-sm text-gray-600">Views, applications, and conversion rates</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Quick Actions & Recent Applicants */}
            <div className="space-y-8">
              {/* Quick Actions */}
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl">Quick Actions</CardTitle>
                  <CardDescription>Frequently used tasks</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start gap-3 h-12 text-left hover:bg-blue-50 hover:border-blue-200 transition-colors">
                    <Plus className="h-5 w-5 text-blue-600" />
                    <div>
                      <div className="font-medium">Create New Job Post</div>
                      <div className="text-xs text-gray-500">Post a new job opening</div>
                    </div>
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-3 h-12 text-left hover:bg-green-50 hover:border-green-200 transition-colors">
                    <Users className="h-5 w-5 text-green-600" />
                    <div>
                      <div className="font-medium">Browse Candidates</div>
                      <div className="text-xs text-gray-500">Find qualified candidates</div>
                    </div>
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-3 h-12 text-left hover:bg-purple-50 hover:border-purple-200 transition-colors">
                    <Mail className="h-5 w-5 text-purple-600" />
                    <div>
                      <div className="font-medium">Send Bulk Messages</div>
                      <div className="text-xs text-gray-500">Contact multiple candidates</div>
                    </div>
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-3 h-12 text-left hover:bg-orange-50 hover:border-orange-200 transition-colors">
                    <FileText className="h-5 w-5 text-orange-600" />
                    <div>
                      <div className="font-medium">Generate Reports</div>
                      <div className="text-xs text-gray-500">Download hiring reports</div>
                    </div>
                  </Button>
                </CardContent>
              </Card>

              {/* Recent Applicants */}
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl">Recent Applicants</CardTitle>
                  <CardDescription>Latest job applications</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentApplicants.map((applicant) => (
                      <div key={applicant.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center">
                            <Users className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-medium text-sm text-gray-900">{applicant.name}</h4>
                            <p className="text-xs text-gray-500">{applicant.position}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant={getApplicantStatusVariant(applicant.status)} className="text-xs">
                            {getApplicantStatusText(applicant.status)}
                          </Badge>
                          <p className="text-xs text-gray-500 mt-1">{applicant.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex justify-center">
                    <Button variant="outline" size="sm" className="border-gray-300">
                      View All Applicants
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Hiring Progress */}
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl">Hiring Goals</CardTitle>
                  <CardDescription>Q2 2024 Targets</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-medium text-gray-700">Engineering Roles</span>
                      <span className="font-semibold text-gray-900">8/12</span>
                    </div>
                    <Progress value={66} className="h-2 bg-gray-200" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-medium text-gray-700">Design Roles</span>
                      <span className="font-semibold text-gray-900">3/6</span>
                    </div>
                    <Progress value={50} className="h-2 bg-gray-200" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-medium text-gray-700">Product Roles</span>
                      <span className="font-semibold text-gray-900">2/4</span>
                    </div>
                    <Progress value={50} className="h-2 bg-gray-200" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard