export const SETTINGS_MAX = 100;
export const ALPHA = (function() {
  var s = '';
  for (var i = 36; i <= 200; i++) {
    s += String.fromCharCode(i);
  }
  return s;
})();
