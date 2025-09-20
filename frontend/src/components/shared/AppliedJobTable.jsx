import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Eye, MoreHorizontal, Download, Trash2, Filter, Search, FileText } from "lucide-react";

const AppliedJobTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Sample data
  const jobsData = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "Acme Corp",
      location: "New York, NY",
      dateApplied: "2024-06-01",
      status: "under_review",
      salary: "$120,000 - $140,000",
    },
    {
      id: 2,
      title: "Product Designer",
      company: "Stellar Designs",
      location: "San Francisco, CA",
      dateApplied: "2024-05-28",
      status: "interview",
      salary: "$100,000 - $130,000",
    },
    {
      id: 3,
      title: "Full Stack Engineer",
      company: "TechNova",
      location: "Remote",
      dateApplied: "2024-05-25",
      status: "rejected",
      salary: "$110,000 - $150,000",
    },
    {
      id: 4,
      title: "UX Researcher",
      company: "Innovate Labs",
      location: "Boston, MA",
      dateApplied: "2024-05-20",
      status: "offer",
      salary: "$95,000 - $120,000",
    },
    {
      id: 5,
      title: "DevOps Engineer",
      company: "CloudSystems",
      location: "Austin, TX",
      dateApplied: "2024-05-18",
      status: "under_review",
      salary: "$130,000 - $160,000",
    },
  ];

  const getStatusVariant = (status) => {
    switch (status) {
      case "under_review":
        return "secondary";
      case "interview":
        return "default";
      case "offer":
        return "success";
      case "rejected":
        return "destructive";
      default:
        return "outline";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "under_review":
        return "Under Review";
      case "interview":
        return "Interview";
      case "offer":
        return "Offer Received";
      case "rejected":
        return "Not Selected";
      default:
        return "Pending";
    }
  };

  const filteredJobs = jobsData.filter(job => {
    const matchesStatus = statusFilter === "all" || job.status === statusFilter;
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <Card className="shadow-sm border-0">
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <CardTitle className="text-2xl">Applied Jobs</CardTitle>
            <CardDescription>
              Track your job applications and their current status
            </CardDescription>
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search jobs or companies..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="under_review">Under Review</SelectItem>
              <SelectItem value="interview">Interview</SelectItem>
              <SelectItem value="offer">Offer Received</SelectItem>
              <SelectItem value="rejected">Not Selected</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">Job Details</TableHead>
                <TableHead>Date Applied</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job) => (
                  <TableRow key={job.id} className="hover:bg-gray-50/50">
                    <TableCell>
                      <div className="flex flex-col">
                        <div className="font-medium text-gray-900">{job.title}</div>
                        <div className="text-sm text-gray-600 mt-1">{job.company}</div>
                        <div className="text-sm text-gray-500 flex items-center mt-1">
                          <span>{job.location}</span>
                          <span className="mx-2">•</span>
                          <span>{job.salary}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm text-gray-600">
                        {new Date(job.dateApplied).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusVariant(job.status)} className="capitalize">
                        {getStatusText(job.status)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="flex items-center gap-2">
                            <Eye className="h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center gap-2">
                            <FileText className="h-4 w-4" />
                            View Job Posting
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center gap-2 text-red-600">
                            <Trash2 className="h-4 w-4" />
                            Withdraw Application
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center">
                    <div className="flex flex-col items-center justify-center text-gray-500">
                      <FileText className="h-12 w-12 mb-2 opacity-50" />
                      <p>No applications found</p>
                      <p className="text-sm">Try adjusting your search or filters</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-gray-600">
            Showing {filteredJobs.length} of {jobsData.length} applications
          </div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </CardContent>
    </Card>
  );
};

export default AppliedJobTable;