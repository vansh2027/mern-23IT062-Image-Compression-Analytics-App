import { useEffect, useState } from "react";
import API from "../assets/api";

function LogsViewer() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    API.get("/images/logs").then((res) => setLogs(res.data));
  }, []);

  return (
    <div className="p-4 border rounded bg-gray-50">
      <h2 className="text-lg font-bold">Activity Logs</h2>
      <ul className="mt-2 text-sm">
        {logs.map((log, index) => (
          <li key={index} className="p-1 border-b">{log}</li>
        ))}
      </ul>
    </div>
  );
}

export default LogsViewer;
