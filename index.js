import { 
  readFileData, 
  extFile, 
  extName, 
  readDirectoryData, 
  joinRoutes 
} from './src/utils.js';

//Read file
readFileData('README.md', printReadFileData);
function printReadFileData(data) {
  // console.log(data);
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
console.log(joinRoutes('/home/Laboratoria/', './test'));







