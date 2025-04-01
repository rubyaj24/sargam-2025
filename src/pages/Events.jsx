import React, { useState, useEffect } from "react";

export default function Events() {
  const [eventData, setEventData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const SHEET_ID = "1ZF6HOqrn7R6RKKFA0jHqw9maT9TDFkI36efcb039Hk4";
        const SHEET_RANGE = "A:N"; // Covers all event types up to column N

        const SHEETS = ["INDIVIDUAL", "GROUP", "DEPARTMENT"]; // Sheet names

        let allEvents = [];

        for (const SHEET_NAME of SHEETS) {
          const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${SHEET_NAME}&range=${SHEET_RANGE}`;

          const response = await fetch(url);
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }

          const text = await response.text();
          const jsonStart = text.indexOf("{");
          const jsonEnd = text.lastIndexOf("}") + 1;
          const jsonString = text.substring(jsonStart, jsonEnd);
          const data = JSON.parse(jsonString);

          const rows = data.table.rows;

          const formattedData = rows
            .map((row) => ({
              name: row.c[0]?.v || "Unnamed Event", // Column A: Event Name
              status: row.c[13]?.v || "Unknown", // Column N (Index 13): Status
              category: SHEET_NAME, // Identifies whether it's Individual, Group, or Department
            }))
            .filter(
              (event) =>
                !["individual", "group", "department", "group event", "department event", "group events", "department events"]
                  .includes(event.name.toLowerCase()) // Removes unwanted headings
            );

          allEvents = [...allEvents, ...formattedData];
        }

        setEventData(allEvents);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, []);

  const filteredEvents = eventData.filter((event) =>
    event.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "not started":
        return "text-red-500";
      case "ongoing":
        return "text-yellow-500";
      case "completed":
        return "text-green-500";
      default:
        return "text-white";
    }
  };

  return (
    <div className="p-8 min-h-screen text-white">
      <h1 className="text-4xl font-extrabold mb-6 text-center text-red-600">
        Events Table
      </h1>
      <div className="mb-4 text-center">
        <input
          type="text"
          placeholder="Search event by name..."
          className="p-2 rounded-lg bg-gray-800 text-white border border-gray-600 w-full max-w-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse shadow-lg bg-gray-800 rounded-3xl">
          <thead>
            <tr className="bg-yellow-400 text-black text-lg">
              <th className="border border-gray-700 p-4">Event Name</th>
              <th className="border border-gray-700 p-4">Category</th>
              <th className="border border-gray-700 p-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredEvents.map((event, index) => (
              <tr
                key={index}
                className="text-center even:bg-gray-700 odd:bg-gray-800 hover:bg-gray-600 transition"
              >
                <td className="border border-gray-700 p-4 text-yellow-600">{event.name}</td>
                <td className="border border-gray-700 p-4 text-blue-400">{event.category}</td>
                <td className={`border border-gray-700 p-4 ${getStatusColor(event.status)}`}>
                  {event.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
