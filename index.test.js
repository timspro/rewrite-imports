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
rewriteTest("./output", "./a")("module ../a")
rewriteTest("./output", "./output/b")("module ./b")

const errorObject = expect.objectContaining({
  message: expect.stringContaining("path backs out"),
})
autotest(rewriteRelativeImports, { error: true })("./output", "./a", {
  allPathsContained: true,
})(errorObject)
