# rewrite-imports

Out of the box, webpack can keep `import` statements in a built bundle. However, unless the `import` statement is using a URL or an absolute path in its code, the import path will not refer to the same file.

## Usage

Install as a dependency or dev-dependency. Then, in `webpack.config.js` add something like

```js
import { rewriteRelativeImports } from "@tim-code/rewrite-imports"
...
  externals: [
    // likely want to exclude some imports from being kept
    ...,
    rewriteRelativeImports(outputDirectory, { rewriteAllRelative: false }) // default
  ],
```

where `outputDirectory` is a path to the directory that will contain the webpack bundle

By default, imports that reference code outside of the output directory are bundled, not rewritten. To experiment with rewriting these as well, change `rewriteAllRelative` to true.
