# rewrite-imports

Out of the box, webpack can be configured to keep `import` statements in a built bundle. This works fine if the import statement is referencing a URL or an absolute path. However, when the kept import statement is a path relative to the source file, the import statement will probably break at runtime since Webpack does not try to modify the relative path based on the bundle's output directory.

This package will rewrite imports that reference code contained within the output directory so that they are correct when bundled. Other relative imports will not be kept and will be bundled by webpack as normal.

## Example

`webpack.config.js`:

```js
const projectDir = dirname(fileURLToPath(import.meta.url))
const outputDir = `${projectDir}/dist`
export default {
  entry: `./frontend/index.js`,
  output: {
    filename: `bundle.js`,
    path: `${outputDir}`,
    libraryTarget: "module",
    environment: { module: true },
  },
}
```

`frontend/index.js`:

```js
import _ from "../dist/lodash.js"
```

would become:

`dist/bundle.js`:

```js
import _ from "./lodash.js"
```

### Note

If the import references some code outside the output directory, for example:

`frontend/index.js`:

```js
import React from "../lib/react.js"
import { median } from "./helpers.js"
```

Then, the source code referenced by the import will be copied into the bundle and the import itself will be removed. This is how webpack normally deals with imports.

## Usage

Install as a dependency or dev-dependency. Then, in `webpack.config.js` add something like:

```js
import { rewriteRelativeImports } from "@tim-code/rewrite-imports"
...
export default {
  ...
  externals: [
    // {
    //   react: "root React", // avoids bundling React and instead relies on the React global variable
    // },
    rewriteRelativeImports(outputDirectory)
  ],
}
```

where `outputDirectory` is a relative or absolute path to the directory that will contain the webpack bundle

See `index.js` and https://webpack.js.org/configuration/externals/#function for more information on how this works.
