import { Settings } from './settings';

export const Generators = Object.freeze({
  STRING: maybeList(randomString),
  INT:    maybeList(randomInt),
  FLOAT:  maybeList(randomFloat),
  VALUE:  defaultValue,
  CHOICE: randomChoice,

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
  return _randomInt(Settings.NUMBER_MAX);
}

function _randomInt(max) {
  return Math.round(Math.random() * max);
}

function randomFloat() {
  return Math.random() * Settings.NUMBER_MAX;
}

function randomString() {
  let len = Settings.STRING_BASE.length;
  let ret = '';

  for (let i = 0; i < len; i++) {
    ret = ret + Settings.STRING_BASE[_randomInt(len)];
  }
  return ret;
}

function randomChoice(values) {
  return function() {
    let index = _randomInt(values.length - 1);
    return values[index];
  };
}
