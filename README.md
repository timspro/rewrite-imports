# rewrite-relative-imports

Out of the box, webpack can keep `import` statements in a built bundle. However, unless the `import` statment is using a URL or an absolute path in its code, the import path will not refer to the same file.

## Usage

Install as a dependency or devdependency. Then, in `webpack.config.js` add something like

```js
import { rewriteRelativeImports } from "@tim-code/rewrite-relative-imports"
...
  externals: [
    // likely want to exclude some imports from being kept
    ...,
    rewriteRelativeImports(outputDirectory, {noParentPaths: true})
  ],
```

where `outputDirectory` is a path to the directory that will contain the webpack bundle and
`noParentPaths` is a boolean that when true will cause relative paths starting with ".." to error (defaults to false)
