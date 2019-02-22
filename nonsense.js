export function Nonsense(definition) {
  if (definition.constructor === Object) {
    let ret = {};
    for (let key in definition) {
      if (!definition.hasOwnProperty(key)) {
        continue;
      }

      let value = definition[key];
      ret[key] = Nonsense(value);
    }
    return ret;
  }

  if (definition.constructor === Array) {
    let ret = [];
    for (let v of definition) {
      ret.push(Nonsense(v));
    }
    return ret;
  }

  return definition();
}
