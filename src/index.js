module.exports = function count(s, pairs) {
  // your implementation
/*   let count = 0;
  let N = pairs.reduce((mult, current) => mult * Math.pow(current[0], current[1]), 1);
  if (N === Infinity) N = Infinity;
  for (let k = 1; k <= N; k++) {
    for (let j = 0, length = s.length, last = length - 1; j < length; j++) {
      if (s[j] === '1') {
        if (pairs.some(item => ((j + k) % item[0]) === 0)) break;
      }
      else if (s[j] === '0') {
        if (pairs.every(item => ((j + k) % item[0]) !== 0)) break;
      }
      if (j === last) count++;
    }
  }
  const result = count % 1000000007;
  return result; */

 /*  let count = 0,
   string = '',
   num = 1,
   pos = 0,
   pairsPow = [];
  pairs.forEach(item => (pairsPow.push(Math.pow(item[0], item[1]))));
  while (true) {
    if (pairs.some(item => (num % item[0]) === 0)) {
      string += '0';
    }
    else string += '1';
    if (pairsPow.every(item => (num % item) === 0)) break;
    num++;
  }

  for (let i = 0; i < s.length; i++){
    if (pairs.some(item => (num % item[0]) === 0)) string += '0'; 
    else string += '1';
    num++;
  }

  while (true) {
    let foundPos = string.indexOf(s, pos);
    if (foundPos === -1) break;
    count++;
    pos = foundPos + 1; 
  }
  const result = count % 1000000007;
  return result; */

/*   let count = 0,
   string = '';
  let rowLength = pairs.reduce((mult,current) => mult * current[0], 1);
  if (rowLength === Infinity) return Infinity;

  for (let i = 1, sLength = s.length; i < rowLength + sLength - 1; i++) {
    if (pairs.some(item => (i % item[0]) === 0)) {
      string += '0';
    }
    else string += '1';

    if (string.length === sLength) {
      if (string === s) count++;
      string = string.slice(1);
    }
  }

  // while (true) {
  //   let foundPos = string.indexOf(s, pos);
  //   if (foundPos === -1) break;
  //   count++;
  //   pos = foundPos + 1; 
  // }
  const result = count % 1000000007;
  return result; */

/*   let answer = 1;
  pairs.forEach(item => {
    let count = 0,
    str = '';
    for (let i = 0, length = item[0] + s.length; i < length; i++) {
      if (i % item[0] === 0) str += '0';
      else str += '1';
    }

    for (let i = 0, length = s.length; i < item[0]; i++) {
      let substr = str.substr(i, length);
      if (s === substr) count++;
    }

    answer *= count * Math.pow(item[0], item[1] - 1); 
  });

  const result = answer % 1000000007;
  return result; */

/*   let count = 0,
  string = '';
 let rowLength = pairs.reduce((mult,current) => mult * current[0], 1);

 for (let i = 1, sLength = s.length; i < rowLength + sLength - 1; i++) {
   if (pairs.some(item => (i % item[0]) === 0)) {
     string += '0';
   }
   else string += '1';

   if (string.length === sLength) {
     if (string === s) count++;
     if (count === 1000000007) count = 0;
     string = string.slice(1);
   }
} */

//answer = phi/N
let answer = 1,
count = 1,
last = s[0],
N = 1,
minElement = pairs[0][0],
maxElement = pairs[0][0],
maxRowOnes = 0,
maxRowZeros = 0,
rowZeros = 0,
rowOnes = 0;
const reducedPairs = [];
pairs.forEach((item, i) => {
  let base = Math.ceil(Math.log(1000000007) / Math.log(item[0]));
  let newPow = item[1] % base;
  reducedPairs.push([item[0], newPow]);
  if (item[0] < minElement) minElement = item[0];
  else if (item > maxElement) maxElement = item[0];
});

for (let j = 0, length = s.length; j < length; j++){
  if (s[j] === '0') {
    rowZeros++;
    rowOnes = 0;
    if (rowZeros > maxRowZeros) maxRowZeros = rowZeros;
  } else {
    rowOnes++;
    rowZeros = 0;
    if (rowOnes > maxRowOnes) maxRowOnes = rowOnes;
  }
}
if (maxRowOnes > minElement) return 0;

reducedPairs.forEach(item => {
  count *= (1 - 1 / item[0]); 
  N *= Math.pow(item[0], item[1]);
});
if (s[0] === '0') answer -= count;
else answer = count;

answer = Math.round(answer * N);

//if (maxRowZeros > maxElement && maxRowOnes === 0) return N % 1000000007;

/* for (let j = 1, length = s.length; j < length; j++) {
  count = 0;
  reducedPairs.forEach(item => {
    // count *= (1 - 1 / (item[0] - j)); 
    let temp = item[0] - j;
    reducedPairs.forEach(elem => {
      if (elem[0] !== temp) count *= (1 - 1 / elem[0]); 
    });
    N *= Math.pow(item[0], item[1]);
  });

  answer -= count;

  // if (last !== s[j]) answer -= count;
  // else answer = count;
  // last = s[j];
} */


//answer = Math.round(answer * N);

const result = answer % 1000000007;
return result;
}