import "../styling/GeneratePage.css";
import logo from "../assets/pen.jpg";
import React, { useState, useEffect } from "react";
import jsPDF from 'jspdf';

import 'jspdf-autotable'; 
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
></link>;


let paths = [];
let path = [];
let edges = new Map();
let aset = new Set();
let finalPaths = new Map();
let counter = 1;
let fpath = [];
let fpath1 = [];
let fpath2 = []; // final test paths for edge coverage
let fpath3 = []; // final test paths for node coverage
let temp = []; // Test path edge pairs

class Graph {
  constructor() {
    this.adjList = {};
  }

  addVertex(vertex) {
    if (!this.adjList[vertex]) {
      this.adjList[vertex] = [];
    }
  }

  addEdge(vertex1, vertex2) {
    if (!this.adjList[vertex1]) {
      this.addVertex(vertex1);
    }
    if (!this.adjList[vertex2]) {
      this.addVertex(vertex2);
    }
    this.adjList[vertex1].push(vertex2);
  }

  display() {
    console.log(this.adjList);
  }
}

function createGraph(graph, vertex, edges) {
  graph.addVertex(vertex);
  let neighbors = edges.split(",");
  neighbors.forEach((neighbor) => {
    if (neighbor.trim() !== "") {
      // Ensure non-empty, non-blank edges are added
      graph.addEdge(vertex, neighbor.trim());
    }
  });
}

