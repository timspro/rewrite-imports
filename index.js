import { isAbsolute, relative, resolve } from "path"

// rewrite all imports relative to the output directory
export function rewriteRelativeImports(outputDir, { mustContainPaths = false } = {}) {
  outputDir = resolve(outputDir)
  return ({ context: importDir, request: importPath }, callback) => {
    const importAbsolutePath = resolve(importDir, importPath)
    const newPath = relative(outputDir, importAbsolutePath)
    if (!newPath) {
      return undefined
    }
    if (isAbsolute(newPath)) {
      return undefined
    }
    if (mustContainPaths && newPath.startsWith("..")) {
      return undefined
    }
    if (newPath.startsWith(".")) {
      // this also includes new paths starting with ..
      return callback(null, `module ${newPath}`)
    }
    // if both paths are in the same directory, relative() returns the filename or ""
    const sameDirPath = `./${newPath}`
    return callback(null, `module ${sameDirPath}`)
  }
}
