
import { useEffect, useState } from "react";
import axios from "axios";
import "./index.css";

const API_URL = "http://20.207.122.201/evaluation-service/notifications";


const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJrcjkzMzJAc3JtaXN0LmVkdS5pbiIsImV4cCI6MTc3NzcwNjg3OSwiaWF0IjoxNzc3NzA1OTc5LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiN2M3YjE1MzItOWY1Ny00YTAwLWIyY2YtOTM1MzBmODNlNWUwIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoia2lzaG9yZSByIiwic3ViIjoiNGJlZjM5ZGMtMjU4My00ZWNiLTk4OGYtNDcyOTUyMTNiNzQyIn0sImVtYWlsIjoia3I5MzMyQHNybWlzdC5lZHUuaW4iLCJuYW1lIjoia2lzaG9yZSByIiwicm9sbE5vIjoicmEyMzExMDI3MDIwMDY2IiwiYWNjZXNzQ29kZSI6IlFrYnB4SCIsImNsaWVudElEIjoiNGJlZjM5ZGMtMjU4My00ZWNiLTk4OGYtNDcyOTUyMTNiNzQyIiwiY2xpZW50U2VjcmV0IjoiWGFUY3lnRnN4aGhValBCeSJ9.AuGbsJ91PZoV7JMbAiHEoJKAQ8_TldFJu0GXyvL0OZU";

function App() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      });
      setData(res.data?.notifications || []);
    } catch (err) {
      console.error("Error fetching data");
    }
  };

  const filtered =
    filter === "All"
      ? data
      : data.filter((item) => item.Type === filter);

  return (
    <div className="container">
      <h1>🚀 Notifications</h1>

      {/* Filter Buttons */}
      <div style={{ marginBottom: "15px" }}>
        {["All", "Placement", "Result", "Event"].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            style={{
              marginRight: "8px",
              padding: "6px 12px",
              borderRadius: "20px",
              border: "1px solid #ccc",
              background: filter === type ? "#111" : "#fff",
              color: filter === type ? "#fff" : "#000",
              cursor: "pointer",
            }}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Notifications */}
      {filtered.length === 0 ? (
        <p>No notifications found</p>
      ) : (
        filtered.map((item) => (
          <div className="card" key={item.ID}>
            <span className="badge">{item.Type}</span>

            <h2 style={{ marginTop: "10px" }}>
              {item.Message}
            </h2>

            <p className="timestamp">{item.Timestamp}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default App;