import React from "react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../../Components/Shared/Loading/Loading";
import Heading from "../../../../Components/Shared/Heading/Heading";
import { Briefcase, Calendar, CheckCircle, Clock, MapPin, TrendingUp, User } from "lucide-react";

const TodaySchedule = () => {
  const axiosSecure = useAxiosSecure();
  const { data: todayJobs = [], isLoading } = useQuery({
    queryKey: ["today-schedule"],
    refetchInterval: 60000,
    queryFn: async () => {
      const res = await axiosSecure.get("/decorator/today-schedule");
      return res.data;
    },
  });
    const getStatusConfig = (status) => {
    const configs = {
      completed: { bg: 'bg-green-500', text: 'Completed', icon: CheckCircle },
      on_the_way: { bg: 'bg-blue-500', text: 'On The Way', icon: TrendingUp },
      materials_ready: { bg: 'bg-yellow-500', text: 'Materials Ready', icon: Briefcase },
      planning: { bg: 'bg-purple-500', text: 'Planning', icon: Calendar },
      default: { bg: 'bg-gray-500', text: 'Assigned', icon: Calendar }
    };
    return configs[status] || configs.default;
  };
  if (isLoading) {
    return <Loading />;
  }
  return (
  <div className="min-h-screen py-8 md:py-10 lg:py-12">
       <title>Laxius Decor || Today Schedule</title>
      
      {/* Header Section */}
      <div className=" mb-8">
        <div className="bg-gradient-to-r from-primary/60 to-secondary/80 rounded-xl p-8 shadow-xl">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <div>
                  <Heading title="Today's Schedule" center />

                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Today's Schedule</h1>
                <p className="text-blue-100 text-lg">
                  {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-xl border border-white/30">
              <p className="text-white text-sm font-semibold">Total Jobs</p>
              <p className="text-3xl font-bold text-white">{todayJobs.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div>
        {todayJobs.length === 0 ? (
          <div className="bg-base-100 rounded-xl shadow-lg p-16 text-center border border-base-200">
            <div className="bg-blue-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
              <Calendar className="w-12 h-12 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-accent mb-2">No Jobs Scheduled</h3>
            <p className="text-neutral text-lg">No jobs schedule for today</p>
          </div>
        ) : (
         <div className="bg-base-100 rounded-xl shadow-xl border border-base-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="table w-full">
                {/* Table Header */}
                <thead>
                  <tr className="bg-primary/20 border-b border-base-200">
                    <th className="px-6 py-4">
                      <div className="flex items-center gap-2 font-bold text-accent text-sm uppercase tracking-wide">
                        <span className="w-8 h-8 bg-primary text-white rounded-lg flex items-center justify-center text-xs font-bold">#</span>
                        <span>SL.</span>
                      </div>
                    </th>
                    <th className="px-6 py-4">
                      <div className="flex items-center gap-2 font-bold text-accent text-sm uppercase tracking-wide">
                        <User className="w-4 h-4 text-primary" />
                        <span>User</span>
                      </div>
                    </th>
                    <th className="px-6 py-4">
                      <div className="flex items-center gap-2 font-bold text-accent text-sm uppercase tracking-wide">
                        <Briefcase className="w-4 h-4 text-primary" />
                        <span>Services</span>
                      </div>
                    </th>
                    <th className="px-6 py-4">
                      <div className="flex items-center gap-2 font-bold text-accent text-sm uppercase tracking-wide">
                        <MapPin className="w-4 h-4 text-primary" />
                        <span>Location</span>
                      </div>
                    </th>
                    <th className="px-6 py-4">
                      <div className="flex items-center gap-2 font-bold text-accent text-sm uppercase tracking-wide">
                        <Clock className="w-4 h-4 text-primary" />
                        <span>Time</span>
                      </div>
                    </th>
                    <th className="px-6 py-4">
                      <div className="flex items-center gap-2 font-bold text-accent text-sm uppercase tracking-wide">
                        <CheckCircle className="w-4 h-4 text-primary" />
                        <span>Status</span>
                      </div>
                    </th>
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody>
                  {todayJobs.map((job, index) => {
                    const statusConfig = getStatusConfig(job.status);
                    const StatusIcon = statusConfig.icon;
                    
                    return (
                      <tr 
                        key={job._id} 
                        className="hover:bg-blue-50/50 transition-colors duration-200 border-b border-base-100 group"
                      >
                        {/* Serial Number */}
                        <td className="px-6 py-5">
                          <span className="w-10 h-10 bg-gradient-to-br from-primary to-secondary text-white rounded-xl flex items-center justify-center font-bold shadow-md group-hover:scale-110 transition-transform duration-200">
                            {index + 1}
                          </span>
                        </td>

                        {/* User Email */}
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                              <User className="w-5 h-5 text-blue-600" />
                            </div>
                            <span className="text-accent font-medium truncate">{job.userEmail}</span>
                          </div>
                        </td>

                        {/* Service Name */}
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                              <Briefcase className="w-5 h-5 text-purple-600" />
                            </div>
                            <span className="text-accent font-medium">{job.serviceName || "No Services"}</span>
                          </div>
                        </td>

                        {/* Location */}
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                              <MapPin className="w-5 h-5 text-green-600" />
                            </div>
                            <span className="text-accent font-medium truncate">{job.location}</span>
                          </div>
                        </td>

                        {/* Time */}
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                              <Clock className="w-5 h-5 text-orange-600" />
                            </div>
                            <span className="text-accent font-medium">
                              {job.bookingDate
                                ? new Date(job.bookingDate).toLocaleTimeString("en-BD", {
                                    timeZone: "Asia/Dhaka",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })
                                : "N/A"}
                            </span>
                          </div>
                        </td>

                        {/* Status */}
                        <td className="px-6 py-5">
                          <div className={`inline-flex items-center gap-2 ${statusConfig.bg} text-white px-4 py-2 rounded-xl font-semibold shadow-md hover:shadow-lg transition-shadow duration-200`}>
                            <StatusIcon className="w-4 h-4" />
                            <span className="text-sm">{statusConfig.text}</span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

        )}

        {/* Summary Cards */}
        {todayJobs.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
            <div className="bg-base-100 rounded-xl p-6 shadow-lg border border-base-100 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-green-100 p-3 rounded-xl">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <span className="text-2xl font-bold text-green-600">
                  {todayJobs.filter(j => j.status === 'completed').length}
                </span>
              </div>
              <p className="text-neutral font-medium">Completed</p>
            </div>

            <div className="bg-base-100 rounded-xl p-6 shadow-lg border border-base-100 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-blue-100 p-3 rounded-xl">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                </div>
                <span className="text-2xl font-bold text-blue-600">
                  {todayJobs.filter(j => j.status === 'on_the_way').length}
                </span>
              </div>
              <p className="text-neutral font-medium">On The Way</p>
            </div>

            <div className="bg-base-100 rounded-xl p-6 shadow-lg border border-base-100 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-yellow-100 p-3 rounded-xl">
                  <Briefcase className="w-6 h-6 text-yellow-600" />
                </div>
                <span className="text-2xl font-bold text-yellow-600">
                  {todayJobs.filter(j => j.status === 'materials_ready').length}
                </span>
              </div>
              <p className="text-neutral font-medium">Materials Ready</p>
            </div>

            <div className="bg-base-100 rounded-xl p-6 shadow-lg border border-base-100 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-purple-100 p-3 rounded-xl">
                  <Calendar className="w-6 h-6 text-purple-600" />
                </div>
                <span className="text-2xl font-bold text-purple-600">
                  {todayJobs.filter(j => j.status === 'planning').length}
                </span>
              </div>
              <p className="text-neutral font-medium">Planning</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodaySchedule;
