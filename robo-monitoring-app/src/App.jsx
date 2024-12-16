import React, { useEffect, useState } from "react";
import "./App.css";
import io from "socket.io-client";
import 'leaflet/dist/leaflet.css';
import LiveRoboLocation from "./robotLive";

function App() {
  const [robo, setRobo] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(robo.length / itemsPerPage);

  const currentRobots = robo.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
 
  useEffect(() => {
    const _conn = io("http://localhost:5000");
    if (_conn) {
      _conn.on("update_robots", (data) => {
        setRobo(data["robots"]);
      });
      return () => {
        _conn.disconnect();
      };
    }
  }, []);

  const changePage = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="App">
      <h1 className="text-2xl font-semibold shadow-lg p-4 fixed top-0 bg-white w-full z-[1200] text-gray-500">
        Fleet Robot Dashboard.
      </h1>
      <section className="flex flex-col gap-4 w-4/5 mx-auto max-h-[85vh] overflow-auto mt-20 shadow-lg p-3">
        {currentRobots.map((robot) => (
          <div
            key={robot["Robot ID"]}
            className={`grid grid-cols-2 p-4 border rounded-md ${robot["Battery Percentage"] < 20 ? "bg-red-500" : "bg-green-200"
              }`}
          > 
            <div>
              <h2 className="text-lg font-bold">Robot ID: {robot["Robot ID"]}</h2>
              <p><span className="font-semibold">CPU Usage:</span> {robot["CPU Usage"]}</p>
              <p><span className="font-semibold">RAM Consumption:</span> {robot["RAM Consumption"]}</p>
              <p><span className="font-semibold">Status: </span> {robot["Online/Offline"] ? "Online" : "Offline"}</p>
              <p><span className="font-semibold">Battery: </span> {robot["Battery Percentage"]}%</p>
              <p><span className="font-semibold">Location:</span> {robot["Location Coordinates"].join(", ")}</p>
              <p><span className="font-semibold">Last Updated:</span> {robot["Last Updated"]}</p>
            </div>
            <div>
              <LiveRoboLocation coordinates={robot["Location Coordinates"]} />
            </div>
          </div>
        ))}
      </section>
  
      <div className="my-6 flex justify-center space-x-2">
        <button
          className={`px-4 py-2 rounded-md border ${currentPage === 1
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          onClick={() => currentPage > 1 && changePage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            className={`px-4 py-2 rounded-md border ${currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-100 hover:bg-gray-200"
              }`}
            onClick={() => changePage(index + 1)}
          >
            {index + 1}
          </button>
        ))}

        <button
          className={`px-4 py-2 rounded-md border ${currentPage === totalPages
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          onClick={() => currentPage < totalPages && changePage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div> 
  );
}

export default App;
