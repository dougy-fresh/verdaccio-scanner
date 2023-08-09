module.exports = (program) =>
  program
    .command("count")
    .description("Count the number of packages, or versions of packages")
    .argument("<string>", "packages or versions")
    .option(
      "-p, --path",
      "the path to verdaccio storage",
      "/verdaccio/storage/data/"
    )
    .action((str, options) => {
      console.log(`str: ${str} path: ${options.path}`);
    });
