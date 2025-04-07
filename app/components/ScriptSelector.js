"use client"; // This must be a client component

import { useState, useEffect } from "react";

export default function ScriptSelector({ onSelect }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [scripts, setScripts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch scripts from the API
  useEffect(() => {
    fetch("/Backend/api/scripts")
      .then((res) => res.json())
      .then((data) => {
        setScripts(data);
        setLoading(false);
      })
      .catch((err) => console.error("Error fetching scripts:", err));
  }, []);

  // Filter suggestions based on input
  useEffect(() => {
    if (query.length >= 1) {
      const filtered = scripts.filter(script =>
        script.name.startsWith(query.toUpperCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [query, scripts]);

  const handleSelect = (script) => {
    setQuery(script.name);
    if (onSelect) onSelect(script.name); // Pass selected token
    setSuggestions([]);
  };

  return (
    <div className="relative w-72">
      <input
        type="text"
        className="border border-gray-300 p-2 w-full"
        placeholder="Enter script name..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {loading && <p>Loading...</p>}
      {suggestions.length > 0 && (
        <ul className="absolute bg-white border border-gray-300 w-full mt-1 max-h-40 overflow-y-auto">
          {suggestions.map((script) => (
            <li
              key={script.token}
              className="p-2 hover:bg-gray-200 cursor-pointer"
              onClick={() => handleSelect(script)}
            >
              {script.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
