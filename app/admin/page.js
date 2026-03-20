"use client";
import { useState } from "react";

export default function Admin() {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");

  const addItem = async () => {
    await fetch("/api/data", {
      method: "POST",
      body: JSON.stringify({ title, link })
    });
    alert("Added!");
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Admin Panel</h1>

      <input placeholder="Title" onChange={e => setTitle(e.target.value)} /><br /><br />
      <input placeholder="Link" onChange={e => setLink(e.target.value)} /><br /><br />

      <button onClick={addItem}>Add</button>
    </div>
  );
}
