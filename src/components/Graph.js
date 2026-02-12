export class Graph {
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

export function createGraph(graph, vertex, edges) {
  graph.addVertex(vertex);
  let neighbors = edges.split(",");
  neighbors.forEach((neighbor) => {
    if (neighbor.trim() !== "") {
      // Ensure non-empty, non-blank edges are added
      graph.addEdge(vertex, neighbor.trim());
    }
  });
}
