import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { authInstance } from '../../axios/authInstance';
import Sidebar from '../../components/dashboard/Sidebar';

const RegisterCompany = () => {
    const [companyName, setCompanyName] = useState('');
    const [loading, setLoading] = useState(false);
    const [companies, setCompanies] = useState([]);
    const [companiesLoading, setCompaniesLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    // Fetch companies on component mount
    useEffect(() => {
        fetchCompanies();
    }, []);

    const fetchCompanies = async () => {
        try {
            setCompaniesLoading(true);
            const response = await authInstance.get('/company/get-company');
            
            if (response.data.success) {
                setCompanies(response.data.comapny || []);
            } else {
                toast.error('Failed to fetch companies');
            }
        } catch (error) {
            console.error('Error fetching companies:', error);
            toast.error('Error loading companies');
        } finally {
            setCompaniesLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!companyName.trim()) {
            toast.error('Please enter a company name');
            return;
        }

        try {
            setLoading(true);
            const response = await authInstance.post('/company/resgister-company', {
                name: companyName.trim()
            });

            if (response.data.success) {
                toast.success('Company registered successfully!');
                setCompanyName('');
                fetchCompanies();
            } else {
                toast.error(response.data.message || 'Failed to register company');
            }
        } catch (error) {
            console.error('Error registering company:', error);
            toast.error(error.response?.data?.message || 'Error registering company');
        } finally {
            setLoading(false);
        }
    };

    // Filter companies based on search term
    const filteredCompanies = companies.filter(company =>
        company.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <div className='flex min-h-screen bg-gray-50'>
            <Sidebar/>
           
            <div className="flex-1 p-8">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-3">
                            Company Registration
                        </h1>
                        <p className="text-lg text-gray-600">
                            Register your company to start posting jobs and managing candidates
                        </p>
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                        {/* Registration Form */}
                        <div className="space-y-6">
                            <Card className="border border-gray-200 shadow-sm">
                                <CardHeader className="pb-4 border-b border-gray-100">
                                    <CardTitle className="text-xl font-semibold text-gray-900">
                                        Register New Company
                                    </CardTitle>
                                    <CardDescription className="text-gray-600">
                                        Enter your company details to get started with job postings
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="pt-6">
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="space-y-3">
                                            <Label htmlFor="companyName" className="text-sm font-medium text-gray-700">
                                                Company Name
                                            </Label>
                                            <Input
                                                id="companyName"
                                                type="text"
                                                placeholder="Enter your company name"
                                                value={companyName}
                                                onChange={(e) => setCompanyName(e.target.value)}
                                                className="h-11 text-base border-gray-300 focus:border-gray-400"
                                                disabled={loading}
                                            />
                                            <p className="text-sm text-gray-500">
                                                This name will be visible to all job seekers
                                            </p>
                                        </div>

                                        <Button
                                            type="submit"
                                            disabled={loading || !companyName.trim()}
                                            className="w-full h-11 bg-gray-900 hover:bg-gray-800 text-white font-medium"
                                        >
                                            {loading ? (
                                                <>
                                                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                                    Registering Company...
                                                </>
                                            ) : (
                                                'Register Company'
                                            )}
                                        </Button>
                                    </form>
                                </CardContent>
                            </Card>

                            {/* Information Card */}
                            <Card className="border border-gray-200 shadow-sm">
                                <CardHeader className="pb-4 border-b border-gray-100">
                                    <CardTitle className="text-lg font-semibold text-gray-900">
                                        Registration Benefits
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="pt-6">
                                    <div className="space-y-3 text-sm text-gray-600">
                                        <div className="flex items-start space-x-3">
                                            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                                            <span>Post unlimited job listings</span>
                                        </div>
                                        <div className="flex items-start space-x-3">
                                            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                                            <span>Access candidate management tools</span>
                                        </div>
                                        <div className="flex items-start space-x-3">
                                            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                                            <span>Receive applications directly</span>
                                        </div>
                                        <div className="flex items-start space-x-3">
                                            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                                            <span>Manage multiple hiring pipelines</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Companies List */}
                        <div className="space-y-6">
                            <Card className="border border-gray-200 shadow-sm">
                                <CardHeader className="pb-4 border-b border-gray-100">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <CardTitle className="text-xl font-semibold text-gray-900">
                                                Registered Companies
                                            </CardTitle>
                                            <CardDescription className="text-gray-600">
                                                {companies.length} companies in the system
                                            </CardDescription>
                                        </div>
                                        <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                                            {filteredCompanies.length} showing
                                        </Badge>
                                    </div>

                                    {/* Search Bar */}
                                    <div className="mt-4">
                                        <Input
                                            type="text"
                                            placeholder="Search companies by name..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="border-gray-300 focus:border-gray-400"
                                        />
                                    </div>
                                </CardHeader>
                                <CardContent className="pt-6">
                                    {companiesLoading ? (
                                        <div className="flex flex-col items-center justify-center py-12">
                                            <Loader2 className="h-8 w-8 animate-spin text-gray-400 mb-4" />
                                            <p className="text-gray-500">Loading companies...</p>
                                        </div>
                                    ) : filteredCompanies.length > 0 ? (
                                        <div className="space-y-4 max-h-[500px] overflow-y-auto">
                                            {filteredCompanies.map((company) => (
                                                <div
                                                    key={company._id}
                                                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
                                                >
                                                    <div className="flex items-center space-x-4">
                                                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                                            <span className="text-sm font-medium text-gray-600">
                                                                {company.name.charAt(0).toUpperCase()}
                                                            </span>
                                                        </div>
                                                        <div>
                                                            <h3 className="font-medium text-gray-900">
                                                                {company.name}
                                                            </h3>
                                                            <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                                                                <span>Registered {formatDate(company.createdAt)}</span>
                                                                <Badge 
                                                                    variant="outline" 
                                                                    className="bg-green-50 text-green-700 border-green-200 text-xs"
                                                                >
                                                                    Active
                                                                </Badge>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        {company.isVerified ? (
                                                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                                        ) : (
                                                            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-12">
                                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                                <span className="text-2xl text-gray-400">🏢</span>
                                            </div>
                                            <h3 className="text-lg font-medium text-gray-900 mb-2">
                                                No companies found
                                            </h3>
                                            <p className="text-gray-600 mb-4">
                                                {searchTerm ? 'No companies match your search criteria' : 'No companies have been registered yet'}
                                            </p>
                                            {searchTerm && (
                                                <Button 
                                                    variant="outline" 
                                                    onClick={() => setSearchTerm('')}
                                                    className="border-gray-300"
                                                >
                                                    Clear search
                                                </Button>
                                            )}
                                        </div>
                                    )}
                                </CardContent>
                            </Card>

                            {/* Quick Stats */}
                            <Card className="border border-gray-200 shadow-sm">
                                <CardHeader className="pb-4 border-b border-gray-100">
                                    <CardTitle className="text-lg font-semibold text-gray-900">
                                        Platform Overview
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="pt-6">
                                    <div className="grid grid-cols-2 gap-4 text-center">
                                        <div className="p-4 border border-gray-200 rounded-lg">
                                            <div className="text-2xl font-bold text-gray-900 mb-1">
                                                {companies.length}
                                            </div>
                                            <div className="text-sm text-gray-600">Total Companies</div>
                                        </div>
                                        <div className="p-4 border border-gray-200 rounded-lg">
                                            <div className="text-2xl font-bold text-gray-900 mb-1">
                                                {companies.filter(c => c.isVerified).length}
                                            </div>
                                            <div className="text-sm text-gray-600">Verified</div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterCompany;