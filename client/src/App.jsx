import React, { useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

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
        minHeight: "100vh",
        backgroundColor: "#F3F4F6",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "24px",
          borderRadius: "8px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          maxWidth: "500px",
          width: "100%",
        }}
      >
        <h2
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            textAlign: "center",
            color: "#1F2937",
            marginBottom: "16px",
          }}
        >
          URL Shortener
        </h2>

        {/* Shorten URL Section */}
        <div style={{ marginBottom: "16px" }}>
          <input
            type="text"
            placeholder="Enter URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #D1D5DB",
              borderRadius: "6px",
              marginBottom: "10px",
            }}
          />
          <button
            onClick={handleShorten}
            disabled={loading}
            style={{
              width: "100%",
              backgroundColor: "#3B82F6",
              color: "white",
              padding: "10px",
              borderRadius: "6px",
              cursor: "pointer",
              transition: "background 0.3s",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#2563EB")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#3B82F6")}
          >
            Shorten
          </button>
        </div>

        {shortUrl && (
          <p
            style={{ textAlign: "center", color: "#059669", fontWeight: "500" }}
          >
            Short URL:{" "}
            <a
              href={`http://localhost:5000/api/${shortUrl}`} // Use backend URL
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "underline", color: "#2563EB" }}
            >
              http://localhost:5000/api/{shortUrl}
            </a>
            {/* <a
              href={`${API_URL.replace("/api", "")}/shorten/${shortUrl}`} // Dynamically adjust backend URL
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "underline", color: "#2563EB" }}
            >
              {`${API_URL.replace("/api", "")}/shorten/${shortUrl}`}
            </a> */}
          </p>
        )}

        <hr style={{ margin: "16px 0" }} />

        {/* Update/Delete Section */}
        <h3
          style={{
            fontSize: "18px",
            fontWeight: "600",
            color: "#374151",
            marginBottom: "10px",
          }}
        >
          Manage URL
        </h3>

        <input
          type="text"
          placeholder="Short Code"
          value={shortCode}
          onChange={(e) => setShortCode(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            border: "1px solid #D1D5DB",
            borderRadius: "6px",
            marginBottom: "10px",
          }}
        />

        <input
          type="text"
          placeholder="New URL"
          value={updateUrl}
          onChange={(e) => setUpdateUrl(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            border: "1px solid #D1D5DB",
            borderRadius: "6px",
            marginBottom: "10px",
          }}
        />

        <div style={{ display: "flex", gap: "10px" }}>
          <button
            onClick={handleUpdate}
            disabled={loading}
            style={{
              flex: "1",
              backgroundColor: "#F59E0B",
              color: "white",
              padding: "10px",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Update
          </button>

          <button
            onClick={handleDelete}
            disabled={loading}
            style={{
              flex: "1",
              backgroundColor: "#EF4444",
              color: "white",
              padding: "10px",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Delete
          </button>
        </div>

        <hr style={{ margin: "16px 0" }} />

        {/* Statistics Section */}
        <h3
          style={{
            fontSize: "18px",
            fontWeight: "600",
            color: "#374151",
            marginBottom: "10px",
          }}
        >
          Get Stats
        </h3>
        <button
          onClick={handleStats}
          disabled={loading}
          style={{
            width: "100%",
            backgroundColor: "#8B5CF6",
            color: "white",
            padding: "10px",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Get Statistics
        </button>

        {stats && (
          <div
            style={{
              marginTop: "10px",
              padding: "12px",
              backgroundColor: "#F3F4F6",
              borderRadius: "6px",
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

        {loading && (
          <p
            style={{ textAlign: "center", color: "#6B7280", marginTop: "10px" }}
          >
            Loading...
          </p>
        )}
        {error && (
          <p
            style={{ textAlign: "center", color: "#DC2626", marginTop: "10px" }}
          >
            {error}
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
