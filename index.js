#!/usr/bin/env node

const packageJson = require("./package.json");
const { Command } = require("commander");
const program = new Command();

const auditCommand = require("./commands/audit");
const countCommand = require("./commands/count");

program
  .name("verdaccio-scanner")
  .description("CLI to explore and audit verdaccio storage folders")
  .version(packageJson.version);

auditCommand(program);
countCommand(program);

program.parse();
