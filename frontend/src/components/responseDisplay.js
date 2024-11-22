import React from "react";

const ResponseDisplay = ({ data }) => {
  return (
    <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-300 mb-2">
        Response
      </h2>
      <pre className="bg-gray-200 dark:bg-gray-700 text-sm p-3 rounded-lg overflow-auto text-gray-800 dark:text-gray-300">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
};

export default ResponseDisplay;
