import { Graph, createGraph } from "../components/Graph";
import { dfs } from "./DFS";
import { generateFinalPaths } from "./GenerateFinalPaths";
import {
  edgePairs,
  edgesF,
  nodes,
  pathEdgeCoverage,
  pathNodeCoverage,
  pathEdgePairCoverage,
} from "./CoverageFunctions";
export function GenerateCoverage({ rows, selectedOption, setTR, setTP }) {
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

  let startNode = "";
  let endNode = "";
  let hasError = false; // Flag to track if there's any error

  console.log("Current state of rows:", rows);

  const graph = new Graph();

  // Validate data and check for errors
  for (let i = 0; i < rows.length; i++) {
    const { column1, column2 } = rows[i];

    if (i === 0) {
      if (column1 === "" || column2 === "") {
        alert("Start Node Info Missing");
        hasError = true;
        break;
      }
    } else if (i === rows.length - 1) {
      if (column1 === "") {
        alert("End node is missing");
        hasError = true;
        break;
      }
    } else {
      if (column1 === "" || column2 === "") {
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

  dfs(graph, startNode, endNode, edges, path, paths, counter, aset, finalPaths);
  generateFinalPaths(finalPaths, fpath, fpath1, fpath2, fpath3);
  pathEdgePairCoverage(fpath, temp);

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
      (_, i) => !pathEdgeCoverage(fpath2).includes(i),
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
    console.log(fpath3);
    let relevantPaths = fpath3.filter(
      (_, i) => !pathNodeCoverage(fpath3).includes(i),
    );
    let pathsOutput = relevantPaths
      .map((path) => `Path: ${path.join(" -> ")}`)
      .join("\n\n");
    console.log('checkTP:', pathsOutput);
    setTP(pathsOutput);
    console.log('hello')
    let nodesFormatted = nodes(graph).join(", ");
    setTR(nodesFormatted);
  }

  // paths = [];
  // path = [];
  // edges = new Map();
  // aset = new Set();
  // finalPaths = new Map();
  // counter = 1;
  // fpath = [];
  // fpath1 = [];
  // fpath2 = []; // final test paths for edge coverage
  // fpath3 = []; // final test paths for node coverage
  // temp = []; // Test path edge pairs
}
