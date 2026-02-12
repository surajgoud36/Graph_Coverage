import { checkIndex,arraysEqual,checkIndex1, } from "./Utility";
export function edgePairs(graph) {
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


export function edgesF(graph) {
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


export function nodes(graph) {
  let finalNodes = [];
  for (let vertex in graph.adjList) {
    finalNodes.push(vertex);
  }
  return finalNodes;
}


export function pathEdgeCoverage(fpath) {
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


export function pathNodeCoverage(fpath) {
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


export function pathEdgePairCoverage(fpath,temp) {
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