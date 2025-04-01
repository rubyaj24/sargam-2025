import React from "react";

export default function SargamPrathibha() {
  const topStudents = [
    { name: "TBA", department: "TBA", year: "TBA", totalPoints: 0 },
    { name: "TBA", department: "TBA", year: "TBA", totalPoints: 0 },
  ];

  return (
    <div className="p-8 min-h-screen">
      <h1 className="text-4xl font-extrabold mb-6 text-center text-red-600">
        Sargam Prathibha 
      </h1>
      <h2 className="text-2xl font-extrabold mb-6 text-center text-white-600">
        Will be updated soon 
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse shadow-lg bg-gray-800 rounded-lg">
          <thead>
            <tr className="bg-yellow-400 text-black text-lg">
              <th className="border border-gray-700 p-4">Rank</th>
              <th className="border border-gray-700 p-4">Name</th>
              <th className="border border-gray-700 p-4">Department</th>
              <th className="border border-gray-700 p-4">Year</th>
              <th className="border border-gray-700 p-4">Total Points</th>
            </tr>
          </thead>
          <tbody>
            {topStudents.map((student, index) => (
              <tr
                key={index}
                className="text-center text-gray-300 even:bg-gray-700 hover:bg-gray-600 transition"
              >
                <td className="border border-gray-700 p-4 font-semibold">
                  {index + 1}
                </td>
                <td className="border border-gray-700 p-4 font-semibold">
                  {student.name}
                </td>
                <td className="border border-gray-700 p-4">
                  {student.department}
                </td>
                <td className="border border-gray-700 p-4">
                  {student.year}
                </td>
                <td className="border border-gray-700 p-4 font-bold text-yellow-500">
                  {student.totalPoints}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
