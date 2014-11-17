# App Name Generator

Generate quirky names like "spiffy-waterfall", "sassy-bread", "mature-dew-8239" to use wherever you need a random but memorable name.

###Install
`npm install app-name-generator --save`

###Quick Start
```
var generate = require('app-name-generator').generate;

generate().dashed; // 'sassy-bread'

generate().spaced; // 'unwavering coal'

generate().raw; // ['undisturbed', 'iceberg', 2125]

generate(true).dashed; // 'pithy-willow-7794'

generate(true).raw; // ['gentle', 'guru', 621]
```

###API
The module returns an object with a single method `generate(addNumberSuffix)`

Calling `generate()` with no arguments will return an object:
```
{
    spaced: 'whispering valley', 
    dashed: 'whispering-valley', 
    raw: ['whispering', 'valley']
}
```
Passing `true` (or a truthy value) to `generate()` will include a number from 1-9999 (both inclusive) at the end.

So `generate(true)` will return:
```
{
    spaced: 'limitless pond 6452', 
    dashed: 'limitless-pond-6452', 
    raw: ['whispering', 'valley', 6452]
}
```

###Tests
To run tests locally:
```
npm install

npm test
```
