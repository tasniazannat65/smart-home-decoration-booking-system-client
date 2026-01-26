import React from 'react';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../../Components/Shared/Loading/Loading';
import { Calendar, DollarSign, FileText, Hash, Receipt, TrendingUp } from 'lucide-react';

const DecoratorPaymentHistory = () => {
    const axiosSecure = useAxiosSecure();
    const {data: history = [], isLoading} = useQuery({
        queryKey: ['earnings-history'],
        queryFn: async()=>{
            const res = await axiosSecure.get('/decorator/earning-history');
            return res.data;
        }
    })
    if(isLoading){
        return <Loading/>
    }
    return (
       <div className="min-h-screen  py-8 md:py-10 lg:py-12">
            <title>Laxius Decor || Decorator Payment History</title>

            <div className="mb-8">
                <div className="bg-gradient-to-r from-primary to-secondary rounded-xl p-8 shadow-xl">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <div className="flex items-center gap-4">
                            <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl">
                                <Receipt className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Payment History</h1>
                                <p className="text-blue-100 text-lg">Track all your earnings and transactions</p>
                            </div>
                        </div>
                        <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-xl border border-white/30">
                            <p className="text-white text-sm font-semibold">Total Payments</p>
                            <p className="text-3xl font-bold text-white">{history.length}</p>
                        </div>
                    </div>
                </div>
            </div>

            {history.length === 0 ? (
                <div className="bg-base-100 rounded-xl shadow-lg p-16 text-center border border-base-100">
                    <div className="bg-blue-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Receipt className="w-12 h-12 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold text-accent mb-2">No Payment History</h3>
                    <p className="text-neutral text-lg">No payment history found</p>
                </div>
            ) : (
                <div className="bg-base-100 rounded-xl shadow-xl border border-base-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead>
                                <tr className="bg-gradient-to-r from-primary/20 to-secondary-20 border-b border-base-200">
                                    <th className="px-6 py-4">
                                        <div className="flex items-center gap-2 font-bold text-accent text-sm uppercase tracking-wide">
                                            <span className="w-8 h-8 bg-primary text-white rounded-lg flex items-center justify-center text-xs font-bold">#</span>
                                            <span>SL.</span>
                                        </div>
                                    </th>
                                    <th className="px-6 py-4">
                                        <div className="flex items-center gap-2 font-bold text-accent text-sm uppercase tracking-wide">
                                            <DollarSign className="w-4 h-4 text-green-600" />
                                            <span>Amount</span>
                                        </div>
                                    </th>
                                    <th className="px-6 py-4">
                                        <div className="flex items-center gap-2 font-bold text-accent text-sm uppercase tracking-wide">
                                            <Hash className="w-4 h-4 text-purple-600" />
                                            <span>Booking ID</span>
                                        </div>
                                    </th>
                                    <th className="px-6 py-4">
                                        <div className="flex items-center gap-2 font-bold text-accent text-sm uppercase tracking-wide">
                                            <Calendar className="w-4 h-4 text-orange-600" />
                                            <span>Date</span>
                                        </div>
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {history.map((p, index) => (
                                    <tr 
                                        key={p._id}
                                        className="hover:bg-primary/10 transition-colors duration-200 border-b border-base-100 group"
                                    >
                                        <td className="px-6 py-5">
                                            <span className="w-10 h-10 bg-gradient-to-br from-primary to-secondary text-white rounded-xl flex items-center justify-center font-bold shadow-md group-hover:scale-110 transition-transform duration-200">
                                                {index + 1}
                                            </span>
                                        </td>

                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                                                    <DollarSign className="w-5 h-5 text-green-600" />
                                                </div>
                                                <div>
                                                    <span className="text-green-600 font-bold text-lg">
                                                        {p.price} BDT
                                                    </span>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                                                    <FileText className="w-5 h-5 text-purple-600" />
                                                </div>
                                                <span className="text-accent font-medium font-mono bg-base-100 px-3 py-1 rounded-lg">
                                                    {p.bookingId?.toString() || 'N/A'}
                                                </span>
                                            </div>
                                        </td>

                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                                                    <Calendar className="w-5 h-5 text-orange-600" />
                                                </div>
                                                <span className="text-accent font-medium">
                                                    {new Date(p.createdAt).toLocaleDateString()}
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {history.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                    <div className="bg-base-100 rounded-xl p-6 shadow-lg border border-base-100 hover:shadow-xl transition-shadow duration-300">
                        <div className="flex items-center justify-between mb-4">
                            <div className="bg-green-100 p-3 rounded-xl">
                                <DollarSign className="w-6 h-6 text-green-600" />
                            </div>
                            <span className="text-2xl font-bold text-green-600">
                                {history.reduce((sum, p) => sum + p.price, 0).toLocaleString()}
                            </span>
                        </div>
                        <p className="text-neutral font-medium">Total Earnings (BDT)</p>
                    </div>

                    <div className="bg-base-100 rounded-xl p-6 shadow-lg border border-base-100 hover:shadow-xl transition-shadow duration-300">
                        <div className="flex items-center justify-between mb-4">
                            <div className="bg-blue-100 p-3 rounded-xl">
                                <TrendingUp className="w-6 h-6 text-blue-600" />
                            </div>
                            <span className="text-2xl font-bold text-blue-600">
                                {Math.round(history.reduce((sum, p) => sum + p.price, 0) / history.length).toLocaleString()}
                            </span>
                        </div>
                        <p className="text-neutral font-medium">Average Payment (BDT)</p>
                    </div>

                    <div className="bg-base-100 rounded-xl p-6 shadow-lg border border-base-100 hover:shadow-xl transition-shadow duration-300">
                        <div className="flex items-center justify-between mb-4">
                            <div className="bg-purple-100 p-3 rounded-xl">
                                <Receipt className="w-6 h-6 text-purple-600" />
                            </div>
                            <span className="text-2xl font-bold text-purple-600">
                                {history[0]?.price.toLocaleString() || 0}
                            </span>
                        </div>
                        <p className="text-neutral font-medium">Latest Payment (BDT)</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DecoratorPaymentHistory;