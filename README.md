# rewrite-imports

Out of the box, webpack can keep `import` statements in a built bundle. However, unless the `import` statement is referencing a URL or an absolute path, the import path will not refer to the same file.

By default, this package will rewrite imports that reference code contained within the output directory so that they are correct when bundled. Other relative imports will be bundled by webpack as normal.

## Usage

Install as a dependency or dev-dependency. Then, in `webpack.config.js` add something like

```js
import { rewriteRelativeImports } from "@tim-code/rewrite-imports"
...
  externals: [
    // likely want to exclude some imports from being kept
    ...,
    rewriteRelativeImports(outputDirectory) // default
  ],
```

where `outputDirectory` is a path to the directory that will contain the webpack bundle
