const t = require("tap");
const util = require("node:util");
const exec = util.promisify(require("node:child_process").exec);

const runCommand = async ({ fixture, object = "packages" }) => {
  return exec(
    `node ./index.js count ${object} -- --path=./fixtures/${fixture}/`
  );
};

t.test("one package", async (t) => {
  const result = await runCommand({ fixture: "one-package" });
  t.test("check result", async (t) =>
    t.equal(result.stdout, "Found a total of 1 packages\n")
  );
});

t.test("two packages", async (t) => {
  const result = await runCommand({ fixture: "two-packages" });
  t.test("check result", async (t) =>
    t.equal(result.stdout, "Found a total of 2 packages\n")
  );
});

t.test("scoped package", async (t) => {
  const result = await runCommand({ fixture: "scoped-package" });
  t.test("check result", async (t) =>
    t.equal(result.stdout, "Found a total of 1 packages\n")
  );
});