function GeneratePage() {
  // Initialize state with 6 rows
  const [rows, setRows] = useState([
    { column1: "", column2: "" },
    { column1: "", column2: "" },
    { column1: "", column2: "" },
    { column1: "", column2: "" },
    { column1: "", column2: "" },
    { column1: "", column2: "" },
  ]);

  // State for selected option
  const [selectedOption, setSelectedOption] = useState("nodeCoverage");
  const [tR, setTR] = useState("");
  const [tP, setTP] = useState("");
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  

  const handleClick = () => {
    let startNode = "";
    let endNode = "";
    let hasError = false; // Flag to track if there's any error

    console.log("Current state of rows:", rows);

    const graph = new Graph();

    // Validate data and check for errors
    for (let i = 0; i < rows.length; i++) {
      const { column1, column2 } = rows[i];

      if (i === 0) {
        if (column1 === '' || column2 === '') {
          alert("Start Node Info Missing");
          hasError = true;
          break;
        }
      } else if (i === rows.length - 1) {
        if (column1 === '') {
          alert("End node is missing");
          hasError = true;
          break;
        }
      } else {
        if (column1 === '' || column2 === '') {
          alert("Missing intermediate node info");
          hasError = true;
          break;
        }
      }
    }

    // If there's an error, don't proceed further
    if (hasError) {
      return;
    }

    // If no error, proceed with graph creation and test path generation
    rows.forEach((row, index) => {
      if (index === 0) {
        startNode = row.column1;
      }
      endNode = row.column1;
      createGraph(graph, row.column1, row.column2);
    });

    console.log(startNode);
    console.log(endNode);
    graph.display();
    console.log(selectedOption);

    findTestPaths(graph, startNode, endNode);
    generateFinalPaths();
    pathEdgePairCoverage();

    if (selectedOption === "edgePairCoverage") {
      let relevantPaths = fpath.filter((_, i) => !temp.includes(i));
      let pathsOutput = relevantPaths
        .map((path) => `Path: ${path.join(" -> ")}`)
        .join("\n\n");
      setTP(pathsOutput);

      let edgePPairs = edgePairs(graph)
        .map((pair) => `(${pair.join(" -> ")})`)
        .join(", ");
      setTR(edgePPairs);
    } else if (selectedOption === "edgeCoverage") {
      let relevantPaths = fpath2.filter(
        (_, i) => !pathEdgeCoverage(fpath2).includes(i)
      );
      let pathsOutput = relevantPaths
        .map((path) => `Path: ${path.join(" -> ")}`)
        .join("\n\n");
      setTP(pathsOutput);

      let edgesFormatted = edgesF(graph)
        .map((edge) => `(${edge.join(" -> ")})`)
        .join(", ");
      setTR(edgesFormatted);
    } else {
      let relevantPaths = fpath3.filter(
        (_, i) => !pathNodeCoverage(fpath3).includes(i)
      );
      let pathsOutput = relevantPaths
        .map((path) => `Path: ${path.join(" -> ")}`)
        .join("\n\n");
      setTP(pathsOutput);

      let nodesFormatted = nodes(graph).join(", ");
      setTR(nodesFormatted);
    }

    paths = [];
    path = [];
    edges = new Map();
    aset = new Set();
    finalPaths = new Map();
    counter = 1;
    fpath = [];
    fpath1 = [];
    fpath2 = []; // final test paths for edge coverage
    fpath3 = []; // final test paths for node coverage
    temp = []; // Test path edge pairs
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
    const updatedRows = [...rows];
    updatedRows[index][column] = value;
    setRows(updatedRows);
  };

  const exportPDFWithData = () => {

    if (!tR.trim()) {
      alert("Please generate a coverage first before exporting to PDF.");
      return; // Exit the function early
    }

    const pdf = new jsPDF();

    const coverageNameMap = {
      nodeCoverage: "Node Coverage",
      edgeCoverage: "Edge Coverage",
      edgePairCoverage: "Edge-Pair Coverage"
    };
    const coverageName = coverageNameMap[selectedOption] || "Selected Coverage";

    pdf.setFontSize(18);
    pdf.text(`Graph Data and Test Details - ${coverageName}`, 14, 22); // Coordinates for the title

    pdf.setFontSize(18);
    pdf.text("Graph Data and Test Details", 14, 22); // Coordinates for the title

    
    const tableColumn = ["Source Node", "Outgoing Edges"];
    const tableRows = [];

    // Populate tableRows with your rows' data
    rows.forEach(row => {
      const rowData = [
        row.column1,
        row.column2,
      ];
      tableRows.push(rowData);
    });

    pdf.autoTable(tableColumn, tableRows, { startY: 30 });

    // Calculate startY dynamically based on previous content
    let startY = pdf.lastAutoTable ? pdf.lastAutoTable.finalY + 10 : 30;

    // Adding Test Requirements
    pdf.setFontSize(16);
    pdf.text(14, startY, "Test Requirements:");
    startY += 7; // Small space after the heading

    const maxWidth = 180; // Maximum width for text to fit in the PDF
    const requirements = tR.split("\n"); // Assuming each requirement is on a new line

    // Iterate through each requirement and split it if necessary
    requirements.forEach((requirement) => {
      const splitRequirement = pdf.splitTextToSize(requirement, maxWidth); // Split long text
      splitRequirement.forEach((line, index) => {
        pdf.text(14, startY + (6 * index), line); // Adjust vertical space between lines
      });
      startY += (splitRequirement.length * 6) + 1; // Increase startY for the next requirement based on the number of lines
    });

    let startYForPaths = startY + 5; // Increase space before starting paths

    // Adding Test Paths after Requirements
    pdf.text(14, startYForPaths, "Test Paths:");
    startYForPaths += 7; // Small space after the heading
    const paths = tP.split("\n\n"); // Assuming each path is separated by a double newline

    paths.forEach((path, index) => {
      pdf.text(14, startYForPaths + (6 * index), `Path ${index + 1}: ${path}`);
      startYForPaths += 6; // Adjust according to content
    });

    // Save the PDF
    pdf.save("graph_data.pdf");
  };

  // Ensure that there are always at least 6 rows on initial load
  useEffect(() => {
    
      setRows((prevRows) => {
        if (prevRows.length < 6) {
          return [
            ...prevRows,
            ...Array(6 - prevRows.length).fill({ column1: "", column2: "" }),
          ];
        }
        return prevRows;
      });
    
  }, []); // Empty dependency array to only run once on mount
  // Include rows as dependency to trigger effect on rows change

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

        {rows.map((row, index) => (
          <div key={index} style={{ display: "flex", marginBottom: "20px" }}>
            {/* Column 1 text field */}

            {index === 0 && (
              <input
                type="text"
                value={row.column1}
                maxLength={1}
                onChange={(e) =>
                  handleInputChange(index, "column1", e.target.value)
                }
                placeholder="Start Node: "
                style={{
                  marginRight: "50px",
                  borderRadius: "5px",
                  padding: "5px",
                }}

              />
            )}
            {index === 0 && (
              <input
                type="text"
                value={row.column2}
                onChange={(e) =>
                  handleInputChange(index, "column2", e.target.value)
                }
                placeholder="eg: B,C"
                style={{
                  marginRight: "30px",
                  borderRadius: "5px",
                  padding: "5px",
                }}
              />
            )}
            {index !== 0 && index !== rows.length - 1 && (
              <input
                type="text"
                value={row.column1}
                maxLength={1}
                onChange={(e) =>
                  handleInputChange(index, "column1", e.target.value)
                }
                placeholder=""
                style={{
                  marginRight: "50px",
                  borderRadius: "5px",
                  padding: "5px",
                }}
              />
            )}
            {index !== 0 && index !== rows.length - 1 && (
              <input
                type="text"
                value={row.column2}
                onChange={(e) =>
                  handleInputChange(index, "column2", e.target.value)
                }
                placeholder=""
                style={{
                  marginRight: "30px",
                  borderRadius: "5px",
                  padding: "5px",
                }}
              />
            )}
            {index === rows.length - 1 && (
              <input
                type="text"
                value={row.column1}
                maxLength={1}
                onChange={(e) =>
                  handleInputChange(index, "column1", e.target.value)
                }
                placeholder="End Node"
                style={{
                  marginRight: "50px",
                  borderRadius: "5px",
                  padding: "5px",
                }}
              />
            )}
            {index === rows.length - 1 && (
              <input
                type="text"
                value={row.column2}
                onChange={(e) =>
                  handleInputChange(index, "column2", e.target.value)
                }
                disabled={true}
                style={{
                  marginRight: "30px",
                  borderRadius: "5px",
                  padding: "5px",
                }}
              />
            )}
            {/* Column 2 text field */}
            {index !== 0 && index !== rows.length - 1 ? (
              <button
                onClick={() => handleDeleteRow(index)}
                className="btn btn-outline-danger"
              >
                <i className="fas fa-trash"></i> Delete
              </button>
            ) : (
              <div style={{ width: "72px", height: "36px" }}></div>
            )}
           
          </div>
        ))}

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
          onClick={handleClick}
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
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <button onClick={exportPDFWithData} className="btn btn-secondary">Export Data as PDF</button>
        </div>
      </div>

    </div>
  );
}

