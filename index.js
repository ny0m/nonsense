module.exports = function(definition) {
  return function(number) {
    if (number === undefined) {
      return nonsense(definition);
    }

    let ret = [];
    for (let i = 0; i < number; i++) {
      ret.push(nonsense(definition));
    }
    return ret;
  };
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
      continue;
    }

    ret[key] = parseType(value);
  }
  return ret;
}

function parseType(s) {
  let groups = s.match(/^(\[(\d*)])?([a-zA-Z]+)$/);
  if (groups === null) {
    throw new Error('Nonsense: Could not parse: ' + s);
  }

  let isList = !!groups[1];
  let length = groups[2] === '' ? randomInt() : parseInt(groups[2]);
  let type = groups[3];

  let generator = generators[type];
  if (!generator) {
    throw new Error('Nonsense: Could not parse: ' + s);
  }


  if (isList) {
    return listGenerator(length, generator);
  }
  return generator();
}

let generators = {
  'string': randomString,
  'int': randomInt,
  'float': randomFloat,
};

function randomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function randomFloat(max) {
  return Math.random() * max;
}

function randomString() {
  return 'jasdnlksjdf';
}

function listGenerator(length, generator) {
  let ret = [];
  for (let i = 0; i < length; i++) {
    ret.push(generator());
  }
  return ret;
}
