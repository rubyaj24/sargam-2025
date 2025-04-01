import React, { useState, useEffect } from "react";

export default function PointsTable() {
  const [pointsData, setPointsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const SHEET_ID = '1ZF6HOqrn7R6RKKFA0jHqw9maT9TDFkI36efcb039Hk4';
        const SHEET_NAME = 'DEPT POINTS TABLE';
        const SHEET_RANGE = 'A2:B9';
        
        const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${SHEET_NAME}&range=${SHEET_RANGE}`;
        
        const response = await fetch(url);
        if(!response.ok) {
          throw new Error('Network response was not ok');
        }

        const text = await response.text();
        const jsonStart = text.indexOf('{');
        const jsonEnd = text.lastIndexOf('}') + 1;
        const jsonString = text.substring(jsonStart, jsonEnd);
        const data = JSON.parse(jsonString);

        const rows = data.table.rows;
        const formattedData = rows.map((row) => ({
          department: row.c[0]?.v || '',
          totalPoints: row.c[1]?.v || 0
        }));
        formattedData.sort((a, b) => b.totalPoints - a.totalPoints); // Sort by total points in descending order
        setPointsData(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    
    fetchData();

    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-8 min-h-screen text-white">
      <h1 className="text-4xl font-extrabold mb-6 text-center text-red-600">
        Points Table
      </h1>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse shadow-lg bg-gray-800 rounded-3xl">
          <thead>
            <tr className="bg-yellow-400 text-black text-lg">
              <th className="border border-gray-700 p-4">Department</th>
              <th className="border border-gray-700 p-4">Total Points</th>
            </tr>
          </thead>
          <tbody>
            {pointsData.map((dept, index) => (
              <tr
                key={index}
                className="text-center even:bg-gray-700 odd:bg-gray-800 hover:bg-gray-600 transition"
              >
                <td className="border border-gray-700 p-4 font-semibold text-yellow-600">
                  {dept.department}
                </td>
                <td className="border border-gray-700 p-4 font-bold text-yellow-600">
                  {dept.totalPoints}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}