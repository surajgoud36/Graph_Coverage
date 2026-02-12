import { countOccurrences } from "./Utility";
export function dfs(
  graph,
  currentNode,
  endNode,
  edges,
  paths,
  path,
  counter,
  aset,
  finalPaths,
) {
  
  path.push(currentNode);
  if (currentNode === endNode) {
    paths.push(path);
    aset.add(path);
    finalPaths.set(counter, [...path]);
    console.log("finalPaths:DFS ", finalPaths);
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
          dfs(
            graph,
            neigh,
            endNode,
            edges,
            paths,
            path,
            counter,
            aset,
            finalPaths,
          );
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
            dfs(
              graph,
              neigh,
              endNode,
              edges,
              paths,
              path,
              counter,
              aset,
              finalPaths,
            );
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
        dfs(
          graph,
          neigh,
          endNode,
          edges,
          paths,
          path,
          counter,
          aset,
          finalPaths,
        );
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
