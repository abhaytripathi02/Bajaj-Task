import React from "react";
import InputForm from "./components/inputForm";
import Getbfhl from "./components/getbfhl";
import './App.css';

function App() {
  return (
    <div className="p-4 bg-slate-100 min-h-screen dark:bg-gray-900">
      <div className="container mx-auto max-w-screen-md">
        <h1 className="font-extrabold text-center text-3xl text-red-500 dark:text-red-400 mb-6">BFHL Task</h1>
        <div className="bg-white p-6 shadow rounded-lg dark:bg-gray-800">
          <InputForm />
          <br />
          <Getbfhl />
          
        </div>
      </div>
    </div>
  );
}

export default App;
