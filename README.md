![npm (scoped)](https://img.shields.io/npm/v/@bradmerlin/nonsense.svg?style=flat-square) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/@bradmerlin/nonsense.svg) ![npm](https://img.shields.io/npm/dt/@bradmerlin/nonsense.svg?style=flat-square)

### Nonsense generates structured random data.

A step toward simple fuzz testing. Use it for testing code that accepts uncontrollable input 🐊🐊🐊

------

# Usage

```javascript
import { Generators, Nonsense } from '@bradmerlin/nonsense';

// Define data structure.
let bankAccount = {
  accountNumber:  Generators.INT,
  beneficiaryIDs: Generators.INT(5),
  accountType:    Generators.CHOICE(['cheque', 'savings', 'credit']),
  user:           {
    fullName:        Generators.STRING,
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
```

<details><summary>Output:</summary><p>

```javascript
[
  {
    accountNumber: 1,
    beneficiaryIDs: [16, 53, 46, 7, 73],
    accountType: 'cheque',
    user: {
      fullName: "'=S:[~U£Æ¬¥U8SÄ°6µVG)-_^hG¢f12g¨w@ÇMN&~",
      someStaticValue: 'Do not change'
    }
  },
  {
    accountNumber: 99,
    beneficiaryIDs: [84, 33, 5, 99, 74],
    accountType: 'cheque',
    user: {
      fullName: 'F¯ÁI%w·½·\\¯´^ª%X?pSÂ]p®JkE¶º}?TyJ9¬3³¨À',
      someStaticValue: 'Do not change'
    }
  },
  {
    accountNumber: 52,
    beneficiaryIDs: [25, 6, 3, 33, 43],
    accountType: 'savings',
    user: {
      fullName: 'HEse¼V9I_·CMµS6r·Lª47ºª;4v_P>&<ÇqP®b{PF(l',
      someStaticValue: 'Do not change'
    }
  }
]
```
</p></details>
