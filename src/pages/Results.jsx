import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Results() {
  const [expandedEvent, setExpandedEvent] = useState(null);
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const SHEET_ID = "1ZF6HOqrn7R6RKKFA0jHqw9maT9TDFkI36efcb039Hk4";

        // Fetch data from Google Sheets
        const fetchSheet = async (sheetName, range) => {
          const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${sheetName}&range=${range}`;
          const response = await fetch(url);
          const text = await response.text();
          return JSON.parse(text.substring(47, text.length - 2)); // Clean JSON
        };

        // Fetch data from all three sheets
        const departmentData = await fetchSheet("Department", "A:N");
        const groupData = await fetchSheet("Group", "A:N");
        const individualData = await fetchSheet("Individual", "A:T");

        // Process Department events
        const departmentResults = departmentData.table.rows
          .map((row) => {
            const name = row.c[0]?.v || "Unnamed Event";
            const status = row.c[13]?.v || "Not Started"; // Column N

            if (status !== "Completed") return null; // Only completed events

            return {
              name,
              category: "Department",
              venue: "N/A",
              first: [row.c[1]?.v, row.c[3]?.v].filter(Boolean), // B2, D2
              second: [row.c[5]?.v, row.c[7]?.v].filter(Boolean), // F2, H2
              third: [row.c[9]?.v, row.c[11]?.v].filter(Boolean), // J2, L2
            };
          })
          .filter((event) => event !== null);

        // Process Group events
        const groupResults = groupData.table.rows
          .map((row) => {
            const name = row.c[0]?.v || "Unnamed Event";
            const status = row.c[13]?.v || "Not Started"; // Column N

            if (status !== "Completed") return null;

            return {
              name,
              category: "Group",
              venue: "N/A",
              first: [row.c[1]?.v, row.c[3]?.v].filter(Boolean), // B2, D2
              second: [row.c[5]?.v, row.c[7]?.v].filter(Boolean), // F2, H2
              third: [row.c[9]?.v, row.c[11]?.v].filter(Boolean), // J2, L2
            };
          })
          .filter((event) => event !== null);

        // Process Individual events
        const individualResults = individualData.table.rows
          .map((row) => {
            const name = row.c[0]?.v || "Unnamed Event";

            // Extract multiple winners, removing "#N/A" values
            const first = [row.c[14]?.v, row.c[15]?.v].filter((v) => v && v !== "#N/A");
            const second = [row.c[16]?.v, row.c[17]?.v].filter((v) => v && v !== "#N/A");
            const third = [row.c[18]?.v, row.c[19]?.v].filter((v) => v && v !== "#N/A");

            if (first.length === 0 && second.length === 0 && third.length === 0) return null; // Ignore empty results

            return {
              name,
              category: "Individual",
              venue: "N/A",
              first,
              second,
              third,
            };
          })
          .filter((event) => event !== null);

        // Merge and update state
        setResults([...departmentResults, ...groupResults, ...individualResults]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6 min-h-screen bg-black text-white">
      <h1 className="text-4xl font-bold mb-4 text-center text-red-600">Results Page</h1>
      <div className="mt-4 p-6 border border-gray-700 rounded-lg shadow-md bg-gray-900">
        <h2 className="text-xl font-semibold mb-2 text-yellow-400">Event Results</h2>
        {results.length > 0 ? (
          <ul className="space-y-3">
            {results.map((event, index) => (
              <li
                key={index}
                className="p-4 bg-gray-800 hover:bg-gray-700 rounded-lg shadow-md border border-gray-600 cursor-pointer transition"
                onClick={() => setExpandedEvent(expandedEvent === event.name ? null : event.name)}
              >
                <div className="flex justify-between items-center">
                  <p className="text-lg font-medium">{event.name}</p>
                  <p className="text-gray-400 text-sm">{event.category}</p>
                </div>
                <AnimatePresence>
                  {expandedEvent === event.name && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-2 p-4 bg-gray-700 rounded-lg overflow-hidden"
                    >
                      <h3 className="text-lg font-semibold text-green-400">Winners</h3>
                      <ol className="list-decimal ml-6 space-y-1">
                        <li>
                          <strong>1st:</strong> {event.first.length > 0 ? event.first.join(", ") : "N/A"}
                        </li>
                        <li>
                          <strong>2nd:</strong> {event.second.length > 0 ? event.second.join(", ") : "N/A"}
                        </li>
                        <li>
                          <strong>3rd:</strong> {event.third.length > 0 ? event.third.join(", ") : "N/A"}
                        </li>
                      </ol>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400 text-center">No results available.</p>
        )}
      </div>
    </div>
  );
}
