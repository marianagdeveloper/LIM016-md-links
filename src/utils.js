import { readFile } from "fs";
import { JSDOM } from "jsdom";
import { Remarkable } from "remarkable";
import path from "path";
import dir from "node-dir";
import fetch from "node-fetch";
import chalk from "chalk";
import figlet from "figlet";
var md = new Remarkable();

// Uniques Links
const onlyUnique = (value, index, self) => {
  return self.indexOf(value) === index;
}

// WARNING: console.log in Yellow
const logWarning = (consoleLog) => {
  return console.log(chalk.inverse.yellow(consoleLog))
}

// RESULTS: console.log in Green
const logResults = (consoleLog) => {
  return chalk.inverse.green(consoleLog)
}

// RESULTS: console.log in Cyan
const logResultsCyan = (consoleLog) => {
  return chalk.bold.cyan(consoleLog)
}

// Print banner
const printBanner = () => {
  figlet("M G - L I N K S", function (err, banner) {
    if (err) {
      console.log("Something went wrong...");
      console.dir(err);
      return;
    }
    return console.log(chalk.bold.green(banner));
  });
};

// HTTP status
const statusHttp = (link, callback) => {
  let status;
  fetch(link)
    .then((res) => {
      status = res.status;
      callback(status);
    })
    .catch(() => {
      status = 404;
      callback(status);
    });
};

// Reading directory recursive
const readDirectoriesRecursive = (directory, allFilesMD) => {
  dir.files(directory, function (err, files) {
    if (err) throw err;
    allFilesMD(files.filter((file) => extMD(file)));
  });
};

// Absolute route
const absolutePath = (pathData) => {
  return path.isAbsolute(pathData);
};

// Convert in Absolute route
const absolutePathResolve = (pathData) => {
  return path.resolve(pathData);
};

// Details path
const pathDetails = (pathData) => {
  return path.parse(pathData);
};

// Convert file in HTML
const fileConvertedInHTML = (data) => {
  return md.render(data);
};

// Search links
const linksInFile = (dataHTML) => {
  const dom = new JSDOM(dataHTML);
  const hrefData = dom.window.document.querySelectorAll("a");
  return hrefData;
};

//Read file
const readFileData = (url, myCallback) => {
  readFile(url, "utf8", (err, data) => {
    if (err) throw err;
    myCallback(data);
  });
};

//Ext file ".md"
const extMD = (file) => {
  return path.extname(file) == ".md";
};

export {
  readDirectoriesRecursive,
  absolutePath,
  absolutePathResolve,
  pathDetails,
  fileConvertedInHTML,
  readFileData,
  linksInFile,
  extMD,
  statusHttp,
  printBanner,
  logWarning,
  onlyUnique,
  logResults,
  logResultsCyan
};
