import { mdLinks } from "./api.js";
import chalk from "chalk";
import figlet from "figlet";

const cli = (data) => {
  // console.log('data recibida en cli:', data);
  if (data.pathData == "") {
    console.log(
      chalk.inverse.yellow(
        "Please enter a valid path. Example: md-links <path-to-file> [options]"
      )
    );
  } else {
    figlet("M D - L I N K S", function (err, banner) {
      if (err) {
        console.log("Something went wrong...");
        console.dir(err);
        return;
      }
      console.log(chalk.bold.green(banner));
    });
    mdLinks(data.pathData, data.optionsData)
      .then((links) => {
        console.log(chalk.inverse.green(" *** RESULT: *** "));
        console.table(links);
        // => [{ href, text, file, status, ok }, ...]
      })
      .catch(console.error);
  }
};

export { cli };
