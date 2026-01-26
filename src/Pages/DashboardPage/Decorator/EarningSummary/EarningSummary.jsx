import React from 'react';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../../Components/Shared/Loading/Loading';
import { Award, Briefcase, Calendar, CheckCircle2, DollarSign, TrendingUp } from 'lucide-react';

const EarningSummary = () => {
    const axiosSecure = useAxiosSecure();
    const {data ={}, isLoading} = useQuery({
        queryKey: ['decorator-earning-summary'],
        queryFn: async()=>{
            const res = await axiosSecure.get('/decorator/earning-summary');
            return res.data;
        }
    })
    if(isLoading){
        return <Loading/>
    }
    return (
       <div className="min-h-screen py-8 md:py-10 lg:py-12">
            <title>Laxius Decor || Earning Summary</title>

            {/* Header Section */}
            <div className="mb-8">
                <div className="bg-gradient-to-r from-primary to-secondary rounded-xl p-8 shadow-xl">
                    <div className="flex items-center gap-4">
                        <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl">
                            <TrendingUp className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Earning Summary</h1>
                            <p className="text-blue-100 text-lg">Track your performance and earnings</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Total Earnings Card */}
                <div className="group relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-emerald-600 opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-xl"></div>
                    <div className="bg-base-100 shadow-xl hover:shadow-2xl rounded-xl p-8 border border-base-100 transition-all duration-300 relative">
                        {/* Icon Badge */}
                        <div className="absolute top-4 right-4">
                            <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-4 rounded-xl shadow-lg transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                                <DollarSign className="w-8 h-8 text-white" />
                            </div>
                        </div>

                        {/* Content */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <div className="bg-green-100 p-2 rounded-lg">
                                    <DollarSign className="w-5 h-5 text-green-600" />
                                </div>
                                <p className="text-neutral font-semibold text-lg">Total Earnings</p>
                            </div>

                            <div className="flex items-baseline gap-2">
                                <h2 className="text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                                    {data.totalEarnings?.toLocaleString() || 0}
                                </h2>
                                <span className="text-2xl font-semibold text-neutral">BDT</span>
                            </div>

                            {/* Progress Indicator */}
                            <div className="pt-4 border-t border-base-100">
                                <div className="flex items-center justify-between text-sm mb-2">
                                    <span className="text-neutral">Performance</span>
                                    <span className="text-green-600 font-semibold flex items-center gap-1">
                                        <TrendingUp className="w-4 h-4" />
                                        +12.5%
                                    </span>
                                </div>
                                <div className="w-full bg-base-200 rounded-full h-2">
                                    <div className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full w-3/4 transition-all duration-500"></div>
                                </div>
                            </div>
                        </div>

                        {/* Decorative Corner */}
                        <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tl from-green-500/10 to-transparent rounded-tr-full"></div>
                    </div>
                </div>

                {/* Completed Jobs Card */}
                <div className="group relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-xl"></div>
                    <div className="bg-base-100 shadow-xl hover:shadow-2xl rounded-xl p-8 border border-base-100 transition-all duration-300 relative">
                        {/* Icon Badge */}
                        <div className="absolute top-4 right-4">
                            <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-4 rounded-xl shadow-lg transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                                <Briefcase className="w-8 h-8 text-white" />
                            </div>
                        </div>

                        {/* Content */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <div className="bg-blue-100 p-2 rounded-lg">
                                    <CheckCircle2 className="w-5 h-5 text-blue-600" />
                                </div>
                                <p className="text-neutral font-semibold text-lg">Completed Jobs</p>
                            </div>

                            <div className="flex items-baseline gap-2">
                                <h2 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                    {data.totalJobs || 0}
                                </h2>
                                <span className="text-2xl font-semibold text-neutral">Jobs</span>
                            </div>

                            {/* Progress Indicator */}
                            <div className="pt-4 border-t border-base-100">
                                <div className="flex items-center justify-between text-sm mb-2">
                                    <span className="text-neutral">Success Rate</span>
                                    <span className="text-blue-600 font-semibold flex items-center gap-1">
                                        <Award className="w-4 h-4" />
                                        98.5%
                                    </span>
                                </div>
                                <div className="w-full bg-base-200 rounded-full h-2">
                                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full w-[98.5%] transition-all duration-500"></div>
                                </div>
                            </div>
                        </div>

                        {/* Decorative Corner */}
                        <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tl from-blue-500/10 to-transparent rounded-tr-full"></div>
                    </div>
                </div>
            </div>

            {/* Additional Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Average Per Job */}
                <div className="bg-base-100 rounded-xl shadow-lg p-6 border border-base-100 hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center justify-between mb-4">
                        <div className="bg-purple-100 p-3 rounded-xl">
                            <DollarSign className="w-6 h-6 text-purple-600" />
                        </div>
                        <span className="text-2xl font-bold text-purple-600">
                            {data.totalJobs ? Math.round(data.totalEarnings / data.totalJobs).toLocaleString() : 0}
                        </span>
                    </div>
                    <p className="text-neutral font-medium">Avg. Per Job (BDT)</p>
                </div>

                {/* This Month */}
                <div className="bg-base-100 rounded-xl shadow-lg p-6 border border-base-100 hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center justify-between mb-4">
                        <div className="bg-orange-100 p-3 rounded-xl">
                            <Calendar className="w-6 h-6 text-orange-600" />
                        </div>
                        <span className="text-2xl font-bold text-orange-600">32</span>
                    </div>
                    <p className="text-neutral font-medium">Jobs This Month</p>
                </div>

                {/* Success Rate */}
                <div className="bg-base-100 rounded-xl shadow-lg p-6 border border-base-100 hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center justify-between mb-4">
                        <div className="bg-green-100 p-3 rounded-xl">
                            <Award className="w-6 h-6 text-green-600" />
                        </div>
                        <span className="text-2xl font-bold text-green-600">5.0</span>
                    </div>
                    <p className="text-neutral font-medium">Average Rating</p>
                </div>
            </div>
        </div>
    );
};

export default EarningSummary;