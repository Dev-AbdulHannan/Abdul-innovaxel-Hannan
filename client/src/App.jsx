// import React, { useState } from "react";
// import axios from "axios";

// function App() {
//   const [url, setUrl] = useState("");
//   const [shortUrl, setShortUrl] = useState("");

//   const handleSubmit = async () => {
//     const res = await axios.post("http://localhost:5000/api/shorten", { url });
//     setShortUrl(res.data.shortCode);
//   };

//   return (
//     <div>
//       <h2>URL Shortener</h2>
//       <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} />
//       <button onClick={handleSubmit}>Shorten</button>
//       {shortUrl && (
//         <p>
//           Short URL: {window.location.origin}/{shortUrl}
//         </p>
//       )}
//     </div>
//   );
// }

// export default App;

import React, { useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
console.log("API URL:", API_URL);

function App() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [updateUrl, setUpdateUrl] = useState("");
  const [shortCode, setShortCode] = useState("");
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Shorten URL
  const handleShorten = async () => {
    if (!url) return alert("Please enter a URL");

    setLoading(true);
    setError("");
    try {
      const res = await axios.post(`${API_URL}/shorten`, { url });
      setShortUrl(res.data.shortCode);
    } catch (err) {
      setError("Failed to shorten URL");
    } finally {
      setLoading(false);
    }
  };

  // Update URL
  const handleUpdate = async () => {
    if (!shortCode || !updateUrl) return alert("Enter short code & new URL");

    setLoading(true);
    setError("");
    try {
      await axios.put(`${API_URL}/shorten/${shortCode}`, { url: updateUrl });
      alert("URL updated successfully!");
    } catch (err) {
      setError("Failed to update URL");
    } finally {
      setLoading(false);
    }
  };

  // Delete URL
  const handleDelete = async () => {
    if (!shortCode) return alert("Enter a short code to delete");

    setLoading(true);
    setError("");
    try {
      await axios.delete(`${API_URL}/shorten/${shortCode}`);
      alert("URL deleted successfully!");
    } catch (err) {
      setError("Failed to delete URL");
    } finally {
      setLoading(false);
    }
  };

  // Fetch URL Stats
  const handleStats = async () => {
    if (!shortCode) return alert("Enter a short code to get stats");

    setLoading(true);
    setError("");
    try {
      const res = await axios.get(`${API_URL}/shorten/${shortCode}/stats`);
      setStats(res.data);
    } catch (err) {
      setError("Failed to fetch stats");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        textAlign: "center",
        maxWidth: "500px",
        margin: "auto",
        padding: "20px",
      }}
    >
      <h2>URL Shortener</h2>

      {/* Shorten URL */}
      <input
        type="text"
        placeholder="Enter URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        style={{ marginBottom: "10px", width: "80%", padding: "8px" }}
      />
      <button
        onClick={handleShorten}
        disabled={loading}
        style={{ marginLeft: "10px" }}
      >
        Shorten
      </button>

      {shortUrl && (
        <p>
          <strong>Short URL:</strong>{" "}
          <a
            href={`${window.location.origin}/${shortUrl}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {window.location.origin}/{shortUrl}
          </a>
        </p>
      )}

      <h3>Update / Delete URL</h3>

      {/* Short Code Input */}
      <input
        type="text"
        placeholder="Enter Short Code"
        value={shortCode}
        onChange={(e) => setShortCode(e.target.value)}
        style={{ width: "80%", padding: "8px", marginBottom: "10px" }}
      />

      {/* Update URL */}
      <input
        type="text"
        placeholder="Enter New URL"
        value={updateUrl}
        onChange={(e) => setUpdateUrl(e.target.value)}
        style={{ width: "80%", padding: "8px", marginBottom: "10px" }}
      />
      <button
        onClick={handleUpdate}
        disabled={loading}
        style={{ marginLeft: "10px" }}
      >
        Update
      </button>

      {/* Delete Button */}
      <button
        onClick={handleDelete}
        disabled={loading}
        style={{ marginLeft: "10px", backgroundColor: "red", color: "white" }}
      >
        Delete
      </button>

      <h3>Get URL Statistics</h3>
      <button
        onClick={handleStats}
        disabled={loading}
        style={{ marginTop: "10px" }}
      >
        Get Stats
      </button>

      {stats && (
        <div
          style={{
            marginTop: "10px",
            textAlign: "left",
            padding: "10px",
            border: "1px solid #ddd",
            borderRadius: "5px",
          }}
        >
          <p>
            <strong>Original URL:</strong> {stats.url}
          </p>
          <p>
            <strong>Short Code:</strong> {stats.shortCode}
          </p>
          <p>
            <strong>Created At:</strong>{" "}
            {new Date(stats.createdAt).toLocaleString()}
          </p>
          <p>
            <strong>Updated At:</strong>{" "}
            {new Date(stats.updatedAt).toLocaleString()}
          </p>
          <p>
            <strong>Access Count:</strong> {stats.accessCount}
          </p>
        </div>
      )}

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default App;
