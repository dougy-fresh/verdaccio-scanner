const t = require("tap");
const util = require("node:util");
const exec = util.promisify(require("node:child_process").exec);

const runCommand = async () => {
  return exec("node ./index.js audit");
};

t.test("one package", async (t) => {
  const result = await runCommand();
  t.test("check result", async (t) =>
    t.equal(result.stdout, "running with reporter: count\n")
  );
});
