import React from "react";

export default function SargamPrathibha() {
  const topStudents = [
    { name: "Aryan Raj", department: "Music", year: "3rd", totalPoints: 95 },
    { name: "Sneha Nair", department: "Arts", year: "2nd", totalPoints: 92 },
    { name: "Rahul Kumar", department: "Science", year: "4th", totalPoints: 88 },
    { name: "Meera Reddy", department: "Drama", year: "1st", totalPoints: 85 },
    { name: "Aditya Sharma", department: "Mechanical", year: "3rd", totalPoints: 83 },
    { name: "Divya Iyer", department: "Music", year: "2nd", totalPoints: 80 },
    { name: "Nihal Joseph", department: "Arts", year: "4th", totalPoints: 78 },
    { name: "Rohit Verma", department: "Science", year: "1st", totalPoints: 76 },
    { name: "Priya Das", department: "Drama", year: "3rd", totalPoints: 74 },
    { name: "Vikas Menon", department: "Mechanical", year: "2nd", totalPoints: 72 },
  ];

  return (
    <div className="p-8 min-h-screen">
      <h1 className="text-4xl font-extrabold mb-6 text-center text-red-600">
        Sargam Prathibha
      </h1>
      <div className="overflow-x-auto">
        {/* <table className="w-full border-collapse shadow-lg bg-gray-800 rounded-lg">
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
        </table> */}
        <div className="text-center text-2xl font-bold text-yellow-400 mt-10">
        TO BE ANNOUNCED
        </div>
      </div>
    </div>
  );
}
