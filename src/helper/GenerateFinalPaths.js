import { checkArrays, arraysEqual,checkArrays1,checkArrays2 } from "./Utility";
export function generateFinalPaths(finalPaths, fpath, fpath1, fpath2, fpath3) {
    console.log('finalPaths:', finalPaths);
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