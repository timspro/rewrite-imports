import { isAbsolute, relative, resolve } from "path"

// rewrite all imports relative to the output directory
export function rewriteRelativeImports(outputDir) {
  outputDir = resolve(outputDir)
  return ({ context: importDir, request: importPath }, callback) => {
    const importAbsolutePath = resolve(importDir, importPath)
    const newPath = relative(outputDir, importAbsolutePath)
    if (!newPath) {
      callback()
      return undefined
    }
    if (isAbsolute(newPath)) {
      callback()
      return undefined
    }
    // do not try to rewrite relative imports that reference code outside of the output directory
    if (newPath.startsWith("..")) {
      callback()
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
