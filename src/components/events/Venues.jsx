import { useState } from "react";

export default function Venues() {
  const [activeTab, setActiveTab] = useState("Sargam Stage");
  const [sortType, setSortType] = useState("time");
  const [searchQuery, setSearchQuery] = useState("");

  const events = [
    {
      venue: "Sargam Stage",
      time: "10:00 AM",
      name: "Classical Music Concert",
      status: "Completed",
    },
    {
      venue: "Sargam Stage",
      time: "12:00 PM",
      name: "Dance Battle",
      status: "Ongoing",
    },
    {
      venue: "Sargam Stage",
      time: "2:00 PM",
      name: "Instrumental Fusion",
      status: "Not Started",
    },
    {
      venue: "DJ Hall",
      time: "3:00 PM",
      name: "EDM Night",
      status: "Completed",
    },
    {
      venue: "DJ Hall",
      time: "5:00 PM",
      name: "Karaoke Session",
      status: "Ongoing",
    },
    {
      venue: "Archie Corner",
      time: "11:00 AM",
      name: "Stand-up Comedy",
      status: "Completed",
    },
    {
      venue: "Archie Corner",
      time: "2:00 PM",
      name: "Open Mic Poetry",
      status: "Ongoing",
    },
    {
      venue: "Mech Top",
      time: "4:00 PM",
      name: "Rock Band Performance",
      status: "Completed",
    },
    {
      venue: "Mech Top",
      time: "6:00 PM",
      name: "Beatboxing Showdown",
      status: "Ongoing",
    },
    {
      venue: "CETAA Hall",
      time: "9:00 AM",
      name: "Keynote Speech",
      status: "Completed",
    },
    {
      venue: "CETAA Hall",
      time: "1:00 PM",
      name: "Panel Discussion",
      status: "Ongoing",
    },
  ];

  const filteredEvents = events
    .filter((event) => event.venue === activeTab)
    .filter((event) =>
      event.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

  filteredEvents.sort((a, b) => {
    if (sortType === "time") {
      return (
        new Date(`1970/01/01 ${a.time}`) - new Date(`1970/01/01 ${b.time}`)
      );
    }
    return a.status.localeCompare(b.status);
  });

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
        Event Venues
      </h1>

      {/* Venue Tabs */}
      <div className="flex flex-wrap justify-center space-x-2 border-b pb-2">
        {[...new Set(events.map((event) => event.venue))].map((venue) => (
          <button
            key={venue}
            onClick={() => setActiveTab(venue)}
            className={`py-2 px-4 rounded-full font-semibold shadow-md transition ${
              activeTab === venue
                ? "bg-blue-600 text-white scale-105"
                : "bg-gray-200 text-gray-800 hover:bg-blue-500 hover:text-white"
            }`}
          >
            {venue}
          </button>
        ))}
      </div>

      {/* Search and Sorting */}
      <div className="mt-4 flex flex-wrap justify-between items-center gap-4">
        <input
          type="text"
          placeholder="🔍 Search events..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border rounded w-full sm:w-1/2 bg-white shadow"
        />
        <select
          onChange={(e) => setSortType(e.target.value)}
          value={sortType}
          className="p-2 border rounded bg-white shadow"
        >
          <option value="time">Sort by Time</option>
          <option value="status">Sort by Status</option>
        </select>
      </div>

      {/* Events List */}
      <div className="mt-6 p-6 border rounded-lg shadow-lg bg-white">
        <h2 className="text-2xl font-semibold mb-4 text-blue-600">
          {activeTab} Events
        </h2>
        {filteredEvents.length > 0 ? (
          <ul className="space-y-4">
            {filteredEvents.map((event, index) => (
              <li
                key={index}
                className="p-4 bg-gray-100 rounded-lg shadow-md flex justify-between items-center hover:bg-gray-200 transition"
              >
                <div>
                  <p className="text-lg font-medium">{event.name}</p>
                  <p className="text-gray-500 text-sm">{event.time}</p>
                </div>
                <span
                  className={`text-sm font-semibold px-3 py-1 rounded-full ${
                    event.status === "Completed"
                      ? "bg-green-500 text-white"
                      : event.status === "Ongoing"
                      ? "bg-yellow-500 text-white"
                      : "bg-red-500 text-white"
                  }`}
                >
                  {event.status}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600 text-center text-lg py-6">
            😕 No events found.
          </p>
        )}
      </div>
    </div>
  );
}
