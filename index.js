import {SETTINGS_MAX} from './settings';

function rawr(definition) {
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

export function nonsense(definition) {
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
  if (max === undefined) max = SETTINGS_MAX;
  return Math.floor(Math.random() * Math.floor(max));
}

function randomFloat(max) {
  if (max === undefined) max = SETTINGS_MAX;
  return Math.random() * max;
}

function randomString() {
  let len = SETTINGS_ALPHA.length;
  let ret = '';

  for (let i = 0; i < len; i++) {
    ret = ret + SETTINGS_ALPHA[randomInt(len)];
  }
  return ret;
}

function listGenerator(length, generator) {
  let ret = [];
  for (let i = 0; i < length; i++) {
    ret.push(generator());
  }
  return ret;
}
