export function Nonsense(definition) {
  return function() {
    return nonsense(definition);
  };
}

function nonsense(definition) {
  if (definition.constructor === Object) {
    let ret = {};
    for (let key in definition) {
      if (!definition.hasOwnProperty(key)) {
        continue;
      }

      let value = definition[key];
      ret[key] = nonsense(value);
    }
    return ret;
  }

  if (definition.constructor === Array) {
    let ret = [];
    for (let v of definition) {
      ret.push(nonsense(v));
    }
    return ret;
  }

  return definition();
}