function findTestPaths(graph, startNode, endNode) {
  dfs(graph, startNode, endNode, edges, path, paths);
  console.log(path);
  console.log(paths);
  let arrayFromSet = [...aset];
  console.log(arrayFromSet);
  finalPaths.forEach((value, key) => {
    console.log(key + " => " + value);
  });
  //console.log(edges);
  //console.log(finalPaths.get(5)[1]);
}
function dfs(graph, currentNode, endNode, edges, paths, path) {
  path.push(currentNode);
  if (currentNode === endNode) {
    paths.push(path);
    aset.add(path);
    finalPaths.set(counter, [...path]);
    counter = counter + 1;
    console.log(path);
  } else {
    let aLen = graph.adjList[currentNode].length;
    //console.log(aLen);
    for (let i = 0; i < aLen; i++) {
      let neigh = graph.adjList[currentNode][i];
      // console.log(neigh)
      if (edges.has(currentNode)) {
        let array = edges.get(currentNode);
        let index = array.indexOf(neigh);
        // console.log(index)
        if (index === -1) {
          array.push(neigh);
          //path.push(neigh);
          dfs(graph, neigh, endNode, edges, paths, path);
          array = edges.get(currentNode);
          index = array.indexOf(neigh);
          if (index !== -1) {
            array.splice(index, 1);
          }
          let len = array.length;
          if (len === 0) {
            edges.delete(currentNode);
          }
          
        } else {
          let reps = countOccurrences(array, neigh);
          if (reps === 1) {
            array.push(neigh);
            //path.push(neigh);
            dfs(graph, neigh, endNode, edges, paths, path);
            array = edges.get(currentNode);
            index = array.indexOf(neigh);
            if (index !== -1) {
              array.splice(index, 1);
            }
            let len = array.length;
            if (len === 0) {
              edges.delete(currentNode);
            }
           
          }
        }
      } else {
        // does not have the edge
        edges.set(currentNode, [neigh]);
        // path.push(neigh);
        dfs(graph, neigh, endNode, edges, paths, path);
        let array = edges.get(currentNode);
        let index = array.indexOf(neigh);
        if (index !== -1) {
          array.splice(index, 1);
        }
        let len = array.length;
        if (len === 0) {
          edges.delete(currentNode);
        }
       
      }
    }
  }
}

function countOccurrences(array, element) {
  let count = 0;
  for (let i = 0; i < array.length; i++) {
    if (array[i] === element) {
      count++;
    }
  }
  return count;
}

