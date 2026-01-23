import React from "react";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Heading from "../../../../Components/Shared/Heading/Heading";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: payments = [] } = useQuery({
    queryKey: ["payments", user.email],

    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user.email}`);
      return res.data;
    },
    staleTime: 0,
    cacheTime: 0,
    refetchOnWindowFocus: false,
    keepPreviousData: false,
  });
    const getStatusColor = (status) => {
    return status === "paid"
      ? "bg-green-100 text-green-700 border-green-200"
      : "bg-red-100 text-red-700 border-red-200";
  };
  return (
     <div className="min-h-screen space-y-6">
         <title>Laxius Decor || Payment History</title>

      {/* Header Section */}
      <div className=" mb-8">
        <Heading title={'Payment History'} subtitle=" Track all your payment transactions and receipts" center/>
        
      </div>

      {/* Table Section */}
      <div className="bg-base-100 rounded-xl shadow-lg overflow-hidden border border-base-100">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-primary/10 to-secondary/10 border-b-2 border-primary/20">
                <th className="px-6 py-4 text-left text-sm font-bold text-primary uppercase tracking-wider">
                  SL.
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-primary uppercase tracking-wider">
                  Service
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-primary uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-primary uppercase tracking-wider">
                  Payment Date
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-primary uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-primary uppercase tracking-wider">
                  Transaction ID
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-primary uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-base-100">
              {payments.map((payment, index) => (
                <tr
                  key={payment._id}
                  className="hover:bg-base-50 transition-colors duration-200"
                >
                  <td className="px-6 py-4 text-sm text-accent font-medium">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-semibold text-accent">
                      {payment.serviceName}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold text-accent">
                      ${payment.price}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-neutral">
                      {new Date(payment.paidAt).toLocaleDateString()}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border capitalize ${getStatusColor(
                        payment.paymentStatus
                      )}`}
                    >
                      {payment.paymentStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-mono text-neutral bg-base-100 px-2 py-1 rounded">
                      {payment.transactionId}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="flex items-center gap-2 px-4 py-2 bg-secondary hover:bg-primary text-white font-semibold text-sm rounded-lg transition-all duration-200 shadow-sm hover:shadow-md">
                      <HiOutlineMagnifyingGlass size={16} />
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {payments.length === 0 && (
          <div className="text-center py-16">
            <div className="text-neutral text-6xl mb-4">💳</div>
            <h3 className="text-lg font-semibold text-accent mb-2">
              No payment history
            </h3>
            <p className="text-neutral text-sm">
              Your payment transactions will appear here
            </p>
          </div>
        )}
      </div>

     
    </div>
  );
};

export default PaymentHistory;
