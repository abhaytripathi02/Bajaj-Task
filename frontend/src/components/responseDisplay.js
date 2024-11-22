import React from "react";

const responseDisplay = ({ data }) => {
  return (
    <div>
      <h2>Response</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default responseDisplay;