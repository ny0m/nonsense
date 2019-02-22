import { Settings } from "./settings";

export const Generators = Object.freeze({
  STRING: maybeList(randomString),
  INT: maybeList(randomInt),
  FLOAT: maybeList(randomFloat),
  VALUE: maybeList(defaultValue),
});


function maybeList(generator) {
  return function(length) {
    if (typeof length === 'undefined') {
      return generator();
    }
    return function() {
      let ret = [];
      for (let i = 0; i < length; i++) {
        ret.push(generator());
      }
      return ret;
    };
  };
}

function defaultValue(value) {
  return function() {
    return value;
  };
}


function randomInt() {
  return Math.floor(Math.random() * Math.floor(Settings.NUMBER_MAX));
}

function randomFloat() {
  return Math.random() * Settings.NUMBER_MAX;
}

function randomString() {
  let len = Settings.STRING_BASE.length;
  let ret = '';

  for (let i = 0; i < len; i++) {
    ret = ret + Settings.STRING_BASE[randomInt(len)];
  }
  return ret;
}
