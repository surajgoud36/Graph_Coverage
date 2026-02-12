import "../styling/GeneratePage.css";
import logo from "../assets/pen.jpg";
import React, { useState, useEffect } from "react";

import { exportPDFWithData } from "../components/ExportPdf";
import { RowInput } from "../helper/RowInput";
import { GenerateCoverage } from "../helper/GenerateCoverage";
import "jspdf-autotable";
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
></link>;

function GeneratePage() {
  const [rows, setRows] = useState([]);
  const [selectedOption, setSelectedOption] = useState("nodeCoverage");
  // state variable to store test requirement
  const [tR, setTR] = useState("");
  // state variable to store test paths
  const [tP, setTP] = useState("");
  // Ensure that there are always at least 6 rows on initial load
  useEffect(() => {
    setRows(
      Array.from({ length: 6 }, () => ({
        column1: "",
        column2: "",
      })),
    );
  }, []); // Empty dependency array to only run once on mount

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  // Function to handle adding a new row
  const handleAddRow = () => {
    setRows([...rows, { column1: "", column2: "" }]);
  };

  // Function to handle deleting a row
  const handleDeleteRow = (index) => {
    const updatedRows = [...rows];
    updatedRows.splice(index, 1);
    setRows(updatedRows);
  };

  // Function to handle updating text field value
  const handleInputChange = (index, column, value) => {
    setRows((prevRows) =>
      prevRows.map((row, i) =>
        i === index ? { ...row, [column]: value } : row,
      ),
    );
  };

  // Inline styles
  const tabStyle = {
    backgroundColor: "lightblue",
    padding: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "20px",
    marginTop: "2px",
    height: "60px",
  };

  return (
    <div className="content">
      {/* Tab style component */}
      <div style={tabStyle}>
        <img
          src={logo}
          alt="Logo"
          style={{ height: "50px", marginRight: "15px" }}
        />
        <h3>Graph Inputs</h3>
      </div>

      {/* Rows of text fields */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", marginBottom: "10px" }}>
          {/* Column 1 heading */}
          <h6 style={{ marginRight: "100px" }}>Source Nodes</h6>
          {/* Column 2 heading */}
          <h6 style={{ marginRight: "30px" }}>Outgoing Edges</h6>
          {/* Button placeholder */}
          <div style={{ width: "72px" }}></div>
        </div>
        {RowInput({ rows, handleInputChange, handleDeleteRow })}

        {/* Button to add a new row */}
        <button onClick={handleAddRow} className="btn btn-add-row mt-2">
          Add Row
        </button>
      </div>
      {/* Radio buttons */}
      {/* Radio buttons for selecting test coverage options */}
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <label style={{ marginRight: "20px" }}>
          <input
            type="radio"
            name="option"
            value="nodeCoverage"
            checked={selectedOption === "nodeCoverage"}
            onChange={handleOptionChange}
          />{" "}
          Node Coverage
        </label>
        <label style={{ marginRight: "20px" }}>
          <input
            type="radio"
            name="option"
            value="edgeCoverage"
            checked={selectedOption === "edgeCoverage"}
            onChange={handleOptionChange}
          />{" "}
          Edge Coverage
        </label>
        <label>
          <input
            type="radio"
            name="option"
            value="edgePairCoverage"
            checked={selectedOption === "edgePairCoverage"}
            onChange={handleOptionChange}
          />{" "}
          Edge-Pair Coverage
        </label>
      </div>

      {/* "Generate Coverage" button */}
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <button
          style={{ padding: "10px 20px" }}
          onClick={() =>
            GenerateCoverage({ rows, selectedOption, setTR, setTP })
          }
          className="btn btn-generate-coverage"
        >
          Generate Coverage
        </button>
      </div>
      <div className="grey-background">
        <h4>
          {selectedOption === "nodeCoverage" && "Node Coverage"}
          {selectedOption === "edgeCoverage" && "Edge Coverage"}
          {selectedOption === "edgePairCoverage" && "Edge-Pair Coverage"}
        </h4>
        <div className="container">
          <div className="text-area-container">
            <h5 className="heading">Test Requirements</h5>
            <textarea
              className="text-area"
              placeholder=""
              value={tR}
              onChange={(e) => setTR(e.target.value)}
            ></textarea>
          </div>
          <div className="text-area-container">
            <h5 className="heading">TestPaths</h5>
            <textarea
              className="text-area"
              placeholder=""
              value={tP}
              onChange={(e) => setTP(e.target.value)}
            ></textarea>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <button
            onClick={() => exportPDFWithData({ rows, tR, tP, selectedOption })}
            className="btn btn-secondary"
          >
            Export Data as PDF
          </button>
        </div>
      </div>
    </div>
  );
}

export default GeneratePage;
