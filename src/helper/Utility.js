export function countOccurrences(array, element) {
  let count = 0;
  for (let i = 0; i < array.length; i++) {
    if (array[i] === element) {
      count++;
    }
  }
  return count;
}


export function arraysEqual(a, b) {
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

export function checkArrays(a1, a2) {
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

export function checkArrays1(a1, a2) {
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

export function checkArrays2(a1, a2) {
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

export function checkIndex(k, temp) {
  for (let i = 0; i < temp.length; i++) {
    if (k === temp[i]) {
      return 1;
      //break;
    }
  }
  return 0;
}

export function checkIndex1(k, temp1) {
  for (let i = 0; i < temp1.length; i++) {
    if (k === temp1[i]) {
      return 1;
      //break;
    }
  }
  return 0;
}