function generateFinalPaths() {
  let counter1 = 0;
  finalPaths.forEach((value1, key) => {
    let a1 = [...value1];
    let flag = 0;
    finalPaths.forEach((value2, key) => {
      //console.log(key + ' => ' + value);
      let a2 = [...value2];
      //let flag1=checkArrays(a1,a2);
      let flag1 = 0;
      if (arraysEqual(a1, a2) === 0) {
        // not eaqual arrays
        flag1 = checkArrays(a1, a2);
        if (flag1 === 0) {
          //fpath.push([...a1]);

          flag = 1;
        }
      }

      counter1 = counter1 + 1;
    });
    if (flag === 0) {
      fpath.push([...a1]);
    }
  }); // creating fpaths
  let counter2 = 0;
  finalPaths.forEach((value1, key) => {
    let a1 = [...value1];
    let flag = 0;
    finalPaths.forEach((value2, key) => {
      //console.log(key + ' => ' + value);
      let a2 = [...value2];
      //let flag1=checkArrays(a1,a2);
      let flag1 = 0;
      if (arraysEqual(a1, a2) === 0) {
        // not eaqual arrays
        flag1 = checkArrays1(a1, a2);
        if (flag1 === 0) {
          //fpath.push([...a1]);
          if (a1.length > a2.length) {
            flag = 1;
          }
        }
      }

      counter2 = counter2 + 1;
    });
    if (flag === 0) {
      fpath1.push([...a1]);
    }
  }); // creating fpaths
 
  for (let i = 0; i < fpath1.length; i++) {
    let a1 = [...fpath1[i]];
    let flag = 0;
    for (let j = 0; j < fpath1.length; j++) {
      let a2 = [...fpath1[j]];
      let flag1 = 0;
      if (arraysEqual(a1, a2) === 0) {
        // not eaqual arrays
        flag1 = checkArrays1(a1, a2);
        if (flag1 === 0) {
          //fpath.push([...a1]);
          if (a1.length <= a2.length) {
            flag = 1;
          }
        }
      }
    }
    if (flag === 0) {
      fpath2.push([...a1]);
    }
  }

 
  for (let i = 0; i < fpath2.length; i++) {
    let a1 = [...fpath2[i]];
    let flag = 0;
    for (let j = 0; j < fpath2.length; j++) {
      let a2 = [...fpath2[j]];
      let flag1 = 0;
      if (arraysEqual(a1, a2) === 0) {
        // not eaqual arrays
        flag1 = checkArrays2(a1, a2);
        if (flag1 === 0) {
          //fpath.push([...a1]);
          if (a1.length <= a2.length) {
            flag = 1;
          }
        }
      }
    }
    if (flag === 0) {
      fpath3.push([...a1]);
    }
  }
}
function arraysEqual(a, b) {
  if (a.length !== b.length) {
    return 0;
  }

  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      return 0;
    }
  }

  return 1;
}

