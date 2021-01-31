const data = require('./data');

const obj = {};

// console.log(data[0]);

for (const [key, value] of Object.entries(data)) {
  // console.log({ key });
  // console.log(data[key].points);
  const points = data[key].points;
  obj[`kat${key}`] = {};
  for (const [key2, value2] of Object.entries(points)) {
    obj[`kat${key}`][`p${key2}`] = value2.name;

    // item.name;
    // console.log(item.name);
  }
  // const points = data[key];
  // console.log(key, value.name);
  // obj[`kat${key}`] = {};
  // for (x in data[key].points.entries()) {
  //   console.log(x);
  // }
}

console.log(obj);
