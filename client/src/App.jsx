import React, { useState } from "react";
import axios from "axios";

function App() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const handleSubmit = async () => {
    const res = await axios.post("http://localhost:5000/api/shorten", { url });
    setShortUrl(res.data.shortCode);
  };

  return (
    <div>
      <h2>URL Shortener</h2>
      <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} />
      <button onClick={handleSubmit}>Shorten</button>
      {shortUrl && (
        <p>
          Short URL: {window.location.origin}/{shortUrl}
        </p>
      )}
    </div>
  );
}

export default App;
