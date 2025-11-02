import React, { useState, useEffect } from 'react'
import Sidebar from '../../components/dashboard/Sidebar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Eye, 
  Edit, 
  Trash2, 
  Users,
  Calendar,
  MapPin,
  DollarSign,
  TrendingUp,
  PauseCircle,
  PlayCircle,
  Loader2
} from "lucide-react"
import { toast } from "sonner"
import { authInstance } from '../../axios/authInstance'

const RecruiterJobs = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(false)
  const [jobsLoading, setJobsLoading] = useState(true)
  const [newJobForm, setNewJobForm] = useState({
    title: '',
    description: '',
    requirements: '',
    salary: '',
    location: '',
    jobType: 'Full-time',
    experienceLevel: '2',
    position: '1'
  })

  // Fetch recruiter's jobs on component mount
  useEffect(() => {
    fetchRecruiterJobs()
  }, [])

  const fetchRecruiterJobs = async () => {
    try {
      setJobsLoading(true)
      const response = await authInstance.get('/job/get-adminjob')
      
      if (response.data.success) {
        setJobs(response.data.jobs || [])
      } else {
        toast.error('Failed to fetch jobs')
      }
    } catch (error) {
      console.error('Error fetching jobs:', error)
      toast.error('Error loading jobs')
    } finally {
      setJobsLoading(false)
    }
  }

  const handlePostJob = async (e) => {
    e.preventDefault()
    
    if (!newJobForm.title.trim() || !newJobForm.description.trim()) {
      toast.error('Please fill in all required fields')
      return
    }

    try {
      setLoading(true)
      const response = await authInstance.post('/job/post-job', {
        ...newJobForm,
        requirements: newJobForm.requirements.split(',').map(req => req.trim())
      })

      if (response.data.success) {
        toast.success('Job posted successfully!')
        setNewJobForm({
          title: '',
          description: '',
          requirements: '',
          salary: '',
          location: '',
          jobType: 'Full-time',
          experienceLevel: '2',
          position: '1'
        })
        // Refresh the jobs list
        fetchRecruiterJobs()
      } else {
        toast.error(response.data.message || 'Failed to post job')
      }
    } catch (error) {
      console.error('Error posting job:', error)
      toast.error(error.response?.data?.message || 'Error posting job')
    } finally {
      setLoading(false)
    }
  }

  const getStatusVariant = (status) => {
    switch (status) {
      case 'active': return 'default'
      case 'paused': return 'secondary'
      case 'draft': return 'outline'
      default: return 'outline'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'active': return 'Active'
      case 'paused': return 'Paused'
      case 'draft': return 'Draft'
      default: return status
    }
  }

  const formatSalary = (salary) => {
    if (!salary || salary === 'NaN') return 'Not specified'
    return `$${salary}`
  }

  const formatExperience = (level) => {
    const levels = {
      1: 'Entry Level',
      2: 'Mid Level',
      3: 'Senior Level',
      4: 'Director'
    }
    return levels[level] || 'Not specified'
  }

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.department?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || job.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const stats = [
    {
      title: "Active Jobs",
      value: jobs.filter(job => job.status === 'active').length.toString(),
      description: "Currently live",
      change: "+2",
      trend: "up"
    },
    {
      title: "Total Applicants",
      value: jobs.reduce((total, job) => total + (job.applications?.length || 0), 0).toString(),
      description: "All time",
      change: "+156",
      trend: "up"
    },
    {
      title: "Draft Jobs",
      value: jobs.filter(job => job.status === 'draft').length.toString(),
      description: "Not published",
      change: "+1",
      trend: "up"
    },
    {
      title: "Total Views",
      value: jobs.reduce((total, job) => total + (job.views || 0), 0).toString(),
      description: "Job impressions",
      change: "+324",
      trend: "up"
    }
  ]

  return (
    <div className='flex min-h-screen bg-gray-50'>
      <Sidebar/>
      
      <div className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Job Management</h1>
              <p className="text-gray-600">Manage your job postings and track applications</p>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="bg-gray-900 hover:bg-gray-800 text-white">
                  <Plus className="h-4 w-4 mr-2" />
                  Post New Job
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Create New Job</h3>
                  <form onSubmit={handlePostJob} className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Job Title *</label>
                      <Input
                        value={newJobForm.title}
                        onChange={(e) => setNewJobForm({...newJobForm, title: e.target.value})}
                        placeholder="e.g. Senior Frontend Developer"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Location</label>
                      <Input
                        value={newJobForm.location}
                        onChange={(e) => setNewJobForm({...newJobForm, location: e.target.value})}
                        placeholder="e.g. Remote, New York"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Salary</label>
                      <Input
                        value={newJobForm.salary}
                        onChange={(e) => setNewJobForm({...newJobForm, salary: e.target.value})}
                        placeholder="e.g. 90000"
                        className="mt-1"
                      />
                    </div>
                    <Button 
                      type="submit" 
                      disabled={loading}
                      className="w-full bg-gray-900 hover:bg-gray-800"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin mr-2" />
                          Posting Job...
                        </>
                      ) : (
                        'Create Job Post'
                      )}
                    </Button>
                  </form>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <Card key={index} className="border border-gray-200 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                      <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
                    </div>
                    <div className={`p-2 rounded-lg ${
                      stat.trend === 'up' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                    }`}>
                      <TrendingUp className="h-4 w-4" />
                    </div>
                  </div>
                  <div className={`text-xs font-medium mt-2 ${
                    stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change} from last week
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Jobs Table Section */}
          <Card className="border border-gray-200 shadow-sm">
            <CardHeader className="pb-4 border-b border-gray-100">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                <div>
                  <CardTitle className="text-xl font-semibold text-gray-900">Job Postings</CardTitle>
                  <CardDescription className="text-gray-600">
                    {filteredJobs.length} of {jobs.length} jobs
                  </CardDescription>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search jobs..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 border-gray-300 w-full sm:w-64"
                    />
                  </div>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="border-gray-300">
                        <Filter className="h-4 w-4 mr-2" />
                        Status
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setStatusFilter('all')}>
                        All Jobs
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setStatusFilter('active')}>
                        Active
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setStatusFilter('paused')}>
                        Paused
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setStatusFilter('draft')}>
                        Drafts
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-0">
              {jobsLoading ? (
                <div className="flex justify-center items-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-gray-400 mr-3" />
                  <span className="text-gray-600">Loading jobs...</span>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50 hover:bg-gray-50">
                      <TableHead className="font-semibold text-gray-900">Job Title</TableHead>
                      <TableHead className="font-semibold text-gray-900">Location</TableHead>
                      <TableHead className="font-semibold text-gray-900">Applicants</TableHead>
                      <TableHead className="font-semibold text-gray-900">Salary</TableHead>
                      <TableHead className="font-semibold text-gray-900">Status</TableHead>
                      <TableHead className="font-semibold text-gray-900">Posted</TableHead>
                      <TableHead className="font-semibold text-gray-900 text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredJobs.map((job) => (
                      <TableRow key={job._id} className="hover:bg-gray-50">
                        <TableCell>
                          <div>
                            <div className="font-medium text-gray-900">{job.title}</div>
                            <div className="text-sm text-gray-500 mt-1">
                              {formatExperience(job.experienceLevel)} • {job.jobType}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center text-gray-900">
                            <MapPin className="h-3 w-3 mr-1" />
                            {job.location || 'Not specified'}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Users className="h-4 w-4 text-gray-400 mr-2" />
                            <span className="font-medium text-gray-900">{job.applications?.length || 0}</span>
                            <span className="text-sm text-gray-500 ml-1">applicants</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center text-gray-900">
                            <DollarSign className="h-3 w-3 mr-1" />
                            {formatSalary(job.salary)}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={getStatusVariant(job.status || 'active')}>
                            {getStatusText(job.status || 'active')}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center text-sm text-gray-500">
                            <Calendar className="h-3 w-3 mr-1" />
                            {new Date(job.createdAt).toLocaleDateString()}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex justify-end items-center space-x-2">
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <PlayCircle className="h-4 w-4 mr-2" />
                                  Activate
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <PauseCircle className="h-4 w-4 mr-2" />
                                  Pause
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600">
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}

              {!jobsLoading && filteredJobs.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
                  <p className="text-gray-600 mb-4">
                    {searchTerm || statusFilter !== 'all' 
                      ? 'Try adjusting your search or filters' 
                      : 'Get started by posting your first job'
                    }
                  </p>
                  <Button className="bg-gray-900 hover:bg-gray-800 text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Post New Job
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default RecruiterJobs