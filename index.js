module.exports = function tiny(string) {
  if (typeof string !== "string") throw new TypeError("Tiny wants a string!");
  return string.replace(/\s/g, "");
};


function nonsense(definition) {
  let ret = {};
  for (let key in definition) {
    if (!definition.hasOwnProperty(key)) {
      continue;
    }

    let value = definition[key];
    if (typeof value === 'object') {
      ret[key] = nonsense(value);
    } else {
      ret[key] = generators[value]();
    }
  }
  return ret;
}

let generators = {
  'string': randomString,
  'int': randomInt,
  'float': randomFloat,
};

function randomInt() {
  return 4;
}

function randomFloat() {
  return 4.4;
}

function randomString() {
  return 'jasdnlksjdf';
}