import assert from 'assert';
import { describe } from 'mocha';

import { Generators, Nonsense } from '../index';

describe('Nonsense', function() {
  describe('Data structures', function() {
    it('should correctly generate nested objects', function() {
      let definition = {
        a: {
          b: {
            c: Generators.VALUE(1),
            d: Generators.VALUE(2),
          },
        },
      };

      let generator = Nonsense(definition);
      let obj = generator();

      assert.equal(obj.a.b.c, 1);
      assert.equal(obj.a.b.d, 2);
    });

    it('should correctly generate array', function() {
      let definition = [
        Generators.VALUE(1),
        Generators.VALUE(2),
      ];

      let generator = Nonsense(definition);
      let list = generator();

      assert.equal(list.length, 2);
      assert.equal(list[1], 2);
    });

    it('should correctly generate single values', function() {
      let definition = Generators.VALUE(1);
      let generator = Nonsense(definition);
      let item = generator();

      assert.equal(item, 1);
    });
  });

  describe('Basic generator types are correct', function() {
    let testCases = [
      {
        name: 'STRING',
        generator: Generators.STRING,
        typeFunc: s => typeof s === 'string',

      },
      {
        name: 'INT',
        generator: Generators.INT,
        typeFunc: Number.isInteger,
      },
      {
        name: 'FLOAT',
        generator: Generators.FLOAT,
        typeFunc: i => typeof i === 'number' && !Number.isInteger(i),
      },
    ];

    for (let tc of testCases) {
      it(tc.name, function() {
        let output = Nonsense(tc.generator)();
        assert.equal(tc.typeFunc(output), true);

        let listOutput = Nonsense(tc.generator(2))();
        assert.equal(Array.isArray(listOutput), true);
        assert.equal(listOutput.length, 2);
        assert.equal(tc.typeFunc(listOutput[0]), true);
      });
    }
  });

  describe('Value generator', function() {
    it('should just return its input', function() {
      for (let value of [Nonsense(Generators.STRING), Nonsense(Generators.INT), Nonsense(Generators.FLOAT)]) {
        let output = Nonsense(Generators.VALUE(value))();
        assert.equal(value, output);
      }
    });
  });

  describe('Choice generator', function() {
    it('should always return one of its given choices', function() {
      let input = Nonsense(Generators.INT(10))();
      let output = Nonsense(Generators.CHOICE(input))();
      assert.equal(input.includes(output), true);
    });
  });

  describe('A simple use-case', function() {
    it('should not error', function() {
      // Define data structure.
      let bankAccount = {
        accountNumber: Generators.INT,
        accountType: Generators.CHOICE(['cheque', 'savings', 'credit']),
        beneficiaryIDs: Generators.INT(5),
        balance: Generators.FLOAT,
        user: {
          fullName: Generators.STRING,
          someStaticValue: Generators.VALUE('Do not change'),
        },
      };

      // Create generator
      let generator = Nonsense(bankAccount);

      // New random values each time the generator generates.
      let output = [];
      for (let i = 0; i < 3; i++) {
        output.push(generator());
        // But actually use this in a test.
      }
    });
  });
});
