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

function fileToLinks(data, routeFileMD) {
  const arrayLinks = [];
  const fileHTML = fileConvertedInHTML(data);
  const hrefData = linksInFile(fileHTML);

  hrefData.forEach(link => {
    arrayLinks.push({
      href: link.href,
      text: link.textContent,
      file: routeFileMD,
    })
  });
 return arrayLinks
}

// function mdlinks
const mdLinks = (pathData, optionsData) => {
  return new Promise(function (resolve, reject) {
    let result;
    let arrayLinks = [];
    let todoPromises;
    let pathResolve = (absolutePath(pathData)) ? pathData : absolutePathResolve(pathData);
    let pathContent = pathDetails(pathResolve);
    let flagContent = (pathContent.ext === '') ? 'directory' : (pathContent.ext === '.md') ? 'fileMD' : 'fileNoMD';
    if (flagContent === 'fileNoMD') {
      reject(console.log('Do not exist MD file'))
    }

    if (flagContent === 'fileMD') {
      todoPromises = new Promise(function (resolve, reject) {
        readFileData(routeFileMD, (data)=>{
          // resolve(arrayLinks.concat(fileToLinks(data, routeFileMD)))
          resolve(fileToLinks(data, routeFileMD))
     })
    });
      // readFileData(pathResolve, fileLinks);
      // function fileLinks(data) {
      //   const fileHTML = fileConvertedInHTML(data);
      //   const hrefData = linksInFile(fileHTML);
      //   hrefData.forEach(link => {
      //     arrayLinks.push({
      //       href: link.href,
      //       text: link.textContent,
      //       file: pathResolve,
      //     })
      //   });
      //   resolve(arrayLinks);
      // }
    }
    if (flagContent === 'directory') {
      readDirectoryData(pathResolve, callback)

      function callback(files) {
        const conditionFilesMD = files.filter(file => extMD(file))
        result = conditionFilesMD.length > 0 ? conditionFilesMD : 'Do not exist MD file in this directory'


        result.forEach(element => {
          let routeFileMD = joinRoutes(pathResolve, element);
          // readFileData(routeFileMD, (data)=>{
            // arrayLinks.concat(fileToLinks(data, routeFileMD))

            todoPromises = new Promise(function (resolve, reject) {
              readFileData(routeFileMD, (data)=>{
                // resolve(arrayLinks.concat(fileToLinks(data, routeFileMD)))
                resolve(arrayLinks.concat(fileToLinks(data, routeFileMD)))
           })
          });

          todoPromises.then((result)=> console.log(result));
        });
        // Promise.all(todoPromises).then((result)=> console.log(result));
        // todoPromises
        //   .then((result)=> console.log(result));
      }
    }
  });
}

export { mdLinks }





