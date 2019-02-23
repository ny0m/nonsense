export function Nonsense(definition) {
  return function() {
    return nonsense(definition);
  };
}

function nonsense(definition) {
  if (definition.constructor === Object) {
    let ret = {};
    Object.keys(definition).forEach(key => {
      ret[key] = nonsense(definition[key]);
    });
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
