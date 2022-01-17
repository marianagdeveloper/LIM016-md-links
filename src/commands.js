import { cli } from "./cli.js";
import { program } from "commander";
import pkg from "inquirer";
const { prompt } = pkg;
const pathInput = process.argv[2];

// console.log('process.argv[2]', process.argv[2]);
// console.log('process.argv', process.argv);

// Dont't have path, input path and list options for terminal
if (pathInput == undefined || pathInput == "") {
  const argumentsData = prompt([
    {
      type: "input",
      name: "pathData",
      message: "Path to file or directory: ",
    },
    {
      type: "list",
      name: "optionsData",
      message: "Options to statistics: ",
      choices: [
        "none",
        "Validate Links",
        "Stats Links",
        "Validate and Stats Links",
      ],
    },
  ]);
  argumentsData.then((data) => {
    // Call Cli, arguments: path and options
    cli(data);
  });
} else {
  // We have Path, now Check options
  program
    .option("-v, --validate", "Validate Links")
    .option("-s, --stats", "Stats")
    .option("-s -v,  --stats --validate", "Validate Links and Stats");
  program.parse(process.argv);

  let options = program.opts();

  //Don't have options
  if (Object.keys(options).length === 0) {
    options = { 'validate': false}
  }

  // Options
  if (options == 'Validate Links') {
    options = { 'validate': true}
  }

  // Call Cli, arguments: path and options
  cli({ 'pathData': pathInput, 'optionsData': options })
}

program
  .version("0.1.0")
  .description(
    "md-links: A command line tool for which reads and parses Markdown files, to verify the links they contain and to report some statistics."
  );

// Print results of commands
program.parse(process.argv);
