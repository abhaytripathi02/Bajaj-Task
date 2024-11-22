import React, { useState } from "react";
import axios from "axios";
import ResponseDisplay from "./responseDisplay";

const InputForm = () => {
  const [jsonInput, setJsonInput] = useState("");
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = JSON.parse(jsonInput);
      const response = await axios.post("https://bfhl-server-swart.vercel.app/bfhl/post", data);
      setResponseData(response.data);
      setError("");
    } catch (err) {
      setError("Invalid JSON or server error");
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-screen-md mx-auto">
      <form onSubmit={handleSubmit}>
        <textarea
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          placeholder="Enter Data in JSON Format"
          rows="6"
          className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-yellow-500 focus:outline-none dark:bg-gray-700 dark:text-white"
        />
        <button
          type="submit"
          className="mt-4 w-full p-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 focus:ring-2 focus:ring-yellow-300 transition"
        >
          Submit
        </button>
      </form>
      {error && <p className="mt-4 text-red-500 font-medium">{error}</p>}
      {responseData && (
        <div className="mt-4">
          <ResponseDisplay data={responseData} />
        </div>
      )}
    </div>
  );
};

export default InputForm;
