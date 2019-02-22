import {describe} from 'mocha';

import {Generators, Nonsense} from '../index';


describe('Nonsense', function() {
  describe('Generate object', function() {
    it('should not error', function() {
      let def = {
        a: Generators.FLOAT,
        b: Generators.FLOAT(5),
        c: Generators.STRING,
        d: Generators.STRING(5),
        e: Generators.INT,
        f: Generators.INT(5),
        g: {
          a: Generators.STRING,
          b: {
            a: [Generators.STRING, Generators.INT]
          }
        }
      };
      Nonsense(def);
    });
  });

  describe('Generate array', function() {
    it('should not error', function() {
      let def = [
        Generators.FLOAT,
        Generators.FLOAT(5),
        Generators.STRING,
        Generators.STRING(5),
        Generators.INT,
        Generators.INT(5),];
      Nonsense(def);
    });
  });

  describe('Generate value', function() {
    it('should not error', function() {
      let def = Generators.FLOAT;
      Nonsense(def);
    });
  });
  describe('Generate values', function() {
    it('should not error', function() {
      let def = Generators.FLOAT(5);
      Nonsense(def);
    });
  });
});
