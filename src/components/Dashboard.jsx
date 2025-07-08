import React from "react";
import "../style/DashboardCharts.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const jobData = [
  { role: "Software Engineer", count: 40 },
  { role: "Product Manager", count: 45 },
  { role: "UX Designer", count: 48 },
  { role: "Data Analyst", count: 60 },
  { role: "Marketing Specialist", count: 50 },
];

const statusData = [
  { status: "Reviewed", count: 10 },
  { status: "Shortlisted", count: 70 },
  { status: "Rejected", count: 15 },
  { status: "Offered", count: 30 },
  { status: "Screening", count: 20 },
];

const DashboardCharts = () => {
  return (
    <div className="charts-container">
      <div className="chart-box">
        <h4>Applications per Job Listing</h4>
        <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height='100%'>
          <BarChart data={jobData}   margin={{ top:20, right: 20, bottom:10, left: 0 }}
          >
            <CartesianGrid vertical={false} strokeDasharray=" 3" />
            <XAxis
              dataKey="role"
              tick={false} axisLine={false}

            />
            <YAxis tick={{ fontSize: 12 }}/>
            <Tooltip formatter={(value) => [`${value} Applications`, "Count"]}
              labelFormatter={(label) => `Role: ${label}`}/>
            <Bar dataKey="count" fill="#e5e7eb" stroke="#E4DEDE" />
          </BarChart>
        </ResponsiveContainer>
        </div>
      </div>

      <div className="chart-box">
        <h4>Application Status Breakdown</h4>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={statusData}>
            <CartesianGrid vertical={false} strokeDasharray="3" />
            <XAxis
              dataKey="status" tick={false} axisLine={false} 
            />
            <YAxis />
            <Tooltip formatter={(value) => [`${value} Candidates`, "Count"]}
              labelFormatter={(label) => `Status: ${label}`}/>
            <Bar dataKey="count" fill="#e5e7eb" stroke="#E4DEDE" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardCharts;
