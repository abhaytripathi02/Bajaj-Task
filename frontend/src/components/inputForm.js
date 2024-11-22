import React, { useState } from "react";
import axios from "axios";
import ResponseDisplay from "./responseDisplay";

const InputForm = () => {
  const [jsonInput, setJsonInput] = useState("");
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState("");


  const [selectedOptions, setSelectedOptions] = useState([]);


     // Options for the dropdown
    const options = [
      { label: 'Alphabets', value: 'alphabets' },
      { label: 'Numbers', value: 'numbers' },
      { label: 'Highest Lowercase Alphabet', value: 'highestLowercase' },
    ];



  // Handle dropdown selection
  const handleOptionChange = (event) => {
    const value = event.target.value;
    setSelectedOptions((prev) =>
      prev.includes(value)
        ? prev.filter((option) => option !== value) // Deselect if already selected
        : [...prev, value] // Add to selected options
    );
  };

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


       {/* Multi-Select Dropdown */}
       {1 && (
        <div className="mt-6">
          <label className="block text-gray-100 font-semibold mb-2">Choose Options:</label>
          <select
            multiple
            value={selectedOptions}
            onChange={handleOptionChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {options.map((option) => (
              <option key={option.value} value={option.value} className="p-2">
                {option.label}
              </option>
            ))}
          </select>
          <div className="mt-4">
            <strong className="text-gray-100">Selected Options:</strong>{' '}
            <span className="text-blue-600">{selectedOptions.join(', ') || 'None'}</span>
          </div>
        </div>
      )}


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
