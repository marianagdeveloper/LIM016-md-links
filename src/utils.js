import { readFile } from "fs";
import path from "path";
import { JSDOM } from "jsdom";
import dir from "node-dir";
import { Remarkable } from "remarkable";
var md = new Remarkable();
import fetch from "node-fetch";

// HTTP status
const statusHttp = (link, callback) => {
  let status;
  fetch(link)
    .then((res) => {
      status = res.status;
      callback(status);
    })
    .catch(() => {
      status = 400;
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
};
