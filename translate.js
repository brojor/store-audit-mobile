const data = require('./data');

const obj = {};

// console.log(data[0]);

for (const [key, value] of Object.entries(data)) {
  const { points } = data[key];
  obj[`kat${key}`] = {};
  for (const [key2, value2] of Object.entries(points)) {
    obj[`kat${key}`][`p${key2}`] = value2.value;
  }
}

console.log(obj);
