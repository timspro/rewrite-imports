import { consume2Iterables, factory } from "@tim-code/autotest"
import { rewriteRelativeImports } from "./index.js"

function before(outputDir, importPath, options) {
  const parts = importPath.split("/")
  const request = parts.pop()
  const context = parts.join("/")
  const callback = (_, output) => output
  return [
    [outputDir, options],
    [{ context, request }, callback],
  ]
}

const autotest = factory({ before, consume: consume2Iterables })
const rewriteTest = autotest(rewriteRelativeImports)
rewriteTest("./output", "./a")()
rewriteTest("./output", "./output/b")("module ./b")
rewriteTest("./output", "./output/b/c/d")("module ./b/c/d")
rewriteTest("./output", "./output/b/../d")("module ./d")
