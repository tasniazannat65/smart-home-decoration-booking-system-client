import React from "react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Heading from "../../../../Components/Shared/Heading/Heading";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const Revenue = () => {
  const axiosSecure = useAxiosSecure();
  const { data = [] } = useQuery({
    queryKey: ["revenue-analytics"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/revenue-analytics");
      return res.data;
    },
  });
  return (
    <div
      className="bg-base-100 p-6
         rounded-xl shadow"
    >
      <title>Laxius Decor || Revenue Analytics</title>
      <Heading title="Monthly Revenue" />
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: 0, bottom: 10 }}
        >
          <CartesianGrid stroke="#f0f0f0" strokeDasharray="3 3" />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 12, fill: "#555" }}
            angle={-30}
            textAnchor="end"
            interval={0}
          />
          <YAxis
            tick={{ fontSize: 12, fill: "#555" }}
            tickFormatter={(value) => `${value} BDT`}
          />
          <Tooltip
            formatter={(value) => `${value} BDT`}
            contentStyle={{ backgroundColor: "#f9f9f9", borderRadius: "8px" }}
          />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#dfd6e5"
            strokeWidth={3}
            dot={{ r: 5, strokeWidth: 2, fill: "#4f46e5" }}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Revenue;
