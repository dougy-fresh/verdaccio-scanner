const fs = require("node:fs").promises;
const path = require("node:path");

const countVersions = (registry) => {
  throw new Error("not implemented");
};

const countPackages = (registry) => {
  return registry.size;
};

module.exports = (program) =>
  program
    .command("count")
    .description("Count the number of packages, or versions of packages")
    .argument("<string>", "packages or versions")
    .option(
      "-p, --path <string>",
      "the path to verdaccio storage",
      "/verdaccio/storage/data/"
    )
    .action(async (str, options) => {
      const packageRegistry = new Map();
      const packages = await fs.readdir(options.path);

      for (const package of packages) {
        const packageJsonPath = path.resolve(
          process.cwd(),
          `${options.path}/${package}/package.json`
        );

        let packageJson;
        try {
          packageJson = require(packageJsonPath);
        } catch (e) {
          /*
           * this is expected, as node uses errors for control flow:
           * https://nodejs.org/api/fs.html#fsexistspath-callback
           */
        }

        if (packageJson) {
          // This is a package
          const currentVersions = packageRegistry.get(package);

          if (currentVersions) {
            currentVersions.add(packageJson.version);
          } else {
            packageRegistry.set(package, new Set([packageJson.version]));
          }
        } else {
          // This is a scope; it's a directory
          const scopedPackages = await fs.readdir(`${options.path}/${package}`);

          for (const scopedPackage of scopedPackages) {
            const scopedPackageJsonPath = path.resolve(
              process.cwd(),
              `${options.path}/${package}/${scopedPackage}/package.json`
            );
            let scopedPackageJson;
            try {
              scopedPackageJson = require(scopedPackageJsonPath);
            } catch (e) {
              /*
               * this is expected, as node uses errors for control flow:
               * https://nodejs.org/api/fs.html#fsexistspath-callback
               */
            }

            if (scopedPackageJson) {
              const scopedPackageName = scopedPackageJson.name;
              const currentVersions = packageRegistry.get(scopedPackageName);

              if (currentVersions) {
                currentVersions.add(scopedPackageJson.version);
              } else {
                packageRegistry.set(
                  scopedPackageName,
                  new Set([scopedPackageJson.version])
                );
              }
            }
          }
        }
      }
      const count =
        str === "packages"
          ? countPackages(packageRegistry)
          : countVersions(packageRegistry);
      console.log(`Found a total of ${count} ${str}`);
    });
