module.exports = (program) =>
  program
    .command("audit")
    .description("Run npm audit on every package in your verdaccio storage")
    .option("-r, --reporter <string>", "one of: count, console, json", "count")
    .option(
      "-p, --path",
      "the path to verdaccio storage",
      "/verdaccio/storage/data/"
    )
    .action((options) => {
      console.log(`running with reporter: ${options.reporter}`);
    });
