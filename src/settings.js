export const Settings = Object.freeze({
  NUMBER_MAX: 100,
  STRING_BASE: (function() {
    var s = '';
    for (var i = 36; i <= 200; i++) {
      s += String.fromCharCode(i);
    }
    return s;
  })()
});

