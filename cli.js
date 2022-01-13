function getLargestNumberAmongMixedElements(params) {
  console.log(params);
  
  let numMayor = 0
  params.forEach(element => {
    if ( typeof element == 'number') {
     if (element > numMayor) {
       numMayor = element
     }
    }
  });
  return numMayor
}

const output = getLargestNumberAmongMixedElements([3, 'word', 5, 'up', 3, 1]);
console.log(output); // --> 5