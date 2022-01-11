import fs, { readFile } from 'fs';
import path from 'path';

//Read file
const readFileData = (url, myCallback) => {
  readFile(url, 'utf8', (err, data) => {
    if (err) throw err;
    myCallback(data);
  });
}

//Ext file
const extFile = (file) => {
  return path.extname(file)
}

//Ext file ".md"
const extName = (file) => {
  return path.extname(file) == ".md"
}

// Function to get current filenames in directory
const readDirectoryData = (__dirname, myCallback) => {
  fs.readdir(__dirname, (err, files) => {
    if (err) throw err;
    myCallback(files);
  })
}

// Join routes
const joinRoutes = (...routes) => path.join(...routes)


export {
  readFileData,
  extFile,
  extName,
  readDirectoryData,
  joinRoutes
};