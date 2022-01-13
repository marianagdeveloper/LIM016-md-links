import {
  absolutePath,
  absolutePathResolve,
  pathDetails,
  readFileData,
  linksInFile,
  fileConvertedInHTML,
  extMD,
  readDirectoryData,
  joinRoutes
} from './src/utils.js';

// function mdlinks
const mdLinks = (pathData, optionsData) => {
  return new Promise(function (resolve, reject) {
    let result;
    let arrayLinks = [];
    let pathResolve = (absolutePath(pathData)) ? pathData : absolutePathResolve(pathData);
    let pathContent = pathDetails(pathResolve);
    let flagContent = (pathContent.ext === '') ? 'directory' : (pathContent.ext === '.md') ? 'fileMD' : 'fileNoMD';
    if (flagContent === 'fileNoMD') {
      reject(console.log('Do not exist MD file'))
    }

    if (flagContent === 'fileMD') {
      readFileData(pathResolve, callback);
      function callback(data) {
        const fileHTML = fileConvertedInHTML(data);
        const hrefData = linksInFile(fileHTML);
        hrefData.forEach(link => {
          arrayLinks.push({
            href: link.href,
            text: link.textContent,
            file: pathResolve,
          })
        });
        resolve(arrayLinks);
      }
    }
    if (flagContent === 'directory') {
      readDirectoryData(pathResolve, callback)
      function callback(files) {
        const conditionFilesMD = files.filter(file => extMD(file))
        result = conditionFilesMD.length > 0 ? conditionFilesMD : 'Do not exist MD file in this directory'


        result.forEach(element => {
          let routeFileMD = joinRoutes(pathResolve, element);
          readFileData(routeFileMD, MyCallback);
          function MyCallback(data) {
            const fileHTML = fileConvertedInHTML(data);
            const hrefData = linksInFile(fileHTML);
            hrefData.forEach(link => {
              arrayLinks.push({
                href: link.href,
                text: link.textContent,
                file: routeFileMD,
              })
            });
            console.log(arrayLinks);
          }
        });
      
        
      }
    }
  });
}

export { mdLinks }





