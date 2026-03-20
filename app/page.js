"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/api/data")
      .then(res => res.json())
      .then(setData);
  }, []);

  return (
    <div style={{ padding: 20, background: "#0f172a", minHeight: "100vh", color: "white" }}>
      <h1>My Links</h1>

      {data.map((item, i) => (
        <a key={i} href={item.link} target="_blank" style={{
          display: "block",
          padding: "15px",
          margin: "10px 0",
          background: "#1e293b",
          borderRadius: "10px",
          textDecoration: "none",
          color: "white"
        }}>
          {item.title}
        </a>
      ))}
    </div>
  );
}
