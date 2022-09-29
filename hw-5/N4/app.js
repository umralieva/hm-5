//4

let counter = 0;

let str = 'She has dogs, cats, one pigg and snake';
let char = 's';

function count(str, ch) {
  for (let i = 0; i < str.length; i++) {
    if (str[i] === ch) counter++;
  }
}
count(str, char);
console.log(counter);