function checkArrays(a1, a2) {
  let l1 = a1.length;
  let l2 = a2.length;
  let flag = 0; // to discard it
  for (let i = 0; i <= l1 - 3; i++) {
    let a = a1[i];
    let b = a1[i + 1];
    let c = a1[i + 2];
    let flag1 = 0;
    for (let j = 0; j <= l2 - 3; j++) {
      let x = a2[j];
      let y = a2[j + 1];
      let z = a2[j + 2];
      if (a === x && b === y && c === z) {
        flag1 = 1;
        break;
      }
    }
    if (flag1 === 0) {
      flag = 1;
      break;
    }
  }
  return flag;
}
function checkArrays1(a1, a2) {
  let l1 = a1.length;
  let l2 = a2.length;
  let flag = 0; // to discard it
  for (let i = 0; i <= l1 - 2; i++) {
    let a = a1[i];
    let b = a1[i + 1];

    let flag1 = 0;
    for (let j = 0; j <= l2 - 2; j++) {
      let x = a2[j];
      let y = a2[j + 1];

      if (a === x && b === y) {
        flag1 = 1;
        break;
      }
    }
    if (flag1 === 0) {
      flag = 1;
      break;
    }
  }
  return flag;
}
function checkArrays2(a1, a2) {
  let l1 = a1.length;
  let l2 = a2.length;
  let flag = 0; // to discard it
  for (let i = 0; i <= l1 - 1; i++) {
    let a = a1[i];

    let flag1 = 0;
    for (let j = 0; j <= l2 - 1; j++) {
      let x = a2[j];

      if (a === x) {
        flag1 = 1;
        break;
      }
    }
    if (flag1 === 0) {
      flag = 1;
      break;
    }
  }
  return flag;
}
function checkIndex(k) {
  for (let i = 0; i < temp.length; i++) {
    if (k === temp[i]) {
      return 1;
      //break;
    }
  }
  return 0;
}
function checkIndex1(k, temp1) {
  for (let i = 0; i < temp1.length; i++) {
    if (k === temp1[i]) {
      return 1;
      //break;
    }
  }
  return 0;
}
function edgePairs(graph) {
  let finalEdgePairs = [];
  for (let vertex in graph.adjList) {
    let edgpair = [];
    edgpair.push(vertex);
    let c = 1;
    let neighbors = [...graph.adjList[vertex]];
    for (let i = 0; i < neighbors.length; i++) {
      c = c + 1;
      edgpair.push(neighbors[i]);
      let n1 = [...graph.adjList[neighbors[i]]];
      for (let j = 0; j < n1.length; j++) {
        edgpair.push(n1[j]);
        finalEdgePairs.push([...edgpair]);
        edgpair.pop();
      }
      edgpair.pop();
    }
  }
  return finalEdgePairs;
}
function edgesF(graph) {
  let finalEdges = [];
  for (let vertex in graph.adjList) {
    let edge = [];
    edge.push(vertex);
    let neighbors = [...graph.adjList[vertex]];
    for (let i = 0; i < neighbors.length; i++) {
      edge.push(neighbors[i]);
      finalEdges.push([...edge]);
      edge.pop();
    }
    edge.pop();
  }
  return finalEdges;
}
function nodes(graph) {
  let finalNodes = [];
  for (let vertex in graph.adjList) {
    finalNodes.push(vertex);
  }
  return finalNodes;
}
function pathEdgeCoverage(fpath) {
  let temp1 = [];
  let len = fpath.length;
  for (let i = 0; i < len; i++) {
    let hit = 1;
    let array1 = [...fpath[i]];
    let l1 = array1.length;
    for (let j = 0; j <= l1 - 2; j++) {
      let a = array1[j];
      let b = array1[j + 1];

      let hit1 = 0;
      for (let k = 0; k < len; k++) {
        let array2 = [...fpath[k]];
        // should not check same array or array that is deleted
        if (arraysEqual(array1, array2) === 0) {
          // arrrays are different
          // check for array that is deleted
          if (checkIndex1(k, temp1) !== 1) {
            let l2 = array2.length;
            for (let h = 0; h <= l2 - 2; h++) {
              let x = array2[h];
              let y = array2[h + 1];

              if (a === x && b === y) {
                hit1 = 1;
                break;
              }
            }
          }
        }
        if (hit1 === 1) {
          break;
        }
      }
      if (hit1 === 0) {
        hit = 0;
        break;
      }
    }
    if (hit !== 0) {
      temp1.push(i);
      //console.log(fpath[i]);
    }
  }
  return temp1;
}
function pathNodeCoverage(fpath) {
  let temp2 = [];
  let len = fpath.length;
  for (let i = 0; i < len; i++) {
    let hit = 1;
    let array1 = [...fpath[i]];
    let l1 = array1.length;
    for (let j = 0; j <= l1 - 1; j++) {
      let a = array1[j];

      let hit1 = 0;
      for (let k = 0; k < len; k++) {
        let array2 = [...fpath[k]];
        // should not check same array or array that is deleted
        if (arraysEqual(array1, array2) === 0) {
          // arrrays are different
          // check for array that is deleted
          if (checkIndex1(k, temp2) !== 1) {
            let l2 = array2.length;
            for (let h = 0; h <= l2 - 1; h++) {
              let x = array2[h];

              if (a === x) {
                hit1 = 1;
                break;
              }
            }
          }
        }
        if (hit1 === 1) {
          break;
        }
      }
      if (hit1 === 0) {
        hit = 0;
        break;
      }
    }
    if (hit !== 0) {
      temp2.push(i);
      //console.log(fpath[i]);
    }
  }
  return temp2;
}
function pathEdgePairCoverage() {
  let len = fpath.length;
  for (let i = 0; i < len; i++) {
    let hit = 1;
    let array1 = [...fpath[i]];
    let l1 = array1.length;
    for (let j = 0; j <= l1 - 3; j++) {
      let a = array1[j];
      let b = array1[j + 1];
      let c = array1[j + 2];
      let hit1 = 0;
      for (let k = 0; k < len; k++) {
        let array2 = [...fpath[k]];
        // should not check same array or array that is deleted
        if (arraysEqual(array1, array2) === 0) {
          // arrrays are different
          // check for array that is deleted
          if (checkIndex(k) !== 1) {
            let l2 = array2.length;
            for (let h = 0; h <= l2 - 3; h++) {
              let x = array2[h];
              let y = array2[h + 1];
              let z = array2[h + 2];
              if (a === x && b === y && c === z) {
                hit1 = 1;
                break;
              }
            }
          }
        }
        if (hit1 === 1) {
          break;
        }
      }
      if (hit1 === 0) {
        hit = 0;
        break;
      }
    }
    if (hit !== 0) {
      temp.push(i);
      console.log(fpath[i]);
    }
  }
}
export default GeneratePage;
