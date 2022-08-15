const { transformSync } = require('@babel/core')

const code = ` 
console.log("click");
if (DEBUG) {
  console.log("for debug")
  const a = 10;
  const b = 20;
  console.log(a + b);
}`

const babelConfig = {
  plugins: [
    [
      './index.js',
      {
        isRemove: true,
      },
    ],
  ],
}

const output = transformSync(code, babelConfig)
console.log(output.code)
