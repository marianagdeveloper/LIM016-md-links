import fs, { readFile } from 'fs';
import path from 'path';
import { JSDOM } from 'jsdom';
import { Remarkable } from 'remarkable';
var md = new Remarkable();

//errors
function errorPath(err) {
  console.log('It is not a valid path');
}

// Absolute route
const absolutePath = (pathData) => {
  return path.isAbsolute(pathData)
}

// Convert in Absolute route
const absolutePathResolve = (pathData) => {
  return path.resolve(pathData)
}

// Details path
const pathDetails = (pathData) => {
  return path.parse(pathData);
}

// Convert file in HTML
const fileConvertedInHTML = (data) => {
  return md.render(data);
}

// Search links
const linksInFile = (dataHTML) => {
  const dom = new JSDOM(dataHTML);
  const hrefData = dom.window.document.querySelectorAll("a");
  return hrefData
}

//Read file
const readFileData = (url, myCallback) => {
  readFile(url, 'utf8', (err, data) => {
    if (err) throw err;
    myCallback(data);
  });
}

//Ext file ".md"
const extMD = (file) => {
  return path.extname(file) == ".md"
}

// Function to get current filenames in directory
const readDirectoryData = (directory, myCallback) => {
  fs.readdir(directory, (err, files) => {
    if (err) throw errorPath(err);
    myCallback(files);
  })
}

// Join routes
const joinRoutes = (...routes) => path.join(...routes)


export {
  absolutePath,
  absolutePathResolve,
  pathDetails,
  fileConvertedInHTML,
  readFileData,
  linksInFile,
  extMD,
  readDirectoryData,
  joinRoutes
};