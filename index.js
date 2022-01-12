import { 
  readFileData, 
  extFile, 
  extName, 
  readDirectoryData, 
  joinRoutes 
} from './src/utils.js';

//Read file
readFileData('./src/some/example.md', printReadFileData);
function printReadFileData(data) {
  console.log(data);
}

//Ext file
console.log(extFile('README.md'));

// Function to get current filenames in directory
readDirectoryData('./', printReadDirectory);
function printReadDirectory(files) {
  console.log("\nCurrent directory files:");
    files.forEach(file => {
        console.log(file);
    })
}

// Function to get current filenames in directory with the .md extension
readDirectoryData('./', printReadDirectoryData);
function printReadDirectoryData(files) {
  console.log("\Filenames with the .md extension:");
    files.forEach(file => {
      if (extName(file))
        console.log(file);
    })
}

// Join routes
// console.log(joinRoutes('/home/Laboratoria/', './test'));

//md-links
const mdLinks = require("md-links");

mdLinks("./src/some/example.md")
  .then(links => {
    // => [{ href, text, file }, ...]
  })
  .catch(console.error);

mdLinks("./src/some/example.md", { validate: true })
  .then(links => {
    // => [{ href, text, file, status, ok }, ...]
  })
  .catch(console.error);

mdLinks("./src/some/dir")
  .then(links => {
    // => [{ href, text, file }, ...]
  })
  .catch(console.error);







