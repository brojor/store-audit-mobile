const data = require('./data');

const obj = {
  // kat0: {
  //     p1: true
  //     p2: false
  // },
  // kat1: {
  //     p1: true
  //     p2: false
  // },
  // kat2: {
  //     p1: true
  //     p2: false
  // },
  // kat3: {
  //     p1: true
  //     p2: false
  // },
};

for (katIndex in data) {
  obj[`kat${katIndex}`] = {};
  for (pointIndex in data[katIndex].points) {
    obj[`kat${katIndex}`][`p${pointIndex}`] = undefined;
  }
  // for (point of data[katIndex].points) {
  //     obj[`kat${katIndex}`] =
  // }
}

console.log(obj);
