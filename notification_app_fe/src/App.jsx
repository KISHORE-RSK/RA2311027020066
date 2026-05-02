

import { useEffect, useState } from "react";
import axios from "axios";

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJrcjkzMzJAc3JtaXN0LmVkdS5pbiIsImV4cCI6MTc3NzcwNTY5OSwiaWF0IjoxNzc3NzA0Nzk5LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiOWY2ZGUyNDctNDEwMC00ZGNiLWJlMTUtOWM3Nzc3YTc1ZDI3IiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoia2lzaG9yZSByIiwic3ViIjoiNGJlZjM5ZGMtMjU4My00ZWNiLTk4OGYtNDcyOTUyMTNiNzQyIn0sImVtYWlsIjoia3I5MzMyQHNybWlzdC5lZHUuaW4iLCJuYW1lIjoia2lzaG9yZSByIiwicm9sbE5vIjoicmEyMzExMDI3MDIwMDY2IiwiYWNjZXNzQ29kZSI6IlFrYnB4SCIsImNsaWVudElEIjoiNGJlZjM5ZGMtMjU4My00ZWNiLTk4OGYtNDcyOTUyMTNiNzQyIiwiY2xpZW50U2VjcmV0IjoiWGFUY3lnRnN4aGhValBCeSJ9.cxarW1OYpSklu9pS_OeJYS5JFOHZzgZrVlZTudUzfUU";

function App() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(
        "http://20.207.122.201/evaluation-service/notifications",
        {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      );
      setData(res.data?.notifications || []);
    } catch (err) {
      console.log("Error fetching data");
    }
  };

  const filteredData =
    filter === "All"
      ? data
      : data.filter((item) => item.Type === filter);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>Notifications</h2>

      <button onClick={() => setFilter("All")}>All</button>
      <button onClick={() => setFilter("Placement")}>Placement</button>
      <button onClick={() => setFilter("Result")}>Result</button>
      <button onClick={() => setFilter("Event")}>Event</button>

      {filteredData.map((item) => (
        <div
          key={item.ID}
          style={{
            border: "1px solid #ccc",
            margin: "10px",
            padding: "10px",
            borderRadius: "8px",
          }}
        >
          <h4>{item.Type}</h4>
          <p>{item.Message}</p>
          <small>{item.Timestamp}</small>
        </div>
      ))}
    </div>
  );
}

export default App;