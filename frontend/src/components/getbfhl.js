import React, { useState } from "react";
import axios from "axios";
import ResponseDisplay from "./responseDisplay";

const Getbfhl = () => {
  const [error, setError] = useState("");
  const [responseData, setResponseData] = useState(null);

  const handleSubmit = async () => {
    try {
      const response = await axios.get("https://bfhl-server-swart.vercel.app/bfhl/get");
      setResponseData(response.data);
      setError("");
    } catch (err) {
      setError("Invalid JSON or server error");
    }
  };

  return (
    <div className="mt-4">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-300 mb-2">Get API Call</h2>
      <button
        onClick={handleSubmit}
        className="w-full p-2 text-white bg-yellow-500 rounded hover:bg-yellow-600 focus:ring-2 focus:ring-yellow-300 transition"
      >
        Submit
      </button>
      {error && <p className="mt-2 text-red-600">{error}</p>}
      {responseData && <ResponseDisplay data={responseData} />}
    </div>
  );
};

export default Getbfhl;
