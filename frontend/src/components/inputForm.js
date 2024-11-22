import React, { useState } from "react";
import axios from "axios";
import ResponseDisplay from "./responseDisplay";

const BASE_URL = process.env.BACKEND_URL

const InputForm = () => {
  const [jsonInput, setJsonInput] = useState("");
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = JSON.parse(jsonInput);
      const response = await axios.post( "https://bfhl-server-swart.vercel.app/bfhl/post", data);
      setResponseData(response.data);
      setError("");
    } catch (err) {
      setError("Invalid JSON or server error");
    }
  };

  return (
    <div className="p-10 bg-slate-800">
      <form onSubmit={handleSubmit}>
        <textarea
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          placeholder="Enter Data in JSON Format"
          rows="5"
          cols="50"
        />
        <br />
        <button type="submit">Submit</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {responseData && <ResponseDisplay data={responseData} />}
    </div>
  );
};

export default InputForm;