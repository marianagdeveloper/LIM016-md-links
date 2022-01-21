import { cli } from "./cli.js";
import { program } from "commander";
import pkg from "inquirer";
const { prompt } = pkg;
const pathInput = process.argv[2];

// mg-links: Receive the path and options en 2 steps
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
        "1.- none",
        "2.- Validate Links",
        "3.- Stats Links",
        "4.- Validate and Stats Links",
      ],
    },
  ]);
  argumentsData.then((data) => {
    // console.log('data:', data);
    data.pathData = data.pathData.trim();
    if (data.optionsData == '1.- none') {
      data.optionsData =  { 'validate': false}
    } else if (data.optionsData == '2.- Validate Links') {
      data.optionsData =  { 'validate': true}
    } else if (data.optionsData == '3.- Stats Links') {
      data.optionsData =  { 'stats': true}
    } else if (data.optionsData == '4.- Validate and Stats Links') {
      data.optionsData =  { 'stats': true, 'validate': true}
    }
    // Call Cli, arguments: path and options
    cli(data);
  });
} else {
  // mg-links <path> options : Receive path and options in 1 line
  // used commander and program
  // capture options
  program
    .option("-v, --validate", "Validate Links")
    .option("-s, --stats", "Stats")
    .option("-s -v,  --stats --validate", "Validate Links and Stats");
  // Print results of commands for use
  program.parse(process.argv);
  // process.argv [
  //   'C:\\Program Files\\nodejs\\node.exe',
  //   'C:\\Users\\maria\\AppData\\Roaming\\npm\\node_modules\\mg-links\\index.js',
  //   'C:/www/LIM016-md-links/src/some/some1/example3.md'
  // ]

  let options = program.opts();
  // options { validate: true } // return true with -v or --validate
  // mg-links C:/www/LIM016-md-links/src/some/some1/example3.md -v

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
