"use client";
import { useEffect, useState } from "react";

export default function Results() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/api/choice")
      .then(r => r.json())
      .then(setData);
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Her Choices 💝</h1>
      {data.map((r,i)=>(
        <div key={i} className="mb-3 border p-3 rounded-xl">
          Day {r.day} — {r.choice} — {new Date(r.time).toLocaleString()}
        </div>
      ))}
    </div>
  );
}
