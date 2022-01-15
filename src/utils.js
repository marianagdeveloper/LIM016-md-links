import { Remarkable } from "remarkable";
import { readFile } from "fs";
import { JSDOM } from "jsdom";
import fetch from "node-fetch";
import path from "path";
import dir from "node-dir";
var md = new Remarkable();

// HTTP status
const statusHttp = (link, statusData) => {
  let status;
  fetch(link)
    .then((res) => {
      status = res.status;
      statusData(status);
    })
    .catch(() => {
      status = 404;
      statusData(status);
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
const readFileData = (url, fileData) => {
  readFile(url, "utf8", (err, data) => {
    if (err) throw err;
    fileData(data);
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
