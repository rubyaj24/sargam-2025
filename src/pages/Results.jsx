import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Results() {
  const [expandedEvent, setExpandedEvent] = useState(null);
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const SHEET_ID = '1ZF6HOqrn7R6RKKFA0jHqw9maT9TDFkI36efcb039Hk4';
        const SHEET_NAME = 'Individual'; // Update this to match your sheet name
        const SHEET_RANGE = 'A:T'; // Fetching required columns
                
        const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${SHEET_NAME}&range=${SHEET_RANGE}`;
        const response = await fetch(url);
        const text = await response.text();
        const jsonData = JSON.parse(text.substring(47, text.length - 2));
    
        const formattedResults = jsonData.table.rows.map(row => {
          const name = row.c[0]?.v ?? ""; // Handles #N/A errors safely
    
          // Handling multiple winners while ignoring #N/A
          const firstWinners = [row.c[14]?.v, row.c[15]?.v].filter(v => v !== "#N/A" && v).join(", ");
          const secondWinners = [row.c[16]?.v, row.c[17]?.v].filter(v => v !== "#N/A" && v).join(", ");
          const thirdWinners = [row.c[18]?.v, row.c[19]?.v].filter(v => v !== "#N/A" && v).join(", ");
          
          if (!firstWinners && !secondWinners && !thirdWinners) return null; // Ignore if no results
          
          return {
            name,
            venue: "N/A", // Marking all venues as N/A
            first: { name: firstWinners || "N/A", department: "", year: "" },
            second: { name: secondWinners || "N/A", department: "", year: "" },
            third: { name: thirdWinners || "N/A", department: "", year: "" },
          };
        }).filter(event => event !== null);
    
        setResults(formattedResults);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    
    
    
    fetchData();
  }, []);

  return (
    <div className="p-6 min-h-screen bg-black text-white">
      <h1 className="text-4xl font-bold mb-4 text-center text-red-600">
        Results Page
      </h1>
      <div className="mt-4 p-6 border border-gray-700 rounded-lg shadow-md bg-gray-900">
        <h2 className="text-xl font-semibold mb-2 text-yellow-400">Event Results</h2>
        {results.length > 0 ? (
          <ul className="space-y-3">
            {results.map((event, index) => (
              <li
                key={index}
                className="p-4 bg-gray-800 hover:bg-gray-700 rounded-lg shadow-md border border-gray-600 cursor-pointer transition"
                onClick={() =>
                  setExpandedEvent(expandedEvent === event.name ? null : event.name)
                }
              >
                <div className="flex justify-between items-center">
                  <p className="text-lg font-medium">{event.name}</p>
                  <p className="text-gray-400 text-sm">{event.venue}</p>
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
                          <strong>1st:</strong> {event.first.name} 
                        </li>
                        <li>
                          <strong>2nd:</strong> {event.second.name} 
                        </li>
                        <li>
                          <strong>3rd:</strong> {event.third.name} 
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
