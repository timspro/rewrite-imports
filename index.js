import { isAbsolute, relative, resolve } from "path"

// rewrite all imports relative to the output directory
export function rewriteRelativeImports(outputDir, { noParentPaths = false } = {}) {
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
    if (newPath.startsWith(".")) {
      if (newPath.startsWith("..") && noParentPaths) {
        throw new Error(`path backs out of output directory: ${newPath}`)
      }
      // this also includes new paths starting with ..
      return callback(null, `module ${newPath}`)
    }
    // if both paths are in the same directory, relative() returns the filename or ""
    const sameDirPath = `./${newPath}`
    return callback(null, `module ${sameDirPath}`)
  }
